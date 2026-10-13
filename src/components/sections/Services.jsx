import { motion } from 'framer-motion';
import { Megaphone, Compass, Image as ImageIcon, BriefcaseBusiness, Building2, HeartPulse, Cpu } from 'lucide-react';
import { Card, SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

const iconMap = {
  Megaphone,
  Compass,
  ImageIcon,
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  Cpu,
};

export function Services({ prefersReducedMotion }) {
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.4 },
      };

  return (
    <section id="servicios" className="section services-section">
      <div className="container">
        <SectionTitle
          title="Servicios"
          subtitle="Lo que hacemos para que tu marca crezca con más claridad y más ventas."
          description="Diseñamos estrategias y campañas para que cada paso del funnel funcione mejor: desde el diagnóstico hasta la conversión."
        />

        <div className="cards-grid cards-3 services-grid">
          {siteContent.services.map(({ id, title, description, audience, icon }) => {
            const Icon = iconMap[icon];

            return (
              <motion.div key={id} {...fadeUp}>
                <Card className="service-card">
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <small>{audience}</small>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
