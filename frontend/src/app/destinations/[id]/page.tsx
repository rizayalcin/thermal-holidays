"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import FilterSortBar, { SortOption } from "@/components/hotel/FilterSortBar";
import { getDestinationById, getHotelsByDestination } from "@/data/destinations";

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                    }`}
            />
        ))}
    </div>
);

export default function DestinationHotelsPage() {
    const params = useParams();
    const destinationId = params.id as string;
    const destination = getDestinationById(destinationId || "");
    const allHotels = getHotelsByDestination(destinationId || "");

    const [sortBy, setSortBy] = useState<SortOption>("recommended");
    const [filters, setFilters] = useState({
        priceRange: [0, 1000] as [number, number],
        roomTypes: [] as string[],
        amenities: [] as string[],
        waterTemp: [30, 45] as [number, number],
    });

    // Extract unique room types from all hotels
    const availableRoomTypes = useMemo(() => {
        const types = new Set<string>();
        allHotels.forEach((hotel) => {
            hotel.rooms.forEach((room) => types.add(room.name));
        });
        return Array.from(types);
    }, [allHotels]);

    const availableAmenities = useMemo(() => {
        return [
            "Outdoor Thermal Pools",
            "Indoor Thermal Pools",
            "Medical Wellness",
            "Spa & Treatments",
            "Fitness Center",
            "Private Bathing",
            "Mud Therapy",
            "Hydrotherapy",
        ];
    }, []);

    // Filter and sort hotels
    const filteredHotels = useMemo(() => {
        let result = [...allHotels].filter((hotel) => {
            // Filter by water temperature
            const hotelTemp = parseFloat(hotel.thermalTemp.replace("°C", ""));
            if (hotelTemp < filters.waterTemp[0] || hotelTemp > filters.waterTemp[1]) {
                return false;
            }

            // Filter by room types
            if (filters.roomTypes.length > 0) {
                const hotelRoomTypes = hotel.rooms.map((r) => r.name);
                const hasMatchingRoom = filters.roomTypes.some((rt) =>
                    hotelRoomTypes.includes(rt)
                );
                if (!hasMatchingRoom) return false;
            }

            // Filter by amenities
            if (filters.amenities.length > 0) {
                const hotelAmenities: string[] = [];
                if (hotel.outdoorPools) hotelAmenities.push("Outdoor Thermal Pools");
                if (hotel.indoorPools) hotelAmenities.push("Indoor Thermal Pools");
                if (hotel.medicalWellness) hotelAmenities.push("Medical Wellness");
                if (hotel.spaServices?.length) hotelAmenities.push("Spa & Treatments");

                const hasMatchingAmenity = filters.amenities.some((a) =>
                    filters.amenities.includes(a) // Logic fix from original if needed, but keeping original mostly
                );

                // More robust amenity check
                const matchesAllAmenities = filters.amenities.every(a => hotelAmenities.includes(a));
                // Actually the original used .some, let's keep some but fix variable reference
                const hasAnyMatchingAmenity = filters.amenities.some((a) => hotelAmenities.includes(a));
                if (!hasAnyMatchingAmenity) return false;
            }

            return true;
        });

        // Sort results
        switch (sortBy) {
            case "temp-high":
                result.sort((a, b) => {
                    const tempA = parseFloat(a.thermalTemp.replace("°C", ""));
                    const tempB = parseFloat(b.thermalTemp.replace("°C", ""));
                    return tempB - tempA;
                });
                break;
            case "temp-low":
                result.sort((a, b) => {
                    const tempA = parseFloat(a.thermalTemp.replace("°C", ""));
                    const tempB = parseFloat(b.thermalTemp.replace("°C", ""));
                    return tempA - tempB;
                });
                break;
            default:
                break;
        }

        return result;
    }, [allHotels, filters, sortBy]);

    if (!destination) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-3xl">Destination not found</h1>
                        <Link href="/destinations" className="mt-4 inline-block text-muted-foreground hover:text-foreground">
                            Return to destinations
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

            <main>
                {/* Hero Section */}
                <section className="relative h-[50vh] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={(destination.image as any).src || destination.image}
                            alt={`Thermal wellness in ${destination.name}`}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/20 to-transparent" />
                    </div>

                    <div className="relative flex h-full flex-col justify-end pb-12">
                        <div className="content-container">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <Link
                                    href="/destinations"
                                    className="mb-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    All Destinations
                                </Link>
                                <span className="label-subtle mb-3 block text-primary-foreground/70">
                                    {destination.country}
                                </span>
                                <h1 className="font-serif text-4xl font-medium text-primary-foreground md:text-5xl">
                                    {destination.name}
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Description */}
                <section className="py-12 md:py-16">
                    <div className="content-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mx-auto max-w-3xl text-center"
                        >
                            <p className="editorial-text editorial-text-large">
                                {destination.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Hotels List */}
                <section className="pb-32">
                    <div className="content-container">
                        <FilterSortBar
                            filters={filters}
                            onFilterChange={setFilters}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            availableRoomTypes={availableRoomTypes}
                            availableAmenities={availableAmenities}
                            resultCount={filteredHotels.length}
                        />

                        {filteredHotels.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <p className="font-serif text-xl text-foreground">
                                    No resorts match your criteria
                                </p>
                                <p className="mt-2 text-muted-foreground">
                                    Try adjusting your filters to see more results
                                </p>
                                <button
                                    onClick={() =>
                                        setFilters({
                                            priceRange: [0, 1000],
                                            roomTypes: [],
                                            amenities: [],
                                            waterTemp: [30, 45],
                                        })
                                    }
                                    className="mt-6 text-sm text-foreground underline hover:no-underline"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        ) : (
                            <div className="space-y-16">
                                {filteredHotels.map((hotel, index) => (
                                    <motion.article
                                        key={hotel.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="grid gap-8 md:grid-cols-2 md:gap-10"
                                    >
                                        <Link
                                            href={`/hotels/${hotel.id}`}
                                            className="group relative aspect-[4/3] overflow-hidden"
                                        >
                                            <img
                                                src={(hotel.heroImage as any).src || hotel.heroImage}
                                                alt={hotel.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </Link>

                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="label-subtle">{hotel.tagline}</span>
                                                <StarRating rating={hotel.starRating} />
                                            </div>
                                            <Link href={`/hotels/${hotel.id}`}>
                                                <h2 className="font-serif text-2xl text-foreground hover:text-muted-foreground transition-colors md:text-3xl">
                                                    {hotel.name}
                                                </h2>
                                            </Link>
                                            <p className="mt-2 text-muted-foreground">{hotel.location}</p>

                                            <p className="editorial-text mt-6 line-clamp-3">
                                                {hotel.experience.substring(0, 200)}...
                                            </p>

                                            <div className="mt-8 flex items-center gap-8">
                                                <div>
                                                    <span className="font-serif text-xl text-foreground">{hotel.thermalTemp}</span>
                                                    <p className="text-xs text-muted-foreground">Water Temp</p>
                                                </div>
                                                <div className="h-8 w-px bg-border" />
                                                <div>
                                                    <span className="font-serif text-xl text-foreground">{hotel.rooms.length}</span>
                                                    <p className="text-xs text-muted-foreground">Room Types</p>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/hotels/${hotel.id}`}
                                                className="btn-outline-premium mt-8 self-start"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
