import { motion } from "framer-motion";

const ExperienceIntro = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-subtle mb-8 block">Begin with Intention</span>
          
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            Wellness Begins with Intention
          </h1>
          
          <p className="editorial-text-large mx-auto mt-10 max-w-2xl text-center">
            True healing cannot be rushed. It unfolds in its own time, in the right place, 
            with the right guidance. Each thermal journey we curate begins with a simple 
            question: what does your body need most?
          </p>
          
          <p className="editorial-text mx-auto mt-8 text-center">
            Whether you seek restoration from physical strain, release from mental burden, 
            or simply permission to rest—there is a path designed for you. These are not 
            treatments to be selected from a menu. They are journeys to be embarked upon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceIntro;
