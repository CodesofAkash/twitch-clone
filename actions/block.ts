"use server";

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    try {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if(blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
    } catch (error) {
        throw new Error(`Internal Error: ${error}`);
    }
}

export const onUnblock = async (id: string) => {
    try {
        const unblocked = await unblockUser(id);

        revalidatePath("/");

        if(unblocked) {
            revalidatePath(`/${unblocked.blocked.username}`);
        }

        return unblocked;
    } catch (error) {
        throw new Error(`Internal Error: ${error}`);
    }
}