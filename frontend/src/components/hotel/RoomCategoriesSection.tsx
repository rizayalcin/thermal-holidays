import { motion } from "framer-motion";
import roomSuite from "@/assets/room-suite.jpg";

interface RoomCategory {
  name: string;
  description: string;
}

const rooms: RoomCategory[] = [
  {
    name: "Comfort Room",
    description: "Intimate spaces with views of the Tuscan gardens, featuring handcrafted furnishings.",
  },
  {
    name: "Deluxe Suite",
    description: "Generous accommodations with private terraces overlooking the thermal pools.",
  },
  {
    name: "Spa Suite",
    description: "Sanctuary living with private thermal bathing and dedicated wellness amenities.",
  },
  {
    name: "Villa Residences",
    description: "Secluded retreats with private gardens, pools, and personalized service.",
  },
];

const RoomCategoriesSection = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <span className="label-subtle mb-6 block">Rest & Retreat</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Stays & Suites
          </h2>
          <p className="editorial-text mt-6">
            Each space has been designed as a private retreat, where natural materials
            and muted tones create an atmosphere of restful simplicity.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src={roomSuite.src}
              alt="Luxury suite with panoramic mountain views"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Room List */}
          <div className="flex flex-col justify-center">
            {rooms.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-border py-8 first:pt-0 last:border-b-0"
              >
                <h3 className="font-serif text-xl text-foreground">{room.name}</h3>
                <p className="mt-2 text-muted-foreground">{room.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomCategoriesSection;
