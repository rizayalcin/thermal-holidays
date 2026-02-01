"use client";

import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Droplets, Calendar, ShoppingBag, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10">
                <h1 className="font-serif text-4xl mb-8">Authenticating Stillness...</h1>
                <Link href="/" className="btn-premium px-10">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header alwaysSolid />

            <main className="pb-32 pt-40">
                <div className="content-container">
                    <div className="grid lg:grid-cols-[1fr_2.5fr] gap-20">
                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                <div className="w-32 h-32 rounded-full border border-border/50 p-1 mb-8">
                                    <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                                        <UserIcon className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                </div>
                                <h1 className="font-serif text-3xl font-medium">{user.user_metadata?.full_name}</h1>
                                <p className="text-muted-foreground text-sm mt-2">{user.email}</p>
                                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/5 border border-primary/20 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                                    Seeker Tier
                                </span>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {[
                                    { icon: Droplets, label: "My Drops", active: true },
                                    { icon: Calendar, label: "Upcoming Retreats" },
                                    { icon: ShoppingBag, label: "Ritual Collection" },
                                    { icon: Settings, label: "Account Settings" },
                                ].map((item, i) => (
                                    <button key={i} className={`flex items-center gap-4 p-4 rounded-sm transition-colors ${item.active ? "bg-card text-foreground" : "text-muted-foreground hover:bg-card/50"}`}>
                                        <item.icon className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="space-y-16">
                            {/* Stats Grid */}
                            <div className="grid sm:grid-cols-3 gap-8">
                                <div className="bg-card p-10 rounded-sm border border-border/10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">Total Drops</span>
                                    <div className="flex items-center gap-4">
                                        <span className="font-serif text-5xl">42</span>
                                        <Droplets className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="bg-card p-10 rounded-sm border border-border/10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">Retreats</span>
                                    <span className="font-serif text-5xl">3</span>
                                </div>
                                <div className="bg-card p-10 rounded-sm border border-border/10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">Ritual Objects</span>
                                    <span className="font-serif text-5xl">8</span>
                                </div>
                            </div>

                            {/* Recent Activity / Upcoming */}
                            <div>
                                <h2 className="font-serif text-3xl mb-10">Upcoming Journey</h2>
                                <div className="bg-card overflow-hidden rounded-sm border border-border/10">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-1/3 aspect-[4/3]">
                                            <img
                                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                                                alt="Terme di Saturnia"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-10 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="label-subtle !mb-4">October 14-20, 2024</span>
                                                <h3 className="font-serif text-2xl mb-2">Terme di Saturnia</h3>
                                                <p className="text-muted-foreground text-sm italic font-serif">7 Days of Sulphuric Mineral Immersion</p>
                                            </div>
                                            <div className="mt-8 flex justify-between items-end">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">+7 Drops pending</span>
                                                <button className="btn-premium px-8 py-3 text-xs">Manage Booking</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
