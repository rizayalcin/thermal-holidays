"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Printer, Mail, Calendar, MapPin, Users, Clock, Sparkles } from "lucide-react";
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

export default function VoucherPage() {
    const params = useParams();
    const hotelId = params.id as string;
    const { toast } = useToast();
    const voucherRef = useRef<HTMLDivElement>(null);
    const hotel = getHotelById(hotelId || "");
    const [bookingData, setBookingData] = useState<{
        bookingDetails: BookingDetails;
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

    if (!hotel || !bookingData) {
        return (
            <div className="min-h-screen bg-background">
                <Header alwaysSolid />
                <main className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-3xl">Voucher not found</h1>
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

    const handlePrint = () => {
        window.print();
    };

    const handleEmailPDF = () => {
        toast({
            title: "PDF Sent",
            description: "Your voucher PDF has been sent to your email address.",
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
                        className="print:hidden"
                    >
                        <Link
                            href={`/payment/success`}
                            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Confirmation
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-end gap-4 print:hidden"
                    >
                        <Button
                            onClick={handlePrint}
                            variant="outline"
                            className="rounded-full border-foreground"
                        >
                            <Printer className="mr-2 h-4 w-4" />
                            Print Voucher
                        </Button>
                        <Button
                            onClick={handleEmailPDF}
                            className="btn-premium rounded-full"
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Email as PDF
                        </Button>
                    </motion.div>

                    <motion.div
                        ref={voucherRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl print:shadow-none print:border-0"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={(hotel.heroImage as any).src || hotel.heroImage}
                                alt={hotel.name}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

                            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 backdrop-blur-sm">
                                <Sparkles className="h-4 w-4 text-amber-600" />
                                <span className="text-xs font-medium uppercase tracking-wider text-foreground">
                                    Premium Booking
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h1 className="font-serif text-3xl text-primary-foreground md:text-4xl">
                                    {hotel.name}
                                </h1>
                                <p className="mt-2 text-primary-foreground/80">{hotel.location}</p>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="mb-8 rounded-xl bg-secondary/50 p-6 text-center">
                                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                    Booking Confirmation
                                </span>
                                <h2 className="mt-2 font-mono text-3xl font-bold tracking-widest text-foreground">
                                    {confirmationNumber}
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Please present this voucher at check-in
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <Calendar className="h-5 w-5 text-foreground" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Check-In
                                            </span>
                                            <p className="mt-1 text-lg font-medium text-foreground">{bookingDetails.checkIn}</p>
                                            <p className="text-sm text-muted-foreground">From 15:00</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <Calendar className="h-5 w-5 text-foreground" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Check-Out
                                            </span>
                                            <p className="mt-1 text-lg font-medium text-foreground">{bookingDetails.checkOut}</p>
                                            <p className="text-sm text-muted-foreground">Until 11:00</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <Clock className="h-5 w-5 text-foreground" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Duration
                                            </span>
                                            <p className="mt-1 text-lg font-medium text-foreground">{bookingDetails.nights} Nights</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-secondary p-3">
                                            <Users className="h-5 w-5 text-foreground" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Guests
                                            </span>
                                            <p className="mt-1 text-lg font-medium text-foreground">{bookingDetails.guests} Guests</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-border pt-8">
                                <h3 className="mb-4 font-serif text-xl text-foreground">Accommodation</h3>
                                <div className="rounded-xl border border-border bg-background p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-foreground">{bookingDetails.room}</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {bookingDetails.nights} nights × €{Math.round(bookingDetails.roomPrice / bookingDetails.nights)}/night
                                            </p>
                                        </div>
                                        <span className="font-serif text-xl text-foreground">€{bookingDetails.roomPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {bookingDetails.extras.length > 0 && (
                                <div className="mt-8 border-t border-border pt-8">
                                    <h3 className="mb-4 font-serif text-xl text-foreground">Additional Services</h3>
                                    <div className="space-y-3">
                                        {bookingDetails.extras.map((extra, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                                            >
                                                <span className="text-foreground">{extra.name}</span>
                                                <span className="font-medium text-foreground">€{extra.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 rounded-xl bg-foreground p-6 text-center">
                                <span className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
                                    Total Amount Paid
                                </span>
                                <p className="mt-2 font-serif text-4xl font-medium text-primary-foreground">
                                    €{bookingDetails.total}
                                </p>
                                <p className="mt-2 text-sm text-primary-foreground/70">
                                    All taxes and fees included
                                </p>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-muted-foreground">
                                    For any questions or special requests, please contact us at
                                </p>
                                <p className="mt-2 font-medium text-foreground">
                                    concierge@thermalholidays.com | +36 1 234 5678
                                </p>
                            </div>

                            <div className="mt-8 border-t border-border pt-8 text-center">
                                <p className="font-serif text-lg italic text-muted-foreground">
                                    "We look forward to welcoming you"
                                </p>
                                <p className="mt-4 text-xs text-muted-foreground">
                                    Thermal Holidays — Your Escape, Our Waters
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />

            <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden, header, footer {
            display: none !important;
          }
          main, main * {
            visibility: visible;
          }
          main {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
          }
        }
      `}</style>
        </div>
    );
}
