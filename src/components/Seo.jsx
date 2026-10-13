import { useEffect } from 'react';
import { siteContent } from '../data/site';

function setMeta(selector, attribute, value, content) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function Seo({
  title = 'The Osas | Marketing & Ads',
  description = 'Agencia de marketing y ads para marcas de Mendoza y todo el país. Estrategia, paid media, contenidos y visuales para crecer con claridad.',
  path = '/',
  image = '/og-image.png',
  schema = null,
  robots = 'index, follow',
}) {
  const siteUrl = `https://${siteContent.brand.domain}`;
  const canonicalUrl = new URL(path, `${siteUrl}/`).href;
  const imageUrl = new URL(image, `${siteUrl}/`).href;

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', robots);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/png');
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', 'The Osas, Marketing & Ads. Estrategia para crecer.');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', 'The Osas, Marketing & Ads. Estrategia para crecer.');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaElement = document.getElementById('page-seo-schema');
    if (schema) {
      const script = schemaElement || document.createElement('script');
      script.id = 'page-seo-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      if (!schemaElement) document.head.appendChild(script);
    } else {
      schemaElement?.remove();
    }
  }, [title, description, robots, canonicalUrl, imageUrl, schema]);

  return null;
}
