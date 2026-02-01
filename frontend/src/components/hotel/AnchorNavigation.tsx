import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

// Exact 1:1 mapping with guided focus sections
const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "the-hotel", label: "The Hotel" },
  { id: "different-holiday", label: "A Different Kind of Holiday" },
  { id: "ideal-guest", label: "Who This Hotel Is For" },
  { id: "why-selected", label: "Why We Selected This Hotel" },
  { id: "waters-wellness", label: "Waters & Wellness" },
];

interface AnchorNavigationProps {
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

const AnchorNavigation = ({ onNavigate, currentSection }: AnchorNavigationProps) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Header is fixed (h-20). Keep tabs fixed directly under it.
  const HEADER_HEIGHT_PX = 80;

  // Check if we've scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsPastHero(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to active tab on mobile
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentSection]);

  return (
    <>
      {/* Placeholder to prevent content jump - always present when past hero */}
      <div 
        className={`${isPastHero ? 'h-[58px]' : 'h-0'} transition-all duration-300`} 
        aria-hidden="true" 
      />
      
      {/* Navigation Bar - Always fixed after hero */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ duration: 0.4 }}
        className={`w-full z-40 transition-all duration-300 ${
          isPastHero 
            ? "fixed left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border shadow-sm" 
            : "relative bg-card border-b border-border"
        }`}
        role="navigation"
        aria-label="Page sections"
        style={isPastHero ? { top: HEADER_HEIGHT_PX } : undefined}
      >
        <div className="content-container">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentSection === item.id;
                return (
                  <li key={item.id} className="flex items-center">
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`relative px-4 py-4 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground/80"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.label}
                      
                      {/* Active indicator */}
                      <motion.div
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary"
                        initial={false}
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          scaleX: isActive ? 1 : 0 
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </button>
                    
                    {/* Separator */}
                    {index < NAV_ITEMS.length - 1 && (
                      <span className="text-border mx-1 select-none">·</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile/Tablet Navigation */}
          <div 
            ref={scrollContainerRef}
            className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4"
          >
            <ul className="flex items-center min-w-max">
              {NAV_ITEMS.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      ref={isActive ? activeTabRef : null}
                      onClick={() => onNavigate(item.id)}
                      className={`relative whitespace-nowrap px-4 py-4 text-xs font-medium tracking-wider transition-colors duration-300 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/60"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.label}
                      
                      {isActive && (
                        <motion.div
                          layoutId="mobile-tab-indicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary"
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export { NAV_ITEMS };
export default AnchorNavigation;
