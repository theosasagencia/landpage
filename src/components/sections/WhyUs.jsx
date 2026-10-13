import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, MessageSquareText } from 'lucide-react';
import { Card, SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

const iconMap = {
  ShieldCheck,
  TrendingUp,
  MessageSquareText,
};

export function WhyUs({ prefersReducedMotion }) {
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.4 },
      };

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          title="The Osas"
          subtitle="Por qué trabajar con nosotros."
          description="No buscamos campañas bonitas por sí mismas. Buscamos que cada decisión tenga un efecto real en el negocio."
        />

        <div className="cards-grid cards-3">
          {siteContent.whyUs.map(({ id, title, description, icon }) => {
            const Icon = iconMap[icon];

            return (
              <motion.div key={id} {...fadeUp}>
                <Card className="reason-card">
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
