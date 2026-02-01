import { motion, AnimatePresence } from "framer-motion";
import { ExperienceCategory, getPackagesForExperience, WellnessPackage } from "@/data/experiences";
import { Check, Clock, Sparkles } from "lucide-react";

interface ExperiencePackagesProps {
  experience: ExperienceCategory | null;
  selectedPackage: WellnessPackage | null;
  onSelectPackage: (pkg: WellnessPackage) => void;
}

const ExperiencePackages = ({ experience, selectedPackage, onSelectPackage }: ExperiencePackagesProps) => {
  if (!experience) return null;

  const packages = getPackagesForExperience(experience.id);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={experience.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-spacing bg-secondary"
      >
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="label-subtle mb-6 block">Designed Programs</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Curated Wellness Journeys
            </h2>
            <p className="editorial-text mx-auto mt-6">
              Each program has been thoughtfully designed by our wellness advisors. 
              These are not menus of services—they are complete experiences, crafted 
              with intention and care.
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl space-y-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`cursor-pointer overflow-hidden transition-all duration-300 ${
                  selectedPackage?.id === pkg.id
                    ? "bg-card ring-2 ring-primary"
                    : "bg-card hover:bg-card/80"
                }`}
                onClick={() => onSelectPackage(pkg)}
              >
                {/* Package Card */}
                <div className="p-8 lg:p-10">
                  {/* Header with badges */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      {/* Duration & Focus Badges */}
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground">
                          <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                          {pkg.duration}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                          {pkg.focus}
                        </span>
                      </div>
                      
                      {/* Package Title */}
                      <h3 className="font-serif text-2xl text-foreground lg:text-3xl">
                        {pkg.name}
                      </h3>
                      
                      {/* Full Description */}
                      <p className="mt-4 leading-relaxed text-muted-foreground lg:text-lg">
                        {pkg.description}
                      </p>
                    </div>
                    
                    {/* Price */}
                    {pkg.startingPrice && (
                      <div className="flex-shrink-0 rounded-lg bg-secondary p-4 text-center lg:min-w-[160px]">
                        <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                          Starting from
                        </span>
                        <p className="mt-1 font-serif text-xl text-foreground lg:text-2xl">
                          {pkg.startingPrice.replace("From ", "")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Expanded Content - What's Included */}
                  <AnimatePresence>
                    {selectedPackage?.id === pkg.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-10 border-t border-border pt-10">
                          {/* What's Included Section */}
                          <div className="mb-10">
                            <h4 className="mb-6 font-serif text-xl text-foreground">
                              Your Journey Includes
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {pkg.included.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
                                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-highlight" strokeWidth={1.5} />
                                  <span className="text-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Duration Details */}
                          <div className="mb-10 rounded-lg border border-border bg-background p-6">
                            <h4 className="mb-4 font-serif text-lg text-foreground">
                              Program Duration
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-3">
                              <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Length</span>
                                <p className="mt-1 font-serif text-lg text-foreground">{pkg.duration}</p>
                              </div>
                              <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Focus Area</span>
                                <p className="mt-1 font-serif text-lg text-foreground">{pkg.focus}</p>
                              </div>
                              <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Best For</span>
                                <p className="mt-1 font-serif text-lg text-foreground">All Levels</p>
                              </div>
                            </div>
                          </div>

                          {/* Booking CTA */}
                          <div className="flex flex-col items-center gap-4 rounded-lg bg-primary/5 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
                            <div>
                              <h4 className="font-serif text-xl text-foreground">
                                Ready to begin your journey?
                              </h4>
                              <p className="mt-2 text-muted-foreground">
                                Our wellness advisors are here to answer your questions and help you plan.
                              </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                              <button className="btn-premium whitespace-nowrap">
                                Check Availability
                              </button>
                              <button className="btn-outline-premium whitespace-nowrap">
                                Enquire About Program
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Collapsed State Indicator */}
                  {selectedPackage?.id !== pkg.id && (
                    <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Click to view full details and booking options</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default ExperiencePackages;
