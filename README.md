# KSKY SOLUTION Demo

Frontend demo (Next.js) for customer preview. Home is public; other actions require login. There is no backend API.

## Local

1. Copy `.env.example` to `.env.local` and set `DEMO_USERNAME` / `DEMO_PASSWORD`.
2. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Login credentials are not shown in the UI. Set them only in `.env.local` (local) or Vercel Environment Variables (production).

## Deploy on Vercel

1. Import this repository on Vercel.
2. Add Environment Variables:
   - `DEMO_USERNAME`
   - `DEMO_PASSWORD`
3. Deploy. Next.js App Router is detected automatically.

Do not commit `.env.local`.
