import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shopCategories } from "@/data/shopProducts";

const ShopCategories = () => {
  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <span className="label-subtle mb-6 block">Ritual Paths</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Curated Categories
          </h2>
          <p className="editorial-text mt-6">
            Each collection represents a different facet of the thermal wellness ritual—
            from preparation to rest, from body to mind.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shopCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/shop/category/${category.id}`}
                className="group block overflow-hidden rounded-lg bg-background"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-thermal">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm italic text-muted-foreground">
                    {category.poeticDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    <span>Discover this ritual</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
