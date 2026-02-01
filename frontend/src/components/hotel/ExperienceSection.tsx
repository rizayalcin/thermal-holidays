import { motion } from "framer-motion";

const ExperienceSection = () => {
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
          <span className="label-subtle mb-8 block">The Experience</span>
          
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            Where ancient waters meet timeless tranquility
          </h2>

          <div className="mt-12">
            <p className="editorial-text editorial-text-large mx-auto">
              Nestled in the heart of the Tuscan countryside, Terme di Saturnia draws 
              upon millennia of healing tradition. Here, thermal waters emerge at 37.5°C 
              from deep within the earth, carrying minerals that have soothed travelers 
              since Etruscan times. This is not merely a hotel—it is a sanctuary for those 
              who understand that true wellness is found in stillness, in the gentle rhythm 
              of nature, and in the art of taking one's time.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
            <div className="text-center">
              <span className="font-serif text-4xl text-foreground">37.5°C</span>
              <p className="mt-1 text-sm text-muted-foreground">Natural Temperature</p>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="text-center">
              <span className="font-serif text-4xl text-foreground">3000+</span>
              <p className="mt-1 text-sm text-muted-foreground">Years of History</p>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="text-center">
              <span className="font-serif text-4xl text-foreground">800L</span>
              <p className="mt-1 text-sm text-muted-foreground">Per Second Flow</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
