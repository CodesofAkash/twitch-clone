"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@uploadthing/react";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface InfoModalProps {
    initialName: string;
    initialThumbnail: string | null;
}

export const InfoModal = ({ initialName, initialThumbnail }: InfoModalProps) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnail)

    const closeRef = useRef<HTMLButtonElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({ name: name})
            .then(() => {
                toast.success("Stream updated");
                closeRef?.current?.click();
            })
            .catch(() => toast.error("Something went wrong"));
        });
    }

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
            .then(() => {
                toast.success("Thumbnail removed");
                setThumbnailUrl(null);
            })
            .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Stream Info
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint
                                        label="remove thumbnail"
                                        asChild
                                        side="left"
                                    >
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    src={thumbnailUrl}
                                    alt={"Thumbnail"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone<OurFileRouter, "thumbnailUploader">
                                endpoint="thumbnailUploader"
                                appearance={{
                                    label: {
                                        color: "#FFFFFF"
                                    },
                                    allowedContent: {
                                        color: "#FFFFFF"
                                    }
                                }}
                                onClientUploadComplete={(res: { ufsUrl: string }[]) => {
                                    setThumbnailUrl(res?.[0]?.ufsUrl);
                                    router.refresh();
                                }}
                            />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant={"primary"} type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}