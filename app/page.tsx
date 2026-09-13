"use client";

import { useState } from "react";

const careOptions = [
  {
    name: "Dra. Laura Méndez Torres",
    specialty: "Cardiología",
    providerType: "doctora",
    priceValue: 850,
    price: "$850 MXN",
    location: "Hospital San Ángel",
    distanceValue: 3,
    distance: "A 3 km de tu ubicación",
    dateValue: "2025-04-25",
    availability: "Mañana, 25 de abril de 2025 · 9:00 AM",
    reason: "Es clínicamente apropiada para tu referencia de cardiología.",
    featured: true,
  },
  {
    name: "Dra. Patricia Ruiz Castro",
    specialty: "Cardiología intervencionista",
    providerType: "doctora",
    priceValue: 1200,
    price: "$1,200 MXN",
    location: "Centro Médico del Valle",
    distanceValue: 4,
    distance: "A 4 km de tu ubicación",
    dateValue: "2025-04-25",
    availability: "Mañana, 25 de abril de 2025 · 11:30 AM",
    reason: "Es clínicamente apropiada para tu referencia de cardiología.",
    featured: false,
  },
  {
    name: "Dra. Gabriela Sánchez",
    specialty: "Cardiología",
    providerType: "doctora",
    priceValue: 900,
    price: "$900 MXN",
    location: "Clínica Bienestar",
    distanceValue: 7,
    distance: "A 7 km de tu ubicación",
    dateValue: "2025-04-25",
    availability: "Mañana, 25 de abril de 2025 · 4:00 PM",
    reason: "Es clínicamente apropiada para tu referencia de cardiología.",
    featured: false,
  },
];

type Preferences = {
  budget: string;
  distance: string;
  date: string;
  provider: string;
};

export default function Home() {
  const [preferences, setPreferences] = useState<Preferences>({
    budget: "1000",
    distance: "5",
    date: "2025-04-25",
    provider: "doctora",
  });
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [selectedOptionName, setSelectedOptionName] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [escalationRequested, setEscalationRequested] = useState(false);

  const budgetValue = Number(preferences.budget);
  const hasValidBudget = preferences.budget.trim() !== "" && Number.isFinite(budgetValue) && budgetValue >= 0 && budgetValue <= 100000;
  const hasValidDistance = ["2", "5", "10"].includes(preferences.distance);
  const hasValidDate = preferences.date >= "2025-01-01" && preferences.date <= "2026-12-31";
  const hasValidPreferences = hasValidBudget && hasValidDistance && hasValidDate;
  const preferenceError = !hasValidBudget
    ? "Ingresa un presupuesto entre $0 y $100,000 MXN."
    : !hasValidDate
      ? "Elige una fecha entre enero de 2025 y diciembre de 2026."
      : "";
  const budget = hasValidBudget ? budgetValue : 0;
  const maximumDistance = Number(preferences.distance);
  const matchingOptions = hasValidPreferences
    ? careOptions.filter((option) => (
      option.priceValue <= budget &&
      option.distanceValue <= maximumDistance &&
      option.dateValue === preferences.date &&
      (preferences.provider === "sin-preferencia" || option.providerType === preferences.provider)
    ))
    : [];
  const displayedOptions = matchingOptions.length > 0
    ? matchingOptions
    : showAlternatives
      ? careOptions
      : [];
  const hasNoPerfectMatch = matchingOptions.length === 0;
  const selectedOption = careOptions.find((option) => option.name === selectedOptionName) ?? null;

  const updatePreference = (name: keyof Preferences, value: string) => {
    setPreferences((current) => ({ ...current, [name]: value }));
    setShowAlternatives(false);
    setSelectedOptionName(null);
    setIsConfirmed(false);
    setEscalationRequested(false);
  };

  const getOptionStatus = (option: typeof careOptions[number]) => {
    const labels = [];
    const warnings = [];

    if (option.priceValue <= budget) {
      labels.push("Dentro de tu presupuesto");
    } else {
      warnings.push(`Supera tu presupuesto por $${option.priceValue - budget}`);
    }

    if (option.distanceValue <= maximumDistance) {
      labels.push("Más cerca");
    } else {
      warnings.push("Está fuera de tu rango preferido");
    }

    if (option.dateValue === preferences.date) {
      labels.push("Coincide con tu fecha");
    } else {
      warnings.push("No coincide con tu fecha preferida");
    }

    if (preferences.provider === "sin-preferencia" || option.providerType === preferences.provider) {
      labels.push("Coincide con tu preferencia");
    } else {
      warnings.push("No coincide con tu preferencia de proveedor");
    }

    return { labels, warnings };
  };

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

        <form className="preferences-form" onSubmit={(event) => event.preventDefault()}>
          <label className="preference-field" htmlFor="budget">
            <span className="field-icon" aria-hidden="true">$</span>
            <span className="field-content">
              <span className="field-label">Presupuesto máximo</span>
              <span className="field-control-wrap">
                <input id="budget" name="budget" type="number" value={preferences.budget} onChange={(event) => updatePreference("budget", event.target.value)} min="0" max="100000" step="50" required aria-invalid={!hasValidBudget} />
                <span className="field-suffix">MXN</span>
              </span>
            </span>
          </label>

          <label className="preference-field" htmlFor="distance">
            <span className="field-icon" aria-hidden="true">⌖</span>
            <span className="field-content">
              <span className="field-label">Distancia máxima</span>
              <select id="distance" name="distance" value={preferences.distance} onChange={(event) => updatePreference("distance", event.target.value)}>
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
              <input id="date" name="date" type="date" value={preferences.date} onChange={(event) => updatePreference("date", event.target.value)} min="2025-01-01" max="2026-12-31" required aria-invalid={!hasValidDate} />
            </span>
          </label>

          <label className="preference-field" htmlFor="provider">
            <span className="field-icon" aria-hidden="true">◯</span>
            <span className="field-content">
              <span className="field-label">Preferencia de proveedor</span>
              <select id="provider" name="provider" value={preferences.provider} onChange={(event) => updatePreference("provider", event.target.value)}>
                <option value="sin-preferencia">Sin preferencia</option>
                <option value="doctora">Doctora</option>
                <option value="doctor">Doctor</option>
              </select>
            </span>
          </label>
        </form>
        {preferenceError && <p className="validation-message" role="alert">{preferenceError}</p>}
      </section>

      <section className="options-section" aria-labelledby="options-title">
        <div className="options-heading">
          <div>
            <p className="eyebrow">Solo para esta demostración</p>
            <h2 id="options-title">Opciones de atención simuladas</h2>
          </div>
          <span className="section-status">{displayedOptions.length} opciones</span>
        </div>
        <p className="options-intro">
          Estas opciones son clínicamente apropiadas para tu motivo de seguimiento. Te mostramos por qué aparece cada una y qué preferencias cumple.
        </p>

        {hasNoPerfectMatch && hasValidPreferences && (
          <div className="tradeoff-panel" role="status">
            <strong>No existe una opción que cumpla todas tus preferencias.</strong>
            <p>Decide si quieres mantener tus condiciones actuales o revisar alternativas que explican qué tendría que cambiar.</p>
            <div className="choice-actions">
              <button type="button" className="choice-button choice-button-secondary" onClick={() => setShowAlternatives(false)}>
                Mantener mis preferencias
              </button>
              <button type="button" className="choice-button choice-button-primary" onClick={() => setShowAlternatives(true)}>
                Ver alternativas cercanas
              </button>
            </div>
          </div>
        )}

        <div className="options-list">
          {displayedOptions.map((option) => {
            const { labels, warnings } = getOptionStatus(option);
            return (
            <article className={`option-card${option.featured ? " option-card-featured" : ""}${selectedOptionName === option.name ? " option-card-selected" : ""}`} key={option.name}>
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
                <p>{option.reason} {warnings.length > 0 ? "Se incluye para que compares este tradeoff." : "Cumple tus preferencias actuales."}</p>
              </div>
              <div className="option-labels" aria-label="Coincidencias y tradeoffs">
                {labels.map((label) => <span className="match-label" key={label}>✓ {label}</span>)}
                {warnings.map((warning) => <span className="warning-label" key={warning}>! {warning}</span>)}
              </div>
              <button
                type="button"
                className="select-option-button"
                aria-pressed={selectedOptionName === option.name}
                onClick={() => {
                  setSelectedOptionName(option.name);
                  setIsConfirmed(false);
                  setEscalationRequested(false);
                }}
              >
                {selectedOptionName === option.name ? "Opción seleccionada" : "Seleccionar esta opción"}
              </button>
            </article>
            );
          })}
        </div>

        {selectedOption && (
          <section className="selection-panel" aria-labelledby="selection-title">
            <div className="selection-heading">
              <div>
                <p className="eyebrow">Tu decisión</p>
                <h2 id="selection-title">Opción seleccionada</h2>
              </div>
              <span className="simulated-label">Selección simulada</span>
            </div>
            <div className="selection-summary">
              <strong>{selectedOption.name}</strong>
              <span>{selectedOption.specialty}</span>
              <span>{selectedOption.price} · {selectedOption.location}</span>
              <span>{selectedOption.distance} · {selectedOption.availability}</span>
            </div>
            <div className="selection-actions">
              <button type="button" className="confirm-button" onClick={() => setIsConfirmed(true)}>
                Confirmar esta opción
              </button>
              <button type="button" className="escalation-button" onClick={() => setEscalationRequested(true)}>
                Escalar a navegación humana
              </button>
            </div>
            {isConfirmed && <p className="simulation-message" role="status">Confirmación simulada. No se ha realizado ninguna reserva ni se ha agendado una cita.</p>}
            {escalationRequested && <p className="simulation-message" role="status">Escalación simulada: una persona navegadora tomaría el relevo para ayudarte con el siguiente paso.</p>}
          </section>
        )}
      </section>

      <p className="disclaimer">
        Toda la información de esta pantalla es inventada y simulada para una demostración. La necesidad de seguimiento ya fue registrada por un profesional de salud.
      </p>
    </main>
  );
}
