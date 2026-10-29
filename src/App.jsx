import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Flower2,
  Gift,
  Heart,
  MapPin,
  X,
} from "lucide-react";
import { PARTY } from "./partyConfig.js";

function Modal({ title, onClose, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const selector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(dialog.querySelectorAll(selector));

    document.body.style.overflow = "hidden";
    (focusables()[0] || dialog).focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      } else if (event.key === "Tab") {
        const items = focusables();
        if (!items.length) {
          event.preventDefault();
          dialog.focus();
        } else if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault();
          items[items.length - 1].focus();
        } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
          event.preventDefault();
          items[0].focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section
        className="modal-card"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button className="close-button" type="button" aria-label="Fechar janela" onClick={onClose}>
          <X size={19} aria-hidden="true" />
        </button>
        <div className="modal-ornament" aria-hidden="true"><Flower2 size={26} strokeWidth={1.35} /></div>
        <h2 id={titleId}>{title}</h2>
        {children}
      </section>
    </div>
  );
}

function getMapsRoute() {
  const address = PARTY.location.address.trim();
  const mapsUrl = PARTY.location.mapsUrl.trim();
  if (mapsUrl) return mapsUrl;
  if (address) return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  return "";
}

function InviteArtwork({ onConfirm, onLocation, onGifts }) {
  const location = PARTY.location.address.trim() || "Endereço a definir";
  const nameChanged = PARTY.childName !== "Alice";
  const ageChanged = PARTY.age !== 1;
  const invitationDescription =
    `Convite do primeiro aniversário de ${PARTY.childName}: ${PARTY.date}, às ${PARTY.time}. Local: ${location}. ` +
    "Uma borboleta me contou que o jardim encantado está em festa. Escolha uma das três ações abaixo.";

  return (
    <main className="invite-artwork">
      <img className="invite-reference" src="/images/convite-referencia.png" alt={invitationDescription} />

      {ageChanged && (
        <>
          <div className="identity-patch age-patch" aria-hidden="true" />
          <span className="art-age-value">{PARTY.age}</span>
        </>
      )}
      {nameChanged && (
        <>
          <div className="identity-patch name-patch" aria-hidden="true" />
          <h1 className="art-name-value">{PARTY.childName}</h1>
        </>
      )}
      {PARTY.age !== 1 && (
        <div className="copy-patch">
          <p>
            Uma borboleta me contou que o<br />jardim encantado está em festa!<br />
            A flor mais linda do nosso<br />jardim vai completar <strong>{PARTY.age} aninho!</strong>
          </p>
        </div>
      )}

      <section className="event-art-overlay" aria-label="Data, horário e local">
        <span className="art-date-label">Data</span>
        <span className="art-time-label">Horário</span>
        <strong className="art-date-value">{PARTY.date}</strong>
        <Heart className="art-heart" fill="currentColor" aria-hidden="true" />
        <strong className="art-time-value">{PARTY.time}</strong>
        <span className="art-location-label">Local:</span>
        <strong className="art-location-value">{location}</strong>
      </section>

      <button className="art-hotspot hotspot-confirm" type="button" aria-label="Confirmar presença" onClick={onConfirm}>
        <span className="sr-only">Confirmar presença</span>
        <CheckCircle2 aria-hidden="true" />
      </button>
      <button className="art-hotspot hotspot-location" type="button" aria-label="Como chegar" onClick={onLocation}>
        <span className="sr-only">Como chegar</span>
        <MapPin aria-hidden="true" />
      </button>
      <button className="art-hotspot hotspot-gifts" type="button" aria-label="Sugestão de presente" onClick={onGifts}>
        <span className="sr-only">Sugestão de presente</span>
        <Gift aria-hidden="true" />
      </button>
    </main>
  );
}

function GiftScreen({ onBack }) {
  return (
    <main className="gift-shell">
      <img className="gift-frame-art" src="/images/convite-referencia.png" alt="" aria-hidden="true" />
      <div className="gift-paper" aria-hidden="true" />
      <section className="gift-content" aria-labelledby="gift-title">
        <button className="back-button" type="button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Voltar ao convite
        </button>
        <Flower2 className="gift-flower" size={30} strokeWidth={1.3} aria-hidden="true" />
        <p className="gift-eyebrow">COM CARINHO, PARA NOSSA PEQUENA</p>
        <h1 id="gift-title">Presentinhos<br />para a Alice</h1>
        <p className="gift-intro">Sua presença é o nosso maior presente! Se quiser presentear a Alice, aqui vão algumas sugestões cheias de carinho.</p>
        <div className="gift-list">
          {PARTY.gifts.map((gift) => (
            <article className="gift-item" key={gift.category}>
              <span className="gift-item-flower" aria-hidden="true"><Flower2 size={17} strokeWidth={1.5} /></span>
              <div><h2>{gift.category}</h2><p>{gift.examples}</p></div>
            </article>
          ))}
        </div>
        <p className="gift-footer">Obrigada por fazer parte desse dia especial!</p>
        <button className="primary-button" type="button" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Voltar ao convite
        </button>
      </section>
    </main>
  );
}

function App() {
  const [screen, setScreen] = useState("invite");
  const [modal, setModal] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [formError, setFormError] = useState("");
  const mapsRoute = getMapsRoute();
  const address = PARTY.location.address.trim();

  function openRsvp() {
    setGuestName("");
    setGuestCount("");
    setFormError("");
    setModal("whatsapp");
  }

  function confirmOnWhatsApp(event) {
    event.preventDefault();
    const name = guestName.trim();
    const count = Number(guestCount);
    if (name.length < 2) {
      setFormError("Informe seu nome para continuar.");
      return;
    }
    if (!Number.isInteger(count) || count < 1 || count > 20) {
      setFormError("Informe uma quantidade entre 1 e 20 pessoas.");
      return;
    }

    const message =
      `Olá! Gostaria de confirmar minha presença no aniversário de ${PARTY.age} ano da ${PARTY.childName}.\n\n` +
      `Nome: ${name}\nQuantidade de pessoas: ${count}`;
    const phone = PARTY.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setModal(null);
  }

  return (
    <div className={`page ${screen === "invite" ? "invite-page" : "gift-page"}`}>
      {screen === "invite" ? (
        <InviteArtwork
          onConfirm={openRsvp}
          onLocation={() => setModal("location")}
          onGifts={() => setScreen("gifts")}
        />
      ) : (
        <GiftScreen onBack={() => setScreen("invite")} />
      )}

      {modal === "whatsapp" && (
        <Modal title="Confirme sua presença" onClose={() => setModal(null)}>
          <p className="modal-copy">Vamos adorar comemorar o primeiro aninho da Alice com você!</p>
          <form className="guest-form" onSubmit={confirmOnWhatsApp} noValidate>
            <label htmlFor="guest-name">Seu nome</label>
            <input
              id="guest-name"
              name="guest-name"
              value={guestName}
              onChange={(event) => { setGuestName(event.target.value); setFormError(""); }}
              placeholder="Digite seu nome"
              autoComplete="name"
              maxLength={80}
              required
              aria-invalid={Boolean(formError && guestName.trim().length < 2)}
              aria-describedby={formError ? "form-error" : undefined}
            />
            <label htmlFor="guest-count">Quantidade de pessoas</label>
            <input
              id="guest-count"
              name="guest-count"
              type="number"
              inputMode="numeric"
              min="1"
              max="20"
              step="1"
              value={guestCount}
              onChange={(event) => { setGuestCount(event.target.value); setFormError(""); }}
              placeholder="Ex.: 2"
              required
              aria-invalid={Boolean(formError && (!Number.isInteger(Number(guestCount)) || Number(guestCount) < 1 || Number(guestCount) > 20))}
              aria-describedby={formError ? "form-error" : undefined}
            />
            {formError && <p className="form-error" id="form-error" role="alert">{formError}</p>}
            <button className="primary-button" type="submit">
              Confirmar pelo WhatsApp <ExternalLink size={15} aria-hidden="true" />
            </button>
          </form>
          <p className="small-note">O WhatsApp abrirá com a mensagem pronta. Você ainda precisará tocar em enviar.</p>
        </Modal>
      )}

      {modal === "location" && (
        <Modal title="Como chegar" onClose={() => setModal(null)}>
          <div className="map-placeholder" aria-label={address ? `Endereço da festa: ${address}` : "Espaço reservado para o mapa"}>
            <div className="map-lines" aria-hidden="true" />
            <MapPin size={29} aria-hidden="true" />
            <span>{address || "Endereço da festa a definir"}</span>
          </div>
          <p className="modal-copy">
            {address
              ? "O endereço da festa está indicado acima. Abra a rota no Google Maps pelo botão abaixo."
              : "O endereço da festa ainda será definido. Assim que estiver confirmado, o mapa e a rota serão atualizados aqui."}
          </p>
          {mapsRoute && (
            <a className="primary-button link-button" href={mapsRoute} target="_blank" rel="noopener noreferrer">
              Abrir rota no Google Maps <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
