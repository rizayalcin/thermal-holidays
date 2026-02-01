"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, CreditCard, Hotel, TrendingUp } from "lucide-react";

const stats = [
    { label: "Total Revenue", value: "$45,231.89", icon: CreditCard, trend: "+20.1% from last month" },
    { label: "Bookings", value: "245", icon: Users, trend: "+12.5% from last month" },
    { label: "Featured Hotels", value: "12", icon: Hotel, trend: "3 Added this week" },
    { label: "Global Presence", value: "8 Countries", icon: TrendingUp, trend: "+1 new this month" },
];

const data = [
    { name: "Jan", total: 4500 },
    { name: "Feb", total: 5200 },
    { name: "Mar", total: 4800 },
    { name: "Apr", total: 6100 },
    { name: "May", total: 5900 },
    { name: "Jun", total: 7200 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.trend}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="total"
                                    fill="currentColor"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-primary"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
