import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { db } from "@/lib/db";

import { Suspense } from "react";
import { StreamPlayerSkeleton } from "@/components/stream-player";
import { StreamPlayerErrorBoundary } from "@/components/stream-player/error-boundary";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  // Fetch stream with category and tags
  const streamWithDetails = await db.stream.findUnique({
    where: { id: user.stream.id },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      tags: {
        include: {
          tag: {
            select: {
              name: true,
            },
          },
        },
        take: 5,
      },
    },
  });

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: user.stream?.name || `${user.username}'s Stream`,
    description: user.bio || `Live stream by ${user.username}`,
    thumbnailUrl: user.stream?.thumbnailUrl || user.imageUrl,
    uploadDate: user.stream?.createdAt?.toISOString(),
    contentUrl: `https://twitch-clone--codesofakash.vercel.app/${user.username}`,
    embedUrl: `https://twitch-clone--codesofakash.vercel.app/${user.username}`,
    isLiveBroadcast: user.stream?.isLive,
  };

  return (
    <StreamPlayerErrorBoundary>
      <Suspense fallback={<StreamPlayerSkeleton />}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StreamPlayer
          user={{
            ...user,
            _count: {
              followers: user._count.followers,
            },
          }}
          stream={{
            ...user.stream,
            ...streamWithDetails,
          }}
          isFollowing={isFollowing}
        />
      </Suspense>
    </StreamPlayerErrorBoundary>
    
  );
};

export default UserPage;



import { Metadata } from "next";

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.username} - Live on Twitch Clone`,
    description: user.bio || `Watch ${user.username}'s live stream`,
    openGraph: {
      title: `${user.username} - Live Stream`,
      description: user.bio || `Watch ${user.username} live`,
      images: [
        {
          url: user.stream?.thumbnailUrl || user.imageUrl,
          width: 1200,
          height: 630,
          alt: `${user.username} stream thumbnail`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.username} - Live Stream`,
      description: user.bio || `Watch ${user.username} live`,
      images: [user.stream?.thumbnailUrl || user.imageUrl],
    },
  };
}