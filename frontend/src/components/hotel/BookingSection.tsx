import { motion } from "framer-motion";
import Link from "next/link";

const BookingSection = () => {
  return (
    <section className="section-spacing bg-secondary">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="label-subtle mb-6 block">Your Journey Awaits</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            Ready to discover your perfect retreat?
          </h2>
          <p className="editorial-text mx-auto mt-8">
            Our curators are here to guide you toward the thermal experience
            that best suits your wellness goals and preferences.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="btn-premium min-w-[220px]">
              Speak with Our Curators
            </button>
            <Link href="/destinations" className="btn-outline-premium min-w-[220px]">
              Begin Your Journey
            </Link>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            For groups of 10 or more, please contact our events team directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
