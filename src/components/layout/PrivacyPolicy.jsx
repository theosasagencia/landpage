import { Footer } from './Footer';
import { siteContent } from '../../data/site';

export function PrivacyPolicy() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="Volver al inicio de The Osas">
            <img src="/logo.webp" alt="Logo de The Osas" className="brand-mark" />
            <span className="brand-copy">
              <strong>{siteContent.brand.name}</strong>
              <small>{siteContent.brand.subtitle}</small>
            </span>
          </a>

          <a className="btn btn-primary btn-whatsapp header-cta" href={siteContent.brand.whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <main id="main-content" className="section" tabIndex="-1">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Privacidad</span>
            <h1>Política de privacidad</h1>
          </div>

          <div className="card" style={{ padding: '1.5rem', maxWidth: '48rem' }}>
            <p>
              En The Osas Marketing &amp; Ads respetamos tu privacidad. Esta política explica qué información
              recibimos cuando usás este sitio, para qué la usamos. The Osas
              opera desde Mendoza, Argentina. Para consultas sobre privacidad, escribinos a{' '}
              <a href={`mailto:${siteContent.brand.email}`}>{siteContent.brand.email}</a>.
            </p>
            <h2>Qué información recibimos</h2>
            <p>
              Si completás el formulario de contacto, recibimos tu nombre, empresa, sector, WhatsApp, email y
              mensaje. Si completás el cotizador, elegís un servicio, sector y etapa del negocio, y podés ingresar
              tu nombre, empresa, WhatsApp y email.
            </p>
            <h2>Para qué usamos tus datos</h2>
            <p>
              Usamos la información que nos enviás para responder tu consulta, preparar un diagnóstico o propuesta,
              y dar seguimiento a una relación comercial que hayas iniciado. No vendemos tus datos ni los usamos
              para enviarte comunicaciones promocionales no solicitadas.
            </p>
            <h2>Formulario y cotizador</h2>
            <p>
              La información que enviás mediante el formulario se utiliza para que The Osas pueda responderte.
              El cotizador arma un mensaje con tus respuestas y abre WhatsApp; el mensaje no se envía
              automáticamente. Solo se comparte con WhatsApp y se envía cuando vos decidís hacerlo desde esa
              aplicación.
            </p>
            <h2>Actualizaciones</h2>
            <p>
              Podemos actualizar esta política cuando cambien el sitio, los proveedores o las prácticas de
              tratamiento. La versión vigente se publica en esta página. Última actualización: 13 de octubre de 2026.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
