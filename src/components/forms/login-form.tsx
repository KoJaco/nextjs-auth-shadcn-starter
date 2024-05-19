"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/(auth)/login/actions";
import Link from "next/link";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { IconSpinner } from "@/components/ui/icons";
import { getMessageFromCode } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [result, dispatch] = useFormState(authenticate, undefined);

    const { toast } = useToast();

    useEffect(() => {
        if (result) {
            if (result.type === "error") {
                const err = getMessageFromCode(result.resultCode);

                toast({
                    title: "Error",
                    description: `Error ${err}`,
                });
            } else {
                const succ = getMessageFromCode(result.resultCode);
                toast({
                    title: "Success!",
                    description: `Error ${succ}`,
                });

                router.refresh();
            }
        }
    }, [result, router, toast]);

    return (
        <form
            action={dispatch}
            className="flex flex-col items-center gap-4 space-y-3"
        >
            <div className="w-full flex-1 rounded-xl border bg-background px-6 pb-4 pt-8 shadow-md md:w-96">
                <h1 className="mb-3 text-2xl font-bold">
                    Please log in to continue.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-muted-foreground"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border bg-background/50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-muted-foreground"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border bg-background/50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <LoginButton />
            </div>

            <Link
                href="/signup"
                className="flex flex-row gap-1 text-sm text-zinc-400"
            >
                No account yet?{" "}
                <div className="font-semibold underline">Sign up</div>
            </Link>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md p-2 text-sm font-semibold bg-primary text-primary-foreground"
            aria-disabled={pending}
        >
            {pending ? <IconSpinner /> : "Log in"}
        </button>
    );
}
