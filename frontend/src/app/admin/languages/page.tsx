"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Languages, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialLanguages = [
    { code: "en", name: "English", isDefault: true, isActive: true },
    { code: "tr", name: "Türkçe", isDefault: false, isActive: true },
    { code: "is", name: "Íslenska", isDefault: false, isActive: false },
];

export default function AdminLanguagesPage() {
    return (
        <div className="space-y-6">
            <Tabs defaultValue="languages">
                <TabsList>
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="translations">UI Translations</TabsTrigger>
                </TabsList>

                <TabsContent value="languages" className="mt-6 space-y-6">
                    <div className="flex justify-end">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Language
                        </Button>
                    </div>

                    <div className="rounded-md border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Language</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialLanguages.map((lang) => (
                                    <TableRow key={lang.code}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Languages className="h-4 w-4 text-muted-foreground" />
                                            {lang.name}
                                        </TableCell>
                                        <TableCell>
                                            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs uppercase font-mono">
                                                {lang.code}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            {lang.isDefault ? (
                                                <Badge className="bg-primary text-primary-foreground">Default</Badge>
                                            ) : lang.isActive ? (
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">Active</Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-slate-50 text-slate-500">Inactive</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="translations" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-lg">UI Translation Dictionary</CardTitle>
                            <div className="flex gap-2">
                                <Input placeholder="Search keys..." className="max-w-[200px]" />
                                <Button variant="outline" size="sm">Export CSV</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Key Name</TableHead>
                                        <TableHead>English (Base)</TableHead>
                                        <TableHead>Turkish</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">hero.title</TableCell>
                                        <TableCell>Your Escape, Our Waters</TableCell>
                                        <TableCell>Sizin Kaçışınız, Bizim Sularımız</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">book.now</TableCell>
                                        <TableCell>Book Now</TableCell>
                                        <TableCell>Şimdi Rezerve Et</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
