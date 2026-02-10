"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WifiOff, UserX } from "lucide-react";

const ErrorPage = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground p-4">
            {!isOnline ? (
                <>
                    <WifiOff className="h-16 w-16" />
                    <p className="text-xl text-center">
                        You appear to be offline. Please check your internet connection.
                    </p>
                </>
            ) : (
                <>
                    <UserX className="h-16 w-16" />
                    <p className="text-xl text-center">
                        Unable to load this user
                    </p>
                </>
            )}
            <Button variant={"secondary"} asChild>
                <Link href={"/"}>
                    Go back home
                </Link>
            </Button>
        </div>
    )
}

export default ErrorPage;