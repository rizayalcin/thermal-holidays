"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Filter, Search } from "lucide-react";

const reports = [
    { id: "1", ref: "TH-8271", date: "2024-05-15", customer: "Alice Johnson", amount: "$1,250.00", status: "Success", method: "Credit Card" },
    { id: "2", ref: "TH-8272", date: "2024-05-16", customer: "Bob Smith", amount: "$850.00", status: "Success", method: "Google Pay" },
    { id: "3", ref: "TH-8273", date: "2024-05-16", customer: "Charlie Brown", amount: "$2,100.00", status: "Pending", method: "Apple Pay" },
    { id: "4", ref: "TH-8274", date: "2024-05-17", customer: "Diana Prince", amount: "$500.00", status: "Success", method: "Credit Card" },
];

export default function AdminReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Input placeholder="Reference, Customer..." className="w-[300px]" />
                    <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Last 30 Days
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="gap-2">
                        <Filter className="h-4 w-4" />
                        More Filters
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reference</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="font-mono text-sm">{row.ref}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.customer}</TableCell>
                                    <TableCell>{row.method}</TableCell>
                                    <TableCell className="font-semibold">{row.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={row.status === "Success" ? "default" : "secondary"}>
                                            {row.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
