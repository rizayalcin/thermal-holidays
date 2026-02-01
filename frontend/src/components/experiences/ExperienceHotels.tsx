import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExperienceCategory, getSuitableHotelsForExperience } from "@/data/experiences";
import { ArrowRight } from "lucide-react";

interface ExperienceHotelsProps {
  experience: ExperienceCategory | null;
}

// Why each hotel fits specific experiences
const hotelFitDescriptions: Record<string, Record<string, string>> = {
  "medical-wellness": {
    "terme-di-saturnia": "Centuries of healing tradition with on-site physicians specializing in thermal medicine.",
    "terme-di-ischia": "Volcanic waters medically recognized for rheumatic and dermatological conditions.",
    "fonteverde": "Medici heritage combined with cutting-edge diagnostic and treatment facilities.",
    "szechenyi-baths": "Hungary's grand thermal tradition with comprehensive medical spa programs.",
  },
  "detox-renewal": {
    "terme-di-saturnia": "Sulfur-rich waters renowned for their deep purifying properties.",
    "fonteverde": "Bioaquam circuit designed specifically for detoxification protocols.",
    "grotta-giusti": "Unique cave microclimate offering natural purification through thermal steam.",
    "blue-lagoon": "Silica-rich geothermal waters known for skin renewal and cleansing.",
  },
  "yoga-mindfulness": {
    "gora-kadan": "Japanese ryokan tradition offering profound stillness and contemplative spaces.",
    "aqua-dome": "Alpine serenity with dedicated yoga spaces overlooking the Tyrolean mountains.",
    "polynesian-spa": "Māori healing wisdom in a sacred geothermal landscape.",
    "blue-lagoon": "Otherworldly Icelandic environment perfect for meditative immersion.",
  },
  "thermal-cure": {
    "terme-di-saturnia": "Italy's premier destination for traditional balneotherapy protocols.",
    "szechenyi-baths": "Europe's largest medicinal bath complex with century-old cure traditions.",
    "gellert-thermal": "Art Nouveau grandeur housing Budapest's most sophisticated thermal programs.",
    "bagno-vignoni": "Medieval thermal village preserving Renaissance bathing culture.",
  },
  "deep-relaxation": {
    "terme-di-saturnia": "Tuscan tranquility with world-class massage and thermal indulgence.",
    "gora-kadan": "The art of Japanese hospitality devoted entirely to guest restoration.",
    "aqua-dome": "Modern Alpine spa design crafted for complete sensory relaxation.",
    "polynesian-spa": "Therapeutic Māori traditions in dramatic volcanic surroundings.",
    "blue-lagoon": "Iconic retreat where Nordic minimalism meets geothermal wonder.",
  },
};

const ExperienceHotels = ({ experience }: ExperienceHotelsProps) => {
  if (!experience) return null;

  const hotels = getSuitableHotelsForExperience(experience.id);
  const fitDescriptions = hotelFitDescriptions[experience.id] || {};

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={experience.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-spacing bg-background"
      >
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="label-subtle mb-6 block">Where This Experience Lives Best</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Curated Retreats for {experience.name.split("&")[0].trim()}
            </h2>
            <p className="editorial-text mx-auto mt-6">
              Not every resort is suited to every purpose. These properties have been
              selected for their exceptional alignment with this particular journey.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-8">
            {hotels.slice(0, 4).map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/hotels/${hotel.id}`}
                  className="group flex flex-col gap-6 border-b border-border pb-8 transition-colors hover:border-primary/30 md:flex-row"
                >
                  {/* Hotel image */}
                  <div className="h-48 w-full flex-shrink-0 overflow-hidden md:h-32 md:w-48">
                    <img
                      src={hotel.heroImage}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Hotel details */}
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="label-subtle mb-1 block text-muted-foreground">
                          {hotel.location}
                        </span>
                        <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-highlight">
                          {hotel.name}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-highlight">
                        View
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {fitDescriptions[hotel.id] || hotel.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default ExperienceHotels;
