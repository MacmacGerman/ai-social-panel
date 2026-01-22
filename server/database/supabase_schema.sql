-- ============================================
-- AI Social Panel - Supabase Database Schema
-- ============================================
-- Este script crea todas las tablas necesarias para el AI Social Panel
-- Incluye: Users, Posts, Campaigns, Social Accounts, Templates, Media
-- Con Row Level Security (RLS) para multi-tenancy

-- ============================================
-- 1. EXTENSIONES
-- ============================================

-- Habilitar UUID para IDs únicos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. TABLAS PRINCIPALES
-- ============================================

-- Tabla: user_profiles
-- Almacena información adicional de usuarios (complementa auth.users de Supabase)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    timezone TEXT DEFAULT 'America/Santiago',
    language TEXT DEFAULT 'es',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: social_accounts
-- Cuentas de redes sociales conectadas
CREATE TABLE IF NOT EXISTS social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'youtube', 'facebook', 'twitter')),
    account_name TEXT NOT NULL,
    account_id TEXT,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, platform, account_id)
);

-- Tabla: campaigns
-- Campañas de contenido
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
    start_date DATE,
    end_date DATE,
    target_platforms TEXT[] DEFAULT '{}',
    goals JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: posts
-- Posts/contenido generado
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    title TEXT,
    caption TEXT NOT NULL,
    hashtags TEXT[] DEFAULT '{}',
    platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'youtube', 'facebook', 'twitter')),
    content_type TEXT DEFAULT 'reel' CHECK (content_type IN ('reel', 'image', 'carousel', 'story', 'video')),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    media_urls TEXT[] DEFAULT '{}',
    ai_generated BOOLEAN DEFAULT false,
    ai_prompt TEXT,
    engagement_stats JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: content_templates
-- Plantillas de contenido para reutilizar
CREATE TABLE IF NOT EXISTS content_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    platform TEXT NOT NULL,
    content_type TEXT NOT NULL,
    template_caption TEXT,
    template_hashtags TEXT[] DEFAULT '{}',
    tone TEXT DEFAULT 'profesional',
    is_public BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: media_library
-- Biblioteca de medios (imágenes, videos)
CREATE TABLE IF NOT EXISTS media_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'gif')),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    duration INTEGER, -- para videos, en segundos
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: ai_generation_history
-- Historial de generaciones con IA
CREATE TABLE IF NOT EXISTS ai_generation_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    platform TEXT NOT NULL,
    tone TEXT,
    generated_caption TEXT,
    generated_hashtags TEXT[] DEFAULT '{}',
    suggestions TEXT[] DEFAULT '{}',
    model_used TEXT DEFAULT 'gemini-pro',
    tokens_used INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: analytics
-- Analytics y métricas de posts
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_campaign_id ON posts(campaign_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_for ON posts(scheduled_for);
CREATE INDEX idx_posts_platform ON posts(platform);
CREATE INDEX idx_content_templates_user_id ON content_templates(user_id);
CREATE INDEX idx_media_library_user_id ON media_library(user_id);
CREATE INDEX idx_ai_generation_history_user_id ON ai_generation_history(user_id);
CREATE INDEX idx_analytics_post_id ON analytics(post_id);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS: social_accounts
CREATE POLICY "Users can view own social accounts" ON social_accounts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own social accounts" ON social_accounts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own social accounts" ON social_accounts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own social accounts" ON social_accounts
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS: campaigns
CREATE POLICY "Users can view own campaigns" ON campaigns
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own campaigns" ON campaigns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own campaigns" ON campaigns
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own campaigns" ON campaigns
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS: posts
CREATE POLICY "Users can view own posts" ON posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts" ON posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON posts
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS: content_templates
CREATE POLICY "Users can view own templates" ON content_templates
    FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert own templates" ON content_templates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates" ON content_templates
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates" ON content_templates
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS: media_library
CREATE POLICY "Users can view own media" ON media_library
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own media" ON media_library
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media" ON media_library
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS: ai_generation_history
CREATE POLICY "Users can view own AI history" ON ai_generation_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI history" ON ai_generation_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas RLS: analytics
CREATE POLICY "Users can view analytics of own posts" ON analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = analytics.post_id 
            AND posts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert analytics for own posts" ON analytics
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = analytics.post_id 
            AND posts.user_id = auth.uid()
        )
    );

-- ============================================
-- 5. TRIGGERS PARA UPDATED_AT
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para todas las tablas con updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON social_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_templates_updated_at BEFORE UPDATE ON content_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. FUNCIONES ÚTILES
-- ============================================

-- Función: Obtener estadísticas de usuario
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_posts', (SELECT COUNT(*) FROM posts WHERE user_id = user_uuid),
        'published_posts', (SELECT COUNT(*) FROM posts WHERE user_id = user_uuid AND status = 'published'),
        'scheduled_posts', (SELECT COUNT(*) FROM posts WHERE user_id = user_uuid AND status = 'scheduled'),
        'total_campaigns', (SELECT COUNT(*) FROM campaigns WHERE user_id = user_uuid),
        'active_campaigns', (SELECT COUNT(*) FROM campaigns WHERE user_id = user_uuid AND status = 'active'),
        'connected_accounts', (SELECT COUNT(*) FROM social_accounts WHERE user_id = user_uuid AND is_active = true),
        'ai_generations', (SELECT COUNT(*) FROM ai_generation_history WHERE user_id = user_uuid)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Puedes descomentar esto para insertar datos de prueba
/*
-- Insertar perfil de usuario de ejemplo
INSERT INTO user_profiles (id, full_name, bio) 
VALUES (auth.uid(), 'Usuario Demo', 'Creador de contenido');

-- Insertar campaña de ejemplo
INSERT INTO campaigns (user_id, name, description, status, target_platforms)
VALUES (
    auth.uid(),
    'Lanzamiento de Producto',
    'Campaña para nuevo producto eco-friendly',
    'active',
    ARRAY['instagram', 'tiktok']
);
*/

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Para ejecutar este script:
-- 1. Ve a Supabase Dashboard
-- 2. SQL Editor
-- 3. Pega todo este código
-- 4. Click "Run"
