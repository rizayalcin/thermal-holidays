import Link from "next/link";
import { motion } from "framer-motion";
import { hotels } from "@/data/destinations";
import { ArrowRight } from "lucide-react";

const FeaturedHotels = () => {
  // Hero Collection - The most exceptional, featured prominently
  const heroCollection = [
    hotels.find((h) => h.id === "terme-di-saturnia"),
    hotels.find((h) => h.id === "blue-lagoon"),
  ].filter(Boolean);

  // Recommended Collection - Premium, well-balanced visibility
  const recommendedCollection = [
    hotels.find((h) => h.id === "gora-kadan"),
    hotels.find((h) => h.id === "szechenyi-baths"),
    hotels.find((h) => h.id === "aqua-dome"),
  ].filter(Boolean);

  // Discover Collection - More understated, exploratory
  const discoverCollection = [
    hotels.find((h) => h.id === "polynesian-spa"),
  ].filter(Boolean);

  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="label-subtle mb-6 block">A Curated Selection</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            Our Thermal Collection
          </h2>
          <p className="editorial-text mx-auto mt-6 max-w-2xl">
            Each retreat has been thoughtfully chosen for its exceptional waters,
            distinctive character, and commitment to the art of wellness.
          </p>
        </motion.div>

        {/* Hero Collection - Large, editorial emphasis */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="label-subtle text-highlight">The Signature Collection</span>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {heroCollection.map((hotel, index) => (
              <motion.div
                key={hotel!.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link href={`/hotels/${hotel!.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={hotel!.heroImage}
                      alt={hotel!.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

                    {/* Thermal badge with turquoise accent */}
                    <div className="absolute left-6 top-6">
                      <span className="inline-flex items-center gap-1.5 rounded-sm bg-card/90 px-4 py-2 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                        <span className="text-thermal">{hotel!.thermalTemp}</span>
                      </span>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="label-subtle mb-2 block text-primary-foreground/70">
                        {hotel!.tagline}
                      </span>
                      <h3 className="font-serif text-3xl text-primary-foreground md:text-4xl">
                        {hotel!.name}
                      </h3>
                      <p className="mt-2 text-primary-foreground/80">
                        {hotel!.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <p className="text-base leading-relaxed text-muted-foreground line-clamp-3">
                      {hotel!.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-highlight">
                      Discover this retreat
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommended Collection - Medium prominence */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="label-subtle">Recommended Retreats</span>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {recommendedCollection.map((hotel, index) => (
              <motion.div
                key={hotel!.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/hotels/${hotel!.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={hotel!.heroImage}
                      alt={hotel!.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

                    {/* Thermal badge with turquoise accent */}
                    <div className="absolute left-4 top-4">
                      <span className="inline-flex items-center gap-1.5 rounded-sm bg-card/90 px-3 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                        <span className="text-thermal">{hotel!.thermalTemp}</span>
                      </span>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="label-subtle mb-1 block text-primary-foreground/70">
                        {hotel!.tagline}
                      </span>
                      <h3 className="font-serif text-xl text-primary-foreground">
                        {hotel!.name}
                      </h3>
                      <p className="mt-1 text-sm text-primary-foreground/80">
                        {hotel!.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {hotel!.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Discover Collection - Understated, exploratory */}
        <div className="border-t border-border pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="label-subtle">Continue Exploring</span>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {discoverCollection.map((hotel, index) => (
              <motion.div
                key={hotel!.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/hotels/${hotel!.id}`} className="group flex items-start gap-5">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={hotel!.heroImage}
                      alt={hotel!.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-thermal-muted">
                      {hotel!.thermalTemp}
                    </span>
                    <h3 className="mt-1 font-serif text-lg text-foreground transition-colors group-hover:text-thermal">
                      {hotel!.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {hotel!.location}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <Link href="/destinations" className="btn-outline-premium">
            View All Retreats
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
