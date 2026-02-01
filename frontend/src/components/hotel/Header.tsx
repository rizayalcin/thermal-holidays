import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Droplets } from "lucide-react";

interface HeaderProps {
  alwaysSolid?: boolean;
}

const Logo = ({ isSolid }: { isSolid: boolean }) => (
  <Link href="/" className="group flex items-center gap-3">
    {/* Icon */}
    <div className={`relative transition-colors duration-300 ${isSolid ? "text-foreground" : "text-primary-foreground"
      }`}>
      <Droplets className="h-9 w-9" strokeWidth={1} />
    </div>

    {/* Text Logo */}
    <div className="flex flex-col leading-none">
      <span className={`text-[15px] font-light tracking-[0.35em] uppercase transition-colors duration-300 ${isSolid ? "text-muted-foreground" : "text-primary-foreground/70"
        }`}>
        Thermal
      </span>
      <span className={`font-serif text-[26px] font-light tracking-[0.12em] transition-colors duration-300 ${isSolid ? "text-foreground" : "text-primary-foreground"
        }`}>
        HOLIDAYS
      </span>
    </div>
  </Link>
);

const Header = ({ alwaysSolid = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = alwaysSolid || isScrolled || isMobileMenuOpen;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Destinations", href: "/destinations" },
    { label: "Experiences", href: "/experiences" },
    { label: "Shop", href: "/shop" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isSolid
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
          }`}
      >
        <div className="content-container">
          <nav className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Logo isSolid={isSolid} />

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors duration-300 hover:opacity-70 ${isSolid ? "text-foreground" : "text-primary-foreground"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <Link
              href="/destinations"
              className={`hidden text-sm font-medium tracking-wide transition-all duration-300 md:block ${isSolid
                  ? "text-foreground hover:text-muted-foreground"
                  : "text-primary-foreground hover:opacity-70"
                }`}
            >
              Enquire
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden transition-colors duration-300 ${isSolid ? "text-foreground" : "text-primary-foreground"
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-20 z-40 bg-background md:hidden"
        >
          <div className="content-container py-8">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-serif text-2xl text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-border">
                <Link
                  href="/destinations"
                  className="btn-premium inline-block text-center"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
