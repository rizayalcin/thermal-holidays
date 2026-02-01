import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-thermal-resort.jpg";
import destinationIceland from "@/assets/destination-iceland.jpg";
import destinationHungary from "@/assets/destination-hungary.jpg";
import destinationJapan from "@/assets/destination-japan.jpg";
import destinationItaly from "@/assets/destination-italy.jpg";
import ProgressiveSearch from "./ProgressiveSearch";
import ProgressiveSearchMobile from "./ProgressiveSearchMobile";
import { useIsMobile } from "@/hooks/use-mobile";

const slides = [
  {
    image: heroImage,
    label: "A Journey Begins",
    title: "Stillness.\nRestoration.\nRenewal.",
    subtitle: "Where healing waters meet timeless traditions",
  },
  {
    image: destinationIceland,
    label: "Iceland",
    title: "Fire & Ice\nGeothermal Bliss",
    subtitle: "Volcanic springs set against dramatic Nordic landscapes",
  },
  {
    image: destinationHungary,
    label: "Budapest, Hungary",
    title: "Historic\nThermal Palaces",
    subtitle: "Europe's thermal capital with centuries of bathing tradition",
  },
  {
    image: destinationJapan,
    label: "Hakone, Japan",
    title: "The Art of\nOnsen Bathing",
    subtitle: "Ancient traditions refined over millennia in harmony with nature",
  },
  {
    image: destinationItaly,
    label: "Val d'Orcia, Italy",
    title: "Tuscan\nHealing Waters",
    subtitle: "Medieval villages built around natural thermal springs",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  // Auto-advance slides with slow, meditative timing
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Images with Crossfade - no lateral movement */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 2.5, ease: "easeInOut" },
            scale: { duration: 12, ease: "easeOut" }
          }}
          className="absolute inset-0"
        >
          <motion.img
            src={slide.image.src}
            alt={slide.label}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 12, ease: "linear" }}
          />
          {/* Gradient overlays - softer, more cinematic */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content - Left aligned, higher to make room for search */}
      <div className="relative z-10 flex h-full flex-col justify-center pb-40 md:pb-48">
        <div className="content-container">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <span className="label-subtle mb-4 inline-block text-primary-foreground/70">
                  {slide.label}
                </span>

                <h1 className="whitespace-pre-line font-serif text-4xl font-medium leading-tight tracking-wide text-primary-foreground md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 text-lg font-light text-primary-foreground/85 md:text-xl">
                  {slide.subtitle}
                </p>

                {/* Trust Signal - editorial feel */}
                <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/60">
                  This is not a booking site. It's a guide to the world's most
                  extraordinary thermal wellness destinations, curated for those
                  who seek restoration over transaction.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progressive Search - Desktop */}
      {!isMobile && <ProgressiveSearch />}

      {/* Progressive Search - Mobile (below hero content) */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <ProgressiveSearchMobile />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
