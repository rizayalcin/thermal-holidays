"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExperiencesRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/experience");
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Redirecting to experiences...</p>
        </div>
    );
}
