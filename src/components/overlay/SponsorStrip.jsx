export default function SponsorStrip({ sponsor, className = "" }) {
  const sponsors = sponsor?.sponsors || [];

  if (!sponsor?.active || !sponsors.length) return null;

  return (
    <div className={`sponsor-strip light-sweep ${className}`}>
      <span>{sponsor.mode || "Sponsor"}</span>
      <div className="sponsor-logo-row">
        {sponsors.slice(0, 5).map((item) => (
          <figure key={`${item.name}-${item.logoPath}`} className="sponsor-logo-item">
            <img src={item.logoPath} alt={item.name} />
            {sponsor.showNames && <figcaption>{item.name}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
