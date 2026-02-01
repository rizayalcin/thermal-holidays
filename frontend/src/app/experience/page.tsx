"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import ExperienceIntro from "@/components/experiences/ExperienceIntro";
import ExperienceSelection from "@/components/experiences/ExperienceSelection";
import ExperienceDetail from "@/components/experiences/ExperienceDetail";
import ExperienceHotels from "@/components/experiences/ExperienceHotels";
import ExperiencePackages from "@/components/experiences/ExperiencePackages";
import ExperienceBooking from "@/components/experiences/ExperienceBooking";
import { ExperienceCategory, WellnessPackage } from "@/data/experiences";

const ExperiencePage = () => {
    const [selectedExperience, setSelectedExperience] = useState<ExperienceCategory | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<WellnessPackage | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSelectExperience = (experience: ExperienceCategory) => {
        if (selectedExperience?.id === experience.id) {
            setSelectedExperience(null);
            setSelectedPackage(null);
        } else {
            setSelectedExperience(experience);
            setSelectedPackage(null);
        }
    };

    const handleSelectPackage = (pkg: WellnessPackage) => {
        if (selectedPackage?.id === pkg.id) {
            setSelectedPackage(null);
        } else {
            setSelectedPackage(pkg);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
                        alt="Wellness journey"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-foreground/60" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="px-4 text-center"
                    >
                        <span className="label-subtle mb-4 block text-primary-foreground/80">
                            Curated Wellness Journeys
                        </span>
                        <h1 className="font-serif text-4xl font-medium text-primary-foreground md:text-5xl lg:text-6xl">
                            Experience & Packages
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
                            Thoughtfully designed programs that honor the body's wisdom
                            and the healing power of thermal waters
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content sections */}
            <ExperienceIntro />

            <ExperienceSelection
                selectedExperience={selectedExperience}
                onSelectExperience={handleSelectExperience}
            />

            <ExperienceDetail experience={selectedExperience} />

            {selectedExperience && (
                <>
                    <ExperienceHotels experience={selectedExperience} />

                    <ExperiencePackages
                        experience={selectedExperience}
                        selectedPackage={selectedPackage}
                        onSelectPackage={handleSelectPackage}
                    />
                </>
            )}

            <ExperienceBooking selectedPackage={selectedPackage} />

            <Footer />
        </div>
    );
};

export default ExperiencePage;
