import { useRef, useState } from 'react';
import { MessageCircle, Mail, Camera } from 'lucide-react';
import { SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

const initialForm = {
  nombre: '',
  empresa: '',
  sector: '',
  mensaje: '',
  whatsapp: '',
  email: '',
  _gotcha: '',
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meaogwkw';
const MIN_FORM_COMPLETION_TIME_MS = 3000;

export function Contact({ prefersReducedMotion }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMountedAt = useRef(Date.now());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [form.nombre, form.empresa, form.mensaje];

    if (requiredFields.some((field) => !field.trim())) {
      setStatus({ type: 'error', message: siteContent.contact.errorMessage });
      return;
    }

    if (Date.now() - formMountedAt.current < MIN_FORM_COMPLETION_TIME_MS) {
      setStatus({ type: 'error', message: 'Esperá un momento antes de enviar el formulario.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Formspree request failed');

      setStatus({ type: 'success', message: 'Recibimos tu consulta. Te vamos a contactar pronto.' });
      setForm(initialForm);
      formMountedAt.current = Date.now();
    } catch {
      setStatus({ type: 'error', message: 'No pudimos enviar la consulta. Probá nuevamente o escribinos por WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section">
      <div className="container contact-grid">
        <div>
          <SectionTitle
            title="Contacto"
            subtitle={siteContent.contact.title}
            description={siteContent.contact.description}
          />

          <div className="contact-list">
            <a className="contact-whatsapp" href={siteContent.brand.whatsappUrl} target="_blank" rel="noreferrer">
              <span className="contact-social-icon"><MessageCircle size={18} /></span>
              {siteContent.contact.whatsapp}
            </a>
            <a href={`mailto:${siteContent.brand.email}`}>
              <span className="contact-social-icon"><Mail size={18} /></span>
              {siteContent.brand.email}
            </a>
            <a href={siteContent.brand.instagram} target="_blank" rel="noreferrer">
              <span className="contact-social-icon"><Camera size={18} /></span>
              @the.osas
            </a>
            <a href={siteContent.brand.instagramSecondary} target="_blank" rel="noreferrer">
              <span className="contact-social-icon"><Camera size={18} /></span>
              @oh_danirod
            </a>
          </div>
        </div>

        <form className="contact-form card" onSubmit={handleSubmit}>
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Dejá este campo vacío</label>
            <input
              id="contact-website"
              type="text"
              name="_gotcha"
              value={form._gotcha}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="field-row">
            <label>
              {siteContent.contact.form.nombre}
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
            </label>
            <label>
              {siteContent.contact.form.empresa}
              <input type="text" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" />
            </label>
          </div>

          <div className="field-row">
            <label>
              {siteContent.contact.form.sector}
              <input type="text" name="sector" value={form.sector} onChange={handleChange} placeholder="Software, construcción, estética, salud..." />
            </label>
            <label>
              {siteContent.contact.form.whatsapp}
              <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+54 9 ..." />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
            </label>
          </div>

          <label>
            {siteContent.contact.form.message}
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Contanos tu objetivo, la situación actual y en qué te podemos ayudar." rows="5" />
          </label>

          <button type="submit" className="btn btn-primary full-width" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : siteContent.contact.cta}
          </button>

          {status.message ? (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
