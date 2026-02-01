import { motion } from "framer-motion";
import { Thermometer, Droplets, Beaker, Layers } from "lucide-react";

interface WatersWellnessSectionProps {
  hotelName: string;
  thermalTemp: string;
  thermalDescription: string;
  thermalPoolImage: string;
  spaImage: string;
  outdoorPools: string;
  indoorPools: string;
  spaDescription: string;
  spaServices: string[];
  thermalProperties?: {
    phLevel?: string;
    waterType: string;
    waterOrigin: string;
    waterAge?: string;
    minerals: { mineral: string }[];
  };
}

const WatersWellnessSection = ({
  hotelName,
  thermalTemp,
  thermalDescription,
  thermalPoolImage,
  spaImage,
  outdoorPools,
  indoorPools,
  spaDescription,
  spaServices,
  thermalProperties,
}: WatersWellnessSectionProps) => {
  return (
    <section className="bg-secondary">
      <div className="section-spacing">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="label-subtle mb-6 block">Waters & Wellness</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
              The Healing Source
            </h2>
            <p className="editorial-text mx-auto mt-8">
              {thermalDescription}
            </p>
          </motion.div>

          {/* Water Properties Grid */}
          {thermalProperties && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                  <Thermometer className="h-6 w-6 text-thermal" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-2xl text-thermal">{thermalTemp}</span>
                <p className="mt-1 text-sm text-muted-foreground">Natural Temperature</p>
              </div>

              {thermalProperties.phLevel && (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                    <Beaker className="h-6 w-6 text-thermal-muted" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-2xl text-foreground">{thermalProperties.phLevel}</span>
                  <p className="mt-1 text-sm text-muted-foreground">pH Level</p>
                </div>
              )}

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                  <Droplets className="h-6 w-6 text-thermal-muted" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-lg text-foreground">{thermalProperties.waterType}</span>
                <p className="mt-1 text-sm text-muted-foreground">Classification</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-thermal/10">
                  <Layers className="h-6 w-6 text-thermal-muted" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-lg text-foreground">{thermalProperties.waterOrigin}</span>
                <p className="mt-1 text-sm text-muted-foreground">Source Origin</p>
              </div>
            </motion.div>
          )}

          {/* Key Minerals */}
          {thermalProperties?.minerals && thermalProperties.minerals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-12 max-w-3xl"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {thermalProperties.minerals.slice(0, 6).map((m, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-thermal-muted/30 bg-thermal/5 px-4 py-2 text-sm text-foreground"
                  >
                    {m.mineral}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Full-width thermal pool image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative my-16 h-[60vh] w-full"
        >
          <img
            src={thermalPoolImage}
            alt="Thermal pool"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="content-container">
          {/* Indoor vs Outdoor */}
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-xl text-foreground">Outdoor Thermal Experience</h3>
              <p className="editorial-text mt-4">{outdoorPools}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-serif text-xl text-foreground">Indoor Thermal Sanctuary</h3>
              <p className="editorial-text mt-4">{indoorPools}</p>
            </motion.div>
          </div>

          {/* Wellness Rituals */}
          <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h3 className="font-serif text-2xl text-foreground">Therapeutic Rituals</h3>
              <p className="editorial-text mt-6">{spaDescription}</p>
              <ul className="mt-8 space-y-3 text-muted-foreground">
                {spaServices.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-thermal-muted" />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <img
                src={spaImage}
                alt="Spa treatment room"
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatersWellnessSection;
