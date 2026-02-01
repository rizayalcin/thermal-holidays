"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Hotel,
    Calendar,
    Globe,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Droplets
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Hotels", href: "/admin/hotels", icon: Hotel },
    { label: "Destinations", href: "/admin/destinations", icon: Globe },
    { label: "Inventory", href: "/admin/inventory", icon: Calendar },
    { label: "Multilingual", href: "/admin/languages", icon: Globe },
    { label: "Reporting", href: "/admin/reports", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-white transition-transform duration-300 lg:relative lg:translate-x-0",
                !isSidebarOpen && "-translate-x-full lg:hidden"
            )}>
                <div className="flex h-16 items-center border-b border-slate-800 px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Droplets className="h-6 w-6 text-primary-foreground" />
                        <span className="font-serif text-lg font-light tracking-widest uppercase">
                            Admin
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="ml-auto lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 p-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-800 p-4">
                    <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center border-b bg-white px-6">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className={cn("mr-4 lg:hidden", isSidebarOpen && "hidden")}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-semibold text-slate-800">
                        {sidebarItems.find(i => i.href === pathname)?.label || "Admin Panel"}
                    </h1>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
