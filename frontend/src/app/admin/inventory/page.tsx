"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Calendar as CalendarIcon,
    Save,
    ChevronLeft,
    ChevronRight,
    Settings,
    Droplets,
    AlertCircle
} from "lucide-react";
import { format, addDays, startOfToday } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for the demo
const mockHotels = [
    {
        id: "1",
        name: "Terme di Saturnia",
        rooms: [
            { id: "r1", name: "Deluxe Thermal Suite", stock: 5, price: 450 },
            { id: "r2", name: "Superior Garden Room", stock: 8, price: 320 }
        ]
    },
    {
        id: "2",
        name: "Széchenyi Thermal Bath",
        rooms: [
            { id: "r3", name: "Thermal Suite", stock: 12, price: 210 }
        ]
    }
];

export default function AdminInventoryPage() {
    const [selectedHotelId, setSelectedHotelId] = useState(mockHotels[0].id);
    const [startDate, setStartDate] = useState(startOfToday());

    const hotel = mockHotels.find(h => h.id === selectedHotelId);
    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border">
                <div className="space-y-1">
                    <h2 className="text-2xl font-serif font-light tracking-tight text-slate-900 focus:outline-none">Inventory & Pricing</h2>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Rate & Availability Management</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select value={selectedHotelId} onValueChange={setSelectedHotelId}>
                        <SelectTrigger className="w-full md:w-[280px] h-11 bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Select Hotel" />
                        </SelectTrigger>
                        <SelectContent>
                            {mockHotels.map((h) => (
                                <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button className="h-11 px-6 gap-2 bg-primary hover:bg-primary/90">
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">Save All Changes</span>
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 text-white p-6">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-serif">Availability Grid</CardTitle>
                            <CardDescription className="text-slate-400">Manage daily stock and base pricing per room type</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 p-1 rounded-lg">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={() => setStartDate(addDays(startDate, -7))}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-medium px-2">
                                {format(startDate, "MMM d")} - {format(days[6], "MMM d, yyyy")}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={() => setStartDate(addDays(startDate, 7))}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/80 border-b">
                                <th className="p-4 text-left font-semibold text-slate-700 w-1/4 sticky left-0 z-20 bg-slate-50 border-r">Room Type / Date</th>
                                {days.map((day) => (
                                    <th key={day.toISOString()} className="p-4 text-center border-l first:border-l-0">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                                                {format(day, "EEE")}
                                            </span>
                                            <span className="text-lg font-serif font-light text-slate-900">
                                                {format(day, "d")}
                                            </span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                                                {format(day, "MMM")}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hotel?.rooms.map((room) => (
                                <tr key={room.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 bg-white sticky left-0 z-10 border-r shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{room.name}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-tight font-medium mt-0.5">Base: ${room.price}</span>
                                            <div className="flex gap-2 mt-3">
                                                <Button variant="outline" size="icon" className="h-7 w-7 rounded-md">
                                                    <Settings className="h-3.5 w-3.5 text-slate-500" />
                                                </Button>
                                                <Button variant="outline" size="icon" className="h-7 w-7 rounded-md border-primary/20 bg-primary/5">
                                                    <Droplets className="h-3.5 w-3.5 text-primary" />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                    {days.map((day) => (
                                        <td key={day.toISOString()} className="p-4 min-w-[140px] border-l first:border-l-0">
                                            <div className="space-y-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-500 px-1">
                                                        <span>Rooms</span>
                                                        <span className="text-emerald-600 font-black">Open</span>
                                                    </div>
                                                    <Input
                                                        type="number"
                                                        defaultValue={room.stock}
                                                        className="h-9 text-center font-mono focus:ring-1 focus:ring-primary border-slate-200 bg-white"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-500 px-1">
                                                        <span>Price</span>
                                                        <span className="text-slate-400">USD</span>
                                                    </div>
                                                    <div className="relative">
                                                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">$</span>
                                                        <Input
                                                            type="text"
                                                            defaultValue={room.price}
                                                            className="h-9 pl-6 text-center font-mono font-bold focus:ring-1 focus:ring-primary border-slate-200 bg-white text-slate-900"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100/50">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900/80 leading-relaxed">
                    <strong className="text-amber-900 font-semibold">Inventory Tip:</strong> Changes made here reflect immediately in the public booking engine. Use the <Settings className="h-3 w-3 inline mb-0.5" /> Room Settings for advanced stay rules like Minimum Stay or Blackout Dates.
                </div>
            </div>
        </div>
    );
}
