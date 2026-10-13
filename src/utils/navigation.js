export function handleSectionNavigation(event, sectionId) {
  event.preventDefault();

  const section = document.getElementById(sectionId);
  if (!section) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}