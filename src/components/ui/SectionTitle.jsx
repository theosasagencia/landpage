export function SectionTitle({ kicker, title, subtitle, description, align = 'left' }) {
  return (
    <div className={`section-header ${align === 'center' ? 'section-header-center' : ''}`}>
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      {description ? <p className="lead">{description}</p> : null}
    </div>
  );
}
