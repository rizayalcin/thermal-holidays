"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Droplets, Lock, User, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate auth for demo
        setTimeout(() => {
            router.push("/admin");
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Droplets className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="mt-6 font-serif text-3xl font-light tracking-widest uppercase text-slate-900">
                        ThermalHolidays
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Internal Management System
                    </p>
                </div>

                <Card className="border-none shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access the panel
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        placeholder="admin"
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : "Sign In"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
