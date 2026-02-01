import { motion } from "framer-motion";
import thermalPool from "@/assets/thermal-pool.jpg";
import spaInterior from "@/assets/spa-interior.jpg";

const ThermalSpaSection = () => {
  return (
    <section className="bg-secondary">
      <div className="section-spacing">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 max-w-2xl"
          >
            <span className="label-subtle mb-6 block">Thermal & Spa</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              The healing waters
            </h2>
            <p className="editorial-text mt-6">
              Rich in sulfur, calcium, and magnesium carbonate, our thermal waters
              have been celebrated for their therapeutic properties. Whether seeking
              relief from modern life's tensions or simply a moment of profound peace,
              the waters welcome all who enter.
            </p>
          </motion.div>
        </div>

        {/* Full-width image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative my-16 h-[60vh] w-full"
        >
          <img
            src={thermalPool.src}
            alt="Guest relaxing in outdoor thermal pool"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="content-container">
          {/* Thermal Pools Grid */}
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-xl text-foreground">Outdoor Thermal Pools</h3>
              <p className="editorial-text mt-4">
                Five interconnected pools cascade across the landscape, each maintaining
                a natural temperature between 34°C and 37.5°C. Steam rises gently in the
                morning air as the Tuscan hills frame the horizon.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-serif text-xl text-foreground">Indoor Thermal Grotto</h3>
              <p className="editorial-text mt-4">
                A subterranean sanctuary where natural rock formations create intimate
                chambers. Here, the thermal waters are experienced in their most primal
                form, surrounded by centuries-old stone.
              </p>
            </motion.div>
          </div>

          {/* Spa Section */}
          <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h3 className="font-serif text-2xl text-foreground">Wellness Rituals</h3>
              <p className="editorial-text mt-6">
                Our wellness practitioners draw upon both ancient Tuscan traditions and
                contemporary techniques. Each treatment begins with an assessment of your
                personal needs, creating a bespoke journey toward restoration.
              </p>
              <ul className="mt-8 space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Thermal mud wraps with mineral-rich clay
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Hydromassage and aquatic therapy
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Traditional Tuscan botanical treatments
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Restorative massage therapies
                </li>
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
                src={spaInterior.src}
                alt="Spa treatment room with natural stone walls"
                className="w-full object-cover"
              />
            </motion.div>
          </div>

          {/* Medical Wellness */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 border-t border-border pt-16"
          >
            <div className="max-w-2xl">
              <span className="label-subtle mb-4 block">Medical Wellness</span>
              <h3 className="font-serif text-2xl text-foreground">
                Doctor-supervised programs
              </h3>
              <p className="editorial-text mt-6">
                For those seeking a deeper level of care, our resident physicians offer
                comprehensive wellness programs. From dermatological treatments utilizing
                thermal waters to respiratory therapy and rehabilitation, each program is
                tailored to individual health objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThermalSpaSection;
