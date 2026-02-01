import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const wellnessInterests = [
  { id: "thermal", label: "Thermal Waters" },
  { id: "spa", label: "Spa & Wellness" },
  { id: "yoga", label: "Yoga & Mindfulness" },
  { id: "medical", label: "Medical / Recovery" },
  { id: "nature", label: "Silence & Nature" },
  { id: "exploring", label: "Just exploring" },
];

const ProgressiveSearchMobile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [guests, setGuests] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (selectedInterests.length > 0) params.set("interests", selectedInterests.join(","));
    if (dateRange.from) params.set("from", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange.to) params.set("to", format(dateRange.to, "yyyy-MM-dd"));
    if (guests !== 2) params.set("guests", guests.toString());

    setIsOpen(false);
    router.push(`/destinations${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="px-6 py-8"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-full rounded-xl bg-background/20 px-5 py-4 text-left backdrop-blur-xl transition-colors hover:bg-background/30"
        >
          <span className="text-base font-light italic text-primary-foreground/80">
            Where would you like to restore?
          </span>
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-primary-foreground/90"
          >
            Begin your journey
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto rounded-t-3xl p-0">
          <SheetHeader className="sticky top-0 z-10 border-b border-border/30 bg-background px-6 py-4">
            <SheetTitle className="text-left font-serif text-xl">
              Find your retreat
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 p-6">
            {/* Destination Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where would you like to restore?"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 text-base outline-none transition-colors placeholder:italic placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Preferred Dates <span className="font-normal normal-case italic">(optional)</span>
              </label>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex w-full items-center gap-3 rounded-lg border border-border/50 bg-background px-4 py-3 text-left text-base transition-colors hover:border-border"
              >
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className={cn(
                  dateRange.from ? "text-foreground" : "text-muted-foreground italic"
                )}>
                  {dateRange.from
                    ? dateRange.to
                      ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d")}`
                      : format(dateRange.from, "MMM d, yyyy")
                    : "Any dates"}
                </span>
              </button>

              <AnimatePresence>
                {showCalendar && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <CalendarComponent
                        mode="range"
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => setDateRange(range || {})}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto rounded-lg border border-border/50 p-3"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Guests <span className="font-normal normal-case italic">(optional)</span>
              </label>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background px-4 py-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base text-foreground">{guests} {guests === 1 ? "Guest" : "Guests"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Wellness Interests */}
            <div className="space-y-3">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Wellness Interest <span className="font-normal normal-case italic">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {wellnessInterests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "rounded-full px-4 py-2.5 text-sm transition-all",
                      selectedInterests.includes(interest.id)
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/50 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <p className="text-center text-sm text-muted-foreground italic">
              Or scroll past to explore our curated collection
            </p>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 border-t border-border/30 bg-background p-6">
            <button
              onClick={handleSubmit}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-base font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Discover retreats
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProgressiveSearchMobile;
