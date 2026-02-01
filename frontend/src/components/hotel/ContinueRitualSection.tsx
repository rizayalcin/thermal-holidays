import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductsUsedAtHotel } from "@/data/shopProducts";

interface ContinueRitualSectionProps {
  hotelId: string;
  hotelName: string;
}

const ContinueRitualSection = ({ hotelId, hotelName }: ContinueRitualSectionProps) => {
  const products = getProductsUsedAtHotel(hotelId).slice(0, 3);

  // Don't render if no products are associated with this hotel
  if (products.length === 0) return null;

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-2xl"
        >
          <span className="label-subtle mb-6 block">Extend Your Experience</span>
          <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl">
            Continue the Ritual at Home
          </h2>
          <p className="editorial-text mt-4">
            The same products you'll experience during your stay—selected to
            carry the ritual beyond your retreat.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-lg text-foreground">{product.name}</h3>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  Used during your stay at {hotelName}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">€{product.price}</span>
                  <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Bring this home
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>View all ritual items</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContinueRitualSection;
