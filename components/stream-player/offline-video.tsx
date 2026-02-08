import { WifiOff } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";

interface OfflineVideoProps {
  username: string;
  imageUrl?: string;
}

export const OfflineVideo = ({ username, imageUrl }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      {imageUrl && (
        <UserAvatar
          size="lg"
          showBadge={false}
          username={username}
          imageUrl={imageUrl}
        />
      )}
      <div className="text-center">
        <WifiOff className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground text-lg">
          {username} is currently offline
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Check back later to see when they go live!
        </p>
      </div>
      
      <div className="mt-8 p-6 bg-accent/50 rounded-lg max-w-md">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Last stream: 2 days ago</p>
          <p>• Total broadcasts: 127</p>
          <p>• Average stream duration: 3.5 hours</p>
        </div>
      </div>
    </div>
  );
};
