import { motion } from "framer-motion";
import { 
  Wifi, 
  Car, 
  UtensilsCrossed, 
  Dumbbell, 
  Waves, 
  Sparkles, 
  TreePine, 
  Clock, 
  Users, 
  Accessibility,
  Wine,
  Shirt
} from "lucide-react";

interface FacilitiesSectionProps {
  hotelName: string;
}

const facilities = [
  { icon: Waves, label: "Thermal Pools", description: "Indoor & outdoor" },
  { icon: Sparkles, label: "Spa Center", description: "Full service" },
  { icon: UtensilsCrossed, label: "Fine Dining", description: "Farm to table" },
  { icon: Dumbbell, label: "Fitness Center", description: "24/7 access" },
  { icon: Wifi, label: "High-Speed WiFi", description: "Complimentary" },
  { icon: Car, label: "Valet Parking", description: "On-site" },
  { icon: TreePine, label: "Gardens", description: "Private grounds" },
  { icon: Clock, label: "Concierge", description: "24-hour service" },
  { icon: Users, label: "Meeting Rooms", description: "Event spaces" },
  { icon: Accessibility, label: "Accessible", description: "Wheelchair friendly" },
  { icon: Wine, label: "Wine Cellar", description: "Curated selection" },
  { icon: Shirt, label: "Laundry", description: "Same-day service" },
];

const FacilitiesSection = ({ hotelName }: FacilitiesSectionProps) => {
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
          <span className="label-subtle mb-6 block">What Awaits You</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            The Experience
          </h2>
          <p className="editorial-text mx-auto mt-6 max-w-2xl">
            Every detail at {hotelName} has been thoughtfully considered to ensure 
            your comfort and wellbeing throughout your stay.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center rounded-lg border border-border bg-background p-6 text-center transition-colors hover:border-foreground/20"
            >
              <facility.icon className="mb-3 h-6 w-6 text-foreground" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground">{facility.label}</span>
              <span className="mt-1 text-xs text-muted-foreground">{facility.description}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
