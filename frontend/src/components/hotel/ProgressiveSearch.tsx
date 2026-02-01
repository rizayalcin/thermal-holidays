import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const wellnessInterests = [
  { id: "thermal", label: "Thermal Waters" },
  { id: "spa", label: "Spa & Wellness" },
  { id: "yoga", label: "Yoga & Mindfulness" },
  { id: "medical", label: "Medical / Recovery" },
  { id: "nature", label: "Silence & Nature" },
  { id: "exploring", label: "Just exploring" },
];

const ProgressiveSearch = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [guests, setGuests] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // Build query params from selections
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (selectedInterests.length > 0) params.set("interests", selectedInterests.join(","));
    if (dateRange.from) params.set("from", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange.to) params.set("to", format(dateRange.to, "yyyy-MM-dd"));
    if (guests !== 2) params.set("guests", guests.toString());

    router.push(`/destinations${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section className="absolute bottom-12 left-0 right-0 z-20 md:bottom-16 lg:bottom-20">
      <div className="content-container">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          {/* Stage 1: Single Input */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500",
              isExpanded
                ? "bg-background/95 shadow-2xl"
                : "bg-background/20 hover:bg-background/30"
            )}
          >
            {/* Main Input Row */}
            <div
              className={cn(
                "flex items-center gap-4 px-6 py-4 transition-all",
                isExpanded && "border-b border-border/30"
              )}
            >
              <input
                ref={inputRef}
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                onKeyDown={handleKeyDown}
                placeholder="Where would you like to restore?"
                className={cn(
                  "flex-1 bg-transparent text-lg font-light outline-none transition-colors placeholder:italic",
                  isExpanded
                    ? "text-foreground placeholder:text-muted-foreground"
                    : "text-primary-foreground placeholder:text-primary-foreground/70"
                )}
              />

              {isExpanded ? (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="group flex items-center gap-2 rounded-full bg-primary-foreground/20 px-5 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/30"
                >
                  <span className="tracking-wide">Begin your journey</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Stage 2: Expanded Panel */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 p-6">
                    {/* Date & Guests Row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Date Picker */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Preferred Dates <span className="font-normal normal-case italic">(optional)</span>
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex w-full items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-left text-sm transition-colors hover:border-border hover:bg-background">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
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
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="range"
                              selected={{ from: dateRange.from, to: dateRange.to }}
                              onSelect={(range) => setDateRange(range || {})}
                              numberOfMonths={2}
                              disabled={(date) => date < new Date()}
                              className="pointer-events-auto p-3"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Guests */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Guests <span className="font-normal normal-case italic">(optional)</span>
                        </label>
                        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-4 py-3">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm text-foreground">{guests} {guests === 1 ? "Guest" : "Guests"}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                              >
                                −
                              </button>
                              <button
                                onClick={() => setGuests(Math.min(10, guests + 1))}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                              >
                                +
                              </button>
                            </div>
                          </div>
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
                              "rounded-full px-4 py-2 text-sm transition-all",
                              selectedInterests.includes(interest.id)
                                ? "bg-primary text-primary-foreground"
                                : "border border-border/50 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground"
                            )}
                          >
                            {interest.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-muted-foreground italic">
                        Or continue scrolling to explore our curated collection
                      </p>
                      <button
                        onClick={handleSubmit}
                        className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
                      >
                        Discover retreats
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgressiveSearch;
