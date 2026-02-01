"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Save,
    Trash2,
    Plus,
    Droplets,
    Wind,
    Image as ImageIcon,
    Bed,
    Settings,
    Info,
    CheckCircle2,
    X,
    Edit2
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

export default function AdminHotelEditor() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-serif font-light">New Thermal Resort</h2>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Create a comprehensive property profile</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Hotel
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full h-auto p-1 bg-slate-100 rounded-xl">
                    <TabsTrigger value="general" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Settings className="h-4 w-4 mr-2" /> General
                    </TabsTrigger>
                    <TabsTrigger value="content" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Info className="h-4 w-4 mr-2" /> Content
                    </TabsTrigger>
                    <TabsTrigger value="thermal" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Droplets className="h-4 w-4 mr-2" /> Thermal
                    </TabsTrigger>
                    <TabsTrigger value="media" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <ImageIcon className="h-4 w-4 mr-2" /> Media
                    </TabsTrigger>
                    <TabsTrigger value="rooms" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Bed className="h-4 w-4 mr-2" /> Rooms
                    </TabsTrigger>
                </TabsList>

                <div className="mt-8">
                    <TabsContent value="general" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Resort Name</Label>
                                        <Input id="name" placeholder="e.g. Terme di Saturnia" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Auto-URL Slug</Label>
                                        <Input id="slug" placeholder="terme-di-saturnia" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="rating">Star Rating</Label>
                                            <Input id="rating" type="number" min="1" max="5" defaultValue="5" />
                                        </div>
                                        <div className="flex items-center justify-between mt-8 p-3 bg-slate-50 rounded-lg">
                                            <Label className="text-sm font-medium">Thermal Verified</Label>
                                            <Switch />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle>Location & Destinations</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="loc">Display Location</Label>
                                        <Input id="loc" placeholder="e.g. Tuscany, Italy" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Linked Destinations (Multi-select)</Label>
                                        <div className="flex flex-wrap gap-2 p-3 border rounded-lg min-h-[100px] bg-slate-50/50">
                                            <Badge variant="secondary" className="gap-1 px-3 py-1">
                                                Europe <X className="h-3 w-3 cursor-pointer" />
                                            </Badge>
                                            <Badge variant="secondary" className="gap-1 px-3 py-1">
                                                Italy <X className="h-3 w-3 cursor-pointer" />
                                            </Badge>
                                            <Button variant="ghost" size="sm" className="h-7 text-xs border border-dashed">
                                                <Plus className="h-3 w-3 mr-1" /> Add Destination
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="content" className="space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Marketing & Experience</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Short Tagline</Label>
                                    <Input placeholder="e.g. Where ancient waters meet timeless tranquility" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Full Experience Hook</Label>
                                    <Textarea className="min-h-[200px]" placeholder="The long story of the resort..." />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Spa & Wellness Overview</Label>
                                        <Textarea placeholder="Describe the spa atmosphere..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Medical Wellness (Optional)</Label>
                                        <Textarea placeholder="Describe physician-led programs..." />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="thermal" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="border-none shadow-sm md:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Droplets className="h-4 w-4" /> Water Analysis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Temp (°C)</Label>
                                        <Input defaultValue="37.5" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Flow Rate</Label>
                                        <Input defaultValue="800L/min" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Water pH</Label>
                                        <Input defaultValue="7.2" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm md:col-span-2">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Minerals & Minerals Benefits</CardTitle>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" /> Add Row
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b text-slate-500 font-medium">
                                                <th className="text-left pb-2">Mineral Name</th>
                                                <th className="text-left pb-2">Amount</th>
                                                <th className="text-left pb-2">Benefit</th>
                                                <th className="w-8 pb-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {[1, 2, 3].map(i => (
                                                <tr key={i}>
                                                    <td className="py-3 pr-2"><Input className="h-8" defaultValue="Calcium" /></td>
                                                    <td className="py-3 pr-2"><Input className="h-8 w-24" defaultValue="180 mg/L" /></td>
                                                    <td className="py-3 pr-2"><Input className="h-8" defaultValue="Bone health" /></td>
                                                    <td className="py-3"><Trash2 className="h-4 w-4 text-slate-300 hover:text-red-500 cursor-pointer" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="media" className="space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Image Gallery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { type: 'HERO', label: 'Main Hero' },
                                        { type: 'POOL', label: 'Thermal Pool' },
                                        { type: 'SPA', label: 'Spa Interior' },
                                        { type: 'ROOM', label: 'Sample Room' }
                                    ].map(img => (
                                        <div key={img.type} className="group relative aspect-video rounded-lg bg-slate-100 overflow-hidden border-2 border-dashed flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                                            <ImageIcon className="h-8 w-8 mb-2" />
                                            <span className="text-xs font-semibold">{img.label}</span>
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                                <Button size="sm">Upload</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rooms" className="space-y-6">
                        <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-lg">
                                    <Bed className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium font-serif">Room Management</h3>
                                    <p className="text-slate-400 text-sm">Define accommodation types for this property</p>
                                </div>
                            </div>
                            <Button className="bg-white text-slate-900 hover:bg-slate-100 transition-colors">
                                <Plus className="h-4 w-4 mr-2" /> New Room Type
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map(i => (
                                <Card key={i} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-2 bg-primary w-0 group-hover:w-full transition-all duration-500" />
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">Deluxe Thermal Suite</CardTitle>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3 w-3" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-3 w-3" /></Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-slate-600">Spacious 45sqm suite with private thermal water balcony and garden views.</p>
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-primary" /> Max 3 Guests</span>
                                            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-primary" /> From $450/nt</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
