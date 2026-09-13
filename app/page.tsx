const careOptions = [
  {
    name: "Dra. Laura Méndez Torres",
    specialty: "Cardiología",
    price: "$850 MXN",
    location: "Hospital San Ángel",
    distance: "A 3 km de tu ubicación",
    availability: "Mañana, 25 de abril de 2025 · 9:00 AM",
    reason: "Es apropiada para tu referencia y coincide con tus preferencias.",
    labels: ["Dentro de tu presupuesto", "Más cerca", "Coincide con tu preferencia"],
    warning: "",
    featured: true,
  },
  {
    name: "Dra. Patricia Ruiz Castro",
    specialty: "Cardiología intervencionista",
    price: "$1,200 MXN",
    location: "Centro Médico del Valle",
    distance: "A 4 km de tu ubicación",
    availability: "Mañana, 25 de abril de 2025 · 11:30 AM",
    reason: "Es apropiada para tu referencia y tiene disponibilidad cercana.",
    labels: ["Más especializada", "Coincide con tu preferencia"],
    warning: "Supera tu presupuesto por $200",
    featured: false,
  },
  {
    name: "Dra. Gabriela Sánchez",
    specialty: "Cardiología",
    price: "$900 MXN",
    location: "Clínica Bienestar",
    distance: "A 7 km de tu ubicación",
    availability: "Mañana, 25 de abril de 2025 · 4:00 PM",
    reason: "Es apropiada para tu referencia y coincide con tu preferencia de proveedor.",
    labels: ["Dentro de tu presupuesto", "Coincide con tu preferencia"],
    warning: "Está fuera de tu rango preferido",
    featured: false,
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">M</div>
        <div>
          <p className="brand-name">Salud en tus manos</p>
          <p className="brand-tagline">Más opciones. Tú decides.</p>
        </div>
        <span className="simulation-badge">Simulación para demostración</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">Navegación de atención</p>
        <h1 id="page-title">Siguiente paso de atención</h1>
        <p className="intro-copy">
          Organizamos opciones basadas en una necesidad de seguimiento que ya existe y en tus preferencias.
        </p>
      </section>

      <section className="trigger-panel" aria-labelledby="trigger-title">
        <div className="panel-icon" aria-hidden="true">✓</div>
        <div>
          <p className="panel-label" id="trigger-title">Motivo de seguimiento <span>(ya registrado)</span></p>
          <p className="trigger-title">Referencia a cardiología después de resultado anormal</p>
          <p className="trigger-meta">Registrada por tu médico el 14 de abril de 2025</p>
        </div>
      </section>

      <section className="preferences-panel" aria-labelledby="preferences-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Tú eliges las condiciones</p>
            <h2 id="preferences-title">Tus preferencias</h2>
          </div>
          <span className="section-status">Datos de demostración</span>
        </div>

        <form className="preferences-form">
          <label className="preference-field" htmlFor="budget">
            <span className="field-icon" aria-hidden="true">$</span>
            <span className="field-content">
              <span className="field-label">Presupuesto máximo</span>
              <span className="field-control-wrap">
                <input id="budget" name="budget" type="number" defaultValue="1000" min="0" step="50" />
                <span className="field-suffix">MXN</span>
              </span>
            </span>
          </label>

          <label className="preference-field" htmlFor="distance">
            <span className="field-icon" aria-hidden="true">⌖</span>
            <span className="field-content">
              <span className="field-label">Distancia máxima</span>
              <select id="distance" name="distance" defaultValue="5">
                <option value="2">Hasta 2 km</option>
                <option value="5">Hasta 5 km</option>
                <option value="10">Hasta 10 km</option>
              </select>
            </span>
          </label>

          <label className="preference-field" htmlFor="date">
            <span className="field-icon" aria-hidden="true">▣</span>
            <span className="field-content">
              <span className="field-label">Fecha preferida</span>
              <input id="date" name="date" type="date" defaultValue="2025-04-25" />
            </span>
          </label>

          <label className="preference-field" htmlFor="provider">
            <span className="field-icon" aria-hidden="true">◯</span>
            <span className="field-content">
              <span className="field-label">Preferencia de proveedor</span>
              <select id="provider" name="provider" defaultValue="doctora">
                <option value="sin-preferencia">Sin preferencia</option>
                <option value="doctora">Doctora</option>
                <option value="doctor">Doctor</option>
              </select>
            </span>
          </label>
        </form>
      </section>

      <section className="options-section" aria-labelledby="options-title">
        <div className="options-heading">
          <div>
            <p className="eyebrow">Solo para esta demostración</p>
            <h2 id="options-title">Opciones de atención simuladas</h2>
          </div>
          <span className="section-status">3 opciones</span>
        </div>
        <p className="options-intro">
          Estas opciones son clínicamente apropiadas para tu motivo de seguimiento. Te mostramos por qué aparece cada una y qué preferencias cumple.
        </p>

        <div className="options-list">
          {careOptions.map((option) => (
            <article className={`option-card${option.featured ? " option-card-featured" : ""}`} key={option.name}>
              <div className="option-topline">
                <span className="simulated-label">Opción simulada</span>
                {option.featured && <span className="best-label">Mejor ajuste</span>}
              </div>
              <div className="option-main">
                <div className="provider-avatar" aria-hidden="true">{option.name.charAt(5)}</div>
                <div className="provider-info">
                  <h3>{option.name}</h3>
                  <p>{option.specialty}</p>
                  <p className="option-location">{option.location} · {option.distance}</p>
                </div>
              </div>
              <div className="option-details">
                <div>
                  <span className="detail-label">Precio</span>
                  <strong>{option.price}</strong>
                </div>
                <div>
                  <span className="detail-label">Disponibilidad</span>
                  <strong>{option.availability}</strong>
                </div>
              </div>
              <div className="why-shown">
                <span className="detail-label">Por qué se muestra</span>
                <p>{option.reason}</p>
              </div>
              <div className="option-labels" aria-label="Coincidencias y tradeoffs">
                {option.labels.map((label) => <span className="match-label" key={label}>✓ {label}</span>)}
                {option.warning && <span className="warning-label">! {option.warning}</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <p className="disclaimer">
        Toda la información de esta pantalla es inventada y simulada para una demostración. La necesidad de seguimiento ya fue registrada por un profesional de salud.
      </p>
    </main>
  );
}
