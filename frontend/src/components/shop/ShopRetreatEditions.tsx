import { motion } from "framer-motion";
import Link from "next/link";
import { retreatEditions, getRetreatEditionProducts } from "@/data/shopProducts";
import { getHotelById } from "@/data/destinations";

const ShopRetreatEditions = () => {
  const validEditions = retreatEditions
    .map(edition => ({
      ...edition,
      hotel: getHotelById(edition.hotelId),
      products: getRetreatEditionProducts(edition.hotelId)
    }))
    .filter(edition => edition.hotel && edition.products.length > 0);

  if (validEditions.length === 0) return null;

  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="label-subtle mb-6 block">Crafted for Our Retreats</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Retreat Editions
          </h2>
          <p className="editorial-text mt-6 max-w-2xl">
            Exclusive objects created in partnership with our destination retreats.
            These are not replicas—they are the genuine articles, made specifically
            for and found at these properties.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {validEditions.map((edition, index) => (
            <motion.div
              key={edition.hotelId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={edition.hotel?.heroImage}
                  alt={edition.hotelName}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-serif text-xl text-foreground">{edition.hotelName}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{edition.description}</p>

                <div className="mt-6 flex flex-wrap gap-4">
                  {edition.products.slice(0, 3).map(product => (
                    <Link
                      key={product.id}
                      href={`/shop/product/${product.id}`}
                      className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">€{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/hotel/${edition.hotelId}`}
                  className="mt-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  See the retreat →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopRetreatEditions;
