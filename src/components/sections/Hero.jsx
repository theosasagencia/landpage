import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteContent } from '../../data/site';
import { handleSectionNavigation } from '../../utils/navigation';

export function Hero({ prefersReducedMotion }) {
  const { hero, brand } = siteContent;
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5 },
      };

  return (
    <section id="inicio" className="section hero-section">
      <div className="container hero-grid">
        <motion.div {...fadeUp}>
          <span className="kicker">{hero.kicker}</span>
          <h1>{hero.title}</h1>
          <p className="lead hero-subtitle">{hero.subtitle}</p>
          <p className="lead hero-copy">{hero.description}</p>

          <div className="hero-actions">
            <a className="btn btn-primary btn-whatsapp" href={brand.whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              {hero.primaryCta}
            </a>
            <a className="btn btn-secondary" href="#servicios" onClick={(event) => handleSectionNavigation(event, 'servicios')}>
              {hero.secondaryCta}
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="value-banner">
            <p>{hero.valueBanner.text}</p>
            <div className="value-tags" aria-label="Áreas de trabajo">
              {hero.valueBanner.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </motion.div>

        <motion.div className="hero-panel" {...fadeUp}>
          <div className="panel-badge">{hero.badge}</div>
          {hero.panel.map((item) => (
            <div key={item.label} className="metric-box">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
