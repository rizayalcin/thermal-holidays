import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Leaf, Heart } from "lucide-react";

const categories = [
  {
    icon: Sparkles,
    title: "Signature Wellness Rituals",
    description: "Therapeutic massages, mineral therapies, and restorative treatments refined over centuries.",
  },
  {
    icon: Leaf,
    title: "Movement & Mind",
    description: "Yoga, meditation, breathwork, and mindful practices in tranquil thermal settings.",
  },
  {
    icon: Heart,
    title: "Medical & Curative Programs",
    description: "Physician-supervised protocols for those seeking deeper, guided healing journeys.",
  },
];

const EnhanceYourStayPreview = () => {
  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-subtle mb-6 block">Personalize Your Journey</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Enhance Your Stay
          </h2>
          <p className="editorial-text mx-auto mt-6">
            Beyond accommodation, our resorts offer thoughtfully designed wellness
            experiences tailored to your goals and preferences.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-lg border border-border bg-background p-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <category.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-serif text-lg text-foreground">
                {category.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/experiences"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Explore wellness experiences →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhanceYourStayPreview;
