# Mimpex Repository — Directory Structure

```
Mimpex/
├── STRUCTURE.md                 # This file
├── README.md
├── docker-compose.yml
├── .github/workflows/ci.yml
│
├── backend/                     # Django REST Framework + PostgreSQL
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   ├── mimpex_api/              # Project settings, URLs, Gemini, prompts
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   ├── gemini.py
│   │   └── prompts.py
│   ├── products/                # Product matrix & categories
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── management/commands/seed_matrix.py
│   ├── diagnostics/             # ImageBot logs & vision API
│   │   ├── models.py
│   │   ├── services.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── chat/                    # Floating chatbot REST + WebSocket
│   │   ├── views.py
│   │   ├── consumers.py
│   │   └── routing.py
│   ├── cms/                     # News, About, Contact leads
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── management/commands/seed_cms.py
│   └── scripts/crawl_mimpexbd.py
│
└── frontend/                    # Next.js 14 App Router
    ├── package.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── .env.example
    └── src/
        ├── app/
        │   ├── layout.tsx       # Navbar, Footer, LanguageProvider, Chatbot
        │   ├── globals.css
        │   ├── page.tsx         # Home
        │   ├── about/page.tsx
        │   ├── products/page.tsx
        │   └── contact/page.tsx
        ├── components/
        │   ├── layout/          # Navbar, Footer
        │   ├── home/            # Hero, FeatureGrid, NewsBoard
        │   ├── ai/              # ImageBotHub, FloatingChatbot
        │   ├── products/        # ProductCatalog
        │   └── contact/         # ContactForm, MapPlaceholder
        ├── lib/
        │   ├── api.ts
        │   └── i18n/            # translations, LanguageProvider
        └── types/products.ts
```

## API map

| Endpoint | App |
|----------|-----|
| `GET /api/products/` | products |
| `GET /api/products/?type=pgr` | products (filtered) |
| `POST /api/diagnostics/image/` | diagnostics (ImageBot) |
| `POST /api/chat/message/` | chat |
| `WS /ws/chat/` | chat |
| `GET /api/cms/news/` | cms |
| `GET /api/cms/about/` | cms |
| `POST /api/cms/contact/` | cms |
