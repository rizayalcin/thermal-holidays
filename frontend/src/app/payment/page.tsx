"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Check, Lock } from "lucide-react";
import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getHotelById } from "@/data/destinations";

type PaymentMethod = "card" | "google-pay" | "apple-pay";

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

export default function PaymentPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

    // Card form state
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("pendingBooking");
            if (stored) {
                setBookingDetails(JSON.parse(stored));
            }
        }
    }, []);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(" ") : value;
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return v.substring(0, 2) + "/" + v.substring(2, 4);
        }
        return v;
    };

    const handlePayment = async () => {
        if (!bookingDetails) return;
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const confirmationNumber = `TH${Date.now().toString().slice(-8)}`;
        if (typeof window !== "undefined") {
            localStorage.setItem("lastBooking", JSON.stringify({
                bookingDetails,
                paymentMethod,
                confirmationNumber,
            }));
        }

        router.push(`/payment/success`);
    };

    if (!bookingDetails) {
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

    const paymentMethods = [
        { id: "card" as const, name: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
        { id: "google-pay" as const, name: "Google Pay", icon: Smartphone, description: "Quick checkout" },
        { id: "apple-pay" as const, name: "Apple Pay", icon: Smartphone, description: "Quick checkout" },
    ];

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
                            href={`/booking/${bookingDetails.hotelId}`}
                            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Booking
                        </Link>
                    </motion.div>

                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="label-subtle mb-4 block">Secure Payment</span>
                                <h1 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
                                    Complete Your Payment
                                </h1>
                                <p className="mt-4 text-muted-foreground">
                                    Your payment is protected with bank-level encryption
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mt-12"
                            >
                                <h2 className="mb-6 font-serif text-xl text-foreground">Select Payment Method</h2>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;
                                        const isSelected = paymentMethod === method.id;
                                        return (
                                            <button
                                                key={method.id}
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`rounded-xl border p-6 text-left transition-all ${isSelected
                                                        ? "border-foreground bg-secondary"
                                                        : "border-border bg-card hover:border-foreground/30"
                                                    }`}
                                            >
                                                <Icon className={`h-8 w-8 ${isSelected ? "text-foreground" : "text-muted-foreground"}`} />
                                                <h3 className="mt-4 font-medium text-foreground">{method.name}</h3>
                                                <p className="mt-1 text-xs text-muted-foreground">{method.description}</p>
                                                {isSelected && (
                                                    <div className="mt-3 flex items-center gap-1 text-sm text-foreground">
                                                        <Check className="h-4 w-4" />
                                                        Selected
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {paymentMethod === "card" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="mt-8 rounded-xl border border-border bg-card p-6"
                                >
                                    <h2 className="mb-6 font-serif text-xl text-foreground">Card Details</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Cardholder Name
                                            </label>
                                            <Input
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                placeholder="John Doe"
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Card Number
                                            </label>
                                            <Input
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className="h-12"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                    Expiry Date
                                                </label>
                                                <Input
                                                    value={expiryDate}
                                                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                    CVV
                                                </label>
                                                <Input
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                                    placeholder="123"
                                                    maxLength={4}
                                                    type="password"
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {(paymentMethod === "google-pay" || paymentMethod === "apple-pay") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="mt-8 rounded-xl border border-border bg-card p-8 text-center"
                                >
                                    <Smartphone className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h2 className="mt-4 font-serif text-xl text-foreground">
                                        {paymentMethod === "google-pay" ? "Google Pay" : "Apple Pay"}
                                    </h2>
                                    <p className="mt-2 text-muted-foreground">
                                        Click "Pay Now" to complete your payment using {paymentMethod === "google-pay" ? "Google Pay" : "Apple Pay"}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="sticky top-24 rounded-xl border border-border bg-card p-6"
                            >
                                <h3 className="mb-6 font-serif text-xl text-foreground">Order Summary</h3>

                                <div className="mb-6">
                                    <h4 className="font-serif text-foreground">{bookingDetails.hotelName}</h4>
                                    <p className="text-sm text-muted-foreground">{bookingDetails.location}</p>
                                </div>

                                <div className="space-y-3 border-t border-border pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Dates</span>
                                        <span className="text-foreground">
                                            {bookingDetails.checkIn} — {bookingDetails.checkOut}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="text-foreground">{bookingDetails.nights} nights</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{bookingDetails.room}</span>
                                        <span className="text-foreground">€{bookingDetails.roomPrice}</span>
                                    </div>
                                </div>

                                {bookingDetails.extras.length > 0 && (
                                    <div className="mt-4 border-t border-border pt-4">
                                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            Extras
                                        </span>
                                        {bookingDetails.extras.map((extra, index) => (
                                            <div key={index} className="mt-2 flex justify-between text-sm">
                                                <span className="text-muted-foreground">{extra.name}</span>
                                                <span className="text-foreground">€{extra.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 border-t border-border pt-6">
                                    <div className="flex justify-between">
                                        <span className="font-serif text-lg text-foreground">Total</span>
                                        <span className="font-serif text-2xl text-foreground">€{bookingDetails.total}</span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Taxes and fees included</p>
                                </div>

                                <Button
                                    onClick={handlePayment}
                                    className="btn-premium mt-6 w-full"
                                    disabled={isProcessing || (paymentMethod === "card" && (!cardNumber || !cardName || !expiryDate || !cvv))}
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                                            />
                                            Processing...
                                        </span>
                                    ) : (
                                        `Pay €${bookingDetails.total}`
                                    )}
                                </Button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <Lock className="h-3 w-3" />
                                    Secured with 256-bit SSL encryption
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
