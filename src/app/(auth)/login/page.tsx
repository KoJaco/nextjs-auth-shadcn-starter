import { auth } from "../../../../auth";
import LoginForm from "@/components/forms/login-form";
import { Session } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = (await auth()) as Session;

    if (session) {
        redirect("/");
    }

    return (
        <main className="flex h-screen w-full items-center justify-center">
            <LoginForm />
        </main>
    );
}
