import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Our NYC office (Madison Avenue) with an embedded map. */
export function Locations() {
  return (
    <section className="bg-white section-py-lg" id="locations">
      <div className="container">
        <div className="section-header">
          <Eyebrow ornament="pin">Visit Us</Eyebrow>
          <h2 className="h-sec">
            Visit us on <em>Madison Avenue.</em>
          </h2>
          <p className="locations-subtitle">
            Our Madison Avenue office offers private, personalized care with the same surgeon from
            consultation to recovery.
          </p>
        </div>

        <div className="locations-grid locations-grid-single">
          {siteConfig.locations.map((loc, i) => (
            <article className="location-card location-card-horizontal" key={loc.id} id={loc.id}>
              <div className="location-image">
                <iframe
                  className="location-map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${loc.address}, ${loc.cityState}`)}&output=embed`}
                  title={`Map to the ${loc.name} office`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="location-body">
                <div className="location-header">
                  <div>
                    <p className="location-eyebrow">LOCATION {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="location-name">{loc.name}</h3>
                  </div>
                  <span className="location-region">{loc.region}</span>
                </div>
                <p className="location-detail-value">
                  <span className="location-detail-label">ADDRESS</span>
                  <br />
                  {loc.address}
                  <br />
                  {loc.cityState}
                </p>
                <p className="location-detail-value">
                  <span className="location-detail-label">HOURS</span>
                  <br />
                  {loc.hours}
                </p>
                <p className="location-detail-value" style={{ marginBottom: 22 }}>
                  <span className="location-detail-label">PHONE</span>
                  <br />
                  {loc.phoneDisplay}
                </p>
                <a href={loc.directions} target="_blank" rel="noopener noreferrer" className="link-arrow">
                  Get directions →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
