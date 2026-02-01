"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Check, Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import GuestInfoForm, { GuestInfo } from "@/components/hotel/GuestInfoForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { getHotelById } from "@/data/destinations";
import { useToast } from "@/hooks/use-toast";

interface Extra {
    id: string;
    name: string;
    description: string;
    price: number;
    category: "transfer" | "wellness" | "experience" | "gift";
}

const extras: Extra[] = [
    // Transfer
    { id: "airport-transfer", name: "Airport Transfer", description: "Private luxury vehicle transfer from/to airport", price: 150, category: "transfer" },
    { id: "vip-transfer", name: "VIP Limousine", description: "Premium limousine service with champagne", price: 350, category: "transfer" },
    // Wellness
    { id: "massage-60", name: "Relaxation Massage (60 min)", description: "Full body therapeutic massage", price: 120, category: "wellness" },
    { id: "massage-90", name: "Deep Tissue Massage (90 min)", description: "Intensive muscle relief therapy", price: 180, category: "wellness" },
    { id: "thermal-cure", name: "Thermal Cure Package", description: "5-day medical wellness program with thermal treatments", price: 890, category: "wellness" },
    { id: "facial", name: "Thermal Facial Treatment", description: "Rejuvenating facial with thermal mineral water", price: 95, category: "wellness" },
    // Experience
    { id: "wine-tour", name: "Local Wine Tasting Tour", description: "Half-day tour to local vineyards with sommelier", price: 220, category: "experience" },
    { id: "cooking-class", name: "Traditional Cooking Class", description: "Learn local cuisine with our master chef", price: 150, category: "experience" },
    { id: "health-insurance", name: "Travel Health Insurance", description: "Comprehensive travel and health coverage", price: 45, category: "experience" },
    // Gift
    { id: "welcome-basket", name: "Welcome Gift Basket", description: "Premium local products, wine, and artisanal treats", price: 85, category: "gift" },
    { id: "spa-kit", name: "Luxury Spa Kit", description: "Organic towels, robes, and thermal skincare products", price: 145, category: "gift" },
    { id: "romantic-setup", name: "Romantic Room Setup", description: "Rose petals, champagne, and candlelight arrangement", price: 120, category: "gift" },
];

const categoryLabels = {
    transfer: "Transfer Services",
    wellness: "Wellness & Spa",
    experience: "Experiences",
    gift: "Gift Packages",
};

export default function BookingPage() {
    const params = useParams();
    const hotelId = params.id as string;
    const router = useRouter();
    const { toast } = useToast();
    const hotel = getHotelById(hotelId || "");

    const [checkIn, setCheckIn] = useState<Date>();
    const [checkOut, setCheckOut] = useState<Date>();
    const [guests, setGuests] = useState(2);
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [guestInfoList, setGuestInfoList] = useState<GuestInfo[]>([
        {
            id: typeof window !== "undefined" ? crypto.randomUUID() : "1",
            firstName: "",
            lastName: "",
            passportNumber: "",
            nationality: "",
            dateOfBirth: "",
            healthConditions: "",
            email: "",
            phone: "",
        },
    ]);

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

    // Mock room prices
    const roomPrices: Record<string, number> = {
        "Comfort Room": 280,
        "Classic Room": 250,
        "Superior Room": 320,
        "Deluxe Suite": 450,
        "Spa Suite": 580,
        "Thermal Suite": 520,
        "Spa Room": 380,
        "Villa Residences": 890,
        "Lagoon Suite": 1200,
        "Lava Suite": 1450,
        "Moss Suite": 980,
        "Japanese Room": 420,
        "Premium Suite": 680,
        "Imperial Suite": 1100,
        "Panorama Suite": 620,
        "Park View Room": 340,
        "Royal Apartment": 950,
        "Geothermal Suite": 480,
    };

    const toggleExtra = (extraId: string) => {
        setSelectedExtras((prev) =>
            prev.includes(extraId)
                ? prev.filter((id) => id !== extraId)
                : [...prev, extraId]
        );
    };

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        const nights = calculateNights();
        const roomPrice = selectedRoom ? (roomPrices[selectedRoom] || 300) * nights : 0;
        const extrasTotal = selectedExtras.reduce((sum, extraId) => {
            const extra = extras.find((e) => e.id === extraId);
            return sum + (extra?.price || 0);
        }, 0);
        return roomPrice + extrasTotal;
    };

    const validateGuestInfo = (): boolean => {
        const primaryGuest = guestInfoList[0];
        if (!primaryGuest) return false;

        if (!primaryGuest.firstName.trim() || !primaryGuest.lastName.trim()) {
            toast({
                title: "Guest information required",
                description: "Please enter the primary guest's first and last name",
                variant: "destructive",
            });
            return false;
        }

        if (!primaryGuest.passportNumber.trim()) {
            toast({
                title: "Passport/ID required",
                description: "Please enter the primary guest's passport or ID number",
                variant: "destructive",
            });
            return false;
        }

        if (!primaryGuest.nationality) {
            toast({
                title: "Nationality required",
                description: "Please select the primary guest's nationality",
                variant: "destructive",
            });
            return false;
        }

        if (!primaryGuest.dateOfBirth) {
            toast({
                title: "Date of birth required",
                description: "Please enter the primary guest's date of birth",
                variant: "destructive",
            });
            return false;
        }

        if (!primaryGuest.email.trim() || !primaryGuest.email.includes("@")) {
            toast({
                title: "Valid email required",
                description: "Please enter a valid email address",
                variant: "destructive",
            });
            return false;
        }

        if (!primaryGuest.phone.trim()) {
            toast({
                title: "Phone number required",
                description: "Please enter the primary guest's phone number",
                variant: "destructive",
            });
            return false;
        }

        for (let i = 1; i < guestInfoList.length; i++) {
            const guest = guestInfoList[i];
            if (!guest.firstName.trim() || !guest.lastName.trim()) {
                toast({
                    title: `Guest ${i + 1} information incomplete`,
                    description: "Please enter first and last name for all guests",
                    variant: "destructive",
                });
                return false;
            }
            if (!guest.passportNumber.trim() || !guest.nationality || !guest.dateOfBirth) {
                toast({
                    title: `Guest ${i + 1} information incomplete`,
                    description: "Please complete passport, nationality, and date of birth for all guests",
                    variant: "destructive",
                });
                return false;
            }
        }

        return true;
    };

    const nights = calculateNights();
    const total = calculateTotal();

    const handleBookNow = () => {
        if (!checkIn || !checkOut || !selectedRoom) {
            toast({
                title: "Please complete your selection",
                description: "Select dates and a room to continue",
                variant: "destructive",
            });
            return;
        }

        if (!validateGuestInfo()) {
            return;
        }

        const bookingDetails = {
            hotelId: hotel.id,
            hotelName: hotel.name,
            location: hotel.location,
            checkIn: format(checkIn, "MMM d, yyyy"),
            checkOut: format(checkOut, "MMM d, yyyy"),
            nights,
            guests,
            room: selectedRoom,
            roomPrice: (roomPrices[selectedRoom] || 300) * nights,
            extras: selectedExtras.map((id) => {
                const extra = extras.find((e) => e.id === id);
                return { name: extra?.name || "", price: extra?.price || 0 };
            }),
            total,
            guestInfo: guestInfoList.map((g) => ({
                firstName: g.firstName.trim(),
                lastName: g.lastName.trim(),
                passportNumber: g.passportNumber.trim(),
                nationality: g.nationality,
                dateOfBirth: g.dateOfBirth,
                healthConditions: g.healthConditions.trim(),
                email: g.email.trim(),
                phone: g.phone.trim(),
            })),
        };

        // Note: Next.js router doesn't support state like react-router,
        // we might need to use a context, local storage, or URL params (less ideal for sensitive/large data).
        // For now, I'll use localStorage to pass the data, or I'll implement a query param with encoded data.
        if (typeof window !== "undefined") {
            localStorage.setItem("pendingBooking", JSON.stringify(bookingDetails));
        }
        router.push(`/payment`);
    };

    const handleInquiry = () => {
        toast({
            title: "Inquiry Sent",
            description: "Our concierge team will contact you within 24 hours to assist with your booking.",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header alwaysSolid />

            <main className="pb-32 pt-24 md:pt-32">
                <div className="content-container">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href={`/hotels/${hotel.id}`}
                            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to {hotel.name}
                        </Link>
                    </motion.div>

                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="label-subtle mb-4 block">Reservation</span>
                                <h1 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
                                    Book Your Stay at {hotel.name}
                                </h1>
                                <p className="mt-4 text-muted-foreground">{hotel.location}</p>
                            </motion.div>

                            {/* Date & Guests Selection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mt-12 rounded-xl border border-border bg-card p-6"
                            >
                                <h2 className="mb-6 font-serif text-xl text-foreground">Select Dates & Guests</h2>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            Check-In
                                        </label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "h-12 w-full justify-start rounded-lg border-border bg-background text-left font-normal",
                                                        !checkIn && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {checkIn ? format(checkIn, "MMM d, yyyy") : "Select date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={checkIn}
                                                    onSelect={setCheckIn}
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            Check-Out
                                        </label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "h-12 w-full justify-start rounded-lg border-border bg-background text-left font-normal",
                                                        !checkOut && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {checkOut ? format(checkOut, "MMM d, yyyy") : "Select date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={checkOut}
                                                    onSelect={setCheckOut}
                                                    disabled={(date) => date < (checkIn || new Date())}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            Guests
                                        </label>
                                        <div className="flex h-12 items-center justify-between rounded-lg border border-border bg-background px-4">
                                            <button
                                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                                className="rounded-full p-1 hover:bg-secondary"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{guests}</span>
                                            </div>
                                            <button
                                                onClick={() => setGuests(Math.min(6, guests + 1))}
                                                className="rounded-full p-1 hover:bg-secondary"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Room Selection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-8"
                            >
                                <h2 className="mb-6 font-serif text-xl text-foreground">Select Your Room</h2>
                                <div className="space-y-4">
                                    {hotel.rooms.map((room) => {
                                        const price = roomPrices[room.name] || 300;
                                        const isSelected = selectedRoom === room.name;
                                        return (
                                            <button
                                                key={room.name}
                                                onClick={() => setSelectedRoom(room.name)}
                                                className={cn(
                                                    "w-full rounded-xl border p-6 text-left transition-all",
                                                    isSelected
                                                        ? "border-foreground bg-secondary"
                                                        : "border-border bg-card hover:border-foreground/30"
                                                )}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-serif text-lg text-foreground">{room.name}</h3>
                                                        <p className="mt-1 text-sm text-muted-foreground">{room.description}</p>
                                                    </div>
                                                    <div className="ml-4 text-right">
                                                        <span className="font-serif text-xl text-foreground">€{price}</span>
                                                        <span className="text-sm text-muted-foreground"> / night</span>
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
                                                        <Check className="h-4 w-4" />
                                                        Selected
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Guest Information Form */}
                            <GuestInfoForm
                                guests={guestInfoList}
                                onGuestsChange={setGuestInfoList}
                                maxGuests={guests}
                            />

                            {/* Extras */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mt-12"
                            >
                                <h2 className="mb-2 font-serif text-xl text-foreground">Enhance Your Stay</h2>
                                <p className="mb-8 text-sm text-muted-foreground">
                                    Add special services and experiences to make your journey unforgettable
                                </p>

                                {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => {
                                    const categoryExtras = extras.filter((e) => e.category === category);
                                    return (
                                        <div key={category} className="mb-8">
                                            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                                {categoryLabels[category]}
                                            </h3>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {categoryExtras.map((extra) => {
                                                    const isSelected = selectedExtras.includes(extra.id);
                                                    return (
                                                        <button
                                                            key={extra.id}
                                                            onClick={() => toggleExtra(extra.id)}
                                                            className={cn(
                                                                "rounded-lg border p-4 text-left transition-all",
                                                                isSelected
                                                                    ? "border-foreground bg-secondary"
                                                                    : "border-border bg-card hover:border-foreground/30"
                                                            )}
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1 pr-4">
                                                                    <h4 className="text-sm font-medium text-foreground">{extra.name}</h4>
                                                                    <p className="mt-1 text-xs text-muted-foreground">{extra.description}</p>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <span className="font-medium text-foreground">€{extra.price}</span>
                                                                    {isSelected && <Check className="h-4 w-4 text-foreground" />}
                                                                </div>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="sticky top-24 rounded-xl border border-border bg-card p-6"
                            >
                                <h3 className="mb-6 font-serif text-xl text-foreground">Your Reservation</h3>

                                <div className="mb-6 flex gap-4">
                                    <img
                                        src={(hotel.heroImage as any).src || hotel.heroImage}
                                        alt={hotel.name}
                                        className="h-20 w-20 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h4 className="font-serif text-foreground">{hotel.name}</h4>
                                        <p className="text-sm text-muted-foreground">{hotel.location}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t border-border pt-6">
                                    {checkIn && checkOut && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {format(checkIn, "MMM d")} — {format(checkOut, "MMM d, yyyy")}
                                            </span>
                                            <span className="text-foreground">{nights} nights</span>
                                        </div>
                                    )}

                                    {selectedRoom && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{selectedRoom}</span>
                                            <span className="text-foreground">
                                                €{(roomPrices[selectedRoom] || 300) * nights}
                                            </span>
                                        </div>
                                    )}

                                    {selectedExtras.length > 0 && (
                                        <div className="border-t border-border pt-4">
                                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Extras
                                            </span>
                                            {selectedExtras.map((extraId) => {
                                                const extra = extras.find((e) => e.id === extraId);
                                                if (!extra) return null;
                                                return (
                                                    <div key={extraId} className="mt-2 flex justify-between text-sm">
                                                        <span className="text-muted-foreground">{extra.name}</span>
                                                        <span className="text-foreground">€{extra.price}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 border-t border-border pt-6">
                                    <div className="flex justify-between">
                                        <span className="font-serif text-lg text-foreground">Total</span>
                                        <span className="font-serif text-2xl text-foreground">€{total}</span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Taxes and fees included</p>
                                </div>

                                <div className="mt-6 flex flex-col gap-3">
                                    <Button
                                        onClick={handleBookNow}
                                        className="btn-premium w-full"
                                        disabled={!checkIn || !checkOut || !selectedRoom}
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        onClick={handleInquiry}
                                        variant="outline"
                                        className="w-full rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background"
                                    >
                                        Send Inquiry
                                    </Button>
                                </div>

                                <p className="mt-4 text-center text-xs text-muted-foreground">
                                    Book now for instant confirmation, or send an inquiry for custom requests.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
