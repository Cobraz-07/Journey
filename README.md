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

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](file:///home/cobraz/Documents/GitHub/Journey/LICENSE) file for details.
