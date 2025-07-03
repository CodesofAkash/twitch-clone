import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser, isBlockingUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({params}: UserPageProps) => {

    const user = await getUserByUsername(params.username);

    if(!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocking = await isBlockingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if(isBlocked) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-y-4">
            <p>username: {user.username}</p>
            <p>user ID: {user.id}</p>
            <p>is Following: {`${isFollowing}`}</p>
            <p>is Blocked: {`${isBlocked}`}</p>
            <Actions isFollowing={isFollowing} isBlocking={isBlocking} userId={user.id} />
        </div>
    )
}

export default UserPage;