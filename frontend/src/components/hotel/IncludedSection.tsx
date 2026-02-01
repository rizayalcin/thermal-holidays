import { motion } from "framer-motion";
import { Check } from "lucide-react";

const inclusions = [
  "Unlimited access to thermal pools",
  "Spa facilities including sauna and steam room",
  "Daily wellness activities and classes",
  "Complimentary thermal water bottle service",
  "Access to fitness center and gardens",
  "Welcome thermal treatment on arrival",
  "Bathrobe and slippers for the duration of stay",
  "Artisanal breakfast with local ingredients",
];

const IncludedSection = () => {
  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
              <span className="label-subtle mb-6 block text-center">What Awaits You</span>
              <h2 className="text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
                Your Journey Includes
              </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {inclusions.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-4 py-3"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IncludedSection;
