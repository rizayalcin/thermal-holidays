import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface GuestInfo {
  id: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  healthConditions: string;
  email: string;
  phone: string;
}

interface GuestInfoFormProps {
  guests: GuestInfo[];
  onGuestsChange: (guests: GuestInfo[]) => void;
  maxGuests: number;
}

const countries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Iceland", "Ireland", "Italy", "Japan", "Latvia", "Lithuania", "Luxembourg",
  "Malta", "Netherlands", "New Zealand", "Norway", "Poland", "Portugal",
  "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
  "Turkey", "United Kingdom", "United States", "Other"
];

const createEmptyGuest = (): GuestInfo => ({
  id: crypto.randomUUID(),
  firstName: "",
  lastName: "",
  passportNumber: "",
  nationality: "",
  dateOfBirth: "",
  healthConditions: "",
  email: "",
  phone: "",
});

const GuestInfoForm = ({ guests, onGuestsChange, maxGuests }: GuestInfoFormProps) => {
  const addGuest = () => {
    if (guests.length < maxGuests) {
      onGuestsChange([...guests, createEmptyGuest()]);
    }
  };

  const removeGuest = (id: string) => {
    if (guests.length > 1) {
      onGuestsChange(guests.filter((g) => g.id !== id));
    }
  };

  const updateGuest = (id: string, field: keyof GuestInfo, value: string) => {
    onGuestsChange(
      guests.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const calculateAge = (dateOfBirth: string): number | null => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="mt-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl text-foreground">Guest Information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please provide details for all guests staying at the hotel
          </p>
        </div>
        {guests.length < maxGuests && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addGuest}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Guest
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {guests.map((guest, index) => {
          const age = calculateAge(guest.dateOfBirth);
          return (
            <div
              key={guest.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="font-medium text-foreground">
                    {index === 0 ? "Primary Guest" : `Guest ${index + 1}`}
                  </h3>
                  {age !== null && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {age} years old
                    </span>
                  )}
                </div>
                {guests.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGuest(guest.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    First Name *
                  </label>
                  <Input
                    value={guest.firstName}
                    onChange={(e) => updateGuest(guest.id, "firstName", e.target.value)}
                    placeholder="Enter first name"
                    className="h-11"
                    maxLength={50}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Last Name *
                  </label>
                  <Input
                    value={guest.lastName}
                    onChange={(e) => updateGuest(guest.id, "lastName", e.target.value)}
                    placeholder="Enter last name"
                    className="h-11"
                    maxLength={50}
                  />
                </div>

                {/* Passport Number */}
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Passport / ID Number *
                  </label>
                  <Input
                    value={guest.passportNumber}
                    onChange={(e) => updateGuest(guest.id, "passportNumber", e.target.value.toUpperCase())}
                    placeholder="Enter passport or ID number"
                    className="h-11 font-mono"
                    maxLength={20}
                  />
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Nationality *
                  </label>
                  <Select
                    value={guest.nationality}
                    onValueChange={(value) => updateGuest(guest.id, "nationality", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Date of Birth *
                  </label>
                  <Input
                    type="date"
                    value={guest.dateOfBirth}
                    onChange={(e) => updateGuest(guest.id, "dateOfBirth", e.target.value)}
                    className="h-11"
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Email (only for primary guest) */}
                {index === 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={guest.email}
                      onChange={(e) => updateGuest(guest.id, "email", e.target.value)}
                      placeholder="email@example.com"
                      className="h-11"
                      maxLength={100}
                    />
                  </div>
                )}

                {/* Phone (only for primary guest) */}
                {index === 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={guest.phone}
                      onChange={(e) => updateGuest(guest.id, "phone", e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="h-11"
                      maxLength={20}
                    />
                  </div>
                )}
              </div>

              {/* Health Conditions */}
              <div className="mt-4 space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Health Conditions / Allergies / Special Needs
                </label>
                <Textarea
                  value={guest.healthConditions}
                  onChange={(e) => updateGuest(guest.id, "healthConditions", e.target.value)}
                  placeholder="Please inform us of any medical conditions, allergies, dietary restrictions, or special requirements that may affect your thermal spa experience..."
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                />
                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                  This information helps our wellness team provide personalized care and ensure a safe thermal experience.
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg bg-secondary/50 p-4">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Privacy Notice:</strong> Your personal information is collected solely for reservation purposes and is protected in accordance with applicable data protection regulations. We do not share your data with third parties except as required by local authorities.
        </p>
      </div>
    </motion.div>
  );
};

export default GuestInfoForm;
