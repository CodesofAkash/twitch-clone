# OpenStream

A full-featured live streaming platform built with modern web technologies, featuring real-time video streaming, interactive chat, user authentication, and comprehensive stream management.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)
![LiveKit](https://img.shields.io/badge/LiveKit-Enabled-00A1FF)

## ✨ Features

### Streaming & Video
- 🎥 Real-time video streaming powered by LiveKit
- 📺 Live/offline stream status detection
- 🎬 Custom thumbnail uploads for streams
- 📊 Stream viewer count and metrics
- 🔄 Auto-refresh live streams

### User Management
- 🔐 Secure authentication via Clerk
- 👤 User profiles with customizable bios
- 🖼️ Profile picture support
- 🎮 Streamer dashboard for content creators

### Social Features
- ❤️ Follow/unfollow streamers
- 🚫 Block/unblock users
- 💬 Real-time chat with moderation controls
- 👥 Community sidebar showing followed channels
- 🔍 Search users and streams

### Stream Management
- 🎛️ Dashboard for stream configuration
- 🗂️ Category selection (e.g., Gaming, Just Chatting, Music)
- 🏷️ Tag system for stream categorization
- ⚙️ Chat settings (enable/disable, followers-only, delay)
- 🔑 Stream key management with copy functionality
- 📡 RTMP/WHIP ingress configuration

### UI/UX
- 🌓 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Optimized performance with Next.js 15
- 🎨 Modern UI with Radix UI and Tailwind CSS
- 🎭 Smooth animations and transitions

### Additional Features
- 📧 Suggestion system for user feedback
- 🔔 Toast notifications for user actions
- 🎯 SEO-optimized with metadata and sitemaps
- 🤖 Webhook support for external integrations
- 📄 Legal pages (About, Privacy, Terms, Contact)

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI, shadcn/ui
- **State Management:** Zustand
- **Theme:** next-themes

### Backend
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma 6
- **Authentication:** Clerk
- **Live Streaming:** LiveKit (Server SDK & Client SDK)
- **File Uploads:** UploadThing

### Additional Tools
- **Webhooks:** Svix (for Clerk webhooks)
- **Tunneling:** ngrok (for local development)
- **Notifications:** Sonner (toast notifications)
- **Icons:** Lucide React
- **Date Utilities:** date-fns

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher
- **npm** or **pnpm** or **yarn**
- **PostgreSQL** database (or Supabase account)
- **Git**

You'll also need accounts for:
- [Clerk](https://clerk.dev) - Authentication
- [LiveKit Cloud](https://livekit.io) - Video streaming
- [UploadThing](https://uploadthing.com) - File uploads
- [Supabase](https://supabase.com) or PostgreSQL provider - Database

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/openstream.git
cd openstream
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Database (Supabase PostgreSQL)
DATABASE_URL="your_database_pooling_url"
DIRECT_DATABASE_URL="your_direct_database_url"

# LiveKit
LIVEKIT_API_URL=your_livekit_api_url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
NEXT_PUBLIC_LIVEKIT_WS_URL=your_livekit_websocket_url

# UploadThing
UPLOADTHING_TOKEN=your_uploadthing_token
```

#### How to Get Environment Variables:

**Clerk:**
1. Sign up at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy the API keys from the dashboard
4. Set up a webhook endpoint and get the webhook secret

**Supabase:**
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy the Connection String (pooling mode for `DATABASE_URL`)
4. Copy the Direct Connection URL for `DIRECT_DATABASE_URL`

**LiveKit:**
1. Sign up at [livekit.io](https://livekit.io)
2. Create a new project
3. Copy API URL, API Key, and API Secret from settings
4. WebSocket URL is typically `wss://your-project.livekit.cloud`

**UploadThing:**
1. Sign up at [uploadthing.com](https://uploadthing.com)
2. Create a new app
3. Generate and copy the token

### 4. Set Up Database

Run Prisma migrations to set up your database schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Seed Database (Optional)

Populate your database with sample data:

```bash
npm run seed
```

This will create:
- Sample categories (Gaming, IRL, Music, etc.)
- Tags for stream categorization
- Sample users and streams
- Follow relationships

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Set Up Webhooks (for local development)

To receive Clerk webhooks locally, you need to expose your local server:

```bash
npx ngrok http 3000
```

Then update your Clerk webhook endpoint with the ngrok URL:
`https://your-ngrok-url.ngrok.io/api/webhooks/clerk`

## 📂 Project Structure

```
openstream/
├── actions/              # Server actions
│   ├── block.ts         # Block/unblock users
│   ├── follow.ts        # Follow/unfollow logic
│   ├── ingress.ts       # Stream ingress configuration
│   ├── stream.ts        # Stream management
│   ├── token.ts         # LiveKit token generation
│   └── user.ts          # User operations
├── app/                 # Next.js App Router
│   ├── (auth)/         # Authentication pages
│   ├── (browse)/       # Public browsing pages
│   ├── (dashboard)/    # Creator dashboard
│   ├── (legal)/        # Legal pages
│   └── api/            # API routes
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn)
│   └── stream-player/  # Stream player components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
│   ├── auth-service.ts      # Authentication utilities
│   ├── block-service.ts     # Block management
│   ├── category-service.ts  # Category operations
│   ├── db.ts                # Prisma client
│   ├── feed-service.ts      # Feed generation
│   ├── follow-service.ts    # Follow operations
│   ├── stream-service.ts    # Stream operations
│   └── user-service.ts      # User operations
├── prisma/             # Database schema and migrations
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seeding script
├── public/             # Static assets
├── store/              # Zustand state management
└── scripts/            # Utility scripts
```

## 🎯 Key Features Explained

### Authentication Flow
- Users authenticate via Clerk (email, OAuth providers)
- Webhooks sync user data to PostgreSQL database
- Session management handled automatically by Clerk

### Streaming Architecture
1. Streamers generate an ingress (RTMP/WHIP) via LiveKit
2. Stream key is used in OBS or similar software
3. LiveKit handles transcoding and distribution
4. Viewers connect via WebRTC for low-latency playback

### Chat System
- Real-time chat powered by LiveKit's data channels
- Moderation controls (enable/disable, followers-only, delay)
- Community list shows active chatters

### Search & Discovery
- Full-text search across users and streams
- Category filtering
- Tag-based discovery
- Recommended streamers based on follows

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is via Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables
4. Deploy!

### Production Checklist

- [ ] Set up production database (Supabase, Railway, Neon, etc.)
- [ ] Configure production LiveKit project
- [ ] Set up production Clerk application
- [ ] Add production environment variables to hosting platform
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Configure proper domain for webhooks
- [ ] Enable production mode in all third-party services
- [ ] Test authentication flow end-to-end
- [ ] Verify streaming functionality
- [ ] Test file uploads

### Environment Variables for Production

Make sure all environment variables are set in your hosting platform's dashboard. Do not commit `.env` files to version control.

## 🧪 Development Workflow

### Running in Development Mode

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Database Operations

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio (Database GUI)
npx prisma studio

# Create a migration
npx prisma migrate dev --name your_migration_name

# Seed database
npm run seed
```

## 🤝 Contributing

Contributions are welcome! Please check out our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [LiveKit](https://livekit.io/) - Real-time video infrastructure
- [Clerk](https://clerk.dev/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📧 Contact & Support

- Create an issue for bug reports or feature requests
- Submit suggestions via the in-app suggestion system
- For security issues, please email: security@yourapp.com

## 🗺️ Roadmap

- [ ] Mobile apps (React Native)
- [ ] VOD (Video on Demand) support
- [ ] Clips and highlights
- [ ] Subscriber badges and emotes
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Advanced moderation tools
- [ ] Raid and host features

---

**Built with ❤️ by [Your Name](https://github.com/yourusername)**

Star ⭐ this repository if you find it helpful!
