import { motion } from 'framer-motion';
import { Search, Route, Rocket, BarChart3 } from 'lucide-react';
import { Card, SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

const iconMap = {
  Search,
  Route,
  Rocket,
  BarChart3,
};

export function Process({ prefersReducedMotion }) {
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.4 },
      };

  return (
    <section id="proceso" className="section">
      <div className="container">
        <SectionTitle
          title="Proceso"
          subtitle="Un camino claro para decidir, ejecutar y mejorar."
          description="No trabajamos a ciegas. Nuestros procesos están pensados para mantener el foco en ventas, mensajes y optimización real."
        />

        <div className="steps-grid">
          {siteContent.process.map(({ id, title, description, icon }, index) => {
            const Icon = iconMap[icon];

            return (
              <motion.div key={id} {...fadeUp}>
                <Card className="step-card">
                  <span className="step-number">0{index + 1}</span>
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
