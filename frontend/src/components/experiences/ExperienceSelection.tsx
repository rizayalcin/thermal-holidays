import { motion } from "framer-motion";
import { experienceCategories, ExperienceCategory } from "@/data/experiences";

interface ExperienceSelectionProps {
  selectedExperience: ExperienceCategory | null;
  onSelectExperience: (experience: ExperienceCategory) => void;
}

const ExperienceSelection = ({ selectedExperience, onSelectExperience }: ExperienceSelectionProps) => {
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
          <span className="label-subtle mb-6 block">Choose Your Focus</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            What Does Your Body Need?
          </h2>
          <p className="editorial-text mx-auto mt-6">
            Each journey begins with intention. Select the experience that resonates 
            with what you're seeking right now.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experienceCategories.map((experience, index) => (
            <motion.button
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onSelectExperience(experience)}
              className={`group relative overflow-hidden text-left transition-all duration-500 ${
                selectedExperience?.id === experience.id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                
                {/* Selected indicator */}
                {selectedExperience?.id === experience.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-4 top-4 rounded-full bg-primary p-2"
                  >
                    <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                  {experience.tagline}
                </span>
                <h3 className="font-serif text-xl text-primary-foreground md:text-2xl">
                  {experience.name}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-primary-foreground/80">
                  {experience.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSelection;
