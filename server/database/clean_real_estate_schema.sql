-- ============================================
-- SAAS INMOBILIARIO - ESQUEMA LIMPIO (MVP)
-- ============================================

-- Reset total (Cuidado: Borra datos existentes)
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZACIONES (Tenants)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PERFILES DE USUARIO (Vínculo con Auth)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'editor' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROPIEDADES (Real Estate Core)
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    price TEXT,
    address TEXT,
    features JSONB DEFAULT '{"bedrooms": 0, "bathrooms": 0, "sqft": 0}'::jsonb,
    main_image_url TEXT,
    status TEXT DEFAULT 'venta' CHECK (status IN ('venta', 'arriendo', 'vendido')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEGURIDAD (Row Level Security)
-- ============================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Políticas: Organizations
CREATE POLICY "Users can view their organization" ON organizations
    FOR SELECT USING (id IN (SELECT organization_id FROM user_profiles WHERE id = auth.uid()));

-- Políticas: User Profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (id = auth.uid());

-- Políticas: Properties (Multi-tenant)
CREATE POLICY "Users can view organization properties" ON properties
    FOR SELECT USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert organization properties" ON properties
    FOR INSERT WITH CHECK (organization_id IN (SELECT organization_id FROM user_profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update organization properties" ON properties
    FOR UPDATE USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE id = auth.uid()));

CREATE POLICY "Users can delete organization properties" ON properties
    FOR DELETE USING (organization_id IN (SELECT organization_id FROM user_profiles WHERE id = auth.uid()));

-- ============================================
-- AUTOMATIZACIÓN (Triggers)
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- AUTO-PROVISIONING (Trigger para nuevos usuarios)
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- 1. Crear organización por defecto
  INSERT INTO public.organizations (name)
  VALUES (split_part(new.email, '@', 1) || '''s Organization')
  RETURNING id INTO new_org_id;

  -- 2. Crear perfil vinculado
  INSERT INTO public.user_profiles (id, organization_id, full_name)
  VALUES (
    new.id,
    new_org_id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger en auth.users (Supabase maneja la tabla auth)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- STORAGE CONFIGURATION (Buckets & Policies)
-- ============================================

-- Crear Bucket para imágenes de propiedades
INSERT INTO storage.buckets (id, name, public)
VALUES ('properties-images', 'properties-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'properties-images' );

CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'properties-images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- ÍNDICES PARA RENDIMIENTO
-- ============================================
CREATE INDEX idx_user_profiles_org ON user_profiles(organization_id);
CREATE INDEX idx_properties_org ON properties(organization_id);
CREATE INDEX idx_properties_status ON properties(status);
