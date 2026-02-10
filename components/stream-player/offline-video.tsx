import { WifiOff } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";

interface OfflineVideoProps {
  username: string;
  imageUrl?: string;
}

export const OfflineVideo = ({ username, imageUrl }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-3 sm:space-y-4 justify-center items-center px-3 sm:px-4 md:px-6 py-4">
      {imageUrl && (
        <UserAvatar
          size="lg"
          showBadge={false}
          username={username}
          imageUrl={imageUrl}
        />
      )}
      <div className="text-center max-w-full">
        <WifiOff className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg break-words px-2">
          {username} is currently offline
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 px-2">
          Check back later to see when they go live!
        </p>
      </div>
      
      <div className="mt-2 sm:mt-4 md:mt-6 p-3 sm:p-4 md:p-6 bg-accent/50 rounded-lg w-full max-w-[280px] sm:max-w-sm md:max-w-md">
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
          <p className="break-words">• Last stream: 2 days ago</p>
          <p className="break-words">• Total broadcasts: 127</p>
          <p className="break-words">• Average stream duration: 3.5 hours</p>
        </div>
      </div>
    </div>
  );
};
