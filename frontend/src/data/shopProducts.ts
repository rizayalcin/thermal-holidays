// Thermal Holidays Shop - Enhanced Product & Ritual System

export interface ShopProduct {
  id: string;
  name: string;
  category: ShopCategory;
  description: string;
  essence: string; // Editorial story - origin, material, sensory connection
  whyWeSelected: string[];
  ritual: RitualUsage;
  price: number;
  image: string;
  galleryImages?: string[];
  usedAtHotels?: string[];
  hotelExclusive?: string; // If this is a retreat edition for specific hotel
  materials?: string;
  careInstructions?: string;
  origin?: string;
  sustainability?: string;
  featured?: boolean;
  isGift?: boolean;
  isSeasonal?: boolean;
  seasonalCollection?: string;
  complementaryProducts?: string[];
}

export interface RitualUsage {
  introduction: string;
  steps: RitualStep[];
  bestWith?: string; // Complementary object suggestion
}

export interface RitualStep {
  step: number;
  title: string;
  description: string;
}

export type ShopCategory = 
  | "towels-textiles"
  | "bath-body"
  | "ritual-tools"
  | "aromatherapy"
  | "footwear-comfort"
  | "gifts-objects";

export interface CategoryInfo {
  id: ShopCategory;
  name: string;
  poeticDescription: string;
  image: string;
}

export interface SeasonalCollection {
  id: string;
  name: string;
  season: "spring" | "summer" | "autumn" | "winter";
  manifesto: string;
  description: string;
  image: string;
  productIds: string[];
  available: boolean;
}

export interface RetreatEdition {
  hotelId: string;
  hotelName: string;
  description: string;
  productIds: string[];
}

// Seasonal Collections
export const seasonalCollections: SeasonalCollection[] = [
  {
    id: "winter-stillness",
    name: "Winter Heat & Stillness",
    season: "winter",
    manifesto: "In the quiet of winter, warmth becomes ritual. When frost silences the world outside, we turn inward—to hot mineral waters, to heavy textiles, to scents that embrace.",
    description: "A collection of objects designed for the contemplative months. Each piece encourages slowness, warmth, and the deep rest that winter invites.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80",
    productIds: ["organic-cotton-robe", "eucalyptus-steam-oil", "thermal-bath-salts"],
    available: true
  },
  {
    id: "spring-renewal",
    name: "Spring Mineral Renewal",
    season: "spring",
    manifesto: "As the earth awakens, so must we. Spring is the season of gentle detoxification—of shedding what no longer serves, of inviting lightness and clarity.",
    description: "Objects chosen for their purifying qualities. Brushes that stimulate, minerals that draw out, scents that clear the mind.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
    productIds: ["body-brush-natural", "thermal-mineral-soap", "lavender-pillow-mist"],
    available: false
  },
  {
    id: "summer-balance",
    name: "Summer Balance Ritual",
    season: "summer",
    manifesto: "Summer asks us to find equilibrium—between activity and rest, sun and shade, heat and cooling waters. These objects anchor that balance.",
    description: "A curated selection for the season of long days. Cool stones, light textiles, and the minerals that restore after sun.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    productIds: ["gua-sha-rose-quartz", "mineral-infused-towel", "thermal-bath-salts"],
    available: false
  },
  {
    id: "autumn-grounding",
    name: "Autumn Mineral Grounding",
    season: "autumn",
    manifesto: "As leaves fall, we root deeper. Autumn is the season of earthiness—of rich textures, warming scents, and the minerals that connect us to the land.",
    description: "Objects for the transitional months. Deep warmth, grounding rituals, and the preparation for stillness ahead.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    productIds: ["organic-cotton-robe", "eucalyptus-steam-oil", "ritual-gift-set"],
    available: false
  }
];

// Retreat Editions - Hotel-exclusive products
export const retreatEditions: RetreatEdition[] = [
  {
    hotelId: "terme-di-saturnia",
    hotelName: "Terme di Saturnia",
    description: "Objects crafted for and inspired by the ancient sulphur springs of Saturnia.",
    productIds: ["saturnia-mineral-soap", "saturnia-bath-salts", "organic-cotton-robe"]
  },
  {
    hotelId: "bagno-vignoni",
    hotelName: "Bagno Vignoni",
    description: "The ritual objects found in the medieval thermal village.",
    productIds: ["vignoni-thermal-soap", "thermal-mineral-soap"]
  }
];

export const shopCategories: CategoryInfo[] = [
  {
    id: "towels-textiles",
    name: "Towels & Textiles",
    poeticDescription: "Woven from tradition, softened by mineral waters.",
    image: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=600&q=80"
  },
  {
    id: "bath-body",
    name: "Bath & Body",
    poeticDescription: "Formulations born from centuries of thermal healing.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80"
  },
  {
    id: "ritual-tools",
    name: "Ritual Tools",
    poeticDescription: "Instruments for the daily ceremony of care.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80"
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy & Mind",
    poeticDescription: "Scents that anchor memory and restore balance.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80"
  },
  {
    id: "footwear-comfort",
    name: "Footwear & Comfort",
    poeticDescription: "Steps that honor the body's need for rest.",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80"
  },
  {
    id: "gifts-objects",
    name: "Gifts & Objects",
    poeticDescription: "Meaningful tokens for those who seek stillness.",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&q=80"
  }
];

export const shopProducts: ShopProduct[] = [
  // Towels & Textiles
  {
    id: "organic-cotton-robe",
    name: "Organic Cotton Bathrobe",
    category: "towels-textiles",
    description: "A sanctuary woven in organic cotton. Long, generous, and designed for the hours between ritual and rest.",
    essence: "This bathrobe begins its journey in the organic cotton fields of Northern Italy, where centuries of textile tradition meet modern sustainability. The weight is deliberate—heavy enough to embrace, light enough to breathe. Each robe is finished by hand in a family workshop near Lake Como, where the same techniques have been passed through four generations. The natural ecru color speaks to the unbleached purity of the fiber, a quiet statement against the noise of over-processed textiles.",
    whyWeSelected: [
      "GOTS-certified organic cotton from Italian heritage farms",
      "Handfinished by fourth-generation textile artisans",
      "Weight calibrated for post-thermal comfort",
      "Natural dyes only, no chemical processing"
    ],
    ritual: {
      introduction: "The bathrobe is not merely worn—it is entered into. This is the garment of transition, marking the passage from water to rest.",
      steps: [
        { step: 1, title: "After the Waters", description: "Allow your skin to remain slightly damp. The cotton will absorb what the minerals leave behind." },
        { step: 2, title: "The Embrace", description: "Draw the robe around you slowly. Feel the weight settle on your shoulders." },
        { step: 3, title: "The Quiet Hour", description: "This is now your uniform for stillness. Read, rest, or simply be." }
      ],
      bestWith: "Thermal Spa Slippers"
    },
    price: 189,
    image: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=1200&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80"
    ],
    usedAtHotels: ["terme-di-saturnia", "fonteverde"],
    materials: "100% GOTS-certified organic cotton, 450 GSM weight",
    careInstructions: "Machine wash cold, tumble dry low. Softens with each wash.",
    origin: "Woven and finished in Como, Italy",
    sustainability: "Organic cultivation, natural dyes, carbon-neutral shipping",
    featured: true,
    complementaryProducts: ["thermal-spa-slippers", "lavender-pillow-mist"]
  },
  {
    id: "mineral-infused-towel",
    name: "Mineral-Infused Bath Towel",
    category: "towels-textiles",
    description: "Turkish cotton treated with thermal mineral essence. Exceptionally soft, remarkably absorbent.",
    essence: "These towels carry a secret in their fibers. During the final wash, they are immersed in water drawn from the thermal springs of Budapest—water rich in magnesium, calcium, and trace minerals. The result is a towel that doesn't merely dry, but continues the therapeutic work of the bath. The technique was developed in collaboration with Hungarian wellness practitioners who understood that healing doesn't stop at the water's edge.",
    whyWeSelected: [
      "Genuine Turkish cotton, long-staple for durability",
      "Infused with Hungarian thermal mineral water",
      "Therapeutic trace minerals remain through multiple washes",
      "Exceptionally absorbent without weight"
    ],
    ritual: {
      introduction: "A towel should complete the bath, not interrupt it. Use this as the final act of your water ritual.",
      steps: [
        { step: 1, title: "Prepare", description: "Warm the towel briefly if possible—draped over a heated rail or radiator." },
        { step: 2, title: "Pat, Don't Rub", description: "Press the towel gently against your skin. Allow absorption rather than friction." },
        { step: 3, title: "Let Minerals Rest", description: "Leave skin slightly damp. The trace minerals will continue their work as you rest." }
      ],
      bestWith: "Thermal Bath Salts"
    },
    price: 78,
    image: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=600&q=80",
    usedAtHotels: ["helia-hotel", "gellert-spa"],
    materials: "100% Turkish cotton, mineral-infused",
    careInstructions: "Wash separately first. Cold water preserves mineral content longer.",
    origin: "Woven in Turkey, finished in Budapest",
    sustainability: "Natural mineral infusion, no synthetic treatments",
    featured: true,
    complementaryProducts: ["thermal-bath-salts", "organic-cotton-robe"]
  },

  // Bath & Body
  {
    id: "thermal-mineral-soap",
    name: "Thermal Mineral Soap",
    category: "bath-body",
    description: "Cold-pressed with sulphur and silica from Italian thermal springs. Gentle cleansing, profound nourishment.",
    essence: "This soap is born from the same volcanic waters that have healed travelers for millennia. We work with a small producer in Tuscany who cold-presses each bar by hand, incorporating mineral-rich sediment from natural thermal pools. The process is slow—each bar cures for six weeks before it reaches you. The scent is subtle, earthy, unmistakably of the earth's depths. This is cleansing as the ancients knew it.",
    whyWeSelected: [
      "Cold-pressed with genuine thermal spring minerals",
      "Six-week natural curing process",
      "No synthetic fragrances or preservatives",
      "Suitable for sensitive and therapeutic skin needs"
    ],
    ritual: {
      introduction: "Cleansing with mineral soap is the first step of the thermal ritual—preparing the skin to receive what the waters offer.",
      steps: [
        { step: 1, title: "Wet & Warm", description: "Begin with warm water. Allow your pores to open before applying the soap." },
        { step: 2, title: "Lather Slowly", description: "Work the soap between wet palms. The minerals need time to release." },
        { step: 3, title: "Rinse & Rest", description: "Rinse thoroughly. Your skin is now prepared for the bath or the day ahead." }
      ],
      bestWith: "Thermal Bath Salts"
    },
    price: 32,
    image: "https://images.unsplash.com/photo-1607006483224-51168f9c4cf1?w=600&q=80",
    usedAtHotels: ["bagno-vignoni", "terme-di-saturnia"],
    materials: "Olive oil, thermal spring minerals, volcanic clay",
    careInstructions: "Keep dry between uses. Store on a draining dish.",
    origin: "Handcrafted in Tuscany, Italy",
    sustainability: "Plastic-free, fully biodegradable, local sourcing",
    featured: true,
    complementaryProducts: ["thermal-bath-salts", "body-brush-natural"]
  },
  {
    id: "thermal-bath-salts",
    name: "Thermal Bath Salts",
    category: "bath-body",
    description: "Harvested mineral salts from natural thermal springs. Transform any bath into a sanctuary.",
    essence: "These salts carry the exact mineral composition of Iceland's most revered thermal springs—rich in silica, magnesium, and sulfur. Harvested during the brief summer months when evaporation is at its peak, each crystal holds the memory of volcanic heat and ancient waters. In your bath, they recreate what the earth offers in its most sacred pools: softened skin, calmed muscles, and a mind drawn toward stillness.",
    whyWeSelected: [
      "Genuine thermal spring minerals, not synthetic recreation",
      "Harvested sustainably during peak evaporation season",
      "Rich in silica for skin softening",
      "Magnesium content supports muscle recovery"
    ],
    ritual: {
      introduction: "A salt bath is not a quick cleanse—it is a commitment to stillness. Set aside at least thirty minutes.",
      steps: [
        { step: 1, title: "Prepare the Water", description: "Draw a bath warmer than comfortable. Add salts while water runs—allow them to dissolve completely." },
        { step: 2, title: "Enter Slowly", description: "Lower yourself gradually. Let your body adjust to the temperature and mineral content." },
        { step: 3, title: "Stay & Surrender", description: "Remain for 20-30 minutes. The minerals need time to work. Resist the urge to rush." }
      ],
      bestWith: "Eucalyptus Steam Oil"
    },
    price: 45,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    usedAtHotels: ["blue-lagoon"],
    materials: "Harvested thermal spring salts, natural mineral content",
    careInstructions: "Store in a cool, dry place. Seal after each use.",
    origin: "Harvested in Iceland",
    sustainability: "Wild-harvested, no processing chemicals",
    featured: true,
    complementaryProducts: ["eucalyptus-steam-oil", "organic-cotton-robe"]
  },

  // Ritual Tools
  {
    id: "body-brush-natural",
    name: "Natural Bristle Body Brush",
    category: "ritual-tools",
    description: "Handcrafted from beechwood and natural sisal. For the morning ritual of awakening circulation.",
    essence: "Dry brushing is among the oldest of European wellness traditions, practiced in Austrian spas for centuries before the bath. This brush is made by a small workshop in the Alps, where the beechwood is sourced from managed forests and the sisal bristles are calibrated for stimulation without irritation. The handle is shaped to reach every part of the body with ease. It is a tool of awakening—used before the waters to prepare the skin and invigorate the blood.",
    whyWeSelected: [
      "Handcrafted in Austrian alpine workshops",
      "Sustainably sourced beechwood handle",
      "Natural sisal bristles of ideal firmness",
      "Designed for ergonomic full-body reach"
    ],
    ritual: {
      introduction: "Dry brushing is a morning practice, performed before bathing, on completely dry skin.",
      steps: [
        { step: 1, title: "Begin at the Feet", description: "Start with the soles, then move upward in long, firm strokes toward the heart." },
        { step: 2, title: "Arms Inward", description: "Brush from fingertips toward shoulders. Always toward the heart." },
        { step: 3, title: "Torso & Complete", description: "Circular strokes on the abdomen. Lighter pressure on the chest. Then shower or bathe." }
      ],
      bestWith: "Thermal Mineral Soap"
    },
    price: 48,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
    usedAtHotels: ["velden-thermal"],
    materials: "Beechwood handle, natural sisal bristles",
    careInstructions: "Tap to remove dead skin. Wash monthly with mild soap. Air dry bristles-down.",
    origin: "Handmade in Austria",
    sustainability: "FSC-certified wood, natural fibers, plastic-free",
    featured: false,
    complementaryProducts: ["thermal-mineral-soap", "thermal-bath-salts"]
  },
  {
    id: "gua-sha-rose-quartz",
    name: "Rose Quartz Gua Sha",
    category: "ritual-tools",
    description: "Naturally cool stone for facial ritual. Reduces puffiness, encourages lymphatic movement.",
    essence: "Rose quartz has been used for facial care since ancient Egypt, prized for its natural cooling properties and smooth glide. This gua sha is shaped in the traditional Chinese form but refined for the facial contours favored in Japanese skincare rituals. The stone retains coolness even in warm hands, making it ideal for de-puffing and soothing after thermal exposure. Each piece is hand-polished to eliminate any edge that might pull at the skin.",
    whyWeSelected: [
      "Natural rose quartz retains therapeutic coolness",
      "Traditional shape refined for modern facial ritual",
      "Hand-polished to eliminate skin-pulling edges",
      "Cooling effect ideal for post-thermal care"
    ],
    ritual: {
      introduction: "Gua sha is best performed in the evening, after thermal bathing, when the face is warm and circulation is heightened.",
      steps: [
        { step: 1, title: "Oil First", description: "Apply a thin layer of facial oil. The stone must glide, never drag." },
        { step: 2, title: "Upward & Outward", description: "Begin at the center of the face. Sweep outward and upward in firm, slow strokes." },
        { step: 3, title: "Neck & Complete", description: "End with downward strokes on the neck, encouraging lymphatic drainage." }
      ],
      bestWith: "Lavender Sleep Mist"
    },
    price: 65,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80",
    usedAtHotels: ["kinosaki-onsen"],
    materials: "Natural rose quartz, hand-polished",
    careInstructions: "Wipe clean after use. Store in provided pouch. Can be chilled before use.",
    origin: "Stone sourced and shaped in Japan",
    sustainability: "Natural stone, minimal processing, reusable for life",
    featured: false,
    complementaryProducts: ["lavender-pillow-mist"]
  },

  // Aromatherapy
  {
    id: "eucalyptus-steam-oil",
    name: "Eucalyptus Steam Oil",
    category: "aromatherapy",
    description: "Pure essential oil blend for steam rooms and hot baths. Opens airways, clears the mind.",
    essence: "This is not a fragrance—it is medicine for the breath. Distilled from New Zealand eucalyptus, grown in the geothermal regions where volcanic soil produces leaves of extraordinary potency. The scent is sharp but not aggressive, designed to open the airways and clear mental fog. A few drops in a hot bath or steam room transforms the experience from relaxation to active healing. This is the signature scent of our Rotorua thermal retreats.",
    whyWeSelected: [
      "Distilled from geothermally-grown New Zealand eucalyptus",
      "Therapeutic grade for respiratory support",
      "Blended specifically for hot water and steam use",
      "Opens airways without synthetic sharpness"
    ],
    ritual: {
      introduction: "Eucalyptus is the breath ritual. Use it when you need mental clarity or respiratory opening.",
      steps: [
        { step: 1, title: "Add to Heat", description: "3-5 drops in a hot bath, or onto steam room stones. The heat activates the volatile compounds." },
        { step: 2, title: "Breathe Deeply", description: "Close your eyes. Inhale through the nose, slowly and fully. Hold briefly before exhaling." },
        { step: 3, title: "Repeat & Rest", description: "Continue conscious breathing for several minutes. Let the airways expand." }
      ],
      bestWith: "Thermal Bath Salts"
    },
    price: 38,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    usedAtHotels: ["rotorua-thermal"],
    materials: "100% pure eucalyptus essential oil",
    careInstructions: "Store away from light and heat. Use within 12 months of opening.",
    origin: "Distilled in Rotorua, New Zealand",
    sustainability: "Wild-harvested, steam-distilled, glass packaging",
    featured: true,
    complementaryProducts: ["thermal-bath-salts", "organic-cotton-robe"]
  },
  {
    id: "lavender-pillow-mist",
    name: "Lavender Sleep Mist",
    category: "aromatherapy",
    description: "A calming mist for pillows and linens. French lavender harvested at peak bloom.",
    essence: "Sleep is the final act of the thermal ritual. This mist ensures the transition from wakefulness to rest is as intentional as the bath itself. The lavender is grown in Provence, harvested during the brief window when the flowers' essential oil content peaks. Distilled the same day, it carries the full complexity of the flower—not the flat, synthetic 'lavender' of mass production. One spray on your pillow, and the night becomes a continuation of the day's healing.",
    whyWeSelected: [
      "Provençal lavender harvested at peak oil content",
      "Same-day distillation preserves aromatic complexity",
      "Light mist that won't stain linens",
      "True lavender, not synthetic fragrance"
    ],
    ritual: {
      introduction: "Sleep preparation is the evening ritual. Begin 30 minutes before you wish to sleep.",
      steps: [
        { step: 1, title: "Prepare the Bed", description: "Turn down covers. Fluff pillows. Create the nest you will enter." },
        { step: 2, title: "Mist Lightly", description: "Two sprays on each pillow, one on the sheets. Let it settle for a moment." },
        { step: 3, title: "Enter & Surrender", description: "Lie down. Close your eyes. Let the lavender carry you from wakefulness." }
      ],
      bestWith: "Organic Cotton Bathrobe"
    },
    price: 28,
    image: "https://images.unsplash.com/photo-1595341595379-cf1cb694ea7d?w=600&q=80",
    usedAtHotels: ["terme-di-saturnia", "fonteverde"],
    materials: "Lavender essential oil, distilled water, natural preservative",
    careInstructions: "Shake gently before use. Store away from direct sunlight.",
    origin: "Distilled in Provence, France",
    sustainability: "Glass bottle, natural ingredients, refills available",
    featured: false,
    complementaryProducts: ["organic-cotton-robe", "thermal-spa-slippers"]
  },

  // Footwear & Comfort
  {
    id: "thermal-spa-slippers",
    name: "Thermal Spa Slippers",
    category: "footwear-comfort",
    description: "Japanese-inspired indoor slippers with cushioned soles. For the quiet hours of recovery.",
    essence: "In Japanese onsen culture, removing shoes is the first act of arrival—a signal to the body that the outside world has been left behind. These slippers are designed with that transition in mind. The natural linen upper breathes even in humid post-bath air, while the cushioned sole supports feet that have spent hours in thermal waters. They are quiet on any floor, soft against the skin, and instantly recognizable as the uniform of rest.",
    whyWeSelected: [
      "Designed in collaboration with Japanese onsen practitioners",
      "Natural linen upper for breathability",
      "Cushioned sole supports post-thermal feet",
      "Silent on hard floors"
    ],
    ritual: {
      introduction: "Slippers are entered immediately after the bath, before the robe. Feet first, then body.",
      steps: [
        { step: 1, title: "From Water to Floor", description: "Step from the bath or shower directly into waiting slippers. No bare feet on cold floors." },
        { step: 2, title: "Robe, Then Rest", description: "Draw on your robe. The slippers signal that movement is now minimal and purposeful." },
        { step: 3, title: "Slow Movements Only", description: "Walk softly. These slippers encourage deliberate, unhurried steps." }
      ],
      bestWith: "Organic Cotton Bathrobe"
    },
    price: 55,
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    usedAtHotels: ["kinosaki-onsen"],
    materials: "Natural linen upper, memory foam insole, non-slip sole",
    careInstructions: "Spot clean only. Air dry. Replace insole annually if used daily.",
    origin: "Crafted in Kyoto, Japan",
    sustainability: "Natural materials, durable construction for years of use",
    featured: false,
    complementaryProducts: ["organic-cotton-robe", "lavender-pillow-mist"]
  },

  // Gifts & Objects
  {
    id: "mineral-water-carafe",
    name: "Handblown Glass Carafe",
    category: "gifts-objects",
    description: "For bedside water rituals. Mouth-blown glass with subtle mineral-blue tint.",
    essence: "Hydration continues the work of the bath. This carafe is designed for the bedside, a reminder to drink throughout the night as your body processes the minerals it absorbed. The glass is mouth-blown by a small Tuscan glassworks, using techniques unchanged for centuries. The subtle blue-green tint recalls the color of natural thermal pools—a quiet homage to the waters that inspire everything we do. The matching glass nests neatly on top, protecting the water from dust.",
    whyWeSelected: [
      "Mouth-blown by Tuscan glass artisans",
      "Mineral-blue tint inspired by thermal waters",
      "Designed for bedside water rituals",
      "Includes matching glass for elegant stacking"
    ],
    ritual: {
      introduction: "Hydration is the night ritual. Fill the carafe before bed, and drink upon waking.",
      steps: [
        { step: 1, title: "Evening Fill", description: "Fill the carafe with filtered water. Set it on your bedside table before sleep." },
        { step: 2, title: "Night Sips", description: "If you wake, drink. The water continues your body's mineral processing." },
        { step: 3, title: "Morning Complete", description: "Upon waking, finish what remains. Start the day hydrated and clear." }
      ],
      bestWith: "Lavender Sleep Mist"
    },
    price: 85,
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&q=80",
    usedAtHotels: ["fonteverde", "bagno-vignoni"],
    materials: "Mouth-blown glass with mineral-blue tint",
    careInstructions: "Hand wash only. Handle with care—artisanal glass has unique character.",
    origin: "Blown in Tuscany, Italy",
    sustainability: "Artisanal production, built to last generations",
    featured: true,
    isGift: true,
    complementaryProducts: ["lavender-pillow-mist"]
  },
  {
    id: "wellness-journal",
    name: "Wellness Retreat Journal",
    category: "gifts-objects",
    description: "A journal for intentions, reflections, and the quiet mapping of inner landscapes.",
    essence: "This journal was created in partnership with our curators, designed specifically for the rhythms of thermal retreat. Inside you'll find prompts for wellness reflection, space for noting how different waters affect you, and pages for sketching the landscapes that move you. The paper is heavy and fountain-pen friendly. The binding opens flat. It is a tool for those who understand that healing is a practice, and practice requires documentation.",
    whyWeSelected: [
      "Created specifically for thermal retreat documentation",
      "Heavy, fountain-pen-friendly paper",
      "Lay-flat binding for easy writing",
      "Prompts designed by wellness practitioners"
    ],
    ritual: {
      introduction: "Journaling is the reflection ritual. Write after each significant experience—a soak, a treatment, a moment of insight.",
      steps: [
        { step: 1, title: "Capture Immediately", description: "Write within an hour of the experience, while sensations remain fresh." },
        { step: 2, title: "Sensation First", description: "Begin with the body: what did you feel physically? Then move to emotion." },
        { step: 3, title: "Review Before Sleep", description: "Read your day's entries before rest. Let integration happen overnight." }
      ]
    },
    price: 42,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    usedAtHotels: [],
    materials: "FSC-certified paper, linen cover, lay-flat binding",
    careInstructions: "Keep dry. Store flat to preserve binding.",
    origin: "Printed and bound in England",
    sustainability: "FSC paper, vegetable-based inks, plastic-free packaging",
    featured: false,
    isGift: true,
    complementaryProducts: []
  },
  {
    id: "ritual-gift-set",
    name: "The Ritual Gift Set",
    category: "gifts-objects",
    description: "A curated collection: mineral soap, bath salts, and eucalyptus oil. Complete thermal ritual.",
    essence: "This set contains everything needed to recreate the thermal bathing ritual at home. We have selected the three essential elements: cleansing (the mineral soap), soaking (the bath salts), and breathing (the eucalyptus oil). Together, they form a complete practice—one that can be performed weekly as a commitment to ongoing wellness. The set arrives in a reusable linen bag, itself useful for storage or travel.",
    whyWeSelected: [
      "Complete ritual in one curated box",
      "Three essential elements: cleanse, soak, breathe",
      "Reusable linen storage bag included",
      "Ideal introduction to thermal practice"
    ],
    ritual: {
      introduction: "The gift set ritual is performed weekly. Set aside one hour minimum.",
      steps: [
        { step: 1, title: "Prepare & Cleanse", description: "Begin with dry brushing if you have a brush. Then cleanse with the mineral soap." },
        { step: 2, title: "Soak & Breathe", description: "Draw a hot bath with the salts. Add eucalyptus drops. Enter slowly and remain." },
        { step: 3, title: "Emerge & Rest", description: "After 20+ minutes, emerge slowly. Wrap in warmth. Rest before continuing your day." }
      ]
    },
    price: 120,
    image: "https://images.unsplash.com/photo-1600428877878-1a0ff561d9f3?w=600&q=80",
    usedAtHotels: [],
    materials: "Includes: Thermal Mineral Soap, Thermal Bath Salts, Eucalyptus Steam Oil, Linen bag",
    careInstructions: "Store in a cool, dry place. See individual products for specific care.",
    origin: "Assembled in our London studio",
    sustainability: "Plastic-free packaging, reusable storage bag",
    featured: true,
    isGift: true,
    complementaryProducts: ["organic-cotton-robe", "body-brush-natural"]
  },

  // Retreat Editions (Hotel Exclusive)
  {
    id: "saturnia-mineral-soap",
    name: "Terme di Saturnia — Mineral Bath Soap",
    category: "bath-body",
    description: "Crafted exclusively for Terme di Saturnia using their spring's unique sulphur-rich waters.",
    essence: "This soap cannot be found anywhere else. It is made in small batches exclusively for Terme di Saturnia, incorporating mineral sediment collected directly from their ancient thermal springs. The sulphur content is higher than our standard mineral soap, offering more intensive therapeutic properties. Guests at Saturnia use this soap daily; now you can continue that ritual at home.",
    whyWeSelected: [
      "Exclusive to Terme di Saturnia retreat",
      "Contains genuine sediment from Saturnia's springs",
      "Higher sulphur content for intensive therapy",
      "Limited production, authentic provenance"
    ],
    ritual: {
      introduction: "Use this soap to continue the Saturnia experience at home. Ideal before a mineral salt bath.",
      steps: [
        { step: 1, title: "Warm Water", description: "Wet skin thoroughly with warm water." },
        { step: 2, title: "Work the Sulphur", description: "Lather slowly—the sulphur scent is normal and therapeutic." },
        { step: 3, title: "Rinse & Remember", description: "Rinse completely. Let the scent transport you back to Saturnia." }
      ],
      bestWith: "Thermal Bath Salts"
    },
    price: 42,
    image: "https://images.unsplash.com/photo-1607006483224-51168f9c4cf1?w=600&q=80",
    usedAtHotels: ["terme-di-saturnia"],
    hotelExclusive: "terme-di-saturnia",
    materials: "Olive oil, Saturnia spring sediment, volcanic clay",
    careInstructions: "Keep dry between uses. Store on a draining dish.",
    origin: "Handcrafted in Saturnia, Tuscany",
    sustainability: "Locally sourced, plastic-free",
    featured: false,
    complementaryProducts: ["thermal-bath-salts"]
  },
  {
    id: "saturnia-bath-salts",
    name: "Terme di Saturnia — Thermal Bath Salts",
    category: "bath-body",
    description: "Harvested from the ancient thermal pools of Saturnia. True Italian thermal heritage.",
    essence: "These are not approximations—they are the genuine mineral salts evaporated from Saturnia's 37°C springs. The same waters that have drawn healing seekers since Etruscan times. Rich in sulphur, magnesium, and calcium carbonate, these salts transform any bath into a continuation of your Saturnia experience. Limited quantities are harvested each year, making these a rare extension of one of Italy's most sacred thermal sites.",
    whyWeSelected: [
      "Genuine Saturnia thermal spring salts",
      "Harvested in limited quantities annually",
      "Full mineral profile of the ancient springs",
      "Direct continuation of the Saturnia experience"
    ],
    ritual: {
      introduction: "These salts deserve time. Clear your schedule for a full thermal ritual.",
      steps: [
        { step: 1, title: "Draw Hot", description: "Fill your bath as hot as comfortable. Add salts while water runs." },
        { step: 2, title: "Dissolve Completely", description: "Allow 5 minutes for full dissolution before entering." },
        { step: 3, title: "Stay Long", description: "Minimum 25 minutes. The minerals need time. Close your eyes and return to Saturnia." }
      ],
      bestWith: "Saturnia Mineral Soap"
    },
    price: 58,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    usedAtHotels: ["terme-di-saturnia"],
    hotelExclusive: "terme-di-saturnia",
    materials: "Evaporated Saturnia thermal spring water",
    careInstructions: "Store sealed in a cool, dry place.",
    origin: "Harvested at Saturnia, Tuscany",
    sustainability: "Traditional harvesting, natural evaporation",
    featured: false,
    complementaryProducts: ["saturnia-mineral-soap", "eucalyptus-steam-oil"]
  }
];

// Helper functions
export const getFeaturedProducts = () => 
  shopProducts.filter(p => p.featured);

export const getProductsByCategory = (category: ShopCategory) => 
  shopProducts.filter(p => p.category === category);

export const getProductsUsedAtHotel = (hotelId: string) => 
  shopProducts.filter(p => p.usedAtHotels?.includes(hotelId));

export const getRetreatEditionProducts = (hotelId: string) =>
  shopProducts.filter(p => p.hotelExclusive === hotelId);

export const getGiftProducts = () => 
  shopProducts.filter(p => p.isGift);

export const getSeasonalProducts = (collectionId: string) => {
  const collection = seasonalCollections.find(c => c.id === collectionId);
  if (!collection) return [];
  return shopProducts.filter(p => collection.productIds.includes(p.id));
};

export const getCurrentSeasonCollection = () =>
  seasonalCollections.find(c => c.available);

export const getProductById = (id: string) => 
  shopProducts.find(p => p.id === id);

export const getCategoryInfo = (id: ShopCategory) => 
  shopCategories.find(c => c.id === id);

export const getComplementaryProducts = (productId: string) => {
  const product = getProductById(productId);
  if (!product?.complementaryProducts) return [];
  return product.complementaryProducts
    .map(id => getProductById(id))
    .filter(Boolean) as ShopProduct[];
};
