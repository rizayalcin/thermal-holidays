"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Percent, ShieldCheck, Zap } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Percent className="h-5 w-5 text-primary" />
                        <CardTitle>Global Markup & Commission</CardTitle>
                    </div>
                    <CardDescription>
                        Define default financial rules for manual hotel inventory.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="markup">Default Markup (%)</Label>
                            <Input id="markup" type="number" defaultValue="15" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="commission">Default Commission (%)</Label>
                            <Input id="commission" type="number" defaultValue="10" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <CardTitle>System Security</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Require 2FA for all admin users.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="space-y-0.5">
                            <Label>Session Timeout</Label>
                            <p className="text-sm text-muted-foreground">Automatically log out after inactivity.</p>
                        </div>
                        <div className="w-[120px]">
                            <Input type="number" defaultValue="60" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Settings
                </Button>
            </div>
        </div>
    );
}
