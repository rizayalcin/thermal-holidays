import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WhyWeSelectedSectionProps {
  hotelName: string;
  reasons?: string[];
}

const defaultReasons = [
  "A setting that stays with you long after departure",
  "Architecture and interiors that reflect the soul of the place",
  "Staff who understand hospitality as quiet attentiveness",
  "A pace designed for rest, not performance",
  "Thermal waters that enhance, rather than define, the experience",
];

const WhyWeSelectedSection = ({ 
  hotelName, 
  reasons = defaultReasons 
}: WhyWeSelectedSectionProps) => {
  return (
    <div className="section-spacing w-full bg-card">
      <div className="content-container">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Sparkles className="h-5 w-5 text-thermal" strokeWidth={1.5} />
            </div>
            <span className="label-subtle mb-4 block">Curator's Selection</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Why We Chose {hotelName}
            </h2>
            <p className="editorial-text mx-auto mt-6">
              Every hotel in our collection has been personally visited and considered 
              for how it feels as a place to spend time—not just as a list of facilities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="space-y-6">
              {reasons.slice(0, 5).map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-thermal" />
                  <p className="text-foreground leading-relaxed">{reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center text-sm italic text-muted-foreground"
          >
            Personally selected by our travel curators
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default WhyWeSelectedSection;
