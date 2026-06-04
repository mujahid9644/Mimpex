# Mimpex Smart Next-Gen AI Ecosystem

**Client:** Mimpex Agrochemicals Ltd. (MAL)  
**Stack:** Next.js 14 · Tailwind · TypeScript · Django REST · PostgreSQL · Gemini

Corporate multi-page website inspired by [mimpexbd.com](https://mimpexbd.com), with **ImageBot** vision diagnostics and a **floating bilingual PGR sales chatbot**.

## Pages

| Route | Content |
|-------|---------|
| `/` | Hero, About snippet, features, news board, ImageBot hub |
| `/about` | Mission, vision, profile, board, career milestones |
| `/products` | Filterable catalog (6 categories) |
| `/contact` | Map placeholder, office info, lead form |

## Quick start

### Backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1   # or: python -m venv .venv && pip install -r requirements.txt
copy .env.example .env
# Set DATABASE_URL for Neon (or keep POSTGRES_* for local Postgres)
python manage.py migrate
python manage.py seed_matrix
python manage.py seed_cms
python manage.py runserver
```

### Frontend

```powershell
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `GEMINI_API_KEY` in `backend/.env` for live AI.

## Directory map

See [STRUCTURE.md](./STRUCTURE.md) for the full tree.

## Brand theme

- **Green** `#0B6B3A` — primary corporate
- **Red** `#C41E3A` — accents & CTAs
- **White** — surfaces

## License

Proprietary — Mimpex Agrochemicals Ltd.
