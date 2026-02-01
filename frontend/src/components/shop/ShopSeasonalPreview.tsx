import { motion } from "framer-motion";
import Link from "next/link";
import { getCurrentSeasonCollection } from "@/data/shopProducts";

const ShopSeasonalPreview = () => {
  const currentCollection = getCurrentSeasonCollection();

  if (!currentCollection) return null;

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="content-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-subtle mb-6 block">Available This Season</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              {currentCollection.name}
            </h2>
            <p className="editorial-text mt-6">
              {currentCollection.manifesto}
            </p>
            <Link
              href={`/shop/seasonal/${currentCollection.id}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Explore this seasonal ritual →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-lg"
          >
            <img
              src={currentCollection.image}
              alt={currentCollection.name}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/shop/seasonal"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all seasonal rituals
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSeasonalPreview;
