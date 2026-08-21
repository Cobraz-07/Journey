# Journey

A full-stack web application to record, organize, and revisit personal travel memories. It allows travelers to manage itineraries, write daily field journals, upload client-compressed photo galleries, and track visited countries on an interactive world map.

Built with Astro in SSR mode, Tailwind CSS, and Google Firebase for authentication, database, and media storage.

## Key Features

### Trip Management and Itineraries
- Create, view, update, and delete trips with start and end dates, destination country, city, and descriptions.
- Filter and navigate between past journeys and upcoming trips.
- Modal confirmations for destructive operations.

### Daily Travel Journal
- Daily log entries associated with each trip to document stories, routes, and personal notes.
- Quick entry editor with date constraints aligned to the trip schedule.
- Automatic input sanitization to safeguard against XSS attacks.

### Photo Gallery and Lightbox
- Multi-photo uploads per trip with real-time upload progress indicators.
- Client-side image pipeline that converts files to WebP and resizes dimensions before transmission, minimizing storage and bandwidth consumption.
- Full-screen lightbox viewer with keyboard navigation, zoom support, and photo deletion.

### Interactive Travel Map
- World map plotting destinations and countries recorded in the user account.
- Summary statistics: total trips logged, countries visited, and time spent traveling.

### Privacy and Shared Links
- Read-only shareable links for individual trips without exposing the rest of the account.
- Sharing modal with one-click clipboard copying.

## Technical Architecture

```
src/
├── components/
│   ├── authenticated/      # Private dashboard modules (trips, journals, gallery, modals)
│   ├── forms/              # Input fields and form controls
│   ├── global/             # Headers, navigation, and shared UI elements
│   └── landing/            # Public landing page sections
├── firebase/
│   ├── config.ts           # Client SDK initialization (Auth, Firestore, Storage)
│   ├── server.ts           # Firebase Admin SDK instance for SSR operations
│   └── storageService.ts   # Upload pipeline, path parsing, and deletion handlers
├── layouts/                # Base HTML layouts for public and authenticated views
├── middleware.ts           # Astro SSR middleware for route protection and session verification
├── pages/
│   ├── api/                # Serverless endpoints (session auth, endpoints)
│   ├── authenticated/      # Protected views (dashboard, trip detail, map)
│   ├── index.astro         # Public landing page
│   └── signin.astro        # Authentication entry point
├── styles/                 # Tailwind CSS v4 stylesheets and design tokens
└── utils/                  # Date helpers, image compressor, and sanitization utilities
```

### Architecture and Security Highlights

- Server-Side Rendering (SSR): Astro renders authenticated views on the server using the Vercel adapter, eliminating client-side flash of unauthenticated content and speeding up first paint.
- HTTPOnly Session Cookies: Astro middleware validates session tokens against the Firebase Admin SDK (`__session`), preventing sensitive credentials from being stored in client-side storage.
- UID Data Partitioning: All Firestore documents and Storage objects are partitioned by immutable user `uid` values and guarded by strict database rules (`firestore.rules` and `storage.rules`).
- Browser-Side Media Optimization: Compression and WebP conversion run in the browser prior to upload, keeping storage footprints light and transfer times fast.

## Tech Stack

- Framework: Astro 5 (SSR with `@astrojs/vercel`)
- Language: TypeScript
- Styling: Tailwind CSS v4 with Tailwind Variants
- Backend and Auth: Firebase 12 (Client SDK) and Firebase Admin 13
- Database: Cloud Firestore
- Storage: Firebase Cloud Storage
- Icons: Tabler Icons
- Testing: Vitest

## Getting Started

### Prerequisites

- Node.js 20 or later
- Package manager: `pnpm` (recommended) or `npm`
- A Firebase project with Authentication, Firestore, and Cloud Storage enabled

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/Cobraz-07/Journey.git
cd Journey
pnpm install
```

### 2. Configure environment variables

Copy the example configuration file:

```bash
cp .env.example .env
```

Add your Firebase configuration to `.env`:

```ini
# Firebase Admin SDK (used for server endpoints and middleware)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Client SDK (used in browser client)
PUBLIC_FIREBASE_API_KEY=your-api-key
PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=your-project-id
PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
PUBLIC_FIREBASE_APP_ID=your-app-id
PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Start the development server

```bash
pnpm dev
```

The application will be accessible at `http://localhost:4321`.

## Available Scripts

- `pnpm dev`: Starts the local development server with hot reload.
- `pnpm build`: Builds the production-ready bundle.
- `pnpm preview`: Previews the production build locally.
- `pnpm test`: Runs the Vitest unit test suite.
- `pnpm check`: Runs static type checking across Astro and TypeScript files.

## Testing

The project includes unit tests for core utilities and safety logic:

```bash
pnpm test
```

Test coverage includes:
- HTML sanitization against XSS payloads.
- Firebase Storage URL parsing and path resolution.
- Date and itinerary string formatting.
- Image compression and dimension handling.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](file:///home/cobraz/Documents/GitHub/Journey/LICENSE) file for details.
