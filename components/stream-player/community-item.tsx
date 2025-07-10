"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}

export const CommunityItem = ({hostName, viewerName, participantIdentity, participantName}: CommunityItemProps) => {

    const color = stringToColor(participantName || "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const [ isPending, startTransition] = useTransition();

    const handleBlock = () => {
        if(!participantName || isSelf || !isHost ) return;

        startTransition(() => {
            onBlock(participantIdentity)
            .then(() => toast.success(`Blocked ${participantName}`))
            .catch(() => toast.error("Something went wrong"));
        });

    }

    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p style={ {color: color} }>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block"asChild>
                    <Button
                    variant={"ghost"}
                    disabled={isPending}
                    className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                    onClick={handleBlock}
                    >
                        <MinusCircle className="w-4 h-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    )
}