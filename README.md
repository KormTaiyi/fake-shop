This is a beginner-friendly [Next.js](https://nextjs.org) fake shop project.

## Folder structure

```text
app/                    # Routes and pages only (App Router)
  layout.tsx            # Global layout (header, main area, footer)
  page.tsx              # Home page (/)
  contact/page.tsx      # Contact page (/contact)
  products/page.tsx     # Products list (/products)
  products/[id]/page.tsx# Product details (/products/:id)
  not-found.tsx         # Shared 404 UI

components/
  common/               # Layout-level shared components
  ui/                   # Small reusable UI components

lib/
  products.ts           # Fake Store API fetch helpers
```

This structure is intentionally simple:
- Keep `app` focused on routing.
- Keep reusable UI in `components`.
- Keep data/helpers in `lib`.
- Avoid empty placeholder files.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This app fetches product data from [https://fakestoreapi.com/products](https://fakestoreapi.com/products).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
