import { Camera, Mail, MessageCircle } from 'lucide-react';
import { siteContent } from '../../data/site';
import { handleSectionNavigation } from '../../utils/navigation';

const currentYear = new Date().getFullYear();

export function Footer({ onQuoteOpen }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <a href="#sobre-nosotros" onClick={(event) => handleSectionNavigation(event, 'sobre-nosotros')}>Nosotros</a>
          <a href="#servicios" onClick={(event) => handleSectionNavigation(event, 'servicios')}>Servicios</a>
          <a href="#cotizador" onClick={(event) => {
            onQuoteOpen?.();
            handleSectionNavigation(event, 'cotizador');
          }}>Cotizador</a>
          <a href="#sectores" onClick={(event) => handleSectionNavigation(event, 'sectores')}>Sectores</a>
          <a href="#faq" onClick={(event) => handleSectionNavigation(event, 'faq')}>FAQ</a>
          <a href="#contacto" onClick={(event) => handleSectionNavigation(event, 'contacto')}>Contacto</a>
        </div>

        <div className="footer-social">
          <span className="footer-social-title">Redes</span>
          <a href={siteContent.brand.instagram} target="_blank" rel="noreferrer">
            <span className="footer-social-icon"><Camera size={18} /></span>
            <span>Instagram · @the.osas</span>
          </a>
          <a href={siteContent.brand.instagramSecondary} target="_blank" rel="noreferrer">
            <span className="footer-social-icon"><Camera size={18} /></span>
            <span>Instagram · @oh_danirod</span>
          </a>
          <a href={`mailto:${siteContent.brand.email}`}>
            <span className="footer-social-icon"><Mail size={18} /></span>
            <span>Correo</span>
          </a>
          <a href={siteContent.brand.whatsappUrl} target="_blank" rel="noreferrer">
            <span className="footer-social-icon"><MessageCircle size={18} /></span>
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="footer-meta">
          <div className="brand brand-footer">
            <img src="/logo.webp" alt="Logo de The Osas" className="brand-mark" />
            <span className="brand-copy">
              <strong>{siteContent.brand.name}</strong>
              <small>{siteContent.brand.subtitle}</small>
            </span>
          </div>
          <span>© {currentYear} {siteContent.brand.name}</span>
          <a href="/politica-privacidad">Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
}
