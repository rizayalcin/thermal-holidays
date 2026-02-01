import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { getGiftProducts } from "@/data/shopProducts";

const ShopGifting = () => {
  const giftProducts = getGiftProducts().slice(0, 3);

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
          <span className="label-subtle mb-6 block">Meaningful Gestures</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Gifting & Meaningful Objects
          </h2>
          <p className="editorial-text mx-auto mt-6">
            Not seasonal, not trendy—these are gifts chosen for their ability to 
            create sensory memory, to anchor ritual, to speak without words.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {giftProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-serif text-lg text-foreground">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <span className="text-sm text-muted-foreground">€{product.price}</span>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-thermal">
                    <Gift className="h-4 w-4" />
                    Gift a Ritual
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gift Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-lg bg-secondary/50 p-8 text-center"
        >
          <Gift className="mx-auto h-8 w-8 text-muted-foreground" />
          <h4 className="mt-4 font-serif text-xl text-foreground">
            Personal Gift Notes
          </h4>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Each gift can include a handwritten note on our mineral-textured stationery. 
            Simply add your message during checkout.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopGifting;
