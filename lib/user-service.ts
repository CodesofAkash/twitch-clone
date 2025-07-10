import { db } from "./db"

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            externalUserId: true,
            username: true,
            bio: true,
            imageUrl: true,
            stream: {
                select: {
                    id: true,
                    name: true,
                    thumbnailUrl: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                }
            },
            _count: {
                select: {
                    followers: true,
                }
            }
        }
    });

    return user;
}

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id,
        },
        include: {
            stream: true,
        }
    });

    return user;
}