"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Calendar, FileText, X, Printer } from "lucide-react";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import PhotoGallery from "@/components/hotel/PhotoGallery";
import HotelBrochure from "@/components/hotel/HotelBrochure";
import IdealGuestSection from "@/components/hotel/IdealGuestSection";
import WhyWeSelectedSection from "@/components/hotel/WhyWeSelectedSection";
import WatersWellnessSection from "@/components/hotel/WatersWellnessSection";
import EssenceSection from "@/components/hotel/EssenceSection";
import DifferentKindOfHolidaySection from "@/components/hotel/DifferentKindOfHolidaySection";
import EnhanceYourStaySection from "@/components/hotel/EnhanceYourStaySection";
import DecisionCtaSection from "@/components/hotel/DecisionCtaSection";
import ContinueRitualSection from "@/components/hotel/ContinueRitualSection";
import AnchorNavigation, { NAV_ITEMS } from "@/components/hotel/AnchorNavigation";
import SectionIndicator from "@/components/hotel/SectionIndicator";
import WellnessConcierge from "@/components/hotel/WellnessConcierge";
import { getHotelById, getDestinationById } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ThermalBenefits from "@/components/hotel/ThermalBenefits";
import FacilitiesSection from "@/components/hotel/FacilitiesSection";
const HotelDetailPage = () => {
    const params = useParams();
    const hotelId = params.id as string;
    const router = useRouter();
    const hotel = getHotelById(hotelId || "");
    const destination = hotel ? getDestinationById(hotel.destinationId) : undefined;
    const [showBrochure, setShowBrochure] = useState(false);
    const brochureRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Scroll to top when hotel detail page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [hotelId]);

    // Section refs for bi-directional sync
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const [currentSection, setCurrentSection] = useState<string>("overview");
    const isScrollingToSection = useRef(false);

    // Bi-directional sync: Track which section is in focus during scroll
    useEffect(() => {
        const handleScroll = () => {
            // Skip detection during programmatic scroll
            if (isScrollingToSection.current) return;

            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Check if we're still in hero (before tabs)
            if (scrollY < viewportHeight * 0.8) {
                if (currentSection !== "overview") {
                    setCurrentSection("overview");
                }
                return;
            }

            let activeSection = "overview";
            let highestScore = 0;

            NAV_ITEMS.forEach(({ id }) => {
                const element = sectionRefs.current[id];
                if (!element) return;

                const rect = element.getBoundingClientRect();

                // Calculate how "in focus" this section is
                // Priority to sections that are centered in viewport
                const viewportCenter = viewportHeight / 2;
                const sectionCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);

                // Section must be visible
                const isVisible = rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3;

                if (isVisible) {
                    // Score based on proximity to center (closer = higher)
                    const score = Math.max(0, viewportHeight - distanceFromCenter);

                    if (score > highestScore) {
                        highestScore = score;
                        activeSection = id;
                    }
                }
            });

            if (activeSection !== currentSection) {
                setCurrentSection(activeSection);
            }
        };

        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", throttledScroll);
    }, [currentSection]);

    // Navigate to a section with smooth scroll
    const handleSectionNavigate = useCallback((sectionId: string) => {
        const element = sectionRefs.current[sectionId];
        if (!element) return;

        // Prevent scroll detection during programmatic scroll
        isScrollingToSection.current = true;
        setCurrentSection(sectionId);

        // Fixed elements:
        // - Header: 80px (h-20)
        // - Tabs: 58px
        // - Bottom booking bar: ~72px (py-4 + content)
        // Top offset for scroll: header + tabs + breathing room
        const topOffset = 148;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - topOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Re-enable scroll detection after animation
        setTimeout(() => {
            isScrollingToSection.current = false;
        }, 800);
    }, []);

    const handleBooking = () => {
        router.push(`/booking/${hotelId}`);
    };

    const handlePrintBrochure = () => {
        setShowBrochure(true);
    };

    const handlePrint = () => {
        window.print();
    };

    // Hero slideshow
    const heroImages = hotel ? [
        { src: (hotel.heroImage as any)?.src || hotel.heroImage, alt: `${hotel.name} exterior` },
        { src: (hotel.thermalPoolImage as any)?.src || hotel.thermalPoolImage, alt: "Thermal pools" },
        { src: (hotel.spaImage as any)?.src || hotel.spaImage, alt: "Spa facilities" },
        { src: (hotel.roomImage as any)?.src || hotel.roomImage, alt: "Accommodations" },
    ] : [];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, [heroImages.length]);

    useEffect(() => {
        if (heroImages.length <= 1) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [nextSlide, heroImages.length]);

    // Gallery images
    const galleryImages = hotel ? [
        { src: (hotel.heroImage as any)?.src || hotel.heroImage, alt: `${hotel.name} exterior`, category: "exterior" },
        { src: (hotel.thermalPoolImage as any)?.src || hotel.thermalPoolImage, alt: "Thermal pools", category: "thermal" },
        { src: (hotel.spaImage as any)?.src || hotel.spaImage, alt: "Spa facilities", category: "spa" },
        { src: (hotel.roomImage as any)?.src || hotel.roomImage, alt: "Accommodations", category: "rooms" },
        { src: (hotel.heroImage as any)?.src || hotel.heroImage, alt: `${hotel.name} grounds`, category: "exterior" },
        { src: (hotel.thermalPoolImage as any)?.src || hotel.thermalPoolImage, alt: "Pool area", category: "thermal" },
        { src: (hotel.spaImage as any)?.src || hotel.spaImage, alt: "Treatment room", category: "spa" },
        { src: (hotel.roomImage as any)?.src || hotel.roomImage, alt: "Suite interior", category: "rooms" },
    ] : [];

    const displayedRooms = hotel ? hotel.rooms.slice(0, 5) : [];

    if (!hotel) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-3xl">Hotel not found</h1>
                        <Link href="/destinations" className="mt-4 inline-block text-muted-foreground hover:text-foreground">
                            Browse destinations
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Right-side Guided Navigation - Desktop Only */}
            <SectionIndicator
                sections={NAV_ITEMS}
                currentSection={currentSection}
                onNavigate={handleSectionNavigate}
            />

            <main>
                {/* ═══════════════════════════════════════════
            HERO — THE ARRIVAL
            ═══════════════════════════════════════════ */}
                <section className="relative h-screen w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={heroImages[currentSlide]?.src}
                                alt={heroImages[currentSlide]?.alt}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-full w-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-32 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-36">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1 transition-all duration-500 ${index === currentSlide
                                    ? "w-10 bg-primary-foreground"
                                    : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Hero content */}
                    <div className="relative flex h-full flex-col justify-end pb-24 md:pb-32">
                        <div className="content-container">
                            {destination && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <Link
                                        href={`/destinations/${destination.id}`}
                                        className="mb-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        {destination.name}
                                    </Link>
                                </motion.div>
                            )}

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="font-serif text-4xl font-medium text-primary-foreground md:text-6xl lg:text-7xl"
                            >
                                {hotel.name}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="mt-4 font-sans text-lg text-primary-foreground/90 md:text-xl"
                            >
                                {hotel.location}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.7 }}
                                className="mt-6 max-w-xl font-serif text-xl italic text-primary-foreground/80 md:text-2xl"
                            >
                                A place to arrive, unwind, and simply be
                            </motion.p>
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs tracking-widest text-primary-foreground/60 uppercase">Discover</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="h-8 w-px bg-primary-foreground/40"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════
            ANCHOR NAVIGATION — Bi-directional Sync
            ═══════════════════════════════════════════ */}
                <AnchorNavigation
                    onNavigate={handleSectionNavigate}
                    currentSection={currentSection}
                />

                {/* ═══════════════════════════════════════════
            GUIDED SECTION 1: OVERVIEW
            ═══════════════════════════════════════════ */}
                <section
                    ref={(el) => { sectionRefs.current["overview"] = el; }}
                    id="overview"
                >
                    <EssenceSection
                        hotelName={hotel.name}
                        description={hotel.description}
                        experience={hotel.experience}
                        history={hotel.history}
                        location={hotel.location}
                    />
                </section>

                {/* ═══════════════════════════════════════════
            GUIDED SECTION 2: THE HOTEL
            ═══════════════════════════════════════════ */}
                <section
                    ref={(el) => { sectionRefs.current["the-hotel"] = el; }}
                    id="the-hotel"
                    className="bg-card"
                >
                    <div className="section-spacing w-full">
                        <div className="content-container">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="mx-auto max-w-3xl text-center"
                            >
                                <span className="label-subtle mb-6 block">The Hotel</span>
                                <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl leading-tight">
                                    A Place That Shapes Your Stay
                                </h2>
                                <p className="editorial-text editorial-text-large mt-8">
                                    More than accommodation—a destination in itself. The architecture,
                                    the landscape, the rhythm of daily life here have been considered
                                    to create an experience that stays with you.
                                </p>
                                <p className="editorial-text mt-6 text-muted-foreground">
                                    Every element has been chosen to support rest: the quality of light
                                    in the mornings, the sound of water, the unhurried pace of service.
                                    This is a hotel that understands the art of doing less, well.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
            GUIDED SECTION 3: A DIFFERENT KIND OF HOLIDAY
            ═══════════════════════════════════════════ */}
                <section
                    ref={(el) => { sectionRefs.current["different-holiday"] = el; }}
                    id="different-holiday"
                >
                    <DifferentKindOfHolidaySection hotelName={hotel.name} />
                </section>

                {/* ═══════════════════════════════════════════
            GUIDED SECTION 4: WHO THIS HOTEL IS FOR
            ═══════════════════════════════════════════ */}
                <section
                    ref={(el) => { sectionRefs.current["ideal-guest"] = el; }}
                    id="ideal-guest"
                >
                    <IdealGuestSection hotelName={hotel.name} />
                </section>

                {/* ═══════════════════════════════════════════
            GUIDED SECTION 5: WHY WE SELECTED THIS HOTEL
            ═══════════════════════════════════════════ */}
                <section
                    ref={(el) => { sectionRefs.current["why-selected"] = el; }}
                    id="why-selected"
                >
                    <WhyWeSelectedSection
                        hotelName={hotel.name}
                        reasons={hotel.thermalProperties?.whyChoose}
                    />
                </section>

                {/* ═══════════════════════════════════════════
            GUIDED SECTION 6: WATERS & WELLNESS
            ═══════════════════════════════════════════ */}
                <section
                    ref={(el) => { sectionRefs.current["waters-wellness"] = el; }}
                    id="waters-wellness"
                >
                    <WatersWellnessSection
                        hotelName={hotel.name}
                        thermalTemp={hotel.thermalTemp}
                        thermalDescription={hotel.thermalDescription}
                        thermalPoolImage={hotel.thermalPoolImage}
                        spaImage={hotel.spaImage}
                        outdoorPools={hotel.outdoorPools}
                        indoorPools={hotel.indoorPools}
                        spaDescription={hotel.spaDescription}
                        spaServices={hotel.spaServices}
                        thermalProperties={hotel.thermalProperties}
                    />
                </section>

                {/* ═══════════════════════════════════════════
            FREE SCROLL: STAYS & SUITES
            ═══════════════════════════════════════════ */}
                <section className="section-spacing bg-background">
                    <div className="content-container">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 max-w-2xl"
                        >
                            <span className="label-subtle mb-6 block">Where You'll Stay</span>
                            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                                Stays & Suites
                            </h2>
                            <p className="editorial-text mt-6">
                                Rooms designed for rest, not just sleep. Natural light, thoughtful materials,
                                and views that quiet the mind.
                            </p>
                        </motion.div>

                        <div className="grid gap-12 lg:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                            >
                                <img
                                    src={(hotel.roomImage as any)?.src || hotel.roomImage}
                                    alt="Luxury suite"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>

                            <div className="flex flex-col justify-center">
                                {displayedRooms.map((room, index) => (
                                    <motion.div
                                        key={room.name}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="border-b border-border py-8 first:pt-0 last:border-b-0"
                                    >
                                        <h3 className="font-serif text-xl text-foreground">{room.name}</h3>
                                        <p className="mt-2 text-muted-foreground">{room.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
            FREE SCROLL: EXPERIENCES
            ═══════════════════════════════════════════ */}
                <EnhanceYourStaySection
                    hotelName={hotel.name}
                    hasMedicalWellness={!!hotel.medicalWellness}
                />

                <ContinueRitualSection
                    hotelId={hotelId || ""}
                    hotelName={hotel.name}
                />

                {/* ═══════════════════════════════════════════
            PHOTO GALLERY
            ═══════════════════════════════════════════ */}
                <PhotoGallery images={galleryImages} />

                {/* ═══════════════════════════════════════════
            WHAT'S INCLUDED
            ═══════════════════════════════════════════ */}
                <section className="section-spacing bg-card">
                    <div className="content-container">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="mx-auto max-w-3xl"
                        >
                            <span className="label-subtle mb-6 block text-center">Thoughtfully Included</span>
                            <h2 className="text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
                                What's Included
                            </h2>
                            <p className="editorial-text mx-auto mt-6 text-center">
                                Quality over quantity. Each element has been considered
                                to ensure a seamless, restorative experience.
                            </p>

                            <div className="mt-12 grid gap-3 sm:grid-cols-2">
                                {hotel.inclusions.map((item, index) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="flex items-start gap-4 rounded-lg bg-background p-4"
                                    >
                                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-thermal" strokeWidth={1.5} />
                                        <span className="text-foreground">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
            DECISION CTA
            ═══════════════════════════════════════════ */}
                <DecisionCtaSection hotelName={hotel.name} onBooking={handleBooking} />

                {/* Sticky Booking Bar */}
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md"
                >
                    <div className="content-container py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="hidden sm:block">
                                <span className="font-serif text-lg text-foreground">{hotel.name}</span>
                                <p className="text-sm text-muted-foreground">{hotel.location}</p>
                            </div>
                            <div className="flex flex-1 items-center justify-end gap-3">
                                <div className="hidden text-right md:block">
                                    <span className="text-sm text-muted-foreground">Starting from</span>
                                    <p className="font-serif text-xl text-foreground">€280 <span className="text-sm text-muted-foreground">/ night</span></p>
                                </div>
                                <Button
                                    onClick={handlePrintBrochure}
                                    variant="outline"
                                    className="hidden sm:flex items-center gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Brochure
                                </Button>
                                <Button onClick={handleBooking} className="btn-premium">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Check Availability
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Brochure Modal */}
                <AnimatePresence>
                    {showBrochure && hotel && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm no-print"
                                onClick={() => setShowBrochure(false)}
                            />

                            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4 no-print">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="relative w-full max-w-4xl rounded-xl bg-background shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-t-xl border-b border-border bg-background p-6">
                                        <div>
                                            <span className="label-subtle mb-1 block">Hotel Brochure</span>
                                            <h3 className="font-serif text-xl text-foreground">{hotel.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                onClick={handlePrint}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                                            >
                                                <Printer className="h-4 w-4" />
                                                Print / Save PDF
                                            </Button>
                                            <button
                                                onClick={() => setShowBrochure(false)}
                                                className="rounded-full p-2 hover:bg-secondary transition-colors"
                                            >
                                                <X className="h-5 w-5 text-foreground" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden rounded-b-xl">
                                        <HotelBrochure hotel={hotel} destination={destination} />
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
            <WellnessConcierge />
        </div>
    );
};

export default HotelDetailPage;
