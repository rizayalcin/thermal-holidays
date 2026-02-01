"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Hotel,
    Droplets,
    Filter,
    BarChart2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockHotels = [
    { id: "terme-di-saturnia", name: "Terme di Saturnia", location: "Tuscany, Italy", starRating: 5 },
    { id: "szechenyi-baths", name: "Széchenyi Thermal Bath", location: "Budapest, Hungary", starRating: 4 },
    { id: "blue-lagoon", name: "Blue Lagoon", location: "Grindavík, Iceland", starRating: 5 },
];

export default function AdminHotelsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHotels = mockHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-serif font-light tracking-tight">Thermal Resorts</h2>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Property Directory & Global Sync</p>
                </div>
                <Link href="/admin/hotels/new">
                    <Button className="gap-2 h-11 px-6 shadow-md transition-all hover:translate-y-[-1px]">
                        <Plus className="h-4 w-4" />
                        Add New Property
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="col-span-1 md:col-span-3 border-none shadow-sm bg-white overflow-hidden">
                    <div className="p-4 border-b bg-slate-50/50 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search resorts by name or location..."
                                className="pl-10 h-10 bg-white border-slate-200 focus-visible:ring-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/30">
                                    <TableHead className="w-[300px] font-bold uppercase text-[10px] tracking-widest">Resort & Location</TableHead>
                                    <TableHead className="font-bold uppercase text-[10px] tracking-widest">Thermal Stats</TableHead>
                                    <TableHead className="font-bold uppercase text-[10px] tracking-widest text-center">Verification</TableHead>
                                    <TableHead className="font-bold uppercase text-[10px] tracking-widest text-right px-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredHotels.map((hotel) => (
                                    <TableRow key={hotel.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                                    <Hotel className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 leading-tight">{hotel.name}</span>
                                                    <span className="text-xs text-slate-400 lowercase tracking-tight italic">{hotel.location}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge variant="outline" className="w-fit text-[10px] font-bold bg-primary/5 border-primary/10 text-primary">
                                                    37.5°C Verified
                                                </Badge>
                                                <span className="text-[10px] text-slate-400 font-mono uppercase">Live Data Available</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border-emerald-500/20 px-3 py-1 text-xs gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Verified
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/hotels/${hotel.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600 hover:text-primary">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                <div className="col-span-1 space-y-6">
                    <Card className="border-none shadow-sm bg-slate-900 text-white overflow-hidden p-6 relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Droplets className="h-24 w-24" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">Property Health</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-slate-400">Inventory Status</span>
                                        <span className="text-primary font-bold">92%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[92%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-slate-400">Content Completion</span>
                                        <span className="text-emerald-400 font-bold">88%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 w-[88%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="p-4 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500 italic leading-relaxed bg-slate-50/30">
                        Tip: A hotel is only "Verified" once thermal property analysis is uploaded and manually confirmed by a medical advisor.
                    </div>
                </div>
            </div>
        </div>
    );
}
