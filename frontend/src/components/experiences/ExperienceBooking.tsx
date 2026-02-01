import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { WellnessPackage, getSuitableHotelsForPackage } from "@/data/experiences";
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react";

interface ExperienceBookingProps {
  selectedPackage: WellnessPackage | null;
}

const ExperienceBooking = ({ selectedPackage }: ExperienceBookingProps) => {
  if (!selectedPackage) {
    return (
      <section className="section-spacing bg-card">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="label-subtle mb-6 block">Begin Your Journey</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Speak with a Wellness Advisor
            </h2>
            <p className="editorial-text mx-auto mt-6">
              Our wellness advisors understand that choosing a wellness experience is a personal decision.
              They're here to listen, guide, and help you find the perfect journey for your needs.
            </p>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Phone className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-foreground">Call Us</h3>
                <p className="mt-2 text-sm text-muted-foreground">Speak directly with an advisor</p>
                <p className="mt-3 font-medium text-foreground">+1 800 123 4567</p>
              </div>

              <div className="rounded-lg border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Mail className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-foreground">Email</h3>
                <p className="mt-2 text-sm text-muted-foreground">We respond within 24 hours</p>
                <p className="mt-3 font-medium text-foreground">wellness@thermal.com</p>
              </div>

              <div className="rounded-lg border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <MessageCircle className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-foreground">Live Chat</h3>
                <p className="mt-2 text-sm text-muted-foreground">Available 9am–8pm CET</p>
                <button className="mt-3 font-medium text-foreground underline-offset-4 hover:underline">Start Chat</button>
              </div>

              <div className="rounded-lg border border-border bg-background p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Calendar className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-foreground">Schedule Call</h3>
                <p className="mt-2 text-sm text-muted-foreground">Book a consultation</p>
                <button className="mt-3 font-medium text-foreground underline-offset-4 hover:underline">Pick a Time</button>
              </div>
            </div>
          </motion.div>

          {/* Enquiry Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="rounded-lg bg-secondary p-8 text-center">
              <h3 className="font-serif text-xl text-foreground">Not sure where to begin?</h3>
              <p className="mt-4 text-muted-foreground">
                Tell us a little about what you're looking for—your goals, preferred dates,
                and any health considerations—and we'll prepare personalized recommendations.
              </p>
              <button className="btn-premium mt-6">Send an Enquiry</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-12 max-w-3xl text-center"
          >
            <Link href="/destinations" className="btn-outline-premium">
              Explore Our Destinations
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  const suitableHotels = getSuitableHotelsForPackage(selectedPackage.id);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={selectedPackage.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-spacing bg-card"
      >
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="label-subtle mb-6 block">Complete Your Journey</span>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              {selectedPackage.name}
            </h2>
            <p className="editorial-text mx-auto mt-6">
              This program is available at select properties that specialize in
              {" " + selectedPackage.focus.toLowerCase()} experiences.
            </p>
          </motion.div>

          {/* Available hotels for this package */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <h3 className="mb-8 text-center font-serif text-xl text-foreground">
              Select Your Retreat
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {suitableHotels.slice(0, 4).map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/booking/${hotel.id}`}
                  className="group flex gap-4 border border-border bg-background p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
                    <img
                      src={hotel.heroImage}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-serif text-lg text-foreground transition-colors group-hover:text-highlight">
                      {hotel.name}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">{hotel.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Booking & Enquiry Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <div className="divider-subtle mb-12" />

            <div className="rounded-lg bg-secondary p-8 lg:p-10">
              <div className="text-center">
                <h3 className="font-serif text-2xl text-foreground">
                  Ready to Book Your Experience?
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Our wellness advisors are available to answer questions, confirm availability,
                  and help you prepare for your journey.
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-6 text-center">
                  <h4 className="font-serif text-lg text-foreground">Check Availability</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select your preferred dates and receive a personalized quote.
                  </p>
                  <button className="btn-premium mt-4 w-full">Check Availability</button>
                </div>

                <div className="rounded-lg border border-border bg-background p-6 text-center">
                  <h4 className="font-serif text-lg text-foreground">Send an Enquiry</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Have questions? Our team will respond within 24 hours.
                  </p>
                  <button className="btn-outline-premium mt-4 w-full">Enquire About Program</button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Or call us directly: <span className="font-medium text-foreground">+1 800 123 4567</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Signal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-12 max-w-3xl text-center"
          >
            <p className="text-sm text-muted-foreground">
              All consultations are complimentary and without obligation.
              We believe in finding the right fit, not making a sale.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default ExperienceBooking;
