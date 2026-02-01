"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";

const MonthlyRitual = () => {
    const pastRituals = [
        { month: "January", item: "Eucalyptus Steam Oil", theme: "Breath & Clarity" },
        { month: "December", item: "Thermal Bath Salts", theme: "Winter Stillness" },
        { month: "November", item: "Natural Bristle Brush", theme: "Morning Awakening" },
    ];

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
                        <span className="label-subtle mb-10 block">The Ongoing Journey</span>
                        <h1 className="font-serif text-5xl font-medium text-foreground md:text-7xl lg:text-9xl leading-[0.9]">
                            Monthly <br /><span className="italic">Ritual</span>
                        </h1>
                        <p className="editorial-text text-2xl font-serif italic mx-auto mt-12 max-w-3xl leading-relaxed">
                            Wellness is not an event—it is a practice. Each month, we send one carefully
                            chosen object to support your ongoing journey of restoration.
                        </p>
                    </motion.div>
                </section>

                {/* Philosophy Section */}
                <section className="section-spacing bg-background pt-40">
                    <div className="content-container">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="mx-auto max-w-4xl"
                        >
                            <span className="label-subtle mb-12 block text-center">Philosophy of Continuity</span>

                            <div className="space-y-10">
                                <p className="editorial-text text-3xl font-serif italic text-center leading-relaxed">
                                    "The thermal retreat ends, but the healing doesn't have to."
                                </p>
                                <div className="grid md:grid-cols-2 gap-12 mt-16">
                                    <p className="editorial-text text-muted-foreground leading-relaxed">
                                        Monthly Ritual is our invitation to maintain the rhythm of care you
                                        discovered during your stay—or to begin that journey from home.
                                    </p>
                                    <p className="editorial-text text-muted-foreground leading-relaxed">
                                        Each month, our curators select one object that serves the season's needs.
                                        It arrives with a short ritual note, explaining its origin, its purpose,
                                        and the practice it supports.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* What Arrives */}
                <section className="section-spacing bg-card">
                    <div className="content-container">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="mx-auto max-w-2xl"
                        >
                            <h2 className="text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
                                What Arrives Each Month
                            </h2>

                            <div className="mt-16 space-y-8">
                                {[
                                    "One ritual object, seasonally inspired",
                                    "A handwritten ritual note explaining its use",
                                    "Connection to a thermal tradition or destination",
                                    "Thoughtful, plastic-free packaging",
                                    "Access to our curators for questions"
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-6 group"
                                    >
                                        <div className="w-6 h-6 rounded-full border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                                            <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                                        </div>
                                        <span className="text-lg text-muted-foreground font-serif italic">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="section-spacing bg-background pb-0">
                    <div className="content-container text-center">
                        <Link
                            href="/shop"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                        >
                            ← Return to the collection
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MonthlyRitual;
