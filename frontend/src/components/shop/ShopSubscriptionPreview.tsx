import { motion } from "framer-motion";
import Link from "next/link";

const ShopSubscriptionPreview = () => {
  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="label-subtle mb-6 block">The Ongoing Journey</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Monthly Ritual
          </h2>
          <p className="editorial-text mx-auto mt-6">
            Wellness is not an event—it is a practice. Each month, receive one carefully
            chosen object to support your ongoing journey of restoration.
          </p>

          <div className="mt-10 rounded-lg bg-background p-8">
            <p className="font-serif text-2xl text-foreground">€65 / month</p>
            <p className="mt-2 text-sm text-muted-foreground">
              One ritual object, seasonally inspired · Pause or cancel anytime
            </p>
          </div>

          <Link
            href="/shop/monthly-ritual"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Continue Your Ritual
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSubscriptionPreview;
