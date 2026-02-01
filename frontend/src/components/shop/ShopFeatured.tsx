import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/data/shopProducts";

const ShopFeatured = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="label-subtle mb-6 block">Hand-Selected</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Featured Ritual Selections
          </h2>
          <p className="editorial-text mx-auto mt-6">
            A carefully considered collection of essential objects, each chosen
            for its connection to thermal wellness traditions.
          </p>
        </motion.div>

        <div className="space-y-24">
          {featuredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className={`grid gap-12 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
            >
              {/* Image */}
              <Link
                href={`/shop/product/${product.id}`}
                className={`group overflow-hidden rounded-lg ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Thermal Ritual Object
                </span>
                <Link href={`/shop/product/${product.id}`}>
                  <h3 className="mt-2 font-serif text-2xl text-foreground transition-colors hover:text-thermal md:text-3xl">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-4 text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-8 rounded-lg bg-secondary/50 p-6">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Why We Selected This
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {Array.isArray(product.whyWeSelected)
                      ? product.whyWeSelected[0]
                      : product.whyWeSelected}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    €{product.price}
                  </span>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      View ritual →
                    </Link>
                    <button className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background">
                      Add to Ritual
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopFeatured;
