import { Menu, MessageCircle, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteContent } from '../../data/site';
import { handleSectionNavigation } from '../../utils/navigation';

export function Header({ navItems = [], onQuoteOpen, theme = 'white', onThemeToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
      if (visibleSections.length) setActiveSection(visibleSections[0].target.id);
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  const handleNavClick = (event, item) => {
    if (item.id === 'cotizador') onQuoteOpen?.();
    setIsMenuOpen(false);
    handleSectionNavigation(event, item.id);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="The Osas home" onClick={(event) => handleSectionNavigation(event, 'inicio')}>
          <img src="/logo.webp" alt="Logo de The Osas" className="brand-mark" />
          <span className="brand-copy">
            <strong>{siteContent.brand.name}</strong>
            <small>{siteContent.brand.subtitle}</small>
          </span>
        </a>

        <nav id="main-navigation" className={isMenuOpen ? 'main-nav mobile-open' : 'main-nav'} aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={(event) => handleNavClick(event, item)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn-primary btn-whatsapp header-cta" href={siteContent.brand.whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          {siteContent.contact.whatsapp}
        </a>

        <a
          className="mobile-whatsapp"
          href={siteContent.brand.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar por WhatsApp"
          title="Contactar por WhatsApp"
        >
          <MessageCircle size={20} aria-hidden="true" />
        </a>

        <button
          type="button"
          className="theme-switch"
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label={theme === 'dark' ? 'Cambiar al modo claro' : 'Cambiar al modo oscuro'}
          title={theme === 'dark' ? 'Cambiar al modo claro' : 'Cambiar al modo oscuro'}
          onClick={onThemeToggle}
        >
          <span className="theme-switch-track" aria-hidden="true">
            <span className="theme-switch-thumb">
              {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
            </span>
          </span>
          <span className="theme-switch-label">{theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
        </button>

        <button
          type="button"
          className={isMenuOpen ? 'menu-button is-open' : 'menu-button'}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
