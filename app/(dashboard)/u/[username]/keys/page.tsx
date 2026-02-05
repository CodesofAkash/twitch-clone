import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

interface KeysPageProps {
  params: Promise<{
    username: string;
  }>;
}

const KeysPage = async ({ params }: KeysPageProps) => {
  const { username } = await params;
  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={self.stream?.serverUrl} />
        <KeyCard value={self.stream?.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;