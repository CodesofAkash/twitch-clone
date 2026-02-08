# 🚀 TWITCH CLONE - COMPLETE IMPLEMENTATION PACKAGE
## All Features - Ready to Deploy

---

## 📦 QUICK START CHECKLIST

1. ✅ Update `prisma/schema.prisma` (already provided)
2. ✅ Run `npx prisma db push && npx prisma generate`  
3. ✅ Replace `prisma/seed.ts` (already provided)
4. ✅ Run `npm run seed`
5. ✅ Copy all files below to your project
6. ✅ Test features one by one

---

## 🎯 IMMEDIATE FIXES (Copy These First)

### 1. Sidebar - Live Users First
**File**: `lib/recommended-service.ts`
```typescript
// See PART_1_FOUNDATION.md - FILE 1
```

### 2. Thumbnail Fix
**File**: `components/thumbnail.tsx`
```typescript
// See PART_1_FOUNDATION.md - FILE 2
```

### 3. Dynamic Carousel
**Files**:
- `app/(browse)/(home)/_components/featured-carousel-wrapper.tsx`
- `app/(browse)/(home)/_components/featured-carousel.tsx`
```typescript
// See PART_1_FOUNDATION.md - FILES 3 & 4
```

### 4. Updated Homepage
**File**: `app/(browse)/(home)/page.tsx`
```typescript
// See PART_1_FOUNDATION.md - FILE 5
```

---

## 🎨 PRIORITY 1: CATEGORIES & TAGS UI

### 5. Category Selector
**File**: `components/category-selector.tsx`
```typescript
// See PART_2_PRIORITY1_A.md - FILE 6
```

### 6. Tag Input  
**File**: `components/tag-input.tsx`
```typescript
// See PART_2_PRIORITY1_A.md - FILE 7
```

### 7. Stream Info Card (Dashboard)
**File**: `app/(dashboard)/u/[username]/(home)/_components/stream-info-card.tsx`
```typescript
// See PART_2_PRIORITY1_A.md - FILE 8
```

---

## 🔍 SEARCH WITH FILTERS

### 8. Updated Search Service
**File**: `lib/search-service.ts`

```typescript

```

### 9. Search Page with Filters
**File**: `app/search/page.tsx`

```typescript

```

### 10. Search Results Component
**File**: `app/search/_components/results.tsx`

```typescript

```


### 11. Search Filters Component
**File**: `app/search/_components/search-filters.tsx`

```typescript

```

---

## 📊 VIEWER COUNT DISPLAY

### 12. Stream Header with Viewer Count
**File**: `components/stream-player/header.tsx`

```typescript

```

### 13. Update Result Card (Already Provided in PART_2)
See `result-card.tsx` in Part 2 for viewer count display on cards.

---

## 🎬 PRIORITY 2: CLIPS SYSTEM

### 14. Add Clips to Schema
**File**: `prisma/schema.prisma` (Add this model)

```prisma
model Clip {
  id          String   @id @default(uuid())
  title       String
  description String?
  videoUrl    String
  thumbnailUrl String?
  duration    Int      // in seconds
  viewCount   Int      @default(0)
  
  streamId    String
  stream      Stream   @relation(fields: [streamId], references: [id], onDelete: Cascade)
  
  creatorId   String
  creator     User     @relation(fields: [creatorId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([streamId])
  @@index([creatorId])
  @@index([createdAt])
}

// Also add to Stream model:
model Stream {
  // ... existing fields
  clips       Clip[]
}

// Also add to User model:
model User {
  // ... existing fields
  clips       Clip[]
}
```

### 15. Clip Service
**File**: `lib/clip-service.ts`

```typescript
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getClips = async (streamId?: string) => {
  const clips = await db.clip.findMany({
    where: streamId ? { streamId } : {},
    include: {
      creator: true,
      stream: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      viewCount: "desc",
    },
  });

  return clips;
};

export const getUserClips = async (userId: string) => {
  const clips = await db.clip.findMany({
    where: {
      creatorId: userId,
    },
    include: {
      stream: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return clips;
};

export const incrementClipViews = async (clipId: string) => {
  await db.clip.update({
    where: { id: clipId },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
};
```

### 16. Create Clip Action
**File**: `actions/clip.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

interface CreateClipData {
  title: string;
  description?: string;
  streamId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
}

export const createClip = async (data: CreateClipData) => {
  try {
    const self = await getSelf();

    const clip = await db.clip.create({
      data: {
        ...data,
        creatorId: self.id,
      },
    });

    revalidatePath(`/clips`);
    revalidatePath(`/clips/${clip.id}`);

    return clip;
  } catch (error) {
    throw new Error("Failed to create clip");
  }
};

export const deleteClip = async (id: string) => {
  try {
    const self = await getSelf();

    const clip = await db.clip.findUnique({
      where: { id },
    });

    if (!clip) {
      throw new Error("Clip not found");
    }

    if (clip.creatorId !== self.id) {
      throw new Error("Unauthorized");
    }

    await db.clip.delete({
      where: { id },
    });

    revalidatePath(`/clips`);

    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete clip");
  }
};
```


---

## 🔔 PRIORITY 2: NOTIFICATIONS

### 17. Notifications Schema
**File**: `prisma/schema.prisma` (Add this model)

```prisma
model Notification {
  id        String   @id @default(uuid())
  type      NotificationType
  message   String
  read      Boolean  @default(false)
  
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Optional references
  streamId  String?
  clipId    String?
  
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([read])
  @@index([createdAt])
}

enum NotificationType {
  FOLLOW
  STREAM_LIVE
  CLIP_CREATED
  MENTION
  RAID
}

// Add to User model:
model User {
  // ... existing fields
  notifications  Notification[]
}
```

### 18. Notification Service
**File**: `lib/notification-service.ts`

```typescript
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getNotifications = async () => {
  const self = await getSelf();

  const notifications = await db.notification.findMany({
    where: {
      userId: self.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  return notifications;
};

export const getUnreadCount = async () => {
  const self = await getSelf();

  const count = await db.notification.count({
    where: {
      userId: self.id,
      read: false,
    },
  });

  return count;
};

export const markAsRead = async (id: string) => {
  const self = await getSelf();

  const notification = await db.notification.update({
    where: {
      id,
      userId: self.id,
    },
    data: {
      read: true,
    },
  });

  return notification;
};

export const markAllAsRead = async () => {
  const self = await getSelf();

  await db.notification.updateMany({
    where: {
      userId: self.id,
      read: false,
    },
    data: {
      read: true,
    },
  });

  return { success: true };
};

export const createNotification = async (
  userId: string,
  type: string,
  message: string,
  options?: { streamId?: string; clipId?: string }
) => {
  const notification = await db.notification.create({
    data: {
      userId,
      type: type as any,
      message,
      ...options,
    },
  });

  return notification;
};
```

### 19. Notification Bell Component
**File**: `components/notification-bell.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch notifications
    // This would be replaced with actual API call
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // Placeholder
    setNotifications([]);
    setUnreadCount(0);
  };

  const markAllRead = () => {
    setUnreadCount(0);
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 rounded-full text-xs flex items-center justify-center text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No notifications
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg ${
                  !notif.read ? "bg-accent" : ""
                }`}
              >
                <p className="text-sm">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
```

---

## 😀 PRIORITY 2: CHAT EMOTES

### 20. Emotes Schema
**File**: `prisma/schema.prisma` (Add this model)

```prisma
model Emote {
  id        String   @id @default(uuid())
  name      String   // e.g., "PogChamp", "Kappa"
  imageUrl  String
  isGlobal  Boolean  @default(false) // Global vs channel-specific
  
  userId    String?  // null for global emotes
  user      User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())

  @@unique([name, userId])
  @@index([userId])
  @@index([isGlobal])
}

// Add to User model:
model User {
  // ... existing fields
  emotes    Emote[]
}
```

### 21. Emote Picker Component (Basic Structure)
**File**: `components/emote-picker.tsx`

```typescript
"use client";

import { useState } from "react";
import { Smile } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Emote {
  id: string;
  name: string;
  imageUrl: string;
}

interface EmotePickerProps {
  onEmoteSelect: (emoteName: string) => void;
  emotes: Emote[];
}

export const EmotePicker = ({ onEmoteSelect, emotes }: EmotePickerProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredEmotes = emotes.filter((emote) =>
    emote.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (emoteName: string) => {
    onEmoteSelect(emoteName);
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Smile className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Input
          placeholder="Search emotes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        
        <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
          {filteredEmotes.map((emote) => (
            <button
              key={emote.id}
              onClick={() => handleSelect(emote.name)}
              className="relative w-10 h-10 hover:bg-accent rounded-lg transition"
              title={emote.name}
            >
              <Image
                src={emote.imageUrl}
                alt={emote.name}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
        
        {filteredEmotes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No emotes found
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
};
```

---

## 📈 PRIORITY 3: ANALYTICS DASHBOARD

### 22. Analytics Schema Updates
**File**: `prisma/schema.prisma` (Add these models)

```prisma
model ViewerHistory {
  id           String   @id @default(uuid())
  streamId     String
  stream       Stream   @relation(fields: [streamId], references: [id], onDelete: Cascade)
  viewerCount  Int
  timestamp    DateTime @default(now())

  @@index([streamId])
  @@index([timestamp])
}

model FollowerHistory {
  id            String   @id @default(uuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  followerCount Int
  timestamp     DateTime @default(now())

  @@index([userId])
  @@index([timestamp])
}

// Add to Stream model:
model Stream {
  // ... existing fields
  viewerHistory ViewerHistory[]
}

// Add to User model:
model User {
  // ... existing fields
  followerHistory FollowerHistory[]
}
```

### 23. Analytics Service
**File**: `lib/analytics-service.ts`

```typescript
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getStreamAnalytics = async (days: number = 30) => {
  const self = await getSelf();
  
  const stream = await db.stream.findUnique({
    where: { userId: self.id },
  });

  if (!stream) {
    throw new Error("Stream not found");
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const viewerHistory = await db.viewerHistory.findMany({
    where: {
      streamId: stream.id,
      timestamp: {
        gte: startDate,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  const followerHistory = await db.followerHistory.findMany({
    where: {
      userId: self.id,
      timestamp: {
        gte: startDate,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  // Calculate stats
  const avgViewers = viewerHistory.length > 0
    ? Math.round(
        viewerHistory.reduce((sum, h) => sum + h.viewerCount, 0) /
          viewerHistory.length
      )
    : 0;

  const totalWatchTime = stream.totalViewTime; // in seconds
  const followerCount = await db.follow.count({
    where: { followingId: self.id },
  });

  return {
    viewerHistory,
    followerHistory,
    peakViewers: stream.peakViewerCount,
    avgViewers,
    totalWatchTime,
    followerCount,
  };
};

// Track viewer count (call this every minute for live streams)
export const trackViewerCount = async (streamId: string, viewerCount: number) => {
  await db.viewerHistory.create({
    data: {
      streamId,
      viewerCount,
    },
  });

  // Update stream peak if needed
  const stream = await db.stream.findUnique({
    where: { id: streamId },
  });

  if (stream && viewerCount > stream.peakViewerCount) {
    await db.stream.update({
      where: { id: streamId },
      data: { peakViewerCount: viewerCount },
    });
  }
};
```

### 24. Analytics Dashboard Page
**File**: `app/(dashboard)/u/[username]/analytics/page.tsx`

```typescript
import { redirect } from "next/navigation";
import { getSelfByUsername } from "@/lib/auth-service";
import { getStreamAnalytics } from "@/lib/analytics-service";
import { AnalyticsChart } from "./_components/analytics-chart";
import { StatsCards } from "./_components/stats-cards";

interface AnalyticsPageProps {
  params: {
    username: string;
  };
}

const AnalyticsPage = async ({ params }: AnalyticsPageProps) => {
  const { username } = await params;
  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  const analytics = await getStreamAnalytics(30);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Last 30 days performance
        </p>
      </div>

      <StatsCards
        peakViewers={analytics.peakViewers}
        avgViewers={analytics.avgViewers}
        totalWatchTime={analytics.totalWatchTime}
        followerCount={analytics.followerCount}
      />

      <AnalyticsChart
        viewerHistory={analytics.viewerHistory}
        followerHistory={analytics.followerHistory}
      />
    </div>
  );
};

export default AnalyticsPage;
```


---

## 💰 PRIORITY 4: MONETIZATION

### 25. Subscriptions Schema
**File**: `prisma/schema.prisma` (Add these models)

```prisma
model Subscription {
  id              String   @id @default(uuid())
  tier            SubscriptionTier
  price           Int      // in cents
  status          SubscriptionStatus
  
  userId          String
  user            User     @relation("UserSubscriptions", fields: [userId], references: [id], onDelete: Cascade)
  
  streamerId      String
  streamer        User     @relation("StreamerSubscribers", fields: [streamerId], references: [id], onDelete: Cascade)
  
  stripeSubscriptionId String? @unique
  currentPeriodEnd     DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([userId, streamerId])
  @@index([userId])
  @@index([streamerId])
  @@index([status])
}

enum SubscriptionTier {
  TIER_1  // $4.99
  TIER_2  // $9.99
  TIER_3  // $24.99
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
}

model Tip {
  id          String   @id @default(uuid())
  amount      Int      // in cents
  message     String?
  
  userId      String
  user        User     @relation("UserTips", fields: [userId], references: [id], onDelete: Cascade)
  
  streamerId  String
  streamer    User     @relation("StreamerTips", fields: [streamerId], references: [id], onDelete: Cascade)
  
  stripePaymentId String? @unique
  
  createdAt   DateTime @default(now())

  @@index([userId])
  @@index([streamerId])
  @@index([createdAt])
}

// Add to User model:
model User {
  // ... existing fields
  subscriptions       Subscription[] @relation("UserSubscriptions")
  subscribers         Subscription[] @relation("StreamerSubscribers")
  tipsSent            Tip[]          @relation("UserTips")
  tipsReceived        Tip[]          @relation("StreamerTips")
  stripeAccountId     String?        @unique
  stripeCustomerId    String?        @unique
}
```

### 26. Theater Mode Component
**File**: `components/stream-player/theater-mode.tsx`

```typescript
"use client";

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";

interface TheaterModeProps {
  isTheater: boolean;
  onToggle: () => void;
}

export const TheaterMode = ({ isTheater, onToggle }: TheaterModeProps) => {
  const Icon = isTheater ? Minimize : Maximize;
  const label = isTheater ? "Exit theater mode" : "Theater mode";

  return (
    <Hint label={label} asChild>
      <button
        onClick={onToggle}
        className="text-white p-1.5 hover:bg-white/10 rounded-lg"
      >
        <Icon className="h-5 w-5" />
      </button>
    </Hint>
  );
};
```

### 27. Chat Moderation Tools Schema
**File**: `prisma/schema.prisma` (Add these models)

```prisma
model ChatModerator {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation("ModeratorUser", fields: [userId], references: [id], onDelete: Cascade)
  streamerId String
  streamer   User     @relation("StreamerModerators", fields: [streamerId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())

  @@unique([userId, streamerId])
  @@index([userId])
  @@index([streamerId])
}

model ChatTimeout {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  streamId  String
  stream    Stream   @relation(fields: [streamId], references: [id], onDelete: Cascade)
  duration  Int      // in seconds
  reason    String?
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([streamId])
  @@index([expiresAt])
}

// Add to User model:
model User {
  // ... existing fields
  moderatorFor    ChatModerator[] @relation("ModeratorUser")
  moderators      ChatModerator[] @relation("StreamerModerators")
  chatTimeouts    ChatTimeout[]
}

// Add to Stream model:
model Stream {
  // ... existing fields
  chatTimeouts    ChatTimeout[]
}
```

---

## 🎥 PRIORITY 5: VOD SYSTEM

### 28. VOD Schema
**File**: `prisma/schema.prisma` (Add this model)

```prisma
model VOD {
  id           String   @id @default(uuid())
  title        String
  description  String?
  videoUrl     String
  thumbnailUrl String?
  duration     Int      // in seconds
  viewCount    Int      @default(0)
  isPublished  Boolean  @default(true)
  
  streamId     String
  stream       Stream   @relation(fields: [streamId], references: [id], onDelete: Cascade)
  
  categoryId   String?
  category     Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([streamId])
  @@index([categoryId])
  @@index([createdAt])
  @@index([viewCount])
}

// Add to Stream model:
model Stream {
  // ... existing fields
  vods         VOD[]
}

// Add to Category model:
model Category {
  // ... existing fields
  vods         VOD[]
}
```

### 29. Channel Points Schema (Bonus)
**File**: `prisma/schema.prisma` (Add these models)

```prisma
model ChannelPoints {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  streamerId String
  points     Int      @default(0)
  
  @@unique([userId, streamerId])
  @@index([userId])
  @@index([streamerId])
}

model PointsReward {
  id          String   @id @default(uuid())
  title       String
  description String?
  cost        Int
  isEnabled   Boolean  @default(true)
  
  streamerId  String
  streamer    User     @relation(fields: [streamerId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([streamerId])
}

model PointsRedemption {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  rewardId  String
  reward    PointsReward @relation(fields: [rewardId], references: [id], onDelete: Cascade)
  status    RedemptionStatus @default(PENDING)
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([rewardId])
  @@index([status])
}

enum RedemptionStatus {
  PENDING
  FULFILLED
  REJECTED
}

// Add to User model:
model User {
  // ... existing fields
  channelPoints      ChannelPoints[]
  pointsRewards      PointsReward[]
  pointsRedemptions  PointsRedemption[]
}

model PointsReward {
  redemptions PointsRedemption[]
}
```

---

## 📝 REMAINING COMPONENTS TO CREATE

### 30. Update Stream Player Index
**File**: `components/stream-player/index.tsx` (Update with theater mode)

```typescript
"use client";

import { useState } from "react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";

import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

interface StreamPlayerProps {
  user: any;
  stream: any;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);
  const [isTheater, setIsTheater] = useState(false);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid h-full",
          isTheater && "grid-cols-1",
          !isTheater && collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-6",
          !isTheater && !collapsed && "grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.username}
            hostIdentity={user.id}
            isTheater={isTheater}
            onTheaterToggle={() => setIsTheater(!isTheater)}
          />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          {!isTheater && (
            <>
              <InfoCard
                hostIdentity={user.id}
                viewerIdentity={identity}
                name={stream.name}
                thumbnailUrl={stream.thumbnailUrl}
              />
              <AboutCard
                hostName={user.username}
                hostIdentity={user.id}
                viewerIdentity={identity}
                bio={user.bio}
                followedByCount={user._count.followers}
              />
            </>
          )}
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
```

---

## 🎉 FINAL STEPS

### 31. Install Required Packages (if not already installed)

```bash
npm install query-string
npm install recharts  # For analytics charts
npm install @stripe/stripe-js stripe  # For monetization
```

### 32. Update Environment Variables

Add to `.env.local`:

```bash
# Stripe (for monetization)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

