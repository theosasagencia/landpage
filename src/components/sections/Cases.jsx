import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Card, SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

export function Cases({ prefersReducedMotion }) {
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.4 },
      };

  return (
    <section id="casos" className="section alt-section">
      <div className="container">
        <SectionTitle
          title="Resultados"
          subtitle="Resultados claros, medibles y honestos."
          description="La mejor prueba de una estrategia es la capacidad de entender si funciona, ajustar y mejorar. Aquí dejamos el espacio para casos reales cuando estén confirmados."
        />

        <div className="cards-grid cards-3 results-grid">
          {siteContent.cases.map(({ id, title, description }) => (
            <motion.div key={id} {...fadeUp}>
              <Card className="case-card">
                <div className="service-icon">
                  <TrendingUp size={22} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
