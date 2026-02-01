import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductsUsedAtHotel, shopProducts } from "@/data/shopProducts";
import { getHotelById } from "@/data/destinations";

const ShopRetreatConnection = () => {
  // Get hotels that have products associated with them
  const hotelProductConnections = [
    { hotelId: "terme-di-saturnia", productNote: "The organic cotton bathrobe worn by every guest" },
    { hotelId: "bagno-vignoni", productNote: "The mineral soap found in each suite" },
    { hotelId: "helia-hotel", productNote: "Mineral-infused towels from our Budapest retreat" },
    { hotelId: "blue-lagoon", productNote: "Thermal bath salts sourced from Icelandic springs" },
  ];

  const validConnections = hotelProductConnections
    .map(conn => ({
      ...conn,
      hotel: getHotelById(conn.hotelId),
      products: getProductsUsedAtHotel(conn.hotelId)
    }))
    .filter(conn => conn.hotel && conn.products.length > 0)
    .slice(0, 4);

  if (validConnections.length === 0) return null;

  return (
    <section className="section-spacing bg-card">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="label-subtle mb-6 block">From Our Partner Retreats</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Used in Our Retreats
          </h2>
          <p className="editorial-text mx-auto mt-6">
            These are not recreations or inspired-by products—they are the
            exact items you'll find during your stay at our curated retreats.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {validConnections.map((connection, index) => (
            <motion.div
              key={connection.hotelId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={connection.hotel?.heroImage || connection.products[0]?.image}
                  alt={connection.hotel?.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-lg text-foreground">
                  {connection.hotel?.name}
                </h3>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  {connection.productNote}
                </p>
                <Link
                  href={`/hotel/${connection.hotelId}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>See the retreat</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopRetreatConnection;
