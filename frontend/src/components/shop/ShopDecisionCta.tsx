import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ShopDecisionCta = () => {
  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Selected with the same care as our destinations.
          </h2>

          <p className="editorial-text mx-auto mt-6">
            Every object in this collection has been chosen with intention—
            for its materials, its craft, and its ability to extend the
            wellness journey beyond the retreat.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              Continue Exploring Wellness
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/experiences"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Discover our experiences
            </Link>
          </div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span>Complimentary Shipping</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span>Thoughtful Packaging</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span>30-Day Returns</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopDecisionCta;
