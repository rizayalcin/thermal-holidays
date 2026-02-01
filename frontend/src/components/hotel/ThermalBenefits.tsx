import { motion } from "framer-motion";
import { Droplets, Heart, Leaf, History, Sparkles, ShieldCheck } from "lucide-react";

interface WaterProperty {
  mineral: string;
  amount: string;
  benefit: string;
}

interface HealthBenefit {
  condition: string;
  description: string;
}

interface ThermalBenefitsProps {
  hotelName: string;
  waterType: string;
  waterOrigin: string;
  waterAge?: string;
  phLevel?: string;
  minerals: WaterProperty[];
  healthBenefits: HealthBenefit[];
  historicalSignificance?: string;
  mudTherapy?: {
    description: string;
    benefits: string[];
  };
  whyChoose: string[];
}

const ThermalBenefits = ({
  hotelName,
  waterType,
  waterOrigin,
  waterAge,
  phLevel,
  minerals,
  healthBenefits,
  historicalSignificance,
  mudTherapy,
  whyChoose,
}: ThermalBenefitsProps) => {
  return (
    <section className="section-spacing bg-secondary">
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <span className="label-subtle mb-6 block">Şifalı Sular</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            Termal Su Özellikleri
          </h2>
          <p className="editorial-text mt-6">
            {hotelName}'in termal suları, yüzyıllardır şifa arayan gezginlere ev sahipliği yapmaktadır. 
            Bu eşsiz sular, benzersiz mineral bileşimleriyle bedensel ve ruhsal iyileşme sunar.
          </p>
        </motion.div>

        {/* Water Source Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-lg bg-background p-6">
            <Droplets className="mb-4 h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
            <h4 className="font-serif text-lg text-foreground">Su Tipi</h4>
            <p className="mt-2 text-muted-foreground">{waterType}</p>
          </div>
          
          <div className="rounded-lg bg-background p-6">
            <Leaf className="mb-4 h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
            <h4 className="font-serif text-lg text-foreground">Kaynak</h4>
            <p className="mt-2 text-muted-foreground">{waterOrigin}</p>
          </div>
          
          {waterAge && (
            <div className="rounded-lg bg-background p-6">
              <History className="mb-4 h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
              <h4 className="font-serif text-lg text-foreground">Su Yaşı</h4>
              <p className="mt-2 text-muted-foreground">{waterAge}</p>
            </div>
          )}
          
          {phLevel && (
            <div className="rounded-lg bg-background p-6">
              <Sparkles className="mb-4 h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
              <h4 className="font-serif text-lg text-foreground">pH Değeri</h4>
              <p className="mt-2 text-muted-foreground">{phLevel}</p>
            </div>
          )}
        </motion.div>

        {/* Mineral Composition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="mb-8 font-serif text-2xl text-foreground">Mineral İçeriği</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {minerals.map((mineral, index) => (
              <motion.div
                key={mineral.mineral}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border bg-background p-6"
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h4 className="font-serif text-lg text-foreground">{mineral.mineral}</h4>
                  <span className="text-sm font-medium text-muted-foreground">{mineral.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{mineral.benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Health Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <Heart className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-foreground">Sağlık Faydaları</h3>
          </div>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Termal sularımız, aşağıdaki rahatsızlıkların tedavisinde ve semptomların hafifletilmesinde 
            yüzyıllardır kullanılmaktadır. Tıbbi danışmanlık için uzman ekibimizle iletişime geçebilirsiniz.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {healthBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.condition}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex items-start gap-4 rounded-lg bg-background p-5"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium text-foreground">{benefit.condition}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mud Therapy */}
        {mudTherapy && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 rounded-lg bg-background p-8 md:p-12"
          >
            <h3 className="mb-6 font-serif text-2xl text-foreground">Çamur Terapisi</h3>
            <p className="mb-8 max-w-2xl text-muted-foreground leading-relaxed">{mudTherapy.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {mudTherapy.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Historical Significance */}
        {historicalSignificance && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 border-l-2 border-border pl-8"
          >
            <h3 className="mb-4 font-serif text-2xl text-foreground">Tarihsel Önemi</h3>
            <p className="editorial-text max-w-3xl">{historicalSignificance}</p>
          </motion.div>
        )}

        {/* Why Choose This Hotel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-lg bg-card p-8 md:p-12"
        >
          <h3 className="mb-8 font-serif text-2xl text-foreground">Neden {hotelName}?</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {whyChoose.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-sm text-foreground">
                  {index + 1}
                </span>
                <p className="text-foreground leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThermalBenefits;
