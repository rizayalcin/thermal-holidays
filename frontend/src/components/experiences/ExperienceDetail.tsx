import { motion, AnimatePresence } from "framer-motion";
import { ExperienceCategory } from "@/data/experiences";
import { Check } from "lucide-react";

interface ExperienceDetailProps {
  experience: ExperienceCategory | null;
}

const ExperienceDetail = ({ experience }: ExperienceDetailProps) => {
  if (!experience) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={experience.id}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden bg-card"
      >
        <div className="content-container py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="label-subtle mb-6 block text-center">What This Journey Includes</span>
              <h2 className="text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
                {experience.name}
              </h2>
              
              <p className="editorial-text mx-auto mt-8 text-center">
                {experience.longDescription}
              </p>
            </motion.div>

            <div className="mt-16 grid gap-12 md:grid-cols-2">
              {/* Who is this for */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-serif text-xl text-foreground">
                  Who Is This Experience For?
                </h3>
                <ul className="mt-6 space-y-4">
                  {experience.idealFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Typical elements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-serif text-xl text-foreground">
                  Elements of Your Journey
                </h3>
                <ul className="mt-6 space-y-4">
                  {experience.typicalElements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-highlight" strokeWidth={1.5} />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default ExperienceDetail;
