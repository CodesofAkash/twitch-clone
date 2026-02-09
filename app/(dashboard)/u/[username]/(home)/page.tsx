import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import { getAllCategories } from "@/lib/category-service";
import { db } from "@/lib/db";
import { StreamInfoCard } from "../_components/stream-info-card";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const { username } = await params;
  
  // Get user with stream
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  // Fetch stream with category and tags for settings
  const stream = await db.stream.findUnique({
    where: { userId: user.id },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Fetch all categories for the selector
  const categories = await getAllCategories();

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="h-full">
      {/* Stream Preview */}
      <StreamPlayer user={user} stream={user.stream} isFollowing />

      {/* Settings Section Below Stream */}
      <div className="p-6">
        <StreamInfoCard initialData={stream} categories={categories} />
      </div>
    </div>
  );
};

export default CreatorPage;
