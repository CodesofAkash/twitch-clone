"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch((err) => {
          if (err?.message?.includes("NEXT_REDIRECT")) {
            window.location.href = "/sign-in";
            return;
          }
          toast.error("Something went wrong");
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch((err) => {
          if (err?.message?.includes("NEXT_REDIRECT")) {
            window.location.href = "/sign-in";
            return;
          }
          toast.error("Something went wrong");
        });
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
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have blocked ${data?.blocked.username}`)
        )
        .catch((err) => {
          if (err?.message?.includes("NEXT_REDIRECT")) {
            window.location.href = "/sign-in";
            return;
          }
          toast.error("Something went wrong");
        });
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch((err) => {
          if (err?.message?.includes("NEXT_REDIRECT")) {
            window.location.href = "/sign-in";
            return;
          }
          toast.error("Something went wrong");
        });
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
