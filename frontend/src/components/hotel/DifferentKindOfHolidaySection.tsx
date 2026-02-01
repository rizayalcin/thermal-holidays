import { motion } from "framer-motion";

interface DifferentKindOfHolidaySectionProps {
  hotelName: string;
}

const DifferentKindOfHolidaySection = ({ hotelName }: DifferentKindOfHolidaySectionProps) => {
  return (
    <div className="py-16 md:py-20 w-full bg-secondary">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="label-subtle mb-6 block">A Different Kind of Holiday</span>
          
          <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl lg:text-4xl leading-relaxed">
            Not every holiday needs a schedule
          </h2>

          <div className="mt-10 space-y-6">
            <p className="editorial-text editorial-text-large">
              This is a place where days unfold at their own pace. Mornings stretch into 
              late breakfasts. Afternoons dissolve in warm waters. Evenings settle into 
              quiet dinners and early rest.
            </p>

            <p className="editorial-text text-muted-foreground">
              You are choosing a different way to take a holiday—one where stillness 
              is the point, not an absence of something else.
            </p>
          </div>

          {/* Gentle rhythm indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <span>Slower pace</span>
            <span className="text-muted-foreground/30">·</span>
            <span>Restorative rhythm</span>
            <span className="text-muted-foreground/30">·</span>
            <span>Intentional simplicity</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DifferentKindOfHolidaySection;
