# আম বাজার (Aam Bazar) - Mango E-Commerce Website

A fully functional, bilingual (Bengali + English) mango e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features
- Bilingual support (বাংলা / English) — toggle anytime
- Fully responsive — mobile app-like experience
- Product listing with filters & sorting
- Product detail pages
- Cart with sidebar (Zustand state)
- Checkout flow with multiple payment methods (bKash, Nagad, Rocket, COD)
- Smooth animations (GSAP-ready, CSS animations, AOS)
- 3D floating elements & parallax effects
- Category sections: Ripe, Raw, Dried, Juice, Pickle
- Countdown offer banners
- Testimonials section
- Newsletter signup
- Toast notifications

## Color Palette (Global CSS Variables)
Change colors in `src/styles/globals.css` under `:root`:

| Variable | Color | Description |
|----------|-------|-------------|
| `--mango-ripe` | `#FFC324` | পাকা আম (Ripe Mango) |
| `--mango-ripe-deep` | `#F4BB44` | Ripe mango deep |
| `--mango-ripe-dark` | `#E6A800` | Ripe mango dark |
| `--mango-raw` | `#4A7C59` | কাঁচা আম (Raw Mango) |
| `--mango-raw-light` | `#6BAE7A` | Raw mango light |
| `--mango-raw-dark` | `#2D5A3D` | Raw mango dark |
| `--mango-orange` | `#FF8C00` | Accent orange |
| `--brand-primary` | `#FFC324` | Primary brand color |
| `--brand-secondary` | `#4A7C59` | Secondary brand color |

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: GSAP (ready), AOS, CSS animations
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Project Structure
```
src/
├── app/
│   ├── page.tsx          (Home)
│   ├── layout.tsx        (Root layout)
│   ├── products/
│   │   ├── page.tsx      (Product listing)
│   │   └── [slug]/page.tsx (Product detail)
│   ├── checkout/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/           (Navbar, Footer)
│   ├── home/             (HeroSection, CategorySection, FeaturedProducts, etc.)
│   ├── product/          (ProductCard)
│   └── cart/             (CartSidebar)
├── lib/
│   ├── products.ts       (Product data)
│   ├── store.ts          (Zustand cart store)
│   ├── languageContext.tsx (Bilingual support)
│   └── utils.ts
├── types/index.ts
└── styles/globals.css    (Global styles + CSS variables)
```

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Adding Products
Edit `src/lib/products.ts` to add/modify products.

## Changing Colors
Edit `:root` variables in `src/styles/globals.css` to update the entire site's color scheme instantly.
