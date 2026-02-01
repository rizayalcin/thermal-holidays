"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Mail, FileText, Calendar, MapPin, Users } from "lucide-react";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import { Button } from "@/components/ui/button";
import { getHotelById } from "@/data/destinations";
import { useToast } from "@/hooks/use-toast";

interface BookingDetails {
    hotelId: string;
    hotelName: string;
    location: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    room: string;
    roomPrice: number;
    extras: Array<{ name: string; price: number }>;
    total: number;
}

export default function PaymentSuccessPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [bookingData, setBookingData] = useState<{
        bookingDetails: BookingDetails;
        paymentMethod: string;
        confirmationNumber: string;
    } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("lastBooking");
            if (stored) {
                setBookingData(JSON.parse(stored));
            }
        }
    }, []);

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-background">
                <Header alwaysSolid />
                <main className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-3xl">Booking details not found</h1>
                        <Link href="/destinations" className="mt-4 inline-block text-muted-foreground hover:text-foreground">
                            Browse destinations
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const { bookingDetails, confirmationNumber } = bookingData;

    const handleSendEmail = () => {
        toast({
            title: "Voucher Sent",
            description: "Your booking voucher has been sent to your email address.",
        });
    };

    const handleShowVoucher = () => {
        router.push(`/voucher/${bookingDetails.hotelId}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header alwaysSolid />

            <main className="pb-32 pt-24 md:pt-32">
                <div className="content-container">
                    <div className="mx-auto max-w-2xl">
                        {/* Success Animation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", duration: 0.5 }}
                            >
                                <Check className="h-12 w-12 text-green-600" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center"
                        >
                            <h1 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
                                Payment Successful!
                            </h1>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Thank you for your reservation. Your booking has been confirmed.
                            </p>
                        </motion.div>

                        {/* Confirmation Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-12 rounded-xl border border-border bg-card p-8"
                        >
                            <div className="mb-6 text-center">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Confirmation Number
                                </span>
                                <h2 className="mt-2 font-mono text-2xl font-bold tracking-wider text-foreground">
                                    {confirmationNumber}
                                </h2>
                            </div>

                            <div className="border-t border-border pt-6">
                                <h3 className="mb-4 font-serif text-xl text-foreground">{bookingDetails.hotelName}</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm text-muted-foreground">Location</span>
                                            <p className="text-foreground">{bookingDetails.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm text-muted-foreground">Dates</span>
                                            <p className="text-foreground">
                                                {bookingDetails.checkIn} — {bookingDetails.checkOut} ({bookingDetails.nights} nights)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm text-muted-foreground">Guests & Room</span>
                                            <p className="text-foreground">
                                                {bookingDetails.guests} guests • {bookingDetails.room}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between border-t border-border pt-6">
                                    <span className="font-serif text-lg text-foreground">Total Paid</span>
                                    <span className="font-serif text-2xl font-medium text-foreground">€{bookingDetails.total}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 flex flex-col gap-4 sm:flex-row"
                        >
                            <Button
                                onClick={handleSendEmail}
                                variant="outline"
                                className="flex-1 h-14 rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background"
                            >
                                <Mail className="mr-2 h-5 w-5" />
                                Send Voucher to Email
                            </Button>
                            <Button
                                onClick={handleShowVoucher}
                                className="btn-premium flex-1 h-14"
                            >
                                <FileText className="mr-2 h-5 w-5" />
                                View Voucher
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-12 rounded-xl bg-secondary/50 p-6"
                        >
                            <h4 className="font-medium text-foreground">What happens next?</h4>
                            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <Check className="mt-0.5 h-4 w-4 text-green-600" />
                                    You will receive a confirmation email within the next few minutes
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="mt-0.5 h-4 w-4 text-green-600" />
                                    Our concierge team will contact you 48 hours before your arrival
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="mt-0.5 h-4 w-4 text-green-600" />
                                    Present your voucher at check-in (digital or printed)
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-8 text-center"
                        >
                            <Link
                                href="/"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Return to Homepage
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
