import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionIndicatorProps {
  sections: { id: string; label: string }[];
  currentSection: string;
  onNavigate?: (sectionId: string) => void;
}

const SectionIndicator = ({ 
  sections, 
  currentSection,
  onNavigate 
}: SectionIndicatorProps) => {
  const isMobile = useIsMobile();

  // Don't render on mobile
  if (isMobile) return null;

  // Find current index for prev/next navigation
  const currentIndex = sections.findIndex(s => s.id === currentSection);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sections.length - 1 && currentIndex >= 0;

  const currentLabel = sections.find(s => s.id === currentSection)?.label || "";

  const goToPrev = () => {
    if (hasPrev) {
      onNavigate?.(sections[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      onNavigate?.(sections[currentIndex + 1].id);
    }
  };

  return (
    <>
      {/* Sticky Section Label - Left Side */}
      <AnimatePresence mode="wait">
        {currentLabel && (
          <motion.div
            key={currentLabel}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed left-8 top-1/2 z-30 -translate-y-1/2 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                className="h-12 w-px bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.span 
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60 [writing-mode:vertical-rl] rotate-180"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {currentLabel}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Dot Navigation with Arrows - Right Side */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed right-8 top-1/2 z-30 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2"
        aria-label="Section navigation"
      >
        {/* Up Arrow */}
        <motion.button
          onClick={goToPrev}
          disabled={!hasPrev}
          className={`group flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
            hasPrev 
              ? "text-muted-foreground hover:text-foreground hover:bg-secondary" 
              : "text-muted-foreground/20 cursor-not-allowed"
          }`}
          whileHover={hasPrev ? { scale: 1.1 } : {}}
          whileTap={hasPrev ? { scale: 0.95 } : {}}
          aria-label="Previous section"
        >
          <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex flex-col gap-3 py-2">
          {sections.map((section) => {
            const isActive = currentSection === section.id;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => onNavigate?.(section.id)}
                className="group relative flex items-center justify-end"
                whileHover={{ scale: 1.1 }}
                aria-label={section.label}
              >
                {/* Hover label */}
                <span className="absolute right-5 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {section.label}
                </span>
                
                {/* Dot */}
                <motion.div
                  className={`rounded-full transition-all duration-300 ${
                    isActive 
                      ? "h-3 w-3 bg-primary" 
                      : "h-1.5 w-1.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                  }`}
                  layout
                />
              </motion.button>
            );
          })}
        </div>

        {/* Down Arrow */}
        <motion.button
          onClick={goToNext}
          disabled={!hasNext}
          className={`group flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
            hasNext 
              ? "text-muted-foreground hover:text-foreground hover:bg-secondary" 
              : "text-muted-foreground/20 cursor-not-allowed"
          }`}
          whileHover={hasNext ? { scale: 1.1 } : {}}
          whileTap={hasNext ? { scale: 0.95 } : {}}
          aria-label="Next section"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </motion.button>
      </motion.nav>
    </>
  );
};

export default SectionIndicator;
