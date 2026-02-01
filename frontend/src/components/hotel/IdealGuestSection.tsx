import { motion } from "framer-motion";
import { Heart, MapPin, Clock, Sparkles, LucideIcon } from "lucide-react";

interface GuestProfile {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface IdealGuestSectionProps {
  hotelName: string;
  profiles?: GuestProfile[];
  customDescription?: string;
}

const defaultProfiles: GuestProfile[] = [
  {
    icon: Heart,
    title: "Couples Seeking Calm",
    description: "Partners who treasure privacy, unhurried mornings, and meaningful time together",
  },
  {
    icon: Clock,
    title: "Slow Travelers",
    description: "Those who prefer depth over breadth, staying longer in fewer places",
  },
  {
    icon: MapPin,
    title: "Destination Seekers",
    description: "Travelers drawn to places with character, history, and a sense of arrival",
  },
  {
    icon: Sparkles,
    title: "Quality Over Activity",
    description: "Guests who value atmosphere and comfort over packed itineraries",
  },
];

const IdealGuestSection = ({ 
  hotelName, 
  profiles = defaultProfiles,
  customDescription 
}: IdealGuestSectionProps) => {
  return (
    <div className="py-16 md:py-20 w-full bg-card">
      <div className="content-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-subtle mb-6 block">Who This Hotel Is For</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              A place for those who know what they want
            </h2>
            <p className="editorial-text mt-6">
              {customDescription || 
                `${hotelName} is not for everyone—and that is by design. It welcomes guests 
                who understand that the best holidays are not about doing more, but about 
                being present. Those who arrive here are choosing calm over stimulation, 
                atmosphere over amenities, and meaning over novelty.`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {profiles.slice(0, 4).map((profile, index) => (
              <motion.div
                key={profile.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="rounded-lg bg-background p-6"
              >
                <profile.icon 
                  className="mb-4 h-6 w-6 text-muted-foreground" 
                  strokeWidth={1.5} 
                />
                <h3 className="font-serif text-lg text-foreground">{profile.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {profile.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IdealGuestSection;
