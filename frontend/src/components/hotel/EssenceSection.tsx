import { motion } from "framer-motion";

interface EssenceSectionProps {
  hotelName: string;
  description: string;
  experience: string;
  history?: string;
  location?: string;
  heroImage?: string;
}

const EssenceSection = ({ 
  hotelName, 
  description, 
  experience,
  history,
  location,
  heroImage
}: EssenceSectionProps) => {
  return (
    <div className="section-spacing w-full bg-background">
      <div className="content-container">
        {/* Overview Header - Atmosphere Focus */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-subtle mb-6 block">Overview</span>
          
          {/* Main Editorial Headline - Place & Atmosphere */}
          <h2 className="font-serif text-2xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl">
            {description}
          </h2>
        </motion.div>

        {/* Editorial Body - How Days Feel Here */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="editorial-text editorial-text-large">
            {experience}
          </p>
        </motion.div>

        {/* Subtle Metadata - Secondary */}
        {(location || history) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            {location && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                {location}
              </span>
            )}
            {history && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                {history}+ years of heritage
              </span>
            )}
          </motion.div>
        )}

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </div>
    </div>
  );
};

export default EssenceSection;
