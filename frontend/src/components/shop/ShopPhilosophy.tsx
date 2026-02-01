import { motion } from "framer-motion";

const ShopPhilosophy = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-subtle mb-8 block">Our Philosophy</span>

          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            Objects with Origin
          </h2>

          <div className="mt-12 space-y-6">
            <p className="editorial-text editorial-text-large mx-auto">
              These are the same or similar products found in the world's most 
              distinguished thermal retreats—selected not for trend, but for integrity.
            </p>

            <p className="editorial-text mx-auto">
              Each item carries a connection to mineral waters, ancient craft, or 
              generations of wellness tradition. We do not stock products; we steward 
              a collection of objects that serve the body's deeper needs.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 flex items-center justify-center gap-8"
          >
            <div className="text-center">
              <span className="font-serif text-3xl text-foreground">12</span>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Partner Retreats</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <span className="font-serif text-3xl text-foreground">7</span>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Countries</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <span className="font-serif text-3xl text-foreground">50+</span>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Curated Items</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopPhilosophy;
