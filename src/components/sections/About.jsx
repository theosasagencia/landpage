import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, MessageSquareText, ShieldCheck, TrendingUp, X } from 'lucide-react';
import { siteContent } from '../../data/site';
import { handleSectionNavigation } from '../../utils/navigation';
import { Card } from '../ui';

const whyUsIconMap = {
  ShieldCheck,
  TrendingUp,
  MessageSquareText,
};

export function About() {
  const { about } = siteContent;
  const [isManagerImageOpen, setIsManagerImageOpen] = useState(false);
  const managerTriggerRef = useRef(null);
  const lightboxRef = useRef(null);
  const lightboxCloseRef = useRef(null);

  useEffect(() => {
    if (!isManagerImageOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsManagerImageOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = lightboxRef.current?.querySelectorAll(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        lightboxRef.current?.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    lightboxCloseRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      managerTriggerRef.current?.focus();
    };
  }, [isManagerImageOpen]);

  return (
    <section id="sobre-nosotros" className="section about-section">
      <div className="container about-grid">
        <div className="about-gallery" aria-label="Espacios de trabajo de The Osas">
          <img className="about-office about-office-main" src="/oficina-the-osas-1.webp" alt="Oficina de The Osas" loading="lazy" decoding="async" />
          <img className="about-office about-office-detail" src="/oficina-the-osas-2.webp" alt="Espacio de trabajo de The Osas" loading="lazy" decoding="async" />
        </div>

        <div className="about-content">
          <span className="kicker">{about.kicker}</span>
          <h2>{about.title}</h2>
          <p className="lead">{about.description}</p>

          <ul className="about-highlights">
            {about.highlights.map((highlight) => (
              <li key={highlight}><Check size={18} aria-hidden="true" /> {highlight}</li>
            ))}
          </ul>

          <a className="btn btn-secondary about-cta" href="#contacto" onClick={(event) => handleSectionNavigation(event, 'contacto')}>
            {about.cta}
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="about-reasons">
          <h3>Por qué trabajar con The Osas</h3>
          <p className="about-reasons-intro">Cada proyecto combina estrategia, criterio y una comunicación cercana para que el marketing tenga un efecto real en el negocio.</p>
          <div className="about-reasons-grid">
            {siteContent.whyUs.map(({ id, title, description, icon }) => {
              const Icon = whyUsIconMap[icon];

              return (
                <Card key={id} className="reason-card">
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="about-manager">
          <button ref={managerTriggerRef} type="button" className="about-manager-trigger" onClick={() => setIsManagerImageOpen(true)} aria-label={`Ampliar foto de ${about.manager.name}`}>
            <img src="/manager.webp" alt={`Foto de ${about.manager.name}, ${about.manager.role}`} loading="lazy" decoding="async" />
          </button>
          <div>
            <strong>{about.manager.name}</strong>
            <span>{about.manager.role}</span>
            <p>{about.manager.description}</p>
          </div>
        </div>
      </div>

      {isManagerImageOpen ? (
        <div ref={lightboxRef} className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Foto ampliada de ${about.manager.name}`} tabIndex={-1} onClick={() => setIsManagerImageOpen(false)}>
          <button ref={lightboxCloseRef} type="button" className="image-lightbox-close" onClick={() => setIsManagerImageOpen(false)} aria-label="Cerrar imagen ampliada">
            <X size={22} />
          </button>
          <img src="/manager.webp" alt={`Foto ampliada de ${about.manager.name}, ${about.manager.role}`} decoding="async" onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </section>
  );
}