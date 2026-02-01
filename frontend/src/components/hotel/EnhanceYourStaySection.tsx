import { motion } from "framer-motion";
import Link from "next/link";

interface EnhanceYourStaySectionProps {
  hotelName: string;
  hasMedicalWellness?: boolean;
}

const EnhanceYourStaySection = ({ hotelName, hasMedicalWellness = false }: EnhanceYourStaySectionProps) => {
  const wellnessCategories = [
    {
      title: "Signature Wellness Rituals",
      description: "Time-honored treatments refined to restore balance and vitality",
      items: [
        { name: "Therapeutic Massage Rituals", description: "Ancient techniques adapted for modern restoration" },
        { name: "Mineral Mud Therapies", description: "Earth's restorative minerals for skin and body" },
        { name: "Thermal Pool Programs", description: "Structured immersion for deep healing" },
        { name: "Aromatherapy Journeys", description: "Sensory experiences that calm the mind" },
      ]
    },
    {
      title: "Movement & Mind",
      description: "Gentle practices that reconnect body, breath, and presence",
      items: [
        { name: "Daily Yoga Sessions", description: "Morning and evening practices for all levels" },
        { name: "Guided Meditation", description: "Stillness cultivated in thermal serenity" },
        { name: "Breathwork & Mindfulness", description: "Techniques for lasting inner calm" },
        { name: "Aquatic Movement", description: "Gentle exercise in warm mineral waters" },
      ]
    },
  ];

  const medicalCategory = {
    title: "Medical & Curative Programs",
    description: "Physician-supervised protocols for those seeking deeper healing",
    items: [
      { name: "Doctor-Supervised Thermal Cure", description: "Personalized treatment plans with medical oversight" },
      { name: "Rehabilitation Support", description: "Recovery programs for post-surgery and injury" },
      { name: "Wellness Assessments", description: "Comprehensive health evaluations and guidance" },
      { name: "Therapeutic Consultations", description: "Expert advice for ongoing wellness" },
    ]
  };

  const allCategories = hasMedicalWellness
    ? [...wellnessCategories, medicalCategory]
    : wellnessCategories;

  return (
    <section className="section-spacing bg-secondary">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-subtle mb-6 block">Personalize Your Journey</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Enhance Your Stay
          </h2>
          <p className="editorial-text mx-auto mt-6">
            {hotelName} offers thoughtfully designed wellness experiences that can be
            incorporated into your stay, depending on your goals and preferences.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl space-y-16">
          {allCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="mb-8 border-b border-border pb-6">
                <h3 className="font-serif text-2xl text-foreground">
                  {category.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {category.description}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.05 }}
                    className="group"
                  >
                    <h4 className="font-serif text-lg text-foreground">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="text-muted-foreground">
              These experiences are available as part of selected programs or can be
              discussed with our wellness advisors when planning your stay.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/experiences"
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Explore Wellness Programs
              </Link>
              <span className="hidden text-muted-foreground/50 sm:inline">•</span>
              <button className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
                Speak with a Wellness Advisor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhanceYourStaySection;
