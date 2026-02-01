"use client";

import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import { motion } from "framer-motion";
import { Droplet, Award, Shield, Sparkles } from "lucide-react";

const LoyaltyPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header alwaysSolid />

            <main className="pb-24 pt-32">
                {/* Hero */}
                <section className="content-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <span className="label-subtle mb-10 block">The Inner Circle</span>
                        <h1 className="font-serif text-5xl font-medium text-foreground md:text-7xl lg:text-9xl leading-[0.9]">
                            The <br /><span className="italic text-primary">Drops</span> Program
                        </h1>
                        <p className="editorial-text text-2xl font-serif italic mx-auto mt-12 max-w-3xl leading-relaxed">
                            Not a points system, but a measure of your commitment to stillness.
                            Earn Drops with every journey and unlock the world's most
                            exclusive thermal sanctuaries.
                        </p>
                    </motion.div>
                </section>

                {/* The Ecosystem */}
                <section className="section-spacing bg-background pt-40">
                    <div className="content-container">
                        <div className="grid lg:grid-cols-3 gap-16">
                            {[
                                {
                                    icon: Droplet,
                                    title: "Gathering Drops",
                                    description: "Every night spent in a curated retreat adds one Drop to your collection. Every ritual object brought home adds another."
                                },
                                {
                                    icon: Shield,
                                    title: "Tiered Stillness",
                                    description: "As your collection grows, you ascend through our tiers—from Seeker to Curator, and finally, to the Sovereign Circle."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Silent Rewards",
                                    description: "Priority booking for limited-capacity retreats, complimentary room upgrades, and access to private villa editions."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="w-16 h-16 rounded-full border border-primary/10 flex items-center justify-center mx-auto mb-8 group-hover:border-primary transition-colors">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                                    <p className="editorial-text text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sovereign Circle Preview */}
                <section className="section-spacing bg-card overflow-hidden">
                    <div className="content-container">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="label-subtle mb-8 block text-highlight">Sovereign Circle</span>
                                <h2 className="font-serif text-4xl font-medium mb-10 md:text-5xl">The Peak of <br />Restoration</h2>
                                <div className="space-y-8">
                                    {[
                                        "Personal Wellness Concierge available 24/7",
                                        "Guaranteed late check-out at all retreats",
                                        "Access to the 'Hidden Waters' collection of private villas",
                                        "Complimentary Monthly Ritual subscription"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="font-serif italic text-lg">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-sm overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                                        alt="Private Sanctuary"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -left-10 bg-background p-10 border border-border/50 max-w-xs">
                                    <p className="text-xs font-serif italic text-muted-foreground leading-relaxed">
                                        "The Sovereign Circle is more than status. It is a shared value of
                                        deep, uninterrupted care."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Join */}
                <section className="section-spacing bg-background text-center">
                    <div className="content-container">
                        <h2 className="font-serif text-4xl mb-12">Begin Your Collection</h2>
                        <button className="btn-premium h-16 px-16">
                            Join the Inner Circle
                        </button>
                        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            Complimentary enrollment with any booking
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LoyaltyPage;
