import { motion } from "framer-motion";
import { Droplets, History, Heart } from "lucide-react";

const curationPillars = [
  {
    icon: Droplets,
    title: "Exceptional Waters",
    description: "Only thermal sources with proven mineral richness and therapeutic properties.",
  },
  {
    icon: History,
    title: "Proven Wellness Traditions",
    description: "Destinations with authentic healing heritage spanning generations.",
  },
  {
    icon: Heart,
    title: "Thoughtful Hospitality",
    description: "Resorts that prioritize genuine care and personalized guest experiences.",
  },
];

const HowWeCurateSection = () => {
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
          <span className="label-subtle mb-6 block">Our Philosophy</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            How We Curate
          </h2>
          <p className="editorial-text mx-auto mt-6">
            Every destination in our collection meets exacting standards 
            for authenticity, quality, and transformative potential.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-3">
          {curationPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
                <pillar.icon className="h-7 w-7 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-serif text-xl text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeCurateSection;
