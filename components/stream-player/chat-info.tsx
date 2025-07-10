import { useMemo } from "react";
import { Hint } from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
}

export const ChatInfo = ({isDelayed, isFollowersOnly}: ChatInfoProps) => {

    const hint = useMemo(() => {
        if(!isDelayed && isFollowersOnly) {
            return "Chat is followers only.";
        }
        if(isDelayed && !isFollowersOnly) {
            return "Chat is delayed by 3 seconds.";
        }
        if(isDelayed && isFollowersOnly) {
            return "Chat is followers only and delayed by 3 seconds.";
        }
        
        return "";
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if(!isDelayed && isFollowersOnly) {
            return "Followers Only";
        }
        if(isDelayed && !isFollowersOnly) {
            return "Slow Mode";
        }
        if(isDelayed && isFollowersOnly) {
            return "Followers Only & Slow Mode";
        }
        return "";
    }, [isDelayed, isFollowersOnly]);

    if(!isDelayed && !isFollowersOnly) return null;

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={label}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {hint}
            </p>
        </div>
    )
}