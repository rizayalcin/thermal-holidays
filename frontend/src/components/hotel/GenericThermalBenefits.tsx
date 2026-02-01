import { motion } from "framer-motion";
import { Droplets, Heart, Moon, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Droplets,
    title: "Mineral Healing",
    description:
      "Natural thermal waters rich in sulfur, magnesium, and calcium help soothe muscles, ease joint pain, and promote deep relaxation.",
  },
  {
    icon: Heart,
    title: "Circulation",
    description:
      "Warm thermal bathing improves blood flow, reduces blood pressure, and supports cardiovascular health through gentle hydrotherapy.",
  },
  {
    icon: Sparkles,
    title: "Skin Renewal",
    description:
      "Mineral-rich waters cleanse and nourish the skin, helping with conditions like eczema and psoriasis while promoting a healthy glow.",
  },
  {
    icon: Moon,
    title: "Restful Sleep",
    description:
      "The natural relaxation response from thermal bathing regulates body temperature and calms the nervous system for deeper, more restorative sleep.",
  },
];

const GenericThermalBenefits = () => {
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
          <span className="label-subtle mb-6 block">The Science of Wellness</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Benefits of Thermal Bathing
          </h2>
          <p className="editorial-text mx-auto mt-6 max-w-2xl">
            For millennia, cultures around the world have recognized the healing 
            power of natural thermal waters. Modern science continues to validate 
            these ancient wellness traditions.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
                <benefit.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-serif text-lg text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 border-t border-border pt-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-lg italic text-foreground/80">
              "Taking the waters" has been a cornerstone of European wellness culture 
              for centuries. Today, thermal spas continue this tradition, offering 
              sanctuary from modern life while harnessing nature's healing gifts.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GenericThermalBenefits;
