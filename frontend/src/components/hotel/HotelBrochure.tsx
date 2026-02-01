import { forwardRef } from "react";
import { Check, Droplets, Thermometer, Clock, MapPin, Star } from "lucide-react";
import type { Hotel, Destination } from "@/data/destinations";

interface HotelBrochureProps {
  hotel: Hotel;
  destination?: Destination;
}

const HotelBrochure = forwardRef<HTMLDivElement, HotelBrochureProps>(
  ({ hotel, destination }, ref) => {
    return (
      <div ref={ref} className="brochure-container bg-background text-foreground print:bg-white print:text-gray-900">
        {/* Cover Page */}
        <div className="brochure-page cover-page relative min-h-[700px] print:min-h-[100vh] print:page-break-after">
          <div className="absolute inset-0">
            <img
              src={hotel.heroImage}
              alt={hotel.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent print:from-black/80 print:via-black/30" />
          </div>
          
          <div className="relative flex h-full min-h-[700px] flex-col justify-end p-8 md:p-12 print:min-h-[100vh]">
            <div className="mb-8">
              <p className="mb-4 text-sm font-light uppercase tracking-[0.3em] text-primary-foreground/80">
                Thermal Wellness Retreat
              </p>
              <h1 className="font-serif text-4xl font-medium leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {hotel.name}
              </h1>
              <div className="mt-4 flex items-center gap-2 text-primary-foreground/90">
                <MapPin className="h-4 w-4" />
                <span className="text-lg">{hotel.location}</span>
              </div>
            </div>
            
            <div className="flex gap-8 border-t border-primary-foreground/20 pt-8">
              <div className="text-center">
                <Thermometer className="mx-auto mb-2 h-5 w-5 text-thermal" />
                <span className="block font-serif text-2xl text-thermal">{hotel.thermalTemp}</span>
                <span className="text-xs text-primary-foreground/60">Temperature</span>
              </div>
              <div className="text-center">
                <Clock className="mx-auto mb-2 h-5 w-5 text-primary-foreground/70" />
                <span className="block font-serif text-2xl text-primary-foreground">{hotel.history}</span>
                <span className="text-xs text-primary-foreground/60">Years of History</span>
              </div>
              <div className="text-center">
                <Droplets className="mx-auto mb-2 h-5 w-5 text-thermal-muted" />
                <span className="block font-serif text-2xl text-primary-foreground">{hotel.flowRate}</span>
                <span className="text-xs text-primary-foreground/60">Flow Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Page */}
        <div className="brochure-page experience-page p-8 md:p-12 print:page-break-after">
          <div className="mb-8 border-b border-border pb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              The Experience
            </p>
            <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl">
              {hotel.description}
            </h2>
          </div>
          
          <div className="mb-10">
            <p className="text-base leading-relaxed text-muted-foreground">
              {hotel.experience}
            </p>
          </div>

          {/* Thermal Pool Image */}
          <div className="mb-10">
            <img
              src={hotel.thermalPoolImage}
              alt="Thermal pools"
              className="h-64 w-full rounded object-cover print:h-48"
            />
          </div>

          {/* Thermal & Spa */}
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Thermal & Spa
            </p>
            <h3 className="mb-4 font-serif text-xl font-medium text-foreground md:text-2xl">
              The Healing Waters
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {hotel.thermalDescription}
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-foreground">Outdoor Thermal Pools</h4>
                <p className="text-sm text-muted-foreground">{hotel.outdoorPools}</p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-foreground">Indoor Thermal Areas</h4>
                <p className="text-sm text-muted-foreground">{hotel.indoorPools}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thermal Properties Page (if available) */}
        {hotel.thermalProperties && (
          <div className="brochure-page thermal-properties-page p-8 md:p-12 print:page-break-after">
            <div className="mb-8 border-b border-border pb-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Scientific Analysis
              </p>
              <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl">
                Water Composition & Benefits
              </h2>
            </div>

            <div className="mb-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-thermal/5 border border-thermal-muted/20 p-4">
                  <p className="text-xs font-medium uppercase text-thermal-muted">Water Type</p>
                  <p className="mt-1 font-medium text-foreground">{hotel.thermalProperties.waterType}</p>
                </div>
                <div className="rounded-lg bg-thermal/5 border border-thermal-muted/20 p-4">
                  <p className="text-xs font-medium uppercase text-thermal-muted">Origin</p>
                  <p className="mt-1 font-medium text-foreground">{hotel.thermalProperties.waterOrigin}</p>
                </div>
                {hotel.thermalProperties.waterAge && (
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-xs font-medium uppercase text-muted-foreground">Water Age</p>
                    <p className="mt-1 font-medium text-foreground">{hotel.thermalProperties.waterAge}</p>
                  </div>
                )}
                {hotel.thermalProperties.phLevel && (
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-xs font-medium uppercase text-muted-foreground">pH Level</p>
                    <p className="mt-1 font-medium text-foreground">{hotel.thermalProperties.phLevel}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mineral Composition */}
            <div className="mb-8">
              <h3 className="mb-4 font-serif text-lg font-medium text-foreground md:text-xl">
                Mineral Composition
              </h3>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Mineral</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Amount</th>
                      <th className="px-4 py-2 text-left font-medium text-foreground">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel.thermalProperties.minerals.map((mineral, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-secondary/50"}>
                        <td className="px-4 py-2 font-medium text-foreground">{mineral.mineral}</td>
                        <td className="px-4 py-2 text-muted-foreground">{mineral.amount}</td>
                        <td className="px-4 py-2 text-muted-foreground">{mineral.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Health Benefits */}
            <div className="mb-8">
              <h3 className="mb-4 font-serif text-lg font-medium text-foreground md:text-xl">
                Health Benefits
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {hotel.thermalProperties.healthBenefits.map((benefit, index) => (
                  <div key={index} className="rounded-lg border border-border p-3">
                    <h4 className="font-medium text-foreground">{benefit.condition}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mud Therapy */}
            {hotel.thermalProperties.mudTherapy && (
              <div className="rounded-lg bg-highlight/10 p-6 print:bg-amber-50">
                <h3 className="mb-3 font-serif text-lg font-medium text-foreground md:text-xl">
                  Mud Therapy
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {hotel.thermalProperties.mudTherapy.description}
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {hotel.thermalProperties.mudTherapy.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-highlight" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rooms & Spa Services Page */}
        <div className="brochure-page rooms-page p-8 md:p-12 print:page-break-after">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Rooms Section */}
            <div>
              <div className="mb-6">
                <img
                  src={hotel.roomImage}
                  alt="Accommodations"
                  className="h-48 w-full rounded object-cover"
                />
              </div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Accommodations
              </p>
              <h3 className="mb-4 font-serif text-xl font-medium text-foreground md:text-2xl">
                Rooms & Suites
              </h3>
              <div className="space-y-4">
                {hotel.rooms.map((room, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-b-0">
                    <h4 className="font-medium text-foreground">{room.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{room.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spa Services Section */}
            <div>
              <div className="mb-6">
                <img
                  src={hotel.spaImage}
                  alt="Spa facilities"
                  className="h-48 w-full rounded object-cover"
                />
              </div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Wellness
              </p>
              <h3 className="mb-4 font-serif text-xl font-medium text-foreground md:text-2xl">
                Spa & Treatments
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">{hotel.spaDescription}</p>
              <ul className="space-y-2">
                {hotel.spaServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-thermal-muted" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              
              {hotel.medicalWellness && (
                <div className="mt-6 rounded-lg bg-accent/30 p-4 print:bg-blue-50">
                  <h4 className="mb-2 font-medium text-foreground">Medical Wellness</h4>
                  <p className="text-sm text-muted-foreground">{hotel.medicalWellness}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inclusions & Policies Page */}
        <div className="brochure-page inclusions-page p-8 md:p-12">
          <div className="grid gap-12 md:grid-cols-2">
            {/* What's Included */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Your Stay Includes
              </p>
              <h3 className="mb-6 font-serif text-xl font-medium text-foreground md:text-2xl">
                What's Included
              </h3>
              <div className="space-y-3">
                {hotel.inclusions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-thermal" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Before You Arrive
              </p>
              <h3 className="mb-6 font-serif text-xl font-medium text-foreground md:text-2xl">
                Good to Know
              </h3>
              <div className="space-y-4">
                {hotel.policies.map((policy, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-medium text-foreground">{policy.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{policy.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Section */}
          {hotel.thermalProperties?.whyChoose && (
            <div className="mt-12 rounded-lg bg-gradient-to-r from-highlight/10 to-highlight/5 p-8 print:from-amber-50 print:to-orange-50">
              <h3 className="mb-6 text-center font-serif text-xl font-medium text-foreground md:text-2xl">
                Why Choose {hotel.name}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {hotel.thermalProperties.whyChoose.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-highlight text-xs font-medium text-highlight-foreground">
                      {index + 1}
                    </div>
                    <span className="text-sm text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="font-serif text-xl text-foreground">{hotel.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{hotel.location}</p>
            <p className="mt-4 text-xs text-muted-foreground/60">
              This brochure was generated from thermalholidays.com
            </p>
          </div>
        </div>
      </div>
    );
  }
);

HotelBrochure.displayName = "HotelBrochure";

export default HotelBrochure;
