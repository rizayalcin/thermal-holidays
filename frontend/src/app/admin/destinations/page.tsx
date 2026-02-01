"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Plus,
    MapPin,
    ChevronRight,
    ChevronDown,
    GripVertical,
    Edit2,
    Trash2,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationNode {
    id: string;
    name: string;
    country?: string;
    children?: DestinationNode[];
    isExpanded?: boolean;
}

const initialDestinations: DestinationNode[] = [
    {
        id: "europe",
        name: "Europe",
        children: [
            {
                id: "italy",
                name: "Italy",
                country: "Tuscany",
                children: [
                    { id: "tuscany", name: "Tuscany" }
                ]
            },
            { id: "hungary", name: "Hungary", country: "Budapest" },
            { id: "iceland", name: "Iceland" },
        ]
    },
    {
        id: "asia",
        name: "Asia",
        children: [
            { id: "japan", name: "Japan" }
        ]
    }
];

export default function AdminDestinationsPage() {
    const [data, setData] = useState<DestinationNode[]>(initialDestinations);

    const toggleExpand = (id: string) => {
        const updateNodes = (nodes: DestinationNode[]): DestinationNode[] => {
            return nodes.map(node => {
                if (node.id === id) return { ...node, isExpanded: !node.isExpanded };
                if (node.children) return { ...node, children: updateNodes(node.children) };
                return node;
            });
        };
        setData(updateNodes(data));
    };

    const TreeItem = ({ node, depth = 0 }: { node: DestinationNode, depth?: number }) => (
        <div className="select-none">
            <div
                className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-md hover:bg-slate-100 transition-colors group cursor-pointer",
                    depth > 0 && "ml-6 border-l pl-4"
                )}
            >
                <button onClick={() => toggleExpand(node.id)} className="w-4 h-4 flex items-center justify-center">
                    {node.children && node.children.length > 0 ? (
                        node.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    ) : (
                        <div className="w-4 h-4" />
                    )}
                </button>

                <GripVertical className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 cursor-grab" />

                <MapPin className={cn("h-4 w-4", depth === 0 ? "text-primary" : "text-slate-400")} />

                <span className="flex-1 font-medium">{node.name}</span>

                {node.country && (
                    <span className="text-xs text-slate-400 font-normal italic mr-4">{node.country}</span>
                )}

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
            </div>

            {node.isExpanded && node.children && (
                <div className="mt-1">
                    {node.children.map(child => <TreeItem key={child.id} node={child} depth={depth + 1} />)}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-serif font-light tracking-tight">Destinations</h2>
                    <p className="text-sm text-muted-foreground tracking-wide uppercase">Regional & Country Tree</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Root Destination
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm bg-white">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 uppercase tracking-widest text-slate-500">
                            <Globe className="h-4 w-4" />
                            Hierarchy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-1">
                            {data.map(node => <TreeItem key={node.id} node={node} />)}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-none shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                <Edit2 className="h-4 w-4" />
                                Rename Selected
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                <Plus className="h-4 w-4" />
                                Add Child Destination
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-sm text-slate-600 leading-relaxed italic">
                        Tips: Destinations help categorize hotels globally. A hotel can be linked to both "Europe" and "Italy" simultaneously for better search visibility.
                    </div>
                </div>
            </div>
        </div>
    );
}
