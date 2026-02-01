import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ShopHero = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80"
          alt="Luxury spa ritual"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end pb-32">
        <div className="content-container">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/70"
          >
            The Curated Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl font-medium text-primary-foreground md:text-6xl lg:text-7xl"
          >
            Bring the Ritual Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-6 max-w-xl font-sans text-lg text-primary-foreground/85 md:text-xl"
          >
            Objects and essentials inspired by the world's most refined thermal traditions.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            onClick={scrollToContent}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-primary-foreground/30 bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10"
          >
            Explore the Collection
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-primary-foreground/60">
            Discover
          </span>
          <div className="h-8 w-px bg-primary-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ShopHero;
