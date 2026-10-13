import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calculator, Check, ChevronDown, MessageCircle, X } from 'lucide-react';
import { Card } from '../ui';
import { siteContent } from '../../data/site';
import { trackEvent } from '../../utils/analytics';

const initialAnswers = {
  service: '',
  sector: '',
  stage: '',
  name: '',
  company: '',
  whatsapp: '',
  email: '',
};

function normalizePhone(value) {
  return value.replace(/\D/g, '');
}

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function createWhatsAppMessage(answers) {
  const contact = answers.email.trim() || normalizePhone(answers.whatsapp);
  const lines = [
    'Hola! Vengo desde la web de The Osas. Me interesa: ' + answers.service + '.',
    '',
    `Mi marca está en el sector ${answers.sector}, en etapa ${answers.stage}.`,
    '',
    `Mi nombre es ${answers.name.trim()} y mi contacto es ${contact}.`,
  ];

  return lines.join('\n');
}

function OptionGroup({ name, legend, options, value, onChange, error }) {
  return (
    <fieldset className="quote-fieldset">
      <legend>{legend}</legend>
      <div className="quote-options">
        {options.map((option) => (
          <label className={value === option ? 'quote-option selected' : 'quote-option'} key={option}>
            <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} />
            <span>{option}</span>
            {value === option ? <Check size={18} aria-hidden="true" /> : null}
          </label>
        ))}
      </div>
      {error ? <p className="quote-error" role="alert">{error}</p> : null}
    </fieldset>
  );
}

export function Quote({ isOpen, onToggle }) {
  const { quote } = siteContent;
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (isOpen || !submittedRef.current) return;

    submittedRef.current = false;
    startedRef.current = false;
    setStep(1);
    setAnswers(initialAnswers);
    setError('');
  }, [isOpen]);

  const updateAnswer = (event) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('cotizador_start');
    }

    const { name, value } = event.target;
    setAnswers((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1 && !answers.service) return 'Seleccioná el servicio que necesita tu marca.';
    if (step === 2 && !answers.sector) return 'Seleccioná el sector de tu empresa.';
    if (step === 3 && !answers.stage) return 'Seleccioná la etapa actual de tu marca.';
    if (step === 4) {
      if (!answers.name.trim()) return 'Completá tu nombre.';
      if (!answers.company.trim()) return 'Completá el nombre de tu empresa.';
      if (normalizePhone(answers.whatsapp).length < 10) return 'Ingresá un WhatsApp válido con al menos 10 dígitos.';
      if (!isValidEmail(answers.email.trim())) return 'Ingresá un email válido o dejá el campo vacío.';
    }

    return '';
  };

  const goNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    trackEvent('cotizador_step_complete', { step });
    setStep((current) => Math.min(current + 1, 4));
    setError('');
  };

  const goPrevious = () => {
    setStep((current) => Math.max(current - 1, 1));
    setError('');
  };

  const submitQuote = (event) => {
    event.preventDefault();
    if (isSubmitting || submittedRef.current) return;

    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    const message = createWhatsAppMessage(answers);
    const targetNumber = normalizePhone(siteContent.brand.whatsappNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

    submittedRef.current = true;
    setIsSubmitting(true);
    trackEvent('complete_cotizador', {
      servicio: answers.service,
      sector: answers.sector,
      etapa: answers.stage,
    });
    trackEvent('cotizador_whatsapp_click', {
      servicio: answers.service,
      sector: answers.sector,
      etapa: answers.stage,
    });
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!whatsappWindow) {
      window.location.assign(whatsappUrl);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="cotizador" className="section alt-section quote-section" aria-label="Cotizador">
      <div className="container quote-container">
        <button type="button" className={isOpen ? 'quote-launcher open' : 'quote-launcher'} onClick={onToggle} aria-expanded={isOpen} aria-controls="cotizador-form">
          <Calculator size={21} aria-hidden="true" />
          <span>{isOpen ? 'Cerrar diagnóstico' : 'Empezar diagnóstico'}</span>
          <ChevronDown size={20} aria-hidden="true" />
        </button>

        {isOpen ? <Card id="cotizador-form" className="quote-card">
          <div className="quote-card-header">
            <span>Diagnóstico inicial</span>
            <button type="button" className="quote-close-button" onClick={onToggle}>
              <X size={16} aria-hidden="true" />
              Cerrar
            </button>
          </div>

          <div className="quote-progress" aria-label={`Paso ${step} de 4`}>
            <span>Paso {step} de 4</span>
            <div className="quote-progress-track" aria-hidden="true"><span style={{ width: `${step * 25}%` }} /></div>
          </div>

          <form onSubmit={submitQuote} noValidate>
            {step === 1 ? <OptionGroup name="service" legend={quote.serviceLegend} options={quote.serviceOptions} value={answers.service} onChange={updateAnswer} error={error} /> : null}
            {step === 2 ? <OptionGroup name="sector" legend={quote.sectorLegend} options={quote.sectorOptions} value={answers.sector} onChange={updateAnswer} error={error} /> : null}
            {step === 3 ? <OptionGroup name="stage" legend={quote.stageLegend} options={quote.stageOptions} value={answers.stage} onChange={updateAnswer} error={error} /> : null}
            {step === 4 ? (
              <fieldset className="quote-fieldset">
                <legend>{quote.contactLegend}</legend>
                <div className="quote-contact-fields">
                  <label>Nombre *<input name="name" value={answers.name} onChange={updateAnswer} autoComplete="name" /></label>
                  <label>Empresa *<input name="company" value={answers.company} onChange={updateAnswer} autoComplete="organization" /></label>
                  <label>WhatsApp *<input name="whatsapp" value={answers.whatsapp} onChange={updateAnswer} inputMode="tel" autoComplete="tel" placeholder="+54 9 ..." /></label>
                  <label>Email <input name="email" type="email" value={answers.email} onChange={updateAnswer} autoComplete="email" /></label>
                </div>
                {error ? <p className="quote-error" role="alert">{error}</p> : null}
              </fieldset>
            ) : null}

            <div className="quote-actions">
              {step > 1 ? <button type="button" className="btn btn-secondary" onClick={goPrevious}><ArrowLeft size={18} /> Anterior</button> : <span />}
              {step < 4 ? <button type="button" className="btn btn-primary" onClick={goNext}>Siguiente <ArrowRight size={18} /></button> : <button type="submit" className="btn btn-primary" disabled={isSubmitting}><MessageCircle size={18} /> Enviar diagnóstico por WhatsApp</button>}
            </div>
          </form>
        </Card> : null}
      </div>
    </section>
  );
}