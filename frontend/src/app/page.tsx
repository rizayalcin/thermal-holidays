"use client";

import Link from "next/link";
import Header from "@/components/hotel/Header";
import HeroSection from "@/components/hotel/HeroSection";
import FeaturedHotels from "@/components/hotel/FeaturedHotels";
import HowWeCurateSection from "@/components/hotel/HowWeCurateSection";
import EnhanceYourStayPreview from "@/components/hotel/EnhanceYourStayPreview";
import BookingSection from "@/components/hotel/BookingSection";
import Footer from "@/components/hotel/Footer";
import { motion } from "framer-motion";
import { destinations } from "@/data/destinations";
import { Droplets, Globe, Heart } from "lucide-react";

const WellnessIntroSection = () => {
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
          <span className="label-subtle mb-8 block">Discover Wellness</span>

          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            The world's finest thermal retreats await
          </h2>

          <div className="mt-12">
            <p className="editorial-text editorial-text-large mx-auto">
              From Iceland's volcanic springs to Japan's ancient onsens,
              thermal wellness traditions have shaped cultures for millennia.
              <em className="text-muted-foreground"> We curate the world's most exceptional
                healing water destinations, each offering a unique path to renewal.</em>
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <Globe className="mx-auto h-8 w-8 text-foreground/70" strokeWidth={1} />
              <span className="mt-4 block font-serif text-3xl text-foreground">6</span>
              <p className="mt-1 text-sm text-muted-foreground">Destinations</p>
            </div>
            <div className="text-center">
              <Droplets className="mx-auto h-8 w-8 text-foreground/70" strokeWidth={1} />
              <span className="mt-4 block font-serif text-3xl text-foreground">500+</span>
              <p className="mt-1 text-sm text-muted-foreground">Thermal Resorts</p>
            </div>
            <div className="text-center">
              <Heart className="mx-auto h-8 w-8 text-foreground/70" strokeWidth={1} />
              <span className="mt-4 block font-serif text-3xl text-foreground">3000+</span>
              <p className="mt-1 text-sm text-muted-foreground">Years of Tradition</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedDestinations = () => {
  return (
    <section className="section-spacing bg-secondary">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="label-subtle mb-6 block">Explore</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Destinations Around the World
          </h2>
          <p className="editorial-text mx-auto mt-6">
            Each destination offers its own unique thermal traditions, mineral compositions,
            and cultural heritage—discover which resonates with your path to renewal.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/destinations/${destination.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={(destination.image as any)?.src || destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="label-subtle text-primary-foreground/70">
                      {destination.hotelCount} Resorts
                    </span>
                    <h3 className="mt-2 font-serif text-2xl text-primary-foreground">
                      {destination.name}
                    </h3>
                    <p className="mt-1 text-sm text-primary-foreground/80">
                      {destination.country}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-2">
                  {destination.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/destinations" className="btn-outline-premium">
            Explore All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ThermalTraditionsSection = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-subtle mb-6 block">Ancient Wisdom</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              A Journey Through Thermal Traditions
            </h2>
            <div className="mt-8 space-y-6">
              <p className="editorial-text">
                <strong className="text-foreground">Türkiye's Anatolian Springs:</strong> Where East meets West,
                Turkey's thermal traditions trace back to ancient civilizations—from Pamukkale's travertines
                to Afyon's healing waters, a living heritage of wellness.
              </p>
              <p className="editorial-text">
                <strong className="text-foreground">Hungary's Bath Heritage:</strong> Budapest, the "City of Spas,"
                boasts thermal baths dating to Roman times, later embellished by Ottoman architecture—
                a living testament to Europe's most vibrant bathing culture.
              </p>
              <p className="editorial-text">
                <strong className="text-foreground">Iceland's Geothermal Wonder:</strong> Where volcanic activity
                meets Arctic wilderness, Iceland offers otherworldly thermal experiences in landscapes
                of stark, primordial beauty.
              </p>
              <p className="editorial-text">
                <strong className="text-foreground">Italy's Ancient Terme:</strong> From the Etruscan-era springs
                of Tuscany to the sulfurous pools of Ischia, Italian thermal culture embodies the
                Mediterranean art of living well.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {destinations.slice(0, 4).map((dest, index) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group relative aspect-square overflow-hidden"
              >
                <img
                  src={(dest.image as any)?.src || dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/30 transition-opacity group-hover:bg-foreground/40" />
                <span className="absolute bottom-4 left-4 font-serif text-lg text-primary-foreground">
                  {dest.name}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero with integrated Progressive Search */}
        <HeroSection />
        <WellnessIntroSection />
        <HowWeCurateSection />
        <FeaturedDestinations />
        <ThermalTraditionsSection />
        <FeaturedHotels />
        <EnhanceYourStayPreview />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
