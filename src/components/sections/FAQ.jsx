import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from '../ui';
import { siteContent } from '../../data/site';

export function FAQ({ prefersReducedMotion }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section alt-section">
      <div className="container">
        <SectionTitle
          title="FAQ"
          subtitle="Preguntas frecuentes para arrancar con claridad."
          description="Estas respuestas te ayudan a entender cómo trabajamos y qué esperar desde el primer contacto."
        />

        <div className="faq-list">
          {siteContent.faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={item.id} className={isOpen ? 'faq-item is-open' : 'faq-item'} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
                <button type="button" className="faq-question" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{item.question}</span>
                  <ChevronDown size={18} className={isOpen ? 'faq-icon open' : 'faq-icon'} />
                </button>
                {isOpen ? <div className="faq-answer"><p>{item.answer}</p></div> : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
