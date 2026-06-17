This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Color Token Usage Guide

This covers every semantic color variable defined in `global.css` and when to reach for it. Each token automatically resolves to the right value for light or dark mode (toggled via the `.dark` class), so components should always reference the semantic token — `bg-primary`, `text-foreground`, `border-border` — rather than a raw palette shade like `bg-maroon-600`. Raw palette classes (maroon, soft-pink, magenta, red, blue, emerald, yellow, zinc) are still available for one-off illustrative use, but anything that's part of the actual UI should go through a semantic token so it adapts automatically when the theme switches.

## Quick reference

| Token | Typical use |
|---|---|
| `background` / `foreground` | Page canvas and default body text |
| `primary` / `primary-hover` / `primary-foreground` | Main CTA, brand actions |
| `secondary` / `secondary-hover` / `secondary-foreground` | Lower-emphasis actions, selected states |
| `accent` / `accent-hover` / `accent-foreground` | Badges, tags, highlights, promo callouts |
| `card-bg` | Cards, panels, modals, sheets |
| `border` | Dividers, outlines, default input border |
| `input` | Form field background fill |
| `ring` | Focus outline |
| `muted` / `muted-foreground` | De-emphasized surfaces and secondary text |
| `disabled` | Inactive buttons, inputs, controls |
| `error` / `error-hover` / `error-foreground` | Failed states, validation, destructive actions |
| `success` / `success-hover` / `success-foreground` | Confirmations, completed states |
| `warning` / `warning-hover` / `warning-foreground` | Caution, irreversible-but-not-failed states |
| `info` / `info-hover` / `info-foreground` | Neutral notices, tips, informational banners |
