# Journey

A modern, full-stack Progressive Web App (PWA) designed to record, organize, and revisit personal travel memories. Journey allows travelers to manage detailed itineraries, write daily field journals, compress and upload photo galleries, track visited countries on an interactive world map, and share read-only trips with friends and family.

Built with **Astro 5** in SSR mode, **Tailwind CSS v4**, and **Google Firebase** for authentication, database, and media storage.

---

## Key Features

### 🗺️ Trip Management and Itineraries
- **Comprehensive Trip Planner:** Create, view, edit, and organize trips with destination country, city, date ranges, and custom descriptions.
- **Trip Filtering:** Seamlessly toggle and browse between upcoming journeys and past travels.
- **Safe Modifications:** Confirmation modals and alerts to prevent accidental deletions of trips and memories.

### 📝 Daily Travel Journal
- **Chronological Field Notes:** Document daily stories, routes, activities, and memories linked to each individual journey.
- **Timeline-Bound Editor:** Quick journal entry creation with intelligent date constraints locked to the trip's schedule.
- **XSS & Input Sanitization:** Automatic sanitization of all user-generated entries before persistence and rendering.

### 🌍 Interactive World Map & Traveler Stats
- **Visited Countries Map:** Dynamic world map that automatically highlights all visited countries across your logged trips.
- **Traveler Metrics:** Live computation of your travel statistics:
  - Total trips logged and total countries visited.
  - Percentage of the world explored.
  - Continents discovered.
  - Total days spent traveling.
- **Landscape Fullscreen Mode:** Interactive zoom and pan view optimized for exploring the map on both mobile and desktop.

### 📸 Photo Gallery & Lightbox Viewer
- **Client-Side Image Optimization:** Images are converted to WebP, resized, and processed into responsive blur-up thumbnails in the browser before upload, minimizing bandwidth and storage costs.
- **Concurrent Batch Uploading:** Upload multiple photos simultaneously (up to 5 concurrent streams) with real-time per-photo and total progress bars, memory leak protection, and abort handling.
- **Cursor-Based Pagination:** Efficient gallery scrolling powered by Firestore cursor pagination (`startAfter`).
- **Interactive Lightbox:** Fullscreen photo viewer with keyboard navigation (arrows/escape), zoom controls, photo deletion, and direct image download via a dedicated attachment proxy endpoint (`Content-Disposition: attachment`).

### 🔗 Public Trip Showcase & Social Sharing
- **Shareable Read-Only Links:** Share individual trips with friends and family (`/trip/public/[shareToken]`) without exposing private account details.
- **Granular Privacy Controls:** Toggle trip visibility between public and private with instant token regeneration and one-click clipboard copying.
- **Rich Social Previews (Open Graph):** Automated Open Graph (OG) meta tags generating rich preview cards when sharing links on WhatsApp, Twitter, Telegram, and other social platforms.

### 🌐 Internationalization (i18n)
- **Full Bilingual Support:** Complete English and Spanish localization across all user interfaces, forms, modals, alerts, and public views.
- **Astro Native Routing:** Subpath-based localization (`/` for English, `/es/` for Spanish) with automatic locale detection.
- **Responsive Language Switcher:** Interactive flag switch and dropdown component for quick language switching on landing and authenticated pages.

### 📱 Progressive Web App (PWA) & Mobile UX
- **Installable Experience:** Native-like mobile installation via Web App Manifest (`manifest.webmanifest`), adaptive icons, and standalone display mode.
- **Mobile-First Layout:** Bottom navigation bar with iOS safe-area support (`safe-area-inset-bottom`) and ergonomic touch targets.
- **Smooth Page Transitions:** Astro `ClientRouter` view transitions with shimmer skeleton loaders for zero-flicker navigation.

---

## Architecture & Security Highlights

- **Server-Side Rendering (SSR):** Powered by Astro 5 with the `@astrojs/vercel` adapter, eliminating client-side flash of unauthenticated content and delivering instant first paint.
- **HTTPOnly Session Cookies:** Secure authentication using Firebase Admin SDK session cookies (`__session`), keeping sensitive credentials and tokens out of `localStorage`.
- **UID Data Partitioning:** Firestore documents and Cloud Storage buckets are strictly partitioned by user `uid` and enforced with granular security rules (`firestore.rules` and `storage.rules`).
- **Self-Hosted Variable Fonts:** Local `@fontsource-variable/plus-jakarta-sans` integration removes external render-blocking font requests, improving Core Web Vitals (LCP/CLS).
- **Cost & Quota Protection:** Client-side compression and quota limit safeguards ensure efficient resource utilization and protect against unexpected Firebase usage spikes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Astro 5](https://astro.build/) (SSR mode with `@astrojs/vercel`) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), [Starwind UI](https://starwindui.com/), [Tailwind Variants](https://www.tailwind-variants.org/) |
| **Typography** | Plus Jakarta Sans (Variable, self-hosted via `@fontsource-variable`) |
| **Icons** | [Tabler Icons](https://tabler.io/icons) via `astro-icon` |
| **Backend & Auth** | Firebase 12 (Client SDK) & Firebase Admin 13 (SSR Admin SDK) |
| **Database** | Cloud Firestore |
| **Storage** | Firebase Cloud Storage |
| **Testing** | [Vitest](https://vitest.dev/) |

---

## Project Structure

```text
Journey/
├── public/                 # Static assets, PWA icons, manifest
├── src/
│   ├── components/         # Reusable UI, forms, modals, navigation, language picker
│   ├── data/               # Country codes, datasets, coordinate mappings
│   ├── i18n/               # Internationalization dictionaries and utility helpers
│   ├── layouts/            # BaseLayout, AuthenticatedLayout
│   ├── middleware.ts       # Astro SSR middleware for session cookie verification
│   ├── pages/              # Astro routes & API endpoints (including /es/ localized routes)
│   │   ├── api/            # Server endpoints (auth, downloads, share tokens)
│   │   ├── authenticated/  # Protected views (Trips, Map, Profile/Account)
│   │   ├── es/             # Spanish localized routes
│   │   └── trip/public/    # Public showcase shareable views
│   ├── services/           # Firebase client & admin services, image compressors
│   └── styles/             # Global CSS and Tailwind v4 theme configurations
├── tests/                  # Vitest unit and integration test suites
├── firestore.rules         # Cloud Firestore security rules
└── storage.rules           # Firebase Storage security rules
```

---

## License

This project is licensed under the **GPL-3.0 License**. See the [LICENSE](LICENSE) file for details.
