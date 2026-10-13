import { motion } from 'framer-motion';
import { BriefcaseBusiness, Building2, HeartPulse, Cpu } from 'lucide-react';
import { Card, SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

const iconMap = {
  Cpu,
  Building2,
  HeartPulse,
  BriefcaseBusiness,
};

export function Sectors({ prefersReducedMotion }) {
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.4 },
      };

  return (
    <section id="sectores" className="section alt-section">
      <div className="container">
        <SectionTitle
          title="Sectores"
          subtitle="Nos movemos mejor cuando hay un problema claro por resolver."
          description="Cada sector tiene su propia lógica de compra y su propio lenguaje. Por eso trabajamos con enfoque y estrategia, no con una fórmula genérica."
        />

        <div className="cards-grid cards-4">
          {siteContent.sectors.map(({ id, title, pain, solution, icon }) => {
            const Icon = iconMap[icon];

            return (
              <motion.div key={id} {...fadeUp}>
                <Card className="sector-card">
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{pain}</p>
                  <p>{solution}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
