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

      <p className="disclaimer">
        Esta pantalla usa información inventada para una demostración. La necesidad de seguimiento ya fue registrada por un profesional de salud.
      </p>
    </main>
  );
}
