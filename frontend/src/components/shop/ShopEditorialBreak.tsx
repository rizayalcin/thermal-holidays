import { motion } from "framer-motion";

const ShopEditorialBreak = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80"
          alt="Serene wellness moment"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <p className="font-serif text-3xl font-light italic leading-relaxed text-primary-foreground md:text-4xl">
              "Wellness doesn't end at checkout."
            </p>
            <p className="mt-6 text-sm text-primary-foreground/70">
              The ritual continues at home—in the quiet moments between morning and rest, 
              in the textures that comfort, in the scents that transport.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopEditorialBreak;
