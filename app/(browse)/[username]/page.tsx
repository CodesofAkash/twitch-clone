import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { Suspense } from "react";
import { StreamPlayerSkeleton } from "@/components/stream-player";
import { StreamPlayerErrorBoundary } from "@/components/stream-player/error-boundary";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

export const revalidate = 300;

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayerErrorBoundary>
      <Suspense fallback={<StreamPlayerSkeleton />}>
        <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
      </Suspense>
    </StreamPlayerErrorBoundary>
  );
};

export default UserPage;