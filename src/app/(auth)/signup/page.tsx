import { auth } from "../../../../auth";
import SignupForm from "@/components/forms/signup-form";
import { Session } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const session = (await auth()) as Session;

    if (session) {
        redirect("/");
    }

    return (
        <main className="flex items-center justify-center h-screen">
            <SignupForm />
        </main>
    );
}
