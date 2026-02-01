import { motion } from "framer-motion";

interface PolicyItem {
  title: string;
  content: string;
}

const policies: PolicyItem[] = [
  {
    title: "Children",
    content: "We warmly welcome families. Children under 12 must be accompanied by adults in thermal areas. A dedicated children's program is available during school holidays.",
  },
  {
    title: "Pets",
    content: "Well-behaved dogs are welcome in select accommodations. Please inform us at time of booking so we may prepare appropriate arrangements.",
  },
  {
    title: "Health considerations",
    content: "Thermal bathing is generally safe and beneficial, though we recommend consulting your physician if you have cardiovascular conditions or are pregnant. Our wellness team is available for guidance.",
  },
  {
    title: "Thermal etiquette",
    content: "To preserve the tranquil atmosphere, we kindly request guests maintain a peaceful environment in all thermal and spa areas. Mobile phones are not permitted in these spaces.",
  },
];

const GoodToKnowSection = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
          <span className="label-subtle mb-6 block text-center">Before You Arrive</span>
          <h2 className="text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
            Good to know
          </h2>

          <div className="mt-12 space-y-8">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-border pb-8 last:border-b-0"
              >
                <h3 className="font-serif text-lg text-foreground">{policy.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{policy.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoodToKnowSection;
