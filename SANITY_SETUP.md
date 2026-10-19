# LimoMint Sanity setup

The Sanity Studio is a separate app in `studio-limomint`; the Next.js app stays in `frontend`. The Studio uses project `m0tz35ij` and dataset `production`.

## Run the Studio

From `studio-limomint`, run:

```powershell
npm run dev
```

It opens at <http://localhost:3333>.

## Content in the Studio

- **Home page** and **Site settings** are singleton documents in the sidebar.
- **Vehicles**, **Services**, **FAQs**, and **Client testimonials** are regular documents.
- The frontend reads published content on the server and revalidates it every 60 seconds. Until documents are published, the current site content remains as the fallback.
- Sanity images are allowed through Next.js image optimization from `cdn.sanity.io`.

Deploy future schema edits from `studio-limomint` with `npx sanity schemas deploy`. The Studio remains standalone and is not mounted in a Next.js route.
