import destinationIceland_raw from "@/assets/destination-iceland.jpg";
import destinationHungary_raw from "@/assets/destination-hungary.jpg";
import destinationAustria_raw from "@/assets/destination-austria.jpg";
import destinationNewZealand_raw from "@/assets/destination-newzealand.jpg";
import destinationItaly_raw from "@/assets/destination-italy.jpg";
import destinationTurkey_raw from "@/assets/destination-turkey.jpg";
import heroThermalResort_raw from "@/assets/hero-thermal-resort.jpg";
import thermalPool_raw from "@/assets/thermal-pool.jpg";
import spaInterior_raw from "@/assets/spa-interior.jpg";
import roomSuite_raw from "@/assets/room-suite.jpg";
import hotelRichmondPamukkale_raw from "@/assets/hotel-richmond-pamukkale.jpg";
import hotelNgSapanca_raw from "@/assets/hotel-ng-sapanca.jpg";
import hotelKayaPalazzo_raw from "@/assets/hotel-kaya-palazzo.jpg";
import hotelRixosAfyon_raw from "@/assets/hotel-rixos-afyon.jpg";
import hotelSwissotelBodrum_raw from "@/assets/hotel-swissotel-bodrum.jpg";

const destinationIceland = destinationIceland_raw.src;
const destinationHungary = destinationHungary_raw.src;
const destinationAustria = destinationAustria_raw.src;
const destinationNewZealand = destinationNewZealand_raw.src;
const destinationItaly = destinationItaly_raw.src;
const destinationTurkey = destinationTurkey_raw.src;
const heroThermalResort = heroThermalResort_raw.src;
const thermalPool = thermalPool_raw.src;
const spaInterior = spaInterior_raw.src;
const roomSuite = roomSuite_raw.src;
const hotelRichmondPamukkale = hotelRichmondPamukkale_raw.src;
const hotelNgSapanca = hotelNgSapanca_raw.src;
const hotelKayaPalazzo = hotelKayaPalazzo_raw.src;
const hotelRixosAfyon = hotelRixosAfyon_raw.src;
const hotelSwissotelBodrum = hotelSwissotelBodrum_raw.src;

export interface WaterProperty {
  mineral: string;
  amount: string;
  benefit: string;
}

export interface HealthBenefit {
  condition: string;
  description: string;
}

export interface MudTherapy {
  description: string;
  benefits: string[];
}

export interface ThermalProperties {
  waterType: string;
  waterOrigin: string;
  waterAge?: string;
  phLevel?: string;
  minerals: WaterProperty[];
  healthBenefits: HealthBenefit[];
  historicalSignificance?: string;
  mudTherapy?: MudTherapy;
  whyChoose: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  destinationId: string;
  tagline: string;
  description: string;
  heroImage: string;
  thermalPoolImage: string;
  spaImage: string;
  roomImage: string;
  thermalTemp: string;
  history: string;
  flowRate: string;
  starRating: number; // 1-5 stars
  experience: string;
  thermalDescription: string;
  outdoorPools: string;
  indoorPools: string;
  spaDescription: string;
  spaServices: string[];
  medicalWellness?: string;
  rooms: { name: string; description: string }[];
  inclusions: string[];
  policies: { title: string; content: string }[];
  thermalProperties?: ThermalProperties;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  hotelCount: number;
}

export const destinations: Destination[] = [
  {
    id: "italy",
    name: "Italy",
    country: "Tuscany & Beyond",
    description: "Ancient Roman bathing traditions meet modern wellness in the heart of the Mediterranean.",
    image: destinationItaly,
    hotelCount: 8,
  },
  {
    id: "hungary",
    name: "Hungary",
    country: "Budapest & Lake Hévíz",
    description: "Europe's thermal capital, where ornate bath houses have welcomed visitors for centuries.",
    image: destinationHungary,
    hotelCount: 12,
  },
  {
    id: "iceland",
    name: "Iceland",
    country: "The Golden Circle",
    description: "Volcanic geothermal wonders set against dramatic Nordic landscapes.",
    image: destinationIceland,
    hotelCount: 6,
  },
  {
    id: "austria",
    name: "Austria",
    country: "Tyrol & Salzburg",
    description: "Alpine wellness retreats where mountain air meets healing waters.",
    image: destinationAustria,
    hotelCount: 9,
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    country: "Rotorua",
    description: "Māori healing traditions in geothermally active landscapes.",
    image: destinationNewZealand,
    hotelCount: 5,
  },
  {
    id: "turkey",
    name: "Türkiye",
    country: "Pamukkale, Afyon & Beyond",
    description: "Ancient Anatolian thermal traditions where East meets West in luxury wellness.",
    image: destinationTurkey,
    hotelCount: 5,
  },
];

export const hotels: Hotel[] = [
  {
    id: "terme-di-saturnia",
    name: "Terme di Saturnia",
    location: "Tuscany, Italy",
    destinationId: "italy",
    tagline: "Thermal Wellness Resort",
    description: "Where ancient waters meet timeless tranquility",
    heroImage: heroThermalResort,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "37.5°C",
    history: "3000+",
    flowRate: "800L",
    starRating: 5,
    experience: `Nestled in the heart of the Tuscan countryside, Terme di Saturnia draws 
upon millennia of healing tradition. Here, thermal waters emerge at 37.5°C 
from deep within the earth, carrying minerals that have soothed travelers 
since Etruscan times. This is not merely a hotel—it is a sanctuary for those 
who understand that true wellness is found in stillness, in the gentle rhythm 
of nature, and in the art of taking one's time.`,
    thermalDescription: `Rich in sulfur, calcium, and magnesium carbonate, our thermal waters 
have been celebrated for their therapeutic properties. Whether seeking 
relief from modern life's tensions or simply a moment of profound peace, 
the waters welcome all who enter.`,
    outdoorPools: `Five interconnected pools cascade across the landscape, each maintaining 
a natural temperature between 34°C and 37.5°C. Steam rises gently in the 
morning air as the Tuscan hills frame the horizon.`,
    indoorPools: `A subterranean sanctuary where natural rock formations create intimate 
chambers. Here, the thermal waters are experienced in their most primal 
form, surrounded by centuries-old stone.`,
    spaDescription: `Our wellness practitioners draw upon both ancient Tuscan traditions and 
contemporary techniques. Each treatment begins with an assessment of your 
personal needs, creating a bespoke journey toward restoration.`,
    spaServices: [
      "Thermal mud wraps with mineral-rich clay",
      "Hydromassage and aquatic therapy",
      "Traditional Tuscan botanical treatments",
      "Restorative massage therapies",
    ],
    medicalWellness: `For those seeking a deeper level of care, our resident physicians offer 
comprehensive wellness programs. From dermatological treatments utilizing 
thermal waters to respiratory therapy and rehabilitation, each program is 
tailored to individual health objectives.`,
    rooms: [
      { name: "Comfort Room", description: "Intimate spaces with views of the Tuscan gardens, featuring handcrafted furnishings." },
      { name: "Deluxe Suite", description: "Generous accommodations with private terraces overlooking the thermal pools." },
      { name: "Spa Suite", description: "Sanctuary living with private thermal bathing and dedicated wellness amenities." },
      { name: "Villa Residences", description: "Secluded retreats with private gardens, pools, and personalized service." },
    ],
    inclusions: [
      "Unlimited access to thermal pools",
      "Spa facilities including sauna and steam room",
      "Daily wellness activities and classes",
      "Complimentary thermal water bottle service",
      "Access to fitness center and gardens",
      "Welcome thermal treatment on arrival",
      "Bathrobe and slippers for the duration of stay",
      "Artisanal breakfast with local ingredients",
    ],
    policies: [
      { title: "Children", content: "We warmly welcome families. Children under 12 must be accompanied by adults in thermal areas. A dedicated children's program is available during school holidays." },
      { title: "Pets", content: "Well-behaved dogs are welcome in select accommodations. Please inform us at time of booking so we may prepare appropriate arrangements." },
      { title: "Health considerations", content: "Thermal bathing is generally safe and beneficial, though we recommend consulting your physician if you have cardiovascular conditions or are pregnant. Our wellness team is available for guidance." },
      { title: "Thermal etiquette", content: "To preserve the tranquil atmosphere, we kindly request guests maintain a peaceful environment in all thermal and spa areas. Mobile phones are not permitted in these spaces." },
    ],
  },
  {
    id: "bagno-vignoni",
    name: "Bagno Vignoni",
    location: "Val d'Orcia, Italy",
    destinationId: "italy",
    tagline: "Historic Thermal Village",
    description: "A medieval village built around a thermal spring",
    heroImage: heroThermalResort,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "52°C",
    history: "2000+",
    flowRate: "500L",
    starRating: 4,
    experience: `In the UNESCO-protected Val d'Orcia valley, Bagno Vignoni preserves the spirit of Renaissance wellness. The village's central piazza is not a square but a thermal pool, unchanged since the days when Saint Catherine of Siena sought healing in these very waters.`,
    thermalDescription: `The waters of Bagno Vignoni emerge at 52°C, among the hottest in Italy, and are renowned for their sulfate-calcium-magnesium composition.`,
    outdoorPools: `Natural thermal pools carved into travertine rock formations offer an authentic experience of Italian thermal bathing.`,
    indoorPools: `Indoor thermal grottos maintain traditional bathing practices in intimate stone chambers.`,
    spaDescription: `Treatments draw upon centuries of local healing knowledge, incorporating the thermal waters and Tuscan botanicals.`,
    spaServices: [
      "Hot stone thermal massage",
      "Sulfur-enriched mud treatments",
      "Aromatherapy with local herbs",
      "Thermal water hydrotherapy",
    ],
    rooms: [
      { name: "Classic Room", description: "Charming accommodations in restored medieval buildings." },
      { name: "Superior Room", description: "Spacious rooms with views of the thermal piazza." },
      { name: "Thermal Suite", description: "Private thermal bath and historic architectural details." },
    ],
    inclusions: [
      "Access to thermal pools",
      "Spa and wellness facilities",
      "Guided village history walks",
      "Tuscan breakfast",
      "Wine tasting experiences",
    ],
    policies: [
      { title: "Children", content: "Children of all ages are welcome. Family rooms available." },
      { title: "Pets", content: "Small pets permitted in designated rooms." },
      { title: "Health considerations", content: "Due to high water temperatures, sessions are timed for safety." },
    ],
  },
  {
    id: "terme-di-ischia",
    name: "Terme di Ischia",
    location: "Ischia, Italy",
    destinationId: "italy",
    tagline: "Island Thermal Paradise",
    description: "Volcanic island wellness in the Gulf of Naples",
    heroImage: heroThermalResort,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "40°C",
    history: "2800+",
    flowRate: "600L",
    starRating: 5,
    experience: `On the enchanting volcanic island of Ischia, thermal springs have attracted wellness seekers since ancient Greek times. The island's unique geology creates over 100 hot springs, each with distinct mineral compositions. Here, Mediterranean beauty meets profound therapeutic tradition.`,
    thermalDescription: `Ischia's waters are classified as hyperthermal, rich in sodium, potassium, and sulfur. The volcanic origin provides exceptional mineral density for dermatological and rheumatic treatments.`,
    outdoorPools: `Panoramic thermal pools overlooking the Tyrrhenian Sea, with views stretching to Capri and the Amalfi Coast.`,
    indoorPools: `Historic thermal grottos carved into volcanic rock, maintaining centuries-old bathing traditions.`,
    spaDescription: `Treatments combine the island's famous thermal muds with Mediterranean botanicals and ancient healing rituals.`,
    spaServices: [
      "Volcanic mud therapy (fango)",
      "Thermal seawater treatments",
      "Mediterranean aromatherapy",
      "Anti-aging thermal facials",
    ],
    medicalWellness: `Ischia's thermal waters are medically recognized for treating arthritis, psoriasis, and respiratory conditions. On-site physicians supervise therapeutic programs.`,
    rooms: [
      { name: "Sea View Room", description: "Elegant rooms with balconies overlooking the Mediterranean." },
      { name: "Thermal Suite", description: "Private thermal bath and panoramic terrace." },
      { name: "Royal Suite", description: "Luxury accommodation with private pool and butler service." },
    ],
    inclusions: [
      "Thermal pool and beach access",
      "Daily fango treatment",
      "Gourmet Mediterranean cuisine",
      "Boat excursions",
      "Yoga and meditation sessions",
    ],
    policies: [
      { title: "Children", content: "Family-friendly with children's pool and activities." },
      { title: "Accessibility", content: "Ferry transfers from Naples arranged. Helicopter available." },
      { title: "Health considerations", content: "Volcanic thermal waters are potent; medical consultation recommended." },
    ],
  },
  {
    id: "fonteverde",
    name: "Fonteverde Tuscan Resort & Spa",
    location: "San Casciano dei Bagni, Italy",
    destinationId: "italy",
    tagline: "Medici Heritage Wellness",
    description: "Renaissance grandeur meets thermal excellence",
    heroImage: heroThermalResort,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "42°C",
    history: "500+",
    flowRate: "5500L",
    starRating: 5,
    experience: `In the 17th-century Medici villa, Fonteverde continues the legacy of Grand Duke Ferdinand I, who first recognized these waters' healing powers. The resort sits above 42 thermal springs, making it one of Europe's most thermally blessed locations.`,
    thermalDescription: `The bicarbonate-sulfate-calcium waters emerge at 42°C with exceptional purity. Clinically proven for skin rejuvenation and musculoskeletal therapy.`,
    outdoorPools: `Cascading infinity pools merge with the Tuscan landscape, offering thermal bathing with vineyard panoramas.`,
    indoorPools: `The Bioaquam thermal circuit features five different temperature zones and specialized hydrotherapy jets.`,
    spaDescription: `The spa philosophy integrates thermal water therapy with cutting-edge cosmetic treatments and traditional Tuscan rituals.`,
    spaServices: [
      "Bioaquam thermal circuit",
      "Anti-aging thermal protocols",
      "Detoxifying mud treatments",
      "Vinotherapy with local wines",
    ],
    medicalWellness: `A dedicated medical spa offers diagnostic assessments, personalized treatment plans, and physician-supervised wellness programs.`,
    rooms: [
      { name: "Classic Room", description: "Historic elegance with antique furnishings and garden views." },
      { name: "Deluxe Room", description: "Spacious accommodation with thermal bath amenities." },
      { name: "Medici Suite", description: "Grand historical suite with private thermal terrace." },
      { name: "Presidential Villa", description: "Private villa with exclusive thermal pool and dedicated staff." },
    ],
    inclusions: [
      "Unlimited thermal pool access",
      "Bioaquam circuit entry",
      "Gourmet breakfast and afternoon tea",
      "Daily wellness activity",
      "Personal wellness consultation",
    ],
    policies: [
      { title: "Children", content: "Adults-only spa areas. Children welcome in designated family zones." },
      { title: "Dress code", content: "Smart casual for dining. Resort attire in spa areas." },
      { title: "Reservations", content: "Advance booking recommended for treatments and restaurants." },
    ],
  },
  {
    id: "grotta-giusti",
    name: "Grotta Giusti Thermal Spa Resort",
    location: "Monsummano Terme, Italy",
    destinationId: "italy",
    tagline: "Natural Thermal Grotto",
    description: "The eighth wonder of the world underground",
    heroImage: heroThermalResort,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "34°C",
    history: "170+",
    flowRate: "Natural Cave",
    starRating: 4,
    experience: `Discovered in 1849, the natural thermal grotto beneath this historic villa was declared "the eighth wonder of the world" by Giuseppe Verdi. Three atmospheric chambers—Paradise, Purgatory, and Hell—offer progressively warmer temperatures for a unique subterranean wellness journey.`,
    thermalDescription: `The cave's thermal lake maintains 34°C with 100% humidity, creating a natural steam room effect. Waters are rich in calcium, magnesium, and sulfur.`,
    outdoorPools: `A stunning thermal pool set within manicured Italian gardens, surrounded by centuries-old trees.`,
    indoorPools: `The legendary underground grotto with its natural thermal lake, plus modern indoor thermal facilities.`,
    spaDescription: `Treatments harness the cave's unique microclimate and thermal waters for respiratory and dermatological benefits.`,
    spaServices: [
      "Grotto thermal immersion",
      "Cave steam therapy",
      "Thermal mud applications",
      "Respiratory wellness programs",
    ],
    medicalWellness: `Specialized programs for respiratory conditions, leveraging the grotto's natural aerosol environment.`,
    rooms: [
      { name: "Classic Room", description: "Comfortable rooms in the historic villa wing." },
      { name: "Superior Room", description: "Refined spaces with garden or pool views." },
      { name: "Suite", description: "Generous accommodations with separate living area." },
    ],
    inclusions: [
      "Daily grotto access",
      "Thermal pool entry",
      "Tuscan breakfast buffet",
      "Spa amenities",
      "Fitness center access",
    ],
    policies: [
      { title: "Grotto access", content: "Sessions limited to 40 minutes for safety. Medical clearance may be required." },
      { title: "Children", content: "Minimum age 14 for grotto access. Children's pool available." },
      { title: "Health considerations", content: "Not recommended for pregnant women or those with cardiovascular conditions." },
    ],
  },
  {
    id: "szechenyi-baths",
    name: "Széchenyi Thermal Bath",
    location: "Budapest, Hungary",
    destinationId: "hungary",
    tagline: "Grand Thermal Palace",
    description: "Europe's largest medicinal bath complex",
    heroImage: destinationHungary,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "38°C",
    history: "100+",
    flowRate: "6000L",
    starRating: 4,
    experience: `Within the neo-baroque splendor of City Park, Széchenyi Baths represents the pinnacle of Budapest's thermal culture. Since 1913, these golden domes have sheltered 18 pools fed by two thermal springs, creating a social and healing tradition unique to Hungary.`,
    thermalDescription: `The thermal waters contain calcium, magnesium, bicarbonate, and significant fluoride content, recommended for joint diseases and chronic inflammation.`,
    outdoorPools: `Three grand outdoor pools, including the iconic main pool where steam rises year-round against the baroque architecture.`,
    indoorPools: `Fifteen indoor pools range from cool plunge baths to hot thermal chambers, each with specific therapeutic temperatures.`,
    spaDescription: `Hungarian spa traditions emphasize both relaxation and medical treatment, with balneotherapy programs designed by physicians.`,
    spaServices: [
      "Medicinal thermal bathing",
      "Traditional Hungarian massage",
      "Mud pack treatments",
      "Underwater jet massage",
    ],
    rooms: [
      { name: "Park View Room", description: "Elegant rooms overlooking City Park's greenery." },
      { name: "Thermal Suite", description: "Direct access to private thermal facilities." },
      { name: "Royal Apartment", description: "Historic grandeur with modern luxury." },
    ],
    inclusions: [
      "Unlimited thermal bath access",
      "Locker and changing facilities",
      "Daily medicinal water allocation",
      "Access to saunas and steam rooms",
      "Fitness facilities",
    ],
    policies: [
      { title: "Children", content: "Children over 14 welcome in all areas. Family hours available on weekends." },
      { title: "Health considerations", content: "Medical consultation available for therapeutic programs." },
      { title: "Bath etiquette", content: "Swimming caps required in pools. Quiet areas designated for relaxation." },
    ],
    thermalProperties: {
      waterType: "Kalsiyum-Magnezyum-Bikarbonat-Sülfatlı Termal Su",
      waterOrigin: "1246 metre derinlikten çıkan iki ayrı termal kaynak",
      waterAge: "10.000+ yıl",
      phLevel: "6.8 - 7.2 (nötr)",
      minerals: [
        { mineral: "Kalsiyum (Ca²⁺)", amount: "180 mg/L", benefit: "Kemik ve diş sağlığını destekler, kas fonksiyonlarını düzenler" },
        { mineral: "Magnezyum (Mg²⁺)", amount: "85 mg/L", benefit: "Kas gevşemesi sağlar, stres ve yorgunluğu azaltır" },
        { mineral: "Bikarbonat (HCO₃⁻)", amount: "650 mg/L", benefit: "Sindirim sistemini destekler, vücut pH dengesini korur" },
        { mineral: "Sülfat (SO₄²⁻)", amount: "240 mg/L", benefit: "Cilt sağlığını iyileştirir, detoksifikasyonu destekler" },
        { mineral: "Florür (F⁻)", amount: "1.8 mg/L", benefit: "Diş minesini güçlendirir, kemik yoğunluğunu artırır" },
        { mineral: "Sodyum (Na⁺)", amount: "95 mg/L", benefit: "Hücre fonksiyonlarını düzenler, sıvı dengesini sağlar" },
      ],
      healthBenefits: [
        { condition: "Eklem Hastalıkları", description: "Romatizma, artrit ve eklem ağrılarının tedavisinde etkili" },
        { condition: "Kas-İskelet Sistemi", description: "Bel, boyun ağrıları ve kas tutulmaları için şifalı" },
        { condition: "Cilt Rahatsızlıkları", description: "Egzama, sedef ve kronik cilt problemlerinde rahatlatıcı" },
        { condition: "Solunum Yolları", description: "Sinüzit, bronşit ve astım semptomlarını hafifletir" },
        { condition: "Stres ve Yorgunluk", description: "Sinir sistemini rahatlatır, uyku kalitesini artırır" },
        { condition: "Dolaşım Sistemi", description: "Kan dolaşımını düzenler, damar elastikiyetini artırır" },
      ],
      historicalSignificance: "Széchenyi Kaplıcası, 1913 yılında açılan Avrupa'nın en büyük tıbbi kaplıca komplekslerinden biridir. Macar mimar Győző Czigler tarafından neo-barok tarzda tasarlanan yapı, Budapest'in termal mirası ve Osmanlı hamam geleneğinin buluştuğu eşsiz bir noktadır. Macaristan, dünyanın en zengin termal su kaynaklarına sahip ülkelerden biri olup, bu sular yüzyıllardır şifa arayanları ağırlamaktadır.",
      mudTherapy: {
        description: "Macaristan'ın Hévíz Gölü bölgesinden özenle toplanan tıbbi çamur, mineral açısından zengin yapısıyla cilt ve eklem tedavilerinde yüzyıllardır kullanılmaktadır. Çamur terapisi, termal su tedavisinin önemli bir tamamlayıcısıdır.",
        benefits: [
          "Derin kas gevşemesi sağlar",
          "Eklem iltihabını azaltır",
          "Cilt hücrelerini yeniler ve detoks yapar",
          "Romatizmal ağrıları hafifletir",
          "Kan dolaşımını hızlandırır",
          "Cildi yumuşatır ve besler",
        ],
      },
      whyChoose: [
        "Avrupa'nın en büyük tıbbi kaplıca kompleksi - 18 farklı havuz ve termal alan",
        "100+ yıllık balneoloji geleneği ve hekim gözetiminde tedavi programları",
        "Eşsiz neo-barok mimari içinde otantik termal deneyimi",
        "Her mevsim açık dış mekan havuzları - kış aylarında karlı manzara eşliğinde banyo keyfi",
        "UNESCO Dünya Mirası adayı Budapest'in kalbinde merkezi konum",
        "Geleneksel Macar masajı ve modern spa tedavilerinin benzersiz kombinasyonu",
      ],
    },
  },
  {
    id: "blue-lagoon",
    name: "The Retreat at Blue Lagoon",
    location: "Grindavík, Iceland",
    destinationId: "iceland",
    tagline: "Geothermal Luxury Spa",
    description: "Where fire and ice create healing waters",
    heroImage: destinationIceland,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "39°C",
    history: "40+",
    flowRate: "Hot Spring",
    starRating: 5,
    experience: `Rising from a lava field on Iceland's Reykjanes Peninsula, The Retreat offers an intimate sanctuary within one of the world's most remarkable geothermal landscapes. The milky-blue waters, rich in silica and minerals, create an otherworldly setting for profound relaxation.`,
    thermalDescription: `The geothermal seawater is renewed every 40 hours, maintaining perfect clarity and mineral composition including silica, algae, and essential minerals.`,
    outdoorPools: `A private lagoon winds through the lava rock, offering secluded bathing with views of moss-covered volcanic formations.`,
    indoorPools: `Subterranean spa carved into the lava rock, with thermal waters flowing through ancient geological formations.`,
    spaDescription: `Treatments utilize the unique properties of the geothermal seawater and specially cultivated algae.`,
    spaServices: [
      "Silica mud treatments",
      "In-water massage",
      "Geothermal steam rituals",
      "Algae and mineral wraps",
    ],
    medicalWellness: `Research-backed treatments for psoriasis and skin conditions utilizing the unique geothermal seawater.`,
    rooms: [
      { name: "Lagoon Suite", description: "Floor-to-ceiling views of the lagoon and lava fields." },
      { name: "Lava Suite", description: "Private terrace with direct lagoon access." },
      { name: "Moss Suite", description: "Intimate retreat surrounded by ancient lava formations." },
    ],
    inclusions: [
      "Private lagoon access",
      "Blue Lagoon skincare amenities",
      "In-room fireplace",
      "Tasting menu dinner",
      "Private transfers",
      "Spa journey treatment",
    ],
    policies: [
      { title: "Children", content: "The Retreat welcomes guests 12 and older for an adult-focused environment." },
      { title: "Weather", content: "The lagoon is accessible in all weather conditions, including snow and rain." },
      { title: "Sustainability", content: "We operate on 100% renewable geothermal energy." },
    ],
  },
  {
    id: "aqua-dome",
    name: "Aqua Dome",
    location: "Längenfeld, Austria",
    destinationId: "austria",
    tagline: "Alpine Thermal Resort",
    description: "Where mountains meet healing waters",
    heroImage: destinationAustria,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "36°C",
    history: "50+",
    flowRate: "Thermal Spring",
    starRating: 4,
    experience: `In the heart of the Ötztal Alps, Aqua Dome floats like a futuristic vision against 3,000-meter peaks. The thermal waters, combined with pristine mountain air, create a wellness experience unique to the Austrian Alps—where adventure and relaxation interweave.`,
    thermalDescription: `The thermal sodium chloride waters emerge from 1,800 meters depth, enriched with minerals accumulated over millennia.`,
    outdoorPools: `Three floating bowl-shaped pools offer panoramic Alpine views, spectacular at sunset and under starlight.`,
    indoorPools: `Multiple indoor thermal areas include a Tyrolean stone bath and a contrasting hot-cold therapy circuit.`,
    spaDescription: `Alpine wellness combines Austrian spa traditions with the healing properties of mountain herbs and thermal waters.`,
    spaServices: [
      "Alpine herb massages",
      "Stone pine oil treatments",
      "Mountain crystal therapy",
      "Tyrolean hay baths",
    ],
    rooms: [
      { name: "Comfort Room", description: "Modern Alpine comfort with mountain views." },
      { name: "Spa Room", description: "Direct spa access and private balcony." },
      { name: "Panorama Suite", description: "Floor-to-ceiling windows framing the Ötztal peaks." },
    ],
    inclusions: [
      "Thermal spa access",
      "Sauna world entry",
      "Daily activity program",
      "Half-board dining",
      "Yoga and fitness classes",
      "Hiking guide service",
    ],
    policies: [
      { title: "Children", content: "Family-friendly with dedicated children's pools and programs." },
      { title: "Skiing", content: "Direct connection to Ötztal ski areas in winter." },
      { title: "Altitude", content: "Located at 1,180m. Guests should acclimatize before intensive activities." },
    ],
  },
  {
    id: "polynesian-spa",
    name: "Polynesian Spa",
    location: "Rotorua, New Zealand",
    destinationId: "new-zealand",
    tagline: "Geothermal Sanctuary",
    description: "Māori healing traditions meet natural hot springs",
    heroImage: destinationNewZealand,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "40°C",
    history: "140+",
    flowRate: "Natural Spring",
    starRating: 4,
    experience: `On the shores of Lake Rotorua, ancient hot springs have welcomed healing seekers for over a century. The Māori people recognized these waters' therapeutic properties long before European arrival, and their wisdom continues to inform our approach to wellness.`,
    thermalDescription: `Two distinct spring types—acidic for relaxation and alkaline for therapeutic benefit—offer unique mineral compositions.`,
    outdoorPools: `Lakefront pools offer views across Lake Rotorua while steam rises through native flora.`,
    indoorPools: `Private pools and family bathing areas maintain traditional and contemporary wellness options.`,
    spaDescription: `Treatments blend Māori wellness traditions with contemporary spa practices, using native botanicals.`,
    spaServices: [
      "Manuka honey treatments",
      "Kawakawa body wraps",
      "Hot stone massage",
      "Mud therapy",
    ],
    rooms: [
      { name: "Lake View Room", description: "Accommodations overlooking Lake Rotorua." },
      { name: "Thermal Suite", description: "Private thermal pool on balcony." },
      { name: "Wellness Retreat", description: "Comprehensive spa residence with treatment room." },
    ],
    inclusions: [
      "Lake Spa access",
      "Adult-only Pavilion Pools",
      "Family pool access",
      "Native botanical amenities",
      "Cultural experiences",
    ],
    policies: [
      { title: "Children", content: "Family-friendly with dedicated children's areas. Some pools are adult-only." },
      { title: "Geothermal activity", content: "Rotorua is geothermally active. Our facilities are monitored for safety." },
      { title: "Māori culture", content: "We honor and share Māori traditions with respect and authenticity." },
    ],
  },
  // TURKEY HOTELS
  {
    id: "richmond-pamukkale",
    name: "Richmond Pamukkale Thermal",
    location: "Pamukkale, Denizli",
    destinationId: "turkey",
    tagline: "UNESCO Heritage Thermal Sanctuary",
    description: "Where ancient Hierapolis waters meet modern medical wellness",
    heroImage: hotelRichmondPamukkale,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "36°C",
    history: "2200+",
    flowRate: "1200L",
    starRating: 5,
    experience: `Adjacent to the UNESCO World Heritage travertine terraces of Pamukkale, Richmond Thermal draws from the same ancient water source that fed the Roman city of Hierapolis. For over two millennia, these calcium-rich waters have been celebrated for their healing properties, attracting emperors, philosophers, and wellness seekers from across the ancient world. Today, this legacy continues in a setting that honors tradition while embracing contemporary medical wellness.`,
    thermalDescription: `The thermal waters emerge at 36°C, rich in calcium bicarbonate, sulfate, and carbon dioxide. These minerals have been scientifically validated for dermatological healing, musculoskeletal therapy, and cardiovascular wellness—the same composition that created the iconic white terraces over millennia.`,
    outdoorPools: `Panoramic thermal pools overlook the otherworldly travertine formations, offering bathing experiences that connect guests directly to the landscape's geological wonder. Evening sessions reveal the terraces illuminated against the Anatolian sky.`,
    indoorPools: `A comprehensive indoor thermal complex features graduated temperature pools, hydrotherapy circuits, and specialized treatment basins designed in collaboration with medical professionals.`,
    spaDescription: `The wellness philosophy integrates Turkish hamam traditions with European medical spa protocols, creating a unique East-meets-West therapeutic approach.`,
    spaServices: [
      "Traditional Turkish hamam ritual",
      "Medical thermal cure programs",
      "Calcium-enriched body treatments",
      "Physiotherapy and rehabilitation",
      "Dermatological wellness protocols",
    ],
    medicalWellness: `A dedicated medical spa staffed by physicians and physiotherapists offers comprehensive cure programs for rheumatic conditions, skin disorders, and post-operative rehabilitation. The thermal waters are officially recognized by Turkey's Ministry of Health.`,
    rooms: [
      { name: "Thermal View Room", description: "Contemporary comfort with views toward the travertine terraces." },
      { name: "Deluxe Suite", description: "Spacious accommodations with private balcony and enhanced wellness amenities." },
      { name: "Royal Suite", description: "Luxury residence with private thermal bath and panoramic terrace." },
      { name: "Medical Suite", description: "Extended-stay accommodation designed for guests on therapeutic programs." },
    ],
    inclusions: [
      "Unlimited thermal pool access",
      "Daily hamam experience",
      "Guided Hierapolis archaeological tour",
      "Wellness consultation on arrival",
      "Gourmet Anatolian breakfast",
      "Shuttle to Pamukkale terraces",
    ],
    policies: [
      { title: "Medical programs", content: "Multi-day cure programs require advance medical consultation. Documentation from your physician recommended." },
      { title: "Children", content: "Family-friendly resort with dedicated children's thermal areas. Medical spa is adults-only." },
      { title: "UNESCO site access", content: "Special early-morning access to the travertine terraces arranged for hotel guests." },
    ],
    thermalProperties: {
      waterType: "Calcium Bicarbonate-Sulfate",
      waterOrigin: "Ancient Hierapolis thermal aquifer",
      waterAge: "Over 2,200 years of documented use",
      phLevel: "6.0-6.5",
      minerals: [
        { mineral: "Calcium", amount: "576 mg/L", benefit: "Bone health and skin regeneration" },
        { mineral: "Bicarbonate", amount: "1,024 mg/L", benefit: "Metabolic balance and detoxification" },
        { mineral: "Sulfate", amount: "840 mg/L", benefit: "Joint mobility and anti-inflammatory" },
        { mineral: "Carbon Dioxide", amount: "895 mg/L", benefit: "Cardiovascular stimulation" },
      ],
      healthBenefits: [
        { condition: "Rheumatic disorders", description: "Thermal immersion reduces inflammation and improves joint function" },
        { condition: "Dermatological conditions", description: "Calcium-rich waters support skin healing and psoriasis treatment" },
        { condition: "Cardiovascular wellness", description: "CO2-enriched waters promote circulation and heart health" },
      ],
      historicalSignificance: "The thermal springs of Hierapolis were sacred to Apollo and considered a gateway to the underworld. Roman physicians prescribed these waters for ailments, and the ancient city's necropolis testifies to centuries of therapeutic pilgrimage.",
      whyChoose: [
        "UNESCO World Heritage setting unmatched anywhere",
        "Medically certified thermal cure programs",
        "Turkey's most internationally recognized wellness destination",
        "Perfect fusion of cultural exploration and therapeutic wellness",
      ],
    },
  },
  {
    id: "ng-sapanca",
    name: "NG Sapanca Wellness & Convention",
    location: "Sapanca, Sakarya",
    destinationId: "turkey",
    tagline: "Lakeside Wellness Sanctuary",
    description: "Turkey's premier destination for family wellness and gastronomy",
    heroImage: hotelNgSapanca,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "35°C",
    history: "Modern",
    flowRate: "Natural Lake",
    starRating: 5,
    experience: `Nestled between the serene waters of Lake Sapanca and the forested slopes of Kartepe, NG Sapanca represents the pinnacle of Turkish hospitality. This expansive wellness resort offers one of the country's largest spa complexes, where families and discerning travelers discover a sanctuary that seamlessly blends relaxation, gastronomy, and natural beauty.`,
    thermalDescription: `While drawing from natural thermal sources, the resort's wellness philosophy extends beyond traditional thermal bathing to encompass holistic well-being—forest bathing, lake-inspired hydrotherapy, and Alpine-influenced spa rituals.`,
    outdoorPools: `Multiple outdoor pools cascade toward Lake Sapanca, including infinity edges that blur the boundary between pool and lake. Seasonal thermal pools maintain optimal temperatures year-round.`,
    indoorPools: `One of Turkey's most extensive indoor spa complexes features thermal pools, wave pools, children's aqua areas, and specialized hydrotherapy circuits across multiple levels.`,
    spaDescription: `The spa philosophy draws from global wellness traditions while honoring Turkish hammam heritage, offering treatments that range from Balinese massage to Anatolian botanical rituals.`,
    spaServices: [
      "Traditional Turkish hamam with foam massage",
      "Hot stone therapy with Sapanca lake stones",
      "Aromatherapy with Anatolian botanicals",
      "Couples wellness journeys",
      "Children's spa experiences",
    ],
    rooms: [
      { name: "Lake View Room", description: "Elegant accommodations overlooking the tranquil Sapanca waters." },
      { name: "Family Suite", description: "Spacious multi-room accommodation designed for families." },
      { name: "Executive Suite", description: "Premium residence with private lounge and enhanced amenities." },
      { name: "Presidential Suite", description: "Ultimate luxury with panoramic lake views and butler service." },
    ],
    inclusions: [
      "Unlimited spa and pool access",
      "Gourmet breakfast and afternoon tea",
      "Access to fitness and wellness activities",
      "Children's club programs",
      "Lake and garden access",
      "Welcome wellness ritual",
    ],
    policies: [
      { title: "Families", content: "We celebrate families with dedicated children's facilities, connecting rooms, and supervised activities." },
      { title: "Gastronomy", content: "Multiple restaurants showcase Turkish and international cuisines. Dietary requirements accommodated with advance notice." },
      { title: "Corporate", content: "Extensive meeting facilities available. Wellness programs can be integrated into corporate retreats." },
    ],
    thermalProperties: {
      waterType: "Natural Spring & Lake-Inspired",
      waterOrigin: "Sapanca watershed and thermal springs",
      phLevel: "7.2",
      minerals: [
        { mineral: "Calcium", amount: "320 mg/L", benefit: "Bone and muscle support" },
        { mineral: "Magnesium", amount: "180 mg/L", benefit: "Relaxation and stress relief" },
        { mineral: "Silica", amount: "45 mg/L", benefit: "Skin elasticity and hair health" },
      ],
      healthBenefits: [
        { condition: "Stress and burnout", description: "Comprehensive wellness programs address modern exhaustion" },
        { condition: "Family bonding", description: "Shared wellness experiences strengthen family connections" },
        { condition: "Respiratory wellness", description: "Forest and lake air quality supports respiratory health" },
      ],
      whyChoose: [
        "Turkey's largest and most comprehensive spa complex",
        "Perfect balance of family-friendly and adult wellness",
        "Exceptional gastronomy rivaling European standards",
        "Accessible weekend escape from Istanbul",
      ],
    },
  },
  {
    id: "kaya-palazzo-kartalkaya",
    name: "Kaya Palazzo Ski & Mountain Resort",
    location: "Kartalkaya, Bolu",
    destinationId: "turkey",
    tagline: "Alpine Wellness at Altitude",
    description: "Where high-altitude wellness meets Turkish hospitality",
    heroImage: hotelKayaPalazzo,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "38°C",
    history: "Contemporary",
    flowRate: "Mountain Springs",
    starRating: 5,
    experience: `Perched in the Köroğlu Mountains at 2,200 meters, Kaya Palazzo offers a rare convergence of Alpine adventure and Mediterranean warmth. Winter transforms the resort into Turkey's most exclusive ski destination, while the spa provides year-round sanctuary where thin mountain air and heated waters create a uniquely restorative environment.`,
    thermalDescription: `High-altitude bathing offers distinct physiological benefits—lower atmospheric pressure enhances circulation, while mountain spring waters provide mineral replenishment. The spa leverages these natural advantages in its therapeutic approach.`,
    outdoorPools: `Heated infinity pools overlook snow-covered peaks, offering the exhilarating contrast of warm immersion amid Alpine scenery. The thermal terrace becomes magical at dusk as mountains fade to silhouette.`,
    indoorPools: `An expansive indoor thermal complex maintains consistent temperatures regardless of season, featuring hydrotherapy circuits, salt pools, and specialized altitude-adapted treatments.`,
    spaDescription: `The spa philosophy integrates Alpine wellness traditions—cold plunge therapy, altitude training—with Turkish hamam rituals, creating treatments unavailable elsewhere.`,
    spaServices: [
      "Altitude wellness programs",
      "Hot-cold contrast therapy",
      "Mountain botanical treatments",
      "Post-ski recovery rituals",
      "Traditional Turkish hamam",
    ],
    medicalWellness: `Specialized programs for athletes and wellness enthusiasts leverage the altitude for enhanced training and recovery benefits.`,
    rooms: [
      { name: "Mountain View Room", description: "Contemporary Alpine comfort with stunning peak panoramas." },
      { name: "Ski Suite", description: "Ski-in convenience with fireplace and mountain terrace." },
      { name: "Palazzo Suite", description: "Luxury residence with private sauna and panoramic views." },
      { name: "Royal Chalet", description: "Ultimate privacy with dedicated staff and exclusive amenities." },
    ],
    inclusions: [
      "Spa and thermal pool access",
      "Ski lift and slope access (winter)",
      "Mountain hiking programs (summer)",
      "Gourmet breakfast and après-ski refreshments",
      "Fitness and altitude training facilities",
    ],
    policies: [
      { title: "Seasons", content: "Ski season December-March. Summer offers hiking, mountain biking, and wellness retreats." },
      { title: "Altitude considerations", content: "Guests with cardiac or respiratory conditions should consult physicians before high-altitude bathing." },
      { title: "Ski services", content: "Equipment rental, ski school, and private instruction available on-site." },
    ],
    thermalProperties: {
      waterType: "Mountain Spring Thermal",
      waterOrigin: "Köroğlu Mountain aquifer",
      phLevel: "7.0",
      minerals: [
        { mineral: "Iron", amount: "12 mg/L", benefit: "Energy and oxygen transport" },
        { mineral: "Magnesium", amount: "156 mg/L", benefit: "Muscle recovery and relaxation" },
        { mineral: "Zinc", amount: "8 mg/L", benefit: "Immune support and skin health" },
      ],
      healthBenefits: [
        { condition: "Athletic recovery", description: "Altitude and thermal combination accelerates muscle repair" },
        { condition: "Respiratory conditioning", description: "Mountain air quality and steam inhalation support lung health" },
        { condition: "Stress relief", description: "Altitude-induced calm combined with thermal relaxation" },
      ],
      whyChoose: [
        "Turkey's only ultra-luxury mountain thermal spa",
        "Unique altitude wellness benefits",
        "World-class skiing with European-standard facilities",
        "Year-round destination for active wellness",
      ],
    },
  },
  {
    id: "rixos-afyon",
    name: "Rixos Premium Afyon",
    location: "Afyonkarahisar",
    destinationId: "turkey",
    tagline: "Turkey's Premier Thermal Resort",
    description: "The grandest expression of Turkish thermal hospitality",
    heroImage: hotelRixosAfyon,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "42°C",
    history: "Ancient",
    flowRate: "2500L",
    starRating: 5,
    experience: `In the heart of Anatolia's thermal heartland, Rixos Afyon stands as Turkey's most ambitious thermal resort. Afyonkarahisar has been celebrated for its healing waters since Phrygian times, and today's resort channels this heritage into an all-inclusive experience that has become the benchmark for Turkish thermal hospitality.`,
    thermalDescription: `The Afyon thermal waters emerge at 42°C with exceptional mineral density—sulfate, bicarbonate, and chloride combine in concentrations that have earned these springs international medical recognition. The waters are particularly celebrated for musculoskeletal and dermatological therapy.`,
    outdoorPools: `Vast thermal pools spread across landscaped grounds, with graduated temperature zones allowing guests to find their perfect thermal experience. The main pool complex rivals any in Europe for scale and design.`,
    indoorPools: `An extraordinary indoor thermal world encompasses Turkish hamam suites, Roman-inspired thermal baths, treatment pools, and the largest indoor thermal lagoon in the region.`,
    spaDescription: `The spa represents the pinnacle of Turkish wellness, with traditional hamam experiences elevated to ceremonial art, complemented by contemporary treatments from global traditions.`,
    spaServices: [
      "Royal Turkish hamam ceremony",
      "Thermal mud and clay treatments",
      "Sulfur-enriched therapeutic baths",
      "Ayurvedic and Asian wellness rituals",
      "Medical wellness consultations",
    ],
    medicalWellness: `A comprehensive medical spa offers physician-supervised programs for rheumatic conditions, rehabilitation, weight management, and anti-aging—all leveraging the therapeutic properties of Afyon's renowned waters.`,
    rooms: [
      { name: "Deluxe Room", description: "Spacious accommodation with thermal bath amenities and garden views." },
      { name: "Premium Suite", description: "Enhanced luxury with separate living area and thermal terrace." },
      { name: "Royal Suite", description: "Grand residence with private thermal pool and dedicated butler." },
      { name: "Villa", description: "Ultimate privacy with exclusive facilities and personalized service." },
    ],
    inclusions: [
      "Ultra all-inclusive concept",
      "Unlimited thermal and spa access",
      "24-hour dining and refreshments",
      "Wellness activities and fitness classes",
      "Entertainment and cultural programs",
      "Children's and teen's clubs",
    ],
    policies: [
      { title: "All-inclusive", content: "Our ultra all-inclusive concept includes premium beverages, dining, and most activities." },
      { title: "International guests", content: "Multilingual staff and services tailored for Middle Eastern, Russian, and European guests." },
      { title: "Medical programs", content: "Extended therapeutic stays available with physician supervision." },
    ],
    thermalProperties: {
      waterType: "Sulfate-Bicarbonate-Chloride",
      waterOrigin: "Afyon thermal basin, ancient Phrygian springs",
      waterAge: "Geological origins over 50 million years",
      phLevel: "6.8",
      minerals: [
        { mineral: "Sulfate", amount: "1,450 mg/L", benefit: "Anti-inflammatory and detoxification" },
        { mineral: "Bicarbonate", amount: "890 mg/L", benefit: "Metabolic support and skin health" },
        { mineral: "Chloride", amount: "620 mg/L", benefit: "Muscle relaxation and circulation" },
        { mineral: "Calcium", amount: "445 mg/L", benefit: "Bone density and nervous system" },
      ],
      healthBenefits: [
        { condition: "Rheumatic diseases", description: "Clinically validated relief for arthritis and fibromyalgia" },
        { condition: "Skin conditions", description: "Psoriasis, eczema, and dermatitis respond to sulfur-rich waters" },
        { condition: "Post-operative recovery", description: "Thermal rehabilitation accelerates healing" },
      ],
      historicalSignificance: "Afyon's thermal springs were sacred to the Phrygians and later the Romans. The name 'Afyon' derives from opium poppies, but the region's true treasure lies beneath—thermal waters that have healed for millennia.",
      mudTherapy: {
        description: "Afyon's thermal mud is among Turkey's most mineral-rich, applied warm for deep therapeutic benefit.",
        benefits: [
          "Deep muscle and joint relief",
          "Skin purification and regeneration",
          "Circulation enhancement",
          "Natural mineral absorption",
        ],
      },
      whyChoose: [
        "Turkey's most internationally recognized thermal resort",
        "Medically certified therapeutic waters",
        "Ultra all-inclusive luxury concept",
        "Perfect for families and extended wellness stays",
      ],
    },
  },
  {
    id: "swissotel-bodrum",
    name: "Swissôtel Resort Bodrum Beach",
    location: "Bodrum, Muğla",
    destinationId: "turkey",
    tagline: "Aegean Luxury Wellness",
    description: "Swiss precision meets Mediterranean soul",
    heroImage: hotelSwissotelBodrum,
    thermalPoolImage: thermalPool,
    spaImage: spaInterior,
    roomImage: roomSuite,
    thermalTemp: "Seawater & Spa",
    history: "Contemporary",
    flowRate: "Aegean Sea",
    starRating: 5,
    experience: `Where the crystalline Aegean meets whitewashed Bodrum architecture, Swissôtel Resort embodies the highest international standards of wellness luxury. This is not a thermal resort in the traditional sense—it is Turkey's benchmark for contemporary spa excellence, where Swiss hospitality precision enhances the natural healing qualities of the Mediterranean environment.`,
    thermalDescription: `The Pürovel Spa & Sport philosophy draws upon the Aegean's natural gifts—sea air rich in negative ions, abundant sunshine, and mineral-dense seawater—combining these with Swiss wellness innovation for a truly distinctive approach.`,
    outdoorPools: `Multiple pools tier down toward the private beach, including an infinity pool that merges seamlessly with the Aegean horizon. The adults-only pool offers tranquil sanctuary.`,
    indoorPools: `The Pürovel Spa features a heated indoor pool, vitality pool, and specialized hydrotherapy facilities designed to the exacting Swiss wellness standards.`,
    spaDescription: `Pürovel Spa represents the Swiss approach to wellness—efficient, innovative, and results-oriented—while honoring the Mediterranean tradition of sensory pleasure and relaxation.`,
    spaServices: [
      "Pürovel signature treatments",
      "Thalassotherapy and seawater rituals",
      "Mediterranean botanical facials",
      "Deep tissue and sports massage",
      "Hammam experiences with Aegean twist",
    ],
    rooms: [
      { name: "Deluxe Room", description: "Contemporary elegance with Aegean views and private balcony." },
      { name: "Junior Suite", description: "Spacious accommodation with separate living area and sea vistas." },
      { name: "Executive Suite", description: "Premium residence with panoramic terrace and enhanced amenities." },
      { name: "Presidential Suite", description: "Ultimate luxury with private pool and dedicated concierge." },
    ],
    inclusions: [
      "Pürovel Spa access",
      "Private beach and multiple pools",
      "Fitness center and sports facilities",
      "Buffet breakfast with healthy options",
      "Water sports and beach activities",
      "Complimentary WiFi and digital services",
    ],
    policies: [
      { title: "Location", content: "Situated on the Bodrum Peninsula with easy access to town, marina, and cultural sites." },
      { title: "Families", content: "Family-friendly with children's club and connecting room options." },
      { title: "Dress code", content: "Resort casual. Smart casual for evening dining venues." },
    ],
    thermalProperties: {
      waterType: "Aegean Seawater & Mineral Springs",
      waterOrigin: "Aegean Sea and local mineral sources",
      phLevel: "8.1 (seawater)",
      minerals: [
        { mineral: "Sea Salt", amount: "35g/L", benefit: "Skin purification and muscle relaxation" },
        { mineral: "Magnesium", amount: "1,290 mg/L", benefit: "Stress relief and sleep quality" },
        { mineral: "Potassium", amount: "380 mg/L", benefit: "Cellular hydration and vitality" },
        { mineral: "Iodine", amount: "0.06 mg/L", benefit: "Thyroid health and metabolism" },
      ],
      healthBenefits: [
        { condition: "Stress and anxiety", description: "Sea air and wellness rituals promote deep relaxation" },
        { condition: "Skin health", description: "Thalassotherapy and sea minerals rejuvenate skin" },
        { condition: "Physical fitness", description: "Comprehensive sports facilities support active wellness" },
      ],
      whyChoose: [
        "Turkey's benchmark for international spa luxury",
        "Swiss hospitality standards in Mediterranean setting",
        "Perfect for discerning global travelers",
        "Combines beach resort lifestyle with serious wellness",
      ],
    },
  },
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find((d) => d.id === id);
};

export const getHotelById = (id: string): Hotel | undefined => {
  return hotels.find((h) => h.id === id);
};

export const getHotelsByDestination = (destinationId: string): Hotel[] => {
  return hotels.filter((h) => h.destinationId === destinationId);
};
