"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string;
}

const UnblockButton = ({ userId }: UnblockButtonProps) => {

    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
            .then(() => toast.success("User unblocked successfully"))
            .catch(() => toast.error("Failed to unblock user"));
        });
    }

  return (
    <Button
    disabled={isPending}
    onClick={onClick}
    variant={"link"}
    size="sm"
    className="text-blue-500 w-full"
    >
        {isPending ? "Unblocking..." : "Unblock"}
    </Button>
  )
}

export default UnblockButton
