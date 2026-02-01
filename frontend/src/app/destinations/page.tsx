"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import { destinations } from "@/data/destinations";

export default function DestinationsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header alwaysSolid />

            <main>
                {/* Hero Section */}
                <section className="pb-16 pt-32 md:pb-24 md:pt-40">
                    <div className="content-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mx-auto max-w-3xl text-center"
                        >
                            <span className="label-subtle mb-6 block">Explore</span>
                            <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
                                Destinations
                            </h1>
                            <p className="editorial-text editorial-text-large mx-auto mt-8">
                                From the volcanic springs of Iceland to the ancient onsens of Japan,
                                discover the world's most remarkable thermal wellness destinations.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Destinations Grid */}
                <section className="pb-32">
                    <div className="content-container">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {destinations.map((destination, index) => (
                                <motion.div
                                    key={destination.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/destinations/${destination.id}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={(destination.image as any).src || destination.image}
                                                alt={`Thermal spa in ${destination.name}`}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                                            {/* Content overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <span className="label-subtle mb-2 block text-primary-foreground/70">
                                                    {destination.hotelCount} Resorts
                                                </span>
                                                <h2 className="font-serif text-2xl text-primary-foreground">
                                                    {destination.name}
                                                </h2>
                                                <p className="mt-1 text-sm text-primary-foreground/80">
                                                    {destination.country}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-muted-foreground leading-relaxed">
                                            {destination.description}
                                        </p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
