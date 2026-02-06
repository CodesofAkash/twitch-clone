"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Actions = ({
  isFollowing,
  isBlocking,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId: currentUserId } = useAuth();

  const handleFollow = () => {
    if (!currentUserId) {
      return router.push("/sign-in");
    }

    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    if (!currentUserId) {
      return router.push("/sign-in");
    }

    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    if (!currentUserId) {
      return router.push("/sign-in");
    }

    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have blocked ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    if (!currentUserId) {
      return router.push("/sign-in");
    }

    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant={"primary"}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        onClick={isBlocking ? handleUnblock : handleBlock}
        disabled={isPending}
        variant={"destructive"}
      >
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </>
  );
};