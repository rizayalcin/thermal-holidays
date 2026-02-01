import { motion } from "framer-motion";
import { Droplets, Thermometer, Beaker, Layers } from "lucide-react";

interface WaterSignatureProps {
  hotelName: string;
  temperature: string;
  phLevel?: string;
  waterType: string;
  waterOrigin: string;
  waterAge?: string;
  keyMinerals?: string[];
  description?: string;
}

const WaterSignatureSection = ({
  hotelName,
  temperature,
  phLevel,
  waterType,
  waterOrigin,
  waterAge,
  keyMinerals = [],
  description,
}: WaterSignatureProps) => {
  return (
    <section className="section-spacing bg-secondary">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-12 text-center">
            <span className="label-subtle mb-6 block">The Waters</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
              A Source Unlike Any Other
            </h2>
            {description && (
              <p className="editorial-text mx-auto mt-8 text-center">
                {description}
              </p>
            )}
          </div>

          {/* Water Properties - Elegant Grid with Thermal Accents */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                <Thermometer className="h-6 w-6 text-thermal" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-2xl text-thermal">{temperature}</span>
              <p className="mt-1 text-sm text-muted-foreground">Natural Temperature</p>
            </motion.div>

            {phLevel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                  <Beaker className="h-6 w-6 text-thermal-muted" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-2xl text-foreground">{phLevel}</span>
                <p className="mt-1 text-sm text-muted-foreground">pH Level</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                <Droplets className="h-6 w-6 text-thermal-muted" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-lg text-foreground">{waterType}</span>
              <p className="mt-1 text-sm text-muted-foreground">Classification</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                <Layers className="h-6 w-6 text-thermal-muted" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-lg text-foreground">{waterOrigin}</span>
              <p className="mt-1 text-sm text-muted-foreground">Source Origin</p>
            </motion.div>
          </div>

          {/* Thermal Divider */}
          <div className="divider-thermal mt-16" />

          {/* Key Minerals - Subtle Display with Thermal Accent */}
          {keyMinerals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <h3 className="mb-8 text-center font-serif text-xl text-foreground">
                Mineral Composition
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {keyMinerals.map((mineral, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-thermal-muted/30 bg-thermal/5 px-5 py-2 text-sm text-foreground"
                  >
                    {mineral}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Water Age - Historical Context */}
          {waterAge && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-sm italic text-muted-foreground">
                These waters have journeyed {waterAge} to reach you
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaterSignatureSection;
