import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Hotel } from "@/data/destinations";

interface QuickViewModalProps {
  hotel: Hotel;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ hotel, isOpen, onClose }: QuickViewModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Collect available images
  const images = [
    hotel.heroImage,
    hotel.thermalPoolImage,
    hotel.spaImage,
    hotel.roomImage,
  ].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Generate "Why we selected" based on hotel data
  const getSelectionReasons = () => {
    const reasons = [];
    if (hotel.thermalProperties?.waterType) {
      reasons.push(`Exceptional ${hotel.thermalProperties.waterType.toLowerCase()} waters`);
    } else {
      reasons.push(`Remarkable thermal waters at ${hotel.thermalTemp}`);
    }
    if (hotel.history) {
      reasons.push(`${hotel.history} years of wellness heritage`);
    }
    if (hotel.medicalWellness) {
      reasons.push("Physician-supervised wellness programs");
    }
    if (hotel.spaServices?.length > 3) {
      reasons.push("Comprehensive spa and treatment offerings");
    }
    return reasons.slice(0, 3);
  };

  // Mini enhance your stay categories
  const enhanceCategories = [
    { title: "Signature Rituals", items: ["Therapeutic massage", "Mineral therapies"] },
    { title: "Movement & Mind", items: ["Morning yoga", "Guided meditation"] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container - Full screen overlay with padding */}
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-xl bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>

              <div className="overflow-hidden rounded-xl">
                {/* Image Gallery */}
                <div className="relative aspect-[16/9] bg-muted">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {/* Image navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Dots indicator with thermal accent */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-2 w-2 rounded-full transition-colors ${idx === currentImageIndex
                                ? "bg-thermal"
                                : "bg-primary-foreground/40"
                              }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Thermal badge with turquoise accent */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-sm bg-card/90 px-3 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                      <span className="text-foreground">Thermal waters at</span>
                      <span className="text-thermal">{hotel.thermalTemp}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <span className="label-subtle mb-2 block">{hotel.tagline}</span>
                    <h2 className="font-serif text-2xl text-foreground md:text-3xl">
                      {hotel.name}
                    </h2>
                    <p className="mt-1 text-muted-foreground">{hotel.location}</p>
                  </div>

                  {/* Editorial Summary */}
                  <div className="mb-8">
                    <p className="editorial-text leading-relaxed">
                      {hotel.experience.substring(0, 250)}...
                    </p>
                  </div>

                  {/* Why We Selected */}
                  <div className="mb-8 rounded-lg bg-secondary/30 p-6">
                    <h3 className="font-serif text-lg text-foreground mb-4">
                      Why We Selected This Retreat
                    </h3>
                    <ul className="space-y-2">
                      {getSelectionReasons().map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-thermal-muted" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subtle thermal divider */}
                  <div className="divider-thermal mb-8" />

                  {/* Mini Enhance Your Stay */}
                  <div className="mb-8 border-t border-border pt-6">
                    <h3 className="font-serif text-lg text-foreground mb-4">
                      Enhance Your Stay
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {enhanceCategories.map((category) => (
                        <div key={category.title} className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {category.title}
                          </h4>
                          <ul className="space-y-1">
                            {category.items.map((item) => (
                              <li key={item} className="text-sm text-muted-foreground">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs italic text-muted-foreground">
                      Available as part of selected programs
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href={`/hotels/${hotel.id}`}
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                    >
                      View Full Retreat
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      Speak with a Curator
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
