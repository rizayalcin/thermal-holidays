import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DecisionCtaSectionProps {
  hotelName: string;
  onBooking: () => void;
}

const DecisionCtaSection = ({ hotelName, onBooking }: DecisionCtaSectionProps) => {
  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="label-subtle mb-6 block">Begin Your Stay</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            Ready to spend time at {hotelName}?
          </h2>
          <p className="editorial-text mx-auto mt-8">
            This is a place you arrive at, not a program you enroll in. 
            Our team is here to help you plan a stay that suits your rhythm.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button onClick={onBooking} className="btn-premium min-w-[220px]">
              <Calendar className="mr-2 h-4 w-4" />
              Check Availability
            </Button>
            <button className="btn-outline-premium min-w-[220px]">
              Speak with Our Curators
            </button>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            For groups of 10 or more, please contact our team directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DecisionCtaSection;
