# PicBoost — AI Image Enhancer

Free, no watermark, no sign-up AI image enhancement tool.

> 🚀 Built with the full Cloudflare stack: Pages + Workers + R2 + D1 + Queues + Workers AI

## Tech Stack

| Layer | Technology | Deployment |
|-------|-----------|------------|
| Frontend | Next.js 14 + Tailwind CSS + shadcn/ui | Cloudflare Pages |
| API | Cloudflare Workers | Edge computing |
| AI Engine | Real-ESRGAN via Workers AI | Cloudflare GPU inference |
| Storage | Cloudflare R2 | Object storage |
| Database | Cloudflare D1 (SQLite) | Edge SQL |
| Queue | Cloudflare Queues | Async processing |
| Auth | Clerk Auth (Phase 2) | — |
| Payment | PayPal + Stripe (Phase 2) | — |

## Quick Start

### 1. Install dependencies

```bash
cd picboost
npm install
```

### 2. Set up Cloudflare resources

```bash
# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create picboost-db
# Copy the database_id into workers/api/wrangler.toml

# Create R2 bucket
wrangler r2 bucket create picboost-images

# Create Queues
wrangler queues create picboost-enhance-queue

# Run D1 migrations
wrangler d1 execute picboost-db --file=./workers/api/migrations/0001_init.sql
```

### 3. Configure environment

```bash
cp .env.example .env.local
# Fill in your Cloudflare and Clerk credentials
```

### 4. Run locally

```bash
# Terminal 1: Start the Worker API
cd workers/api
wrangler dev

# Terminal 2: Start the Next.js frontend
npm run dev
```

### 5. Deploy

```bash
# Deploy Worker API
cd workers/api
wrangler deploy

# Build & deploy frontend to Pages
npm run pages:build
npm run pages:deploy
```

## Project Structure

```
picboost/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── enhance/page.tsx      # Core enhancement tool
│   │   ├── upscale/page.tsx      # Image upscaler
│   │   ├── unblur/page.tsx       # Photo deblurring
│   │   ├── pricing/page.tsx      # Pricing page
│   │   ├── blog/                 # Blog (Phase 3)
│   │   └── layout.tsx            # Root layout + JSON-LD
│   ├── components/
│   │   ├── features/
│   │   │   ├── enhance-workbench.tsx  # Main tool component
│   │   │   ├── image-uploader.tsx     # Drag & drop upload
│   │   │   ├── comparison-slider.tsx  # Before/after slider
│   │   │   ├── header.tsx             # Navigation header
│   │   │   └── footer.tsx             # Site footer
│   │   └── ui/
│   │       ├── button.tsx        # shadcn/ui button
│   │       └── card.tsx          # shadcn/ui card
│   └── lib/
│       ├── api.ts                # API client
│       └── utils.ts              # Utilities
├── workers/api/
│   ├── src/index.ts              # Cloudflare Worker API
│   ├── wrangler.toml             # Worker config
│   └── migrations/
│       └── 0001_init.sql         # D1 schema
├── public/
│   ├── robots.txt                # SEO + AI crawler rules
│   ├── sitemap.xml               # Sitemap
│   └── llms.txt                  # GEO/LLM description
├── docs/
│   ├── PRD.md                    # Product Requirements
│   └── DISCUSSION.md             # Technical discussion notes
└── .github/workflows/
    └── deploy.yml                # CI/CD pipeline
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/enhance` | Upload image for enhancement |
| GET | `/api/jobs/:id` | Check job status |
| GET | `/api/quota` | Get daily quota info |
| GET | `/api/download/:id` | Download enhanced image |
| GET | `/api/original/:id` | Serve original image |

## Pricing

| Plan | Price | Daily Limit | Upscale | Features |
|------|-------|-------------|---------|----------|
| Free | $0 | 5 images | 2x | No watermark, no sign-up |
| Starter | $9.9/mo | 50 images | 4x | Batch, all modes, priority |
| Pro | $19.9/mo | Unlimited | 8x | API access, fastest speed |

## Phase 1 Checklist

- [x] Homepage with hero + features + social proof
- [x] Enhancement tool page with upload/workbench
- [x] Upscale page
- [x] Unblur page
- [x] Pricing page (Free / Starter / Pro)
- [x] Drag & drop image uploader
- [x] Before/after comparison slider
- [x] Worker API (enhance, quota, download, job status)
- [x] D1 database schema
- [x] R2 upload/download
- [x] Workers AI integration (Real-ESRGAN)
- [x] Cloudflare Queues async processing
- [x] Rate limiting (5/day per client)
- [x] SEO files (robots.txt, sitemap.xml, llms.txt)
- [x] JSON-LD structured data (Product + FAQ)
- [x] Open Graph / Twitter Card meta tags

## License

Proprietary — All rights reserved.
