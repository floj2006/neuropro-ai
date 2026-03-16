# NeuroPro AI Courses

Modern, AI-themed marketing site built with Next.js App Router, TypeScript, and Tailwind CSS v4.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables (create `.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
DATABASE_URL="file:./dev.db"
```

3. Create the database and seed courses:

```bash
npm run db:push
npm run db:seed:courses
```

4. Run the dev server:

```bash
npm run dev
```

## YooKassa Notes

- Payment creation happens in `app/api/payments/create/route.ts`.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for correct return URLs.
- If you need receipts/54-ФЗ, extend the payment payload with `receipt`.
- Optional webhook endpoint: `app/api/payments/webhook/route.ts`.

## Project Structure

- `app/` - App Router pages and metadata routes
- `components/` - Reusable UI and section components
- `lib/` - Shared utilities and course data
- `prisma/` - Database schema
- `scripts/` - Seed scripts

## Notes

- Tailwind v4 uses `@import "tailwindcss"` in `app/globals.css`.
- Update `metadataBase`, `sitemap.ts`, and `robots.ts` with your production domain.
