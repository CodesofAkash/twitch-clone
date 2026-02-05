# Twitch Clone - Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Database Schema](#database-schema)
5. [Project Structure](#project-structure)
6. [Core Features](#core-features)
7. [Authentication & Authorization](#authentication--authorization)
8. [Live Streaming Infrastructure](#live-streaming-infrastructure)
9. [API Routes & Webhooks](#api-routes--webhooks)
10. [State Management](#state-management)
11. [UI Components](#ui-components)
12. [Environment Configuration](#environment-configuration)
13. [Development Workflow](#development-workflow)
14. [Deployment Guide](#deployment-guide)
15. [Best Practices](#best-practices)
16. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

A full-featured live streaming platform built with Next.js 15, replicating core Twitch functionality. This application enables users to broadcast live video streams, interact through real-time chat, follow streamers, and manage their streaming communities.

### Key Capabilities

- **Live Video Streaming**: Real-time video broadcasting with RTMP/WHIP ingress
- **Interactive Chat**: Real-time chat with moderation capabilities
- **Social Features**: Follow/unfollow system with user discovery
- **Content Moderation**: Block users and manage chat settings
- **Creator Dashboard**: Stream management, analytics, and configuration
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode Support**: Theme switching with next-themes

---

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 15.3.8 (App Router with Turbopack)
- **React**: 19.0.0 with Server Components
- **TypeScript**: 5.x for type safety
- **Styling**: Tailwind CSS 4.1.11 with custom animations
- **UI Components**: Radix UI primitives + shadcn/ui
- **State Management**: Zustand 5.0.6
- **Video Player**: LiveKit Components React 2.9.12

### Backend

- **Runtime**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM 6.11.0
- **Authentication**: Clerk 6.23.1
- **Live Streaming**: LiveKit Server SDK 2.13.1
- **File Upload**: UploadThing 7.7.3
- **Webhooks**: Svix 1.67.0 for webhook verification

### Development Tools

- **Linter**: ESLint 9 with Next.js config
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm/yarn/pnpm
- **Database Migrations**: Prisma Migrate

---

## 🏗 System Architecture

### Application Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  UI Comps    │  │   Hooks      │  │   Store      │     │
│  │  (Radix UI)  │  │  (Custom)    │  │  (Zustand)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │   Layouts    │  │  Middleware  │     │
│  │ (RSC + CC)   │  │   (Nested)   │  │   (Clerk)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Service │  │Stream Service│  │ Block/Follow │     │
│  │   (Clerk)    │  │  (LiveKit)   │  │   Services   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │   LiveKit    │  │  UploadThing │     │
│  │   (Prisma)   │  │   (Video)    │  │   (Files)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client Request** → Next.js Middleware (Clerk Auth Check)
2. **Authentication** → Protected routes require valid session
3. **Server Component** → Data fetching via service layer
4. **Service Layer** → Database queries + external API calls
5. **Response** → Streamed HTML or JSON data

### Real-Time Communication

```
Client (Browser)
    ↓ WebSocket
LiveKit Cloud
    ↓ Webhook
API Route (/api/webhooks/livekit)
    ↓
Database Update (Stream status)
```

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
User
├── id (PK)
├── username (unique)
├── externalUserId (unique, Clerk)
├── imageUrl
├── bio
├── following[] (Follow)
├── followers[] (Follow)
├── blocking[] (Block)
├── blockedBy[] (Block)
└── stream (Stream, 1:1)

Follow
├── id (PK)
├── followerId (FK → User)
├── followingId (FK → User)
└── Unique: [followerId, followingId]

Block
├── id (PK)
├── blockerId (FK → User)
├── blockedId (FK → User)
└── Unique: [blockerId, blockedId]

Stream
├── id (PK)
├── name
├── thumbnailUrl
├── ingressId (unique, LiveKit)
├── serverUrl
├── streamKey
├── isLive
├── isChatEnabled
├── isChatDelayed
├── isChatFollowersOnly
└── userId (FK → User, unique)
```

### Key Relationships

- **User ↔ Follow**: Many-to-many self-referential (following/followers)
- **User ↔ Block**: Many-to-many self-referential (blocker/blocked)
- **User ↔ Stream**: One-to-one relationship
- **Cascade Deletions**: All relations cascade on user deletion

### Indexes

- `Follow`: Indexed on `followerId`, `followingId`
- `Block`: Indexed on `blockerId`, `blockedId`
- `Stream`: Indexed on `userId`, `ingressId`

---

## 📁 Project Structure

```
twitch-clone/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── layout.tsx
│   │   └── _components/
│   ├── (browse)/                 # Public browsing routes
│   │   ├── (home)/               # Homepage with feed
│   │   ├── [username]/           # User profile & stream
│   │   ├── search/               # Search functionality
│   │   ├── layout.tsx
│   │   └── _components/          # Navbar, Sidebar
│   ├── (dashboard)/              # Creator dashboard
│   │   └── u/[username]/
│   │       ├── (home)/           # Dashboard home
│   │       ├── chat/             # Chat settings
│   │       ├── keys/             # Stream keys
│   │       ├── community/        # Community management
│   │       └── _components/
│   ├── api/                      # API routes
│   │   ├── uploadthing/
│   │   └── webhooks/
│   │       ├── clerk/            # Clerk webhooks
│   │       └── livekit/          # LiveKit webhooks
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── error.tsx                 # Error boundary
│
├── actions/                      # Server actions
│   ├── block.ts                  # Block/unblock actions
│   ├── follow.ts                 # Follow/unfollow actions
│   ├── ingress.ts                # Stream ingress management
│   ├── stream.ts                 # Stream updates
│   ├── token.ts                  # Token generation
│   └── user.ts                   # User operations
│
├── components/                   # React components
│   ├── stream-player/            # Stream player components
│   │   ├── index.tsx             # Main player
│   │   ├── video.tsx             # Video component
│   │   ├── chat.tsx              # Chat interface
│   │   ├── header.tsx            # Stream header
│   │   ├── info-card.tsx         # Stream info
│   │   ├── about-card.tsx        # Creator info
│   │   └── ...                   # Chat, controls, modals
│   ├── ui/                       # shadcn/ui components
│   └── ...                       # Shared components
│
├── lib/                          # Utility libraries
│   ├── auth-service.ts           # Authentication utilities
│   ├── block-service.ts          # Block operations
│   ├── follow-service.ts         # Follow operations
│   ├── stream-service.ts         # Stream queries
│   ├── user-service.ts           # User queries
│   ├── search-service.ts         # Search functionality
│   ├── recommended-service.ts    # Recommendations
│   ├── feed-service.ts           # Feed generation
│   ├── db.ts                     # Prisma client
│   ├── uploadthing.ts            # File upload config
│   └── utils.ts                  # Helper functions
│
├── hooks/                        # Custom React hooks
│   └── use-viewer-token.ts       # LiveKit token hook
│
├── store/                        # Zustand stores
│   ├── use-chat-sidebar.ts       # Chat sidebar state
│   ├── use-creator-sidebar.ts    # Dashboard sidebar state
│   └── use-sidebar.ts            # Browse sidebar state
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── public/                       # Static assets
│
├── middleware.ts                 # Next.js middleware
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript config
├── components.json               # shadcn/ui config
└── package.json                  # Dependencies
```

### Route Groups Explained

- **`(auth)`**: Public authentication pages (no auth required)
- **`(browse)`**: Public content browsing (optional auth)
- **`(dashboard)`**: Protected creator dashboard (auth required)
- **`u/[username]`**: User-specific dashboard routes
- **`[username]`**: Public user profile pages

---

## ⚙️ Core Features

### 1. Live Streaming

**Architecture**: RTMP/WHIP → LiveKit Cloud → WebRTC → Client

**Components**:
- `StreamPlayer`: Main video player wrapper
- `Video`: Handles live/offline states
- `LiveVideo`: Active stream display
- `OfflineVideo`: Placeholder when offline
- `LoadingVideo`: Loading state skeleton

**Key Files**:
- [actions/ingress.ts](actions/ingress.ts) - Stream key generation
- [components/stream-player/video.tsx](components/stream-player/video.tsx) - Video player
- [api/webhooks/livekit/route.ts](api/webhooks/livekit/route.ts) - Stream status updates

**Flow**:
1. Creator generates stream keys in dashboard
2. Uses OBS/StreamLabs with RTMP URL + key
3. LiveKit receives ingress stream
4. Webhook updates database (`isLive: true`)
5. Viewers connect via WebRTC token
6. Real-time video delivery

### 2. Real-Time Chat

**Features**:
- Live message streaming
- User mentions and emotes
- Chat moderation (enable/disable)
- Follower-only mode
- Slow mode (delayed messages)
- Community panel with participant list

**Components**:
- `Chat`: Main chat container
- `ChatHeader`: Controls and settings
- `ChatForm`: Message input
- `ChatList`: Message display
- `ChatMessage`: Individual message
- `ChatCommunity`: Participant list

**State Management**: Zustand store (`useChatSidebar`)

**Key Files**:
- [components/stream-player/chat.tsx](components/stream-player/chat.tsx)
- [store/use-chat-sidebar.ts](store/use-chat-sidebar.ts)

### 3. Follow System

**Functionality**:
- Follow/unfollow streamers
- View followed streamers in sidebar
- Follower count display
- Block users from following

**Service Layer**:
```typescript
// lib/follow-service.ts
- getFollowedUsers()      // Get user's followed streamers
- isFollowingUser(id)     // Check follow status
- followUser(id)          // Create follow relationship
- unfollowUser(id)        // Remove follow relationship
```

**Actions**:
```typescript
// actions/follow.ts
- onFollow(id)            // Follow with revalidation
- onUnfollow(id)          // Unfollow with revalidation
```

**Database Queries**:
- Excludes blocked users from follow lists
- Cascading deletes when users are removed
- Unique constraint prevents duplicate follows

### 4. Block System

**Functionality**:
- Block/unblock users
- Automatic chat removal
- Hide blocked users from recommendations
- Prevent blocked users from following

**Service Layer**:
```typescript
// lib/block-service.ts
- isBlockedByUser(id)     // Check if blocked
- blockUser(id)           // Create block
- unblockUser(id)         // Remove block
- getBlockedUsers()       // List blocked users
```

**Integration**:
- LiveKit room removal on block
- Feed filtering
- Search result filtering

### 5. Creator Dashboard

**Routes**:
- `/u/[username]` - Dashboard home
- `/u/[username]/keys` - Stream keys management
- `/u/[username]/chat` - Chat settings
- `/u/[username]/community` - Blocked users

**Features**:
- Stream configuration
- Thumbnail upload
- Chat settings management
- Stream key generation (RTMP/WHIP)
- Community moderation
- Analytics (followers count)

**Components**:
- Dashboard navbar
- Creator sidebar
- Settings forms
- Key display with copy

### 6. Search & Discovery

**Search Service**:
```typescript
// lib/search-service.ts
getSearch(term?: string)
  - Searches stream names and usernames
  - Filters blocked users
  - Orders by live status and recency
```

**Recommendation Service**:
```typescript
// lib/recommended-service.ts
getRecommended()
  - Excludes followed users
  - Excludes blocking users
  - Orders by creation date
```

**Feed Service**:
```typescript
// lib/feed-service.ts
getFeed()
  - Gets followed users' streams
  - Filters blocked users
  - Orders by live status
```

---

## 🔐 Authentication & Authorization

### Clerk Integration

**Configuration**: [middleware.ts](middleware.ts)

```typescript
// Public routes (no auth required)
- / (homepage)
- /sign-in, /sign-up
- /api/webhooks/*
- /api/uploadthing
- /:username (public profiles)
- /search

// Protected routes (auth required)
- /u/:username/* (dashboard)
```

### User Synchronization

**Webhook**: [api/webhooks/clerk/route.ts](api/webhooks/clerk/route.ts)

**Events**:
1. `user.created` - Creates user in database with default stream
2. `user.updated` - Updates username and image
3. `user.deleted` - Removes user and cascades deletions

**Data Flow**:
```
Clerk → Webhook → Database Sync → Stream Creation
```

### Authorization Patterns

**Service Layer Pattern**:
```typescript
// lib/auth-service.ts

export const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  return await db.user.findUnique({
    where: { externalUserId: self.id }
  });
};

export const getSelfByUsername = async (username: string) => {
  const self = await getSelf();
  const user = await db.user.findUnique({ where: { username } });
  
  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }
  
  return user;
};
```

**Usage in Actions**:
```typescript
// actions/stream.ts
export const updateStream = async (values: Partial<Stream>) => {
  const self = await getSelf(); // Authorization check
  // ... perform operation
};
```

### Guest User Handling

**Pattern**: Try-catch for optional authentication

```typescript
export const getRecommended = async () => {
  let userId;
  
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null; // Guest user
  }
  
  // Fetch data with appropriate filtering
};
```

---

## 📡 Live Streaming Infrastructure

### LiveKit Architecture

**Components**:
- **LiveKit Cloud**: SFU (Selective Forwarding Unit)
- **Ingress**: RTMP/WHIP input endpoint
- **Room**: Virtual space for stream
- **Participant**: Viewer or broadcaster
- **Track**: Audio/video stream

### Stream Key Generation

**File**: [actions/ingress.ts](actions/ingress.ts)

**Process**:
1. Creator requests stream key from dashboard
2. System resets any existing ingresses
3. Creates new ingress with RTMP or WHIP input
4. Configures video/audio encoding presets
5. Stores `ingressId`, `serverUrl`, `streamKey` in database
6. Returns credentials to creator

**Ingress Types**:
- **RTMP**: Traditional streaming (OBS, StreamLabs)
- **WHIP**: WebRTC-based (browser streaming)

**Configuration**:
```typescript
// RTMP Configuration
options.video = {
  source: TrackSource.CAMERA,
  preset: H264_1080P_30FPS_3_LAYERS
};
options.audio = {
  source: TrackSource.MICROPHONE,
  preset: OPUS_STEREO_96KBPS
};

// WHIP Configuration
options.bypassTranscoding = true;
```

### Viewer Token Generation

**File**: [actions/token.ts](actions/token.ts)

**Token Claims**:
```typescript
{
  identity: userId,              // Unique viewer ID
  name: username,                // Display name
  video: {
    room: hostIdentity,          // Room name (host ID)
    canPublish: false,           // Viewers cannot publish
    canSubscribe: true           // Viewers can watch
  }
}
```

**Hook**: [hooks/use-viewer-token.ts](hooks/use-viewer-token.ts)
- Generates token on component mount
- Decodes JWT for viewer identity
- Handles token refresh
- Error handling with toast notifications

### Stream Status Management

**Webhook**: [api/webhooks/livekit/route.ts](api/webhooks/livekit/route.ts)

**Events**:
1. `ingress_started`: Sets `isLive: true`
2. `ingress_ended`: Sets `isLive: false`

**Security**: 
- Webhook signature verification
- LiveKit API key validation

### Video Component Architecture

**File**: [components/stream-player/video.tsx](components/stream-player/video.tsx)

**State Machine**:
```
Loading → Offline | Live
           ↓         ↓
    OfflineVideo  LiveVideo
```

**Features**:
- Fullscreen control
- Volume control
- Quality selection (auto)
- Latency optimization

---

## 🔌 API Routes & Webhooks

### Clerk Webhooks

**Endpoint**: `/api/webhooks/clerk`

**Events Handled**:

1. **user.created**
```typescript
{
  type: "user.created",
  data: {
    id: string,
    username: string,
    image_url: string
  }
}
```
**Action**: Create user + default stream in database

2. **user.updated**
```typescript
{
  type: "user.updated",
  data: {
    id: string,
    username: string,
    image_url: string
  }
}
```
**Action**: Update user details

3. **user.deleted**
```typescript
{
  type: "user.deleted",
  data: { id: string }
}
```
**Action**: Delete user (cascades to stream, follows, blocks)

**Security**: Svix signature verification

### LiveKit Webhooks

**Endpoint**: `/api/webhooks/livekit`

**Events Handled**:

1. **ingress_started**
```typescript
{
  event: "ingress_started",
  ingressInfo: {
    ingressId: string
  }
}
```
**Action**: Update `stream.isLive = true`

2. **ingress_ended**
```typescript
{
  event: "ingress_ended",
  ingressInfo: {
    ingressId: string
  }
}
```
**Action**: Update `stream.isLive = false`

**Security**: LiveKit webhook receiver verification

### UploadThing Route

**Endpoint**: `/api/uploadthing`

**Purpose**: Handle file uploads (thumbnails)

**Configuration**: [app/api/uploadthing/core.ts](app/api/uploadthing/core.ts)

**Upload Types**:
- `thumbnailUploader`: Stream thumbnails (4MB limit, images only)

**Integration**:
```typescript
// Client-side upload
import { UploadButton } from "@uploadthing/react";

<UploadButton
  endpoint="thumbnailUploader"
  onClientUploadComplete={(res) => {
    // Handle URL
  }}
/>
```

---

## 📦 State Management

### Zustand Stores

#### 1. Chat Sidebar Store

**File**: [store/use-chat-sidebar.ts](store/use-chat-sidebar.ts)

```typescript
interface ChatSidebarStore {
  collapsed: boolean;           // Sidebar visibility
  variant: ChatVariant;         // CHAT | COMMUNITY
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant) => void;
}

enum ChatVariant {
  CHAT = "CHAT",              // Message view
  COMMUNITY = "COMMUNITY"     // Participant list
}
```

**Usage**:
```typescript
const { collapsed, onCollapse } = useChatSidebar();
```

#### 2. Creator Sidebar Store

**File**: [store/use-creator-sidebar.ts](store/use-creator-sidebar.ts)

```typescript
interface CreatorSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}
```

**Purpose**: Dashboard sidebar toggle state

#### 3. Browse Sidebar Store

**File**: [store/use-sidebar.ts](store/use-sidebar.ts)

```typescript
interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}
```

**Purpose**: Browse page sidebar with following/recommended

### Why Zustand?

- **Lightweight**: No context provider needed
- **Simple API**: Intuitive hook-based access
- **Performance**: Re-renders only subscribed components
- **DevTools**: Redux DevTools integration
- **TypeScript**: Excellent type inference

### State Persistence

Currently uses in-memory state. For persistence:

```typescript
import { persist } from 'zustand/middleware';

export const useSidebar = create(
  persist(
    (set) => ({
      collapsed: false,
      // ...
    }),
    { name: 'sidebar-storage' }
  )
);
```

---

## 🎨 UI Components

### shadcn/ui Configuration

**File**: [components.json](components.json)

**Setup**:
- Style: `default`
- Base color: `neutral`
- CSS variables: Enabled
- TypeScript: Enabled
- Icon library: `lucide-react`

### Component Library

#### Core Components

1. **Button** (`ui/button.tsx`)
   - Variants: default, destructive, outline, secondary, ghost, link, primary
   - Sizes: default, sm, lg, icon

2. **Dialog** (`ui/dialog.tsx`)
   - Modal overlays
   - Customizable content
   - Accessible (aria-labeled)

3. **Avatar** (`ui/avatar.tsx`)
   - User profile images
   - Fallback support
   - Verified badge integration

4. **Tooltip** (`ui/tooltip.tsx`)
   - Hover information
   - Keyboard accessible
   - Customizable positioning

5. **Slider** (`ui/slider.tsx`)
   - Volume control
   - Range selection
   - Accessible

6. **Switch** (`ui/switch.tsx`)
   - Toggle settings
   - Form integration
   - Accessible

7. **Skeleton** (`ui/skeleton.tsx`)
   - Loading states
   - Consistent with design system

#### Stream Player Components

**Main Component**: [components/stream-player/index.tsx](components/stream-player/index.tsx)

**Layout**:
```tsx
<LiveKitRoom>
  <Video />              {/* Stream video */}
  <Header />             {/* Stream title, actions */}
  <InfoCard />           {/* Stream info, thumbnail */}
  <AboutCard />          {/* Creator bio, followers */}
  <Chat />               {/* Real-time chat */}
</LiveKitRoom>
```

**Responsive Grid**:
- Mobile: Single column
- Desktop: Video (2 cols) + Chat (1 col)
- Collapsed: Full-width video

**Sub-components**:

1. **Video**
   - LiveVideo: Active stream with controls
   - OfflineVideo: Placeholder with avatar
   - LoadingVideo: Skeleton loader

2. **Chat**
   - ChatHeader: Title, toggle, variant switch
   - ChatForm: Message input
   - ChatList: Scrollable messages
   - ChatMessage: Individual message bubble
   - ChatCommunity: Participant list
   - ChatToggle: Collapse button

3. **Header**
   - Username, follower count
   - Follow/unfollow button
   - Verified badge

4. **InfoCard**
   - Editable stream title
   - Thumbnail upload
   - Save functionality

5. **AboutCard**
   - Editable bio
   - Follower statistics
   - Modal editor

**Controls**:
- `FullscreenControl`: Expand/collapse video
- `VolumeControl`: Audio slider
- `ChatToggle`: Show/hide chat

### Custom Components

1. **LiveBadge** (`components/live-badge.tsx`)
   - Red dot indicator
   - "LIVE" text
   - Pulsing animation

2. **Thumbnail** (`components/thumbnail.tsx`)
   - Stream preview images
   - Fallback handling
   - Responsive sizing

3. **UserAvatar** (`components/user-avatar.tsx`)
   - Clerk avatar integration
   - Size variants
   - Show live indicator

4. **Verified** (`components/verified.tsx`)
   - Verification badge icon
   - Conditional display

5. **Hint** (`components/hint.tsx`)
   - Tooltip wrapper
   - Consistent styling
   - Position configuration

### Theme System

**Provider**: [components/theme-provider.tsx](components/theme-provider.tsx)

**Usage**:
```typescript
import { ThemeProvider } from "@/components/theme-provider";

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

**Implementation**:
```typescript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

---

## 🔧 Environment Configuration

### Required Environment Variables

Create `.env.local` in project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/twitch_clone"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# LiveKit
LIVEKIT_API_URL="https://your-project.livekit.cloud"
LIVEKIT_API_KEY="APIxxxxxxxx"
LIVEKIT_API_SECRET="xxxxxxxxxx"
NEXT_PUBLIC_LIVEKIT_WS_URL="wss://your-project.livekit.cloud"

# UploadThing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="xxxxxxxxx"
```

### Configuration Details

#### Database

**Provider**: PostgreSQL
**ORM**: Prisma

**Setup**:
```bash
# Local development
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Production (Vercel Postgres, Supabase, etc.)
DATABASE_URL="postgres://..."
```

#### Clerk

**Dashboard**: https://dashboard.clerk.com

**Setup Steps**:
1. Create application
2. Enable email/username authentication
3. Copy publishable and secret keys
4. Configure webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
5. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
6. Copy webhook secret

**Public Routes Configuration**: [middleware.ts](middleware.ts)

#### LiveKit

**Dashboard**: https://cloud.livekit.io

**Setup Steps**:
1. Create project
2. Copy API URL (e.g., `https://project.livekit.cloud`)
3. Generate API key/secret pair
4. Configure webhook: `https://yourdomain.com/api/webhooks/livekit`
5. Enable events: `ingress_started`, `ingress_ended`

**WebSocket URL**: Replace `https` with `wss`

#### UploadThing

**Dashboard**: https://uploadthing.com

**Setup Steps**:
1. Create application
2. Copy API secret
3. Configure allowed file types and sizes
4. Set up storage limits

---

## 💻 Development Workflow

### Initial Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd twitch-clone

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Setup database
npx prisma generate
npx prisma db push

# 5. Start development server
npm run dev
```

### Development Commands

```bash
# Start dev server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Database commands
npx prisma studio          # Open Prisma Studio
npx prisma generate        # Generate Prisma Client
npx prisma db push         # Push schema changes
npx prisma migrate dev     # Create migration
npx prisma migrate deploy  # Apply migrations (production)
```

### Database Workflow

#### Development Changes

```bash
# 1. Update schema.prisma
# 2. Push changes
npx prisma db push

# 3. Regenerate client (automatic with postinstall)
npx prisma generate
```

#### Production Migrations

```bash
# 1. Create migration
npx prisma migrate dev --name descriptive_name

# 2. Commit migration files
git add prisma/migrations
git commit -m "Add migration: descriptive_name"

# 3. Deploy to production
npx prisma migrate deploy
```

### Code Structure Guidelines

#### Server Actions

**Location**: `actions/`

**Pattern**:
```typescript
"use server";

import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const performAction = async (input: Type) => {
  try {
    // 1. Authentication
    const self = await getSelf();
    
    // 2. Validation
    if (!input) throw new Error("Invalid input");
    
    // 3. Database operation
    const result = await db.model.operation();
    
    // 4. Revalidation
    revalidatePath("/path");
    
    // 5. Return result
    return result;
  } catch (error) {
    throw new Error("Operation failed");
  }
};
```

#### Service Layer

**Location**: `lib/`

**Pattern**:
```typescript
import { getSelf } from "./auth-service";
import { db } from "./db";

export const getResource = async (id: string) => {
  // Optional authentication
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }
  
  // Query with appropriate filtering
  const resource = await db.resource.findMany({
    where: {
      // Apply userId filters if authenticated
    }
  });
  
  return resource;
};
```

#### Components

**Server Components** (default):
```typescript
// No "use client" directive
import { getResource } from "@/lib/service";

const Page = async () => {
  const data = await getResource();
  
  return <Component data={data} />;
};
```

**Client Components**:
```typescript
"use client";

import { useState, useTransition } from "react";
import { serverAction } from "@/actions/action";

export const Component = () => {
  const [isPending, startTransition] = useTransition();
  
  const handleAction = () => {
    startTransition(() => {
      serverAction()
        .then(/* success */)
        .catch(/* error */);
    });
  };
  
  return <button onClick={handleAction}>Action</button>;
};
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: descriptive message"
git push origin feature/feature-name

# Create pull request
# Review and merge
```

### Testing Strategy

**Current State**: No automated tests (add in future)

**Recommended**:
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright or Cypress
- Database tests: Separate test database

---

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

#### Prerequisites

- Vercel account
- GitHub repository
- PostgreSQL database (Vercel Postgres, Supabase, Neon)
- LiveKit account
- Clerk account
- UploadThing account

#### Deployment Steps

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import on Vercel**
   - Go to https://vercel.com/new
   - Import repository
   - Configure project

3. **Environment Variables**
   - Add all variables from `.env.local`
   - Ensure production URLs are used

4. **Database Setup**
```bash
# Run migrations
npx prisma migrate deploy
```

5. **Deploy**
   - Vercel auto-deploys on push
   - Or manually trigger: `vercel --prod`

#### Build Configuration

```json
// vercel.json (if needed)
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install"
}
```

#### Environment-Specific URLs

**Development**:
- Webhook URLs: `https://localhost:3000` (use ngrok)

**Production**:
- Update webhook URLs in Clerk and LiveKit dashboards
- Format: `https://yourdomain.com/api/webhooks/*`

### Manual Deployment

#### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      # ... other env vars
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: twitch_clone
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### VPS Deployment

```bash
# 1. Clone on server
git clone <repo-url>
cd twitch-clone

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
nano .env

# 4. Build
npm run build

# 5. Start with PM2
npm install -g pm2
pm2 start npm --name "twitch-clone" -- start
pm2 save
pm2 startup
```

### Post-Deployment Checklist

- [ ] Verify environment variables
- [ ] Run database migrations
- [ ] Update webhook URLs in Clerk
- [ ] Update webhook URLs in LiveKit
- [ ] Test authentication flow
- [ ] Test stream key generation
- [ ] Test live streaming
- [ ] Test file uploads
- [ ] Monitor error logs
- [ ] Setup error tracking (Sentry)
- [ ] Configure CDN (if needed)
- [ ] Setup monitoring (Vercel Analytics)

---

## ✅ Best Practices

### Code Quality

#### TypeScript Usage

```typescript
// ✅ Good: Explicit types
interface UserProps {
  id: string;
  username: string;
  imageUrl: string;
}

const UserCard = ({ id, username, imageUrl }: UserProps) => {
  // ...
};

// ❌ Avoid: Any types
const UserCard = (props: any) => {
  // ...
};
```

#### Error Handling

```typescript
// ✅ Good: Specific error messages
export const followUser = async (id: string) => {
  const self = await getSelf();
  
  if (self.id === id) {
    throw new Error("Cannot follow yourself");
  }
  
  const existingFollow = await db.follow.findFirst({
    where: { followerId: self.id, followingId: id }
  });
  
  if (existingFollow) {
    throw new Error("Already following");
  }
  
  return await db.follow.create({ /* ... */ });
};

// ❌ Avoid: Generic errors
export const followUser = async (id: string) => {
  try {
    return await db.follow.create({ /* ... */ });
  } catch (error) {
    throw new Error("Error");
  }
};
```

#### Database Queries

```typescript
// ✅ Good: Specific includes and selects
const users = await db.user.findMany({
  select: {
    id: true,
    username: true,
    stream: {
      select: {
        isLive: true
      }
    }
  },
  where: { /* ... */ }
});

// ❌ Avoid: Over-fetching
const users = await db.user.findMany({
  include: {
    stream: true,
    following: true,
    followers: true,
    blocking: true,
    blockedBy: true
  }
});
```

### Performance Optimization

#### Server Components

```typescript
// ✅ Good: Server component for data fetching
const Page = async () => {
  const data = await fetchData();
  return <ClientComponent data={data} />;
};

// ❌ Avoid: Client component for data fetching
"use client";
const Page = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <ClientComponent data={data} />;
};
```

#### Cache Revalidation

```typescript
// ✅ Good: Specific path revalidation
revalidatePath(`/u/${self.username}/chat`);
revalidatePath(`/${self.username}`);

// ❌ Avoid: Global revalidation
revalidatePath("/");
```

#### Database Indexing

```prisma
// ✅ Good: Indexed foreign keys
model Follow {
  // ...
  @@index([followerId])
  @@index([followingId])
}

// ✅ Good: Composite unique index
model Block {
  // ...
  @@unique([blockerId, blockedId])
}
```

### Security

#### Input Validation

```typescript
// ✅ Good: Validate and sanitize
export const updateStream = async (values: Partial<Stream>) => {
  const self = await getSelf();
  
  const validData = {
    name: values.name,
    thumbnailUrl: values.thumbnailUrl,
    isChatEnabled: values.isChatEnabled,
    // Only allow specific fields
  };
  
  return await db.stream.update({
    where: { userId: self.id },
    data: validData
  });
};

// ❌ Avoid: Direct input usage
export const updateStream = async (values: any) => {
  return await db.stream.update({
    where: { userId: values.userId }, // Dangerous!
    data: values // Could contain malicious fields
  });
};
```

#### Authentication Checks

```typescript
// ✅ Good: Always verify ownership
export const deleteResource = async (id: string) => {
  const self = await getSelf(); // Verify authenticated
  
  const resource = await db.resource.findUnique({
    where: { id }
  });
  
  if (resource.userId !== self.id) {
    throw new Error("Unauthorized");
  }
  
  return await db.resource.delete({ where: { id } });
};
```

#### Webhook Verification

```typescript
// ✅ Good: Verify signatures
const event = await receiver.receive(body, authorization);

// ❌ Avoid: Trust without verification
const event = JSON.parse(body);
```

### Accessibility

```typescript
// ✅ Good: Semantic HTML and ARIA
<button
  aria-label="Follow user"
  aria-pressed={isFollowing}
  disabled={isPending}
>
  Follow
</button>

// ✅ Good: Keyboard navigation
<div role="dialog" aria-labelledby="title">
  <h2 id="title">Modal Title</h2>
</div>
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Errors

**Error**: `Can't reach database server`

**Solutions**:
```bash
# Check DATABASE_URL format
DATABASE_URL="postgresql://user:password@host:5432/database"

# Verify database is running
psql -h localhost -U user -d database

# Regenerate Prisma Client
npx prisma generate

# Reset database (development only)
npx prisma db push --force-reset
```

#### 2. Authentication Issues

**Error**: `Unauthorized`

**Solutions**:
- Verify Clerk keys in `.env.local`
- Check webhook synchronization (Clerk dashboard)
- Ensure user exists in database:
```sql
SELECT * FROM "User" WHERE "externalUserId" = 'clerk_user_id';
```
- Clear cookies and re-authenticate

#### 3. Stream Not Starting

**Error**: Stream remains offline

**Checklist**:
- [ ] LiveKit credentials correct
- [ ] Ingress created successfully
- [ ] RTMP URL and stream key correct in OBS
- [ ] Webhook receiving events:
```bash
# Check webhook logs in LiveKit dashboard
```
- [ ] Database updated:
```sql
SELECT "isLive", "ingressId" FROM "Stream" WHERE "userId" = 'user_id';
```

#### 4. Token Generation Fails

**Error**: `Failed to create viewer token`

**Solutions**:
- Verify LiveKit API key/secret
- Check room name matches host identity
- Ensure token includes required claims:
```typescript
{
  identity: string,  // Must be unique
  name: string,
  video: {
    room: string,    // Host identity
    canPublish: boolean,
    canSubscribe: boolean
  }
}
```

#### 5. File Upload Issues

**Error**: `Upload failed`

**Solutions**:
- Verify UploadThing credentials
- Check file size limits (default: 4MB)
- Ensure correct file types:
```typescript
// app/api/uploadthing/core.ts
image: ["image/png", "image/jpeg", "image/jpg"]
```
- Check CORS configuration in UploadThing dashboard

#### 6. Build Errors

**Error**: `Module not found` or `Type error`

**Solutions**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npx prisma generate

# Check TypeScript config
npx tsc --noEmit
```

### Debugging Tools

#### 1. Prisma Studio

```bash
npx prisma studio
```

Visual database browser at `http://localhost:5555`

#### 2. Next.js Debug Mode

```json
// package.json
{
  "scripts": {
    "dev:debug": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

Attach debugger in Chrome: `chrome://inspect`

#### 3. LiveKit Debugging

Enable verbose logging:
```typescript
import { setLogLevel, LogLevel } from "livekit-client";

setLogLevel(LogLevel.debug);
```

#### 4. Network Inspection

- Chrome DevTools → Network tab
- Filter: WS (WebSocket)
- Check LiveKit connection status

#### 5. Server Logs

**Development**:
```bash
npm run dev
# Logs appear in terminal
```

**Production** (Vercel):
- Dashboard → Project → Logs
- Real-time function logs
- Error tracking

### Performance Issues

#### Slow Database Queries

**Diagnosis**:
```typescript
// Enable Prisma query logging
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  log      = ["query", "info", "warn", "error"]
}
```

**Solutions**:
- Add missing indexes
- Reduce data fetching with `select`
- Use pagination for large datasets

#### Large Bundle Size

```bash
# Analyze bundle
npm run build
# Check .next/analyze

# Use dynamic imports
const Component = dynamic(() => import('./Component'));
```

#### Memory Leaks

**Signs**:
- Increasing memory usage
- Slower performance over time

**Solutions**:
- Clean up event listeners in `useEffect`
- Unsubscribe from streams
- Use React DevTools Profiler

---

## 📚 Additional Resources

### Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [LiveKit Docs](https://docs.livekit.io)
- [UploadThing Docs](https://docs.uploadthing.com)
- [Radix UI Docs](https://www.radix-ui.com/docs/primitives)
- [shadcn/ui Docs](https://ui.shadcn.com)

### Learning Resources

- [Next.js App Router Course](https://nextjs.org/learn)
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [LiveKit WebRTC Guide](https://docs.livekit.io/realtime/)

### Community

- [Next.js Discord](https://discord.gg/nextjs)
- [Prisma Discord](https://discord.gg/prisma)
- [LiveKit Community](https://livekit.io/community)

---

## 📝 License

This project is private and proprietary. All rights reserved.

---

## 🤝 Contributing

### Development Guidelines

1. Fork repository
2. Create feature branch
3. Follow code style conventions
4. Write meaningful commit messages
5. Test thoroughly
6. Submit pull request

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Maintenance tasks
```

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Search existing issues on GitHub
3. Create new issue with reproduction steps

---

**Last Updated**: February 5, 2026  
**Version**: 1.0.0  
**Maintained by**: Akash Sharma
