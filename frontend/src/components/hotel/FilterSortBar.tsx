import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

export type SortOption = "recommended" | "price-low" | "price-high" | "temp-high" | "temp-low";

interface FilterSortBarProps {
  filters: {
    priceRange: [number, number];
    roomTypes: string[];
    amenities: string[];
    waterTemp: [number, number];
  };
  onFilterChange: (filters: FilterSortBarProps["filters"]) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  availableRoomTypes: string[];
  availableAmenities: string[];
  resultCount: number;
  destinationName?: string;
}

const FilterSection = ({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="font-serif text-sm tracking-wide text-foreground">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Curator's Selection" },
  { value: "temp-high", label: "Warmest Waters First" },
  { value: "temp-low", label: "Gentle Warmth First" },
];

const FilterSortBar = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  availableRoomTypes,
  availableAmenities,
  resultCount,
  destinationName,
}: FilterSortBarProps) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleTempChange = (value: number[]) => {
    onFilterChange({ ...filters, waterTemp: [value[0], value[1]] });
  };

  const handleRoomTypeToggle = (roomType: string) => {
    const newRoomTypes = filters.roomTypes.includes(roomType)
      ? filters.roomTypes.filter((r) => r !== roomType)
      : [...filters.roomTypes, roomType];
    onFilterChange({ ...filters, roomTypes: newRoomTypes });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 1000],
      roomTypes: [],
      amenities: [],
      waterTemp: [30, 45],
    });
  };

  const activeFilterCount =
    filters.roomTypes.length +
    filters.amenities.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    (filters.waterTemp[0] > 30 || filters.waterTemp[1] < 45 ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <>
      {/* Filter & Sort Bar - Inline for header alignment */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {/* Filter Button - Subtle */}
          <button
            onClick={() => setFilterModalOpen(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-thermal transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Refine</span>
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-thermal/20 text-[10px] text-thermal">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-muted-foreground/30">|</span>

          {/* Sort Button - Subtle with thermal hover */}
          <button
            onClick={() => setSortModalOpen(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-thermal transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>
              {sortOptions.find((s) => s.value === sortBy)?.label}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {filterModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setFilterModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-hidden rounded-xl bg-background shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="font-serif text-xl text-foreground">Refine Selection</h2>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="rounded-full p-2 hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[60vh] px-6 py-6 space-y-1">
                {/* Wellness Focus */}
                <FilterSection title="Wellness Focus" defaultOpen>
                  <div className="space-y-3">
                    {[
                      "Relaxation & Restoration",
                      "Medical & Therapeutic",
                      "Detox & Cleansing",
                      "Beauty & Anti-aging",
                      "Movement & Fitness",
                    ].map((focus) => (
                      <label
                        key={focus}
                        className="flex cursor-pointer items-center gap-3 group"
                      >
                        <Checkbox
                          checked={filters.amenities.includes(focus)}
                          onCheckedChange={() => handleAmenityToggle(focus)}
                          className="border-muted-foreground/50 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {focus}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Water Type */}
                <FilterSection title="Water Type">
                  <div className="space-y-3">
                    {[
                      "Sulfur-rich",
                      "Mineral springs",
                      "Salt water",
                      "Volcanic thermal",
                      "Bicarbonate",
                    ].map((waterType) => (
                      <label
                        key={waterType}
                        className="flex cursor-pointer items-center gap-3 group"
                      >
                        <Checkbox
                          checked={filters.roomTypes.includes(waterType)}
                          onCheckedChange={() => handleRoomTypeToggle(waterType)}
                          className="border-muted-foreground/50 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {waterType}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Experience Type */}
                <FilterSection title="Experience Style">
                  <div className="space-y-3">
                    {[
                      "Intimate & Boutique",
                      "Grand & Historic",
                      "Nature Immersion",
                      "Urban Retreat",
                      "Family Wellness",
                    ].map((experience) => (
                      <label
                        key={experience}
                        className="flex cursor-pointer items-center gap-3 group"
                      >
                        <Checkbox
                          checked={filters.amenities.includes(experience)}
                          onCheckedChange={() => handleAmenityToggle(experience)}
                          className="border-muted-foreground/50 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {experience}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-6 py-4">
                {hasActiveFilters ? (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear all
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                >
                  View Selection
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sort Modal */}
      <AnimatePresence>
        {sortModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setSortModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="font-serif text-xl text-foreground">Sort By</h2>
                <button
                  onClick={() => setSortModalOpen(false)}
                  className="rounded-full p-2 hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Options */}
              <div className="py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setSortModalOpen(false);
                    }}
                    className={`w-full px-6 py-3 text-left text-sm transition-colors ${
                      sortBy === option.value
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSortBar;
