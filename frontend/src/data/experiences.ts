import { hotels } from "./destinations";

export interface ExperienceCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  idealFor: string[];
  typicalElements: string[];
  suitableHotelIds: string[];
  image: string;
}

export interface WellnessPackage {
  id: string;
  experienceId: string;
  name: string;
  duration: string;
  focus: string;
  description: string;
  included: string[];
  suitableHotelIds: string[];
  startingPrice?: string;
}


export const experienceCategories: ExperienceCategory[] = [
  {
    id: "medical-wellness",
    name: "Medical Wellness & Rehabilitation",
    tagline: "Science-guided healing",
    description: "Doctor-supervised programs combining thermal therapies with modern medicine for profound physical restoration.",
    longDescription: `For those seeking more than relaxation—a structured path toward healing. Our medical wellness programs are developed in consultation with physicians who specialize in balneotherapy, rheumatology, and rehabilitative medicine. Each program begins with a comprehensive health assessment, followed by a personalized treatment protocol that harnesses the therapeutic power of mineral-rich thermal waters.`,
    idealFor: [
      "Those recovering from injury or surgery",
      "Guests managing chronic conditions",
      "Those seeking physician-guided wellness",
      "Individuals pursuing preventive health care"
    ],
    typicalElements: [
      "Initial medical consultation and health assessment",
      "Daily supervised thermal treatments",
      "Physiotherapy and movement sessions",
      "Therapeutic massage protocols",
      "Nutritional guidance and dietary support",
      "Progress monitoring and adjustment"
    ],
    suitableHotelIds: ["terme-di-saturnia", "terme-di-ischia", "fonteverde", "szechenyi-baths"],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
  },
  {
    id: "detox-renewal",
    name: "Detox & Renewal",
    tagline: "Release, restore, renew",
    description: "Cleansing programs designed to purify body and mind through thermal immersion, fasting protocols, and restorative practices.",
    longDescription: `A gentle yet profound reset for the modern traveler. Our detox programs combine the purifying properties of thermal waters with carefully designed nutritional protocols and cleansing treatments. This is not about deprivation—it's about creating space for renewal, allowing the body's natural wisdom to emerge.`,
    idealFor: [
      "Those feeling depleted by modern life",
      "Guests seeking a fresh start",
      "Individuals interested in cleansing rituals",
      "Those preparing for a new life chapter"
    ],
    typicalElements: [
      "Thermal water fasting protocols",
      "Detoxifying mud and wrap treatments",
      "Lymphatic drainage massage",
      "Infrared and steam therapies",
      "Light, cleansing cuisine",
      "Guided meditation and breathwork"
    ],
    suitableHotelIds: ["terme-di-saturnia", "fonteverde", "grotta-giusti", "blue-lagoon"],
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070"
  },
  {
    id: "yoga-mindfulness",
    name: "Yoga & Mindfulness Retreats",
    tagline: "Stillness finds you here",
    description: "Contemplative programs weaving yoga practice, meditation, and thermal immersion into a journey of inner discovery.",
    longDescription: `Where the ancient practice of yoga meets the healing power of thermal waters. Our mindfulness retreats create a container for transformation—morning practices greeting the dawn, afternoons surrendered to thermal pools, evenings in quiet reflection. Each retreat is led by experienced teachers who understand that true wellness encompasses body, mind, and spirit.`,
    idealFor: [
      "Practitioners seeking to deepen their practice",
      "Those new to yoga and meditation",
      "Guests seeking mental clarity and peace",
      "Individuals navigating life transitions"
    ],
    typicalElements: [
      "Daily yoga sessions (various styles)",
      "Guided meditation practices",
      "Thermal pool contemplation",
      "Silent meals and mindful eating",
      "Journaling and reflection time",
      "Sound healing and restorative sessions"
    ],
    suitableHotelIds: ["gora-kadan", "aqua-dome", "polynesian-spa", "blue-lagoon"],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070"
  },
  {
    id: "thermal-cure",
    name: "Thermal Cure & Balneotherapy",
    tagline: "The waters remember",
    description: "Traditional European cure programs honoring centuries of thermal healing wisdom through structured immersion protocols.",
    longDescription: `The classic European thermal cure—a time-honored tradition refined over centuries. These programs follow the rhythms that generations of healers have found most effective: specific durations of immersion, particular water temperatures, and carefully sequenced treatments. There is wisdom in this tradition, and our programs honor it while adapting to modern understanding.`,
    idealFor: [
      "Those with musculoskeletal concerns",
      "Guests seeking traditional cure protocols",
      "Individuals with skin conditions",
      "Those interested in thermal heritage"
    ],
    typicalElements: [
      "Structured thermal immersion schedule",
      "Mineral mud applications",
      "Hydrotherapy circuits",
      "Drinking cure with mineral waters",
      "Inhalation therapies",
      "Rest and integration periods"
    ],
    suitableHotelIds: ["terme-di-saturnia", "szechenyi-baths", "gellert-thermal", "bagno-vignoni"],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070"
  },
  {
    id: "deep-relaxation",
    name: "Deep Relaxation & Massage Rituals",
    tagline: "Permission to simply be",
    description: "Immersive experiences focused purely on rest, featuring world-class massage traditions and unhurried thermal bathing.",
    longDescription: `Sometimes what we need most is permission to do nothing at all. Our deep relaxation programs are crafted for those who arrive exhausted and seek only rest. No schedules to keep, no goals to achieve—simply hours of skilled touch, warm waters, and the profound relief of releasing everything that does not serve.`,
    idealFor: [
      "The chronically stressed and overworked",
      "Couples seeking reconnection",
      "Those recovering from burnout",
      "Guests who simply need to rest"
    ],
    typicalElements: [
      "Extended massage rituals",
      "Unlimited thermal pool access",
      "Aromatherapy and sensory experiences",
      "Private thermal bathing options",
      "In-room dining and privacy",
      "Sleep enhancement protocols"
    ],
    suitableHotelIds: ["terme-di-saturnia", "gora-kadan", "aqua-dome", "polynesian-spa", "blue-lagoon"],
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2074"
  }
];

export const wellnessPackages: WellnessPackage[] = [
  // Medical Wellness Packages
  {
    id: "medical-thermal-recovery-7",
    experienceId: "medical-wellness",
    name: "7-Night Medical Thermal Recovery",
    duration: "7 nights",
    focus: "Rehabilitation & Restoration",
    description: "A comprehensive physician-guided program combining daily thermal treatments with physiotherapy and personalized care for meaningful physical restoration.",
    included: [
      "Luxury accommodation with thermal views",
      "Initial and follow-up medical consultations",
      "Daily supervised thermal immersion",
      "5 physiotherapy sessions",
      "3 therapeutic massage treatments",
      "Nutritional assessment and meal planning",
      "Full board with therapeutic cuisine",
      "24-hour wellness concierge"
    ],
    suitableHotelIds: ["terme-di-saturnia", "terme-di-ischia", "fonteverde"],
    startingPrice: "From €3,200"
  },
  {
    id: "medical-intensive-14",
    experienceId: "medical-wellness",
    name: "14-Night Intensive Healing Program",
    duration: "14 nights",
    focus: "Deep Rehabilitation",
    description: "An extended medical wellness journey for those requiring comprehensive treatment and sufficient time for the body's natural healing processes.",
    included: [
      "Premium suite accommodation",
      "Comprehensive medical assessment",
      "Daily thermal and hydrotherapy treatments",
      "10 physiotherapy sessions",
      "8 specialized massage treatments",
      "Mud therapy applications",
      "Personalized nutrition program",
      "Full board dining",
      "Airport transfers and coordination"
    ],
    suitableHotelIds: ["terme-di-saturnia", "szechenyi-baths"],
    startingPrice: "From €5,800"
  },
  
  // Detox Packages
  {
    id: "detox-renewal-5",
    experienceId: "detox-renewal",
    name: "5-Day Renewal & Reset",
    duration: "5 nights",
    focus: "Cleansing & Clarity",
    description: "A gentle yet effective cleansing program combining thermal purification, light nutrition, and restorative treatments for those seeking a fresh beginning.",
    included: [
      "Tranquil accommodation",
      "Welcome wellness consultation",
      "Daily thermal pool rituals",
      "3 detoxifying body treatments",
      "2 lymphatic massage sessions",
      "Cleansing cuisine and juices",
      "Morning movement classes",
      "Guided meditation sessions"
    ],
    suitableHotelIds: ["terme-di-saturnia", "fonteverde", "blue-lagoon"],
    startingPrice: "From €1,850"
  },
  {
    id: "deep-detox-7",
    experienceId: "detox-renewal",
    name: "7-Night Deep Detox Journey",
    duration: "7 nights",
    focus: "Complete Purification",
    description: "An immersive cleansing experience allowing time for profound release and renewal through thermal therapies, specialized treatments, and mindful nutrition.",
    included: [
      "Private suite with nature views",
      "Initial and closing consultations",
      "Daily thermal circuit access",
      "5 body purification treatments",
      "3 facial cleansing rituals",
      "Personalized detox meal program",
      "Daily yoga and breathwork",
      "Digital detox support"
    ],
    suitableHotelIds: ["fonteverde", "grotta-giusti", "blue-lagoon"],
    startingPrice: "From €2,600"
  },
  
  // Yoga & Mindfulness Packages
  {
    id: "yoga-thermal-5",
    experienceId: "yoga-mindfulness",
    name: "5-Day Yoga & Thermal Immersion",
    duration: "5 nights",
    focus: "Practice & Presence",
    description: "A harmonious blend of daily yoga practice and thermal bathing, designed to deepen awareness and restore equilibrium.",
    included: [
      "Peaceful accommodation",
      "Twice-daily yoga sessions",
      "Unlimited thermal pool access",
      "2 therapeutic massages",
      "Guided meditation classes",
      "Healthy vegetarian cuisine",
      "Welcome and closing ceremonies",
      "Personal practice guidance"
    ],
    suitableHotelIds: ["gora-kadan", "aqua-dome", "polynesian-spa"],
    startingPrice: "From €1,650"
  },
  {
    id: "silent-retreat-7",
    experienceId: "yoga-mindfulness",
    name: "7-Night Silent Mindfulness Retreat",
    duration: "7 nights",
    focus: "Deep Inner Journey",
    description: "A contemplative week of noble silence, gentle movement, and thermal contemplation for those seeking profound inner transformation.",
    included: [
      "Private retreat accommodation",
      "Daily yoga and movement practice",
      "Guided silent meditation sessions",
      "Private thermal bathing times",
      "3 mindful massage treatments",
      "Contemplative meals in silence",
      "Nature walking meditation",
      "Personal guidance sessions"
    ],
    suitableHotelIds: ["gora-kadan", "blue-lagoon"],
    startingPrice: "From €2,400"
  },
  
  // Thermal Cure Packages
  {
    id: "classic-cure-7",
    experienceId: "thermal-cure",
    name: "7-Night Classic Thermal Cure",
    duration: "7 nights",
    focus: "Traditional Balneotherapy",
    description: "Following the time-honored European cure tradition, this program offers structured thermal immersion and treatments refined over centuries.",
    included: [
      "Cure hotel accommodation",
      "Daily thermal bath sessions",
      "4 mineral mud applications",
      "Hydrotherapy treatments",
      "Drinking cure with mineral waters",
      "Thermal pool access",
      "Half-board with cure cuisine",
      "Wellness guidance"
    ],
    suitableHotelIds: ["szechenyi-baths", "terme-di-saturnia", "bagno-vignoni"],
    startingPrice: "From €1,450"
  },
  {
    id: "intensive-cure-14",
    experienceId: "thermal-cure",
    name: "14-Night Intensive Thermal Cure",
    duration: "14 nights",
    focus: "Complete Cure Protocol",
    description: "The traditional two-week cure, allowing sufficient time for the thermal waters to work their profound effects on body and spirit.",
    included: [
      "Extended stay accommodation",
      "Daily thermal immersion schedule",
      "10 mud therapy sessions",
      "Complete hydrotherapy circuit",
      "Inhalation treatments",
      "Therapeutic massage series",
      "Full board cure cuisine",
      "Medical supervision"
    ],
    suitableHotelIds: ["szechenyi-baths", "terme-di-saturnia"],
    startingPrice: "From €2,800"
  },
  
  // Deep Relaxation Packages
  {
    id: "couples-escape-3",
    experienceId: "deep-relaxation",
    name: "3-Night Couples Wellness Escape",
    duration: "3 nights",
    focus: "Reconnection & Romance",
    description: "An intimate retreat designed for two, featuring couples treatments, private thermal experiences, and unhurried time together.",
    included: [
      "Romantic suite accommodation",
      "Couples welcome ritual",
      "Private thermal pool session",
      "Side-by-side massage experience",
      "Romantic dinner experience",
      "Champagne and amenities",
      "Late checkout",
      "Rose petal turndown"
    ],
    suitableHotelIds: ["terme-di-saturnia", "gora-kadan", "aqua-dome"],
    startingPrice: "From €1,200 per couple"
  },
  {
    id: "deep-rest-5",
    experienceId: "deep-relaxation",
    name: "5-Night Deep Rest & Restoration",
    duration: "5 nights",
    focus: "Complete Relaxation",
    description: "For those who arrive exhausted and need nothing more than to rest. Extended massages, unhurried bathing, and permission to simply be.",
    included: [
      "Quiet retreat accommodation",
      "Daily extended massage (75 min)",
      "Unlimited thermal access",
      "2 aromatic body treatments",
      "Sleep enhancement ritual",
      "In-room breakfast service",
      "Flexible dining times",
      "No-schedule wellness"
    ],
    suitableHotelIds: ["gora-kadan", "polynesian-spa", "blue-lagoon", "aqua-dome"],
    startingPrice: "From €1,550"
  },
  {
    id: "ultimate-renewal-7",
    experienceId: "deep-relaxation",
    name: "7-Night Ultimate Renewal",
    duration: "7 nights",
    focus: "Total Transformation",
    description: "A week dedicated entirely to restoration. Our most comprehensive relaxation program for those seeking profound rejuvenation.",
    included: [
      "Premium suite with thermal views",
      "Daily massage of choice",
      "4 specialty body treatments",
      "2 facial rejuvenation rituals",
      "Private thermal experiences",
      "Personalized aromatherapy blend",
      "Full board gourmet dining",
      "Personal wellness host"
    ],
    suitableHotelIds: ["terme-di-saturnia", "gora-kadan", "blue-lagoon"],
    startingPrice: "From €3,400"
  }
];

// Helper function to get experience by ID
export const getExperienceById = (id: string): ExperienceCategory | undefined => {
  return experienceCategories.find(exp => exp.id === id);
};

// Helper function to get packages for an experience
export const getPackagesForExperience = (experienceId: string): WellnessPackage[] => {
  return wellnessPackages.filter(pkg => pkg.experienceId === experienceId);
};

// Helper function to get suitable hotels for an experience
export const getSuitableHotelsForExperience = (experienceId: string) => {
  const experience = getExperienceById(experienceId);
  if (!experience) return [];
  return hotels.filter(hotel => experience.suitableHotelIds.includes(hotel.id));
};

// Helper function to get suitable hotels for a package
export const getSuitableHotelsForPackage = (packageId: string) => {
  const pkg = wellnessPackages.find(p => p.id === packageId);
  if (!pkg) return [];
  return hotels.filter(hotel => pkg.suitableHotelIds.includes(hotel.id));
};
