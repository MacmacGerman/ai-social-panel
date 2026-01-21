# AI Social Panel - Backend Server

Backend API for the AI Social Media Content Management Panel.

## 🚀 Tech Stack

- **Node.js** + **Express** - Server framework
- **Supabase** - Database & Authentication
- **Gemini AI** - Content generation
- **OAuth 2.0** - Social media integrations

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
```

## 🔧 Configuration

### 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and keys from Settings → API
3. Add to `.env`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`

### 2. Gemini API

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`: `GEMINI_API_KEY`

### 3. Social Media OAuth

See `/docs/oauth-setup.md` for detailed instructions on setting up:
- Instagram (Meta for Developers)
- TikTok (TikTok for Developers)
- YouTube (Google Cloud Console)

## 🏃 Running the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Health Check
```
GET /health
```

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

### Posts
```
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
POST   /api/posts/:id/publish
```

### Campaigns
```
GET    /api/campaigns
GET    /api/campaigns/:id
POST   /api/campaigns
PUT    /api/campaigns/:id
DELETE /api/campaigns/:id
```

### Social Media
```
GET    /api/social/accounts
GET    /api/social/:platform/connect
GET    /api/social/:platform/callback
POST   /api/social/:platform/disconnect
POST   /api/social/publish
```

### Content Generation
```
POST /api/generate/caption
POST /api/generate/hashtags
POST /api/generate/ideas
```

## 🗄️ Database Schema

See `/docs/database-schema.md` for complete schema and RLS policies.

## 🔐 Security

- Helmet for security headers
- CORS configured for frontend
- Rate limiting (100 requests per 15 min)
- JWT authentication via Supabase
- RLS policies on all tables

## 📝 Environment Variables

See `.env.example` for all required variables.

## 🚢 Deployment

### Render.com
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

### Railway.app
1. Create new project
2. Connect GitHub repo
3. Add environment variables
4. Deploy

## 📄 License

MIT
