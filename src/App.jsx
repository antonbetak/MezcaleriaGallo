import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import agaveImg from "./assets/agave.jpg";
import oldPagesImg from "./assets/old-pages.jpg";
import botellaEspadinImg from "./assets/botella-espadin.png";
import galloLogo from "./assets/gallo-logo.png";
import musicaFondo from "./assets/musica.mp3";
import mezcalVideo from "./assets/mezcal.mp4"; // VIDEO SOBRE NOSOTROS
import agavee from "./assets/agavee.jpg";
import horno from "./assets/horno.jpg";
import botes from "./assets/botes.jpg";

// =======================
// DATA INICIAL DE LA CARTA
// =======================
const INITIAL_MEZCALES = [
  {
    id: "espadin",
    nombre: "Espadín Joven de Don Arón",
    etiqueta: "Espadín Joven",
    resumen:
      "Mezcal artesanal hecho en el palenque de Gallo Mezcalero. Receta heredada entre generaciones, cocido en horno de piedra y destilado en cobre.",
    ficha: [
      "Agave: Espadín (Agave angustifolia)",
      "Grado alcohólico: 45% vol.",
      "Producción: Lotes pequeños y numerados",
      "Maestro mezcalero: Don Arón",
    ],
    notaCata:
      "Un mezcal pensado para tomarse derecho, en jícaras al centro de la mesa, acompañando pláticas largas en el patio del palenque.",
    perfil:
      "Entrada suave, ahumado medio, notas herbales y terrosas con un final ligeramente dulce que permanece en boca.",
    notas: [
      {
        icono: "💧",
        titulo: "Color",
        texto:
          "Cristalino e incoloro, con destellos plateados brillantes y buen cuerpo en la copa.",
      },
      {
        icono: "🌿",
        titulo: "Aroma",
        texto:
          "Ahumado herbal suave con toques cítricos y especiados, recuerdo a hierbas de campo recién cortadas.",
      },
      {
        icono: "🥃",
        titulo: "Paladar",
        texto:
          "Suave, con notas terrosas y especias, más un ligero toque de fruta tropical madura.",
      },
      {
        icono: "🍊",
        titulo: "Para mezclar",
        texto:
          "Solo, o con naranja y sal de gusano. Ideal también en cocteles cítricos sencillos.",
      },
      {
        icono: "🍽️",
        titulo: "Para acompañar",
        texto:
          "Platos con sazón y ligera grasa como cochinita, quesadillas de jamaica o tinga y antojitos regionales.",
      },
    ],
  },
  {
    id: "cuishe",
    nombre: "Cuishe de la Sierra",
    etiqueta: "Agave Cuishe",
    resumen:
      "Mezcal de agave cuishe de laderas pedregosas. Plantas altas y difíciles de cosechar, seleccionadas una a una por Don Arón.",
    ficha: [
      "Agave: Cuishe (Agave karwinskii)",
      "Grado alcohólico: 47% vol.",
      "Cosecha: Laderas de la sierra, parcelas familiares",
      "Maduración: 12–15 años en campo",
    ],
    notaCata:
      "Intenso y expresivo, ideal para quienes buscan un mezcal de carácter marcado que se quede en la memoria.",
    perfil:
      "Sabor seco con notas de fruta tropical madura, especias, mineralidad y un ahumado elegante que se alarga en el retrogusto.",
    notas: [
      {
        icono: "💧",
        titulo: "Color",
        texto:
          "Ligeramente perlado al servir, con piernas definidas que caen despacio por la copa.",
      },
      {
        icono: "🌿",
        titulo: "Aroma",
        texto:
          "Notas de piña asada, hierbas secas, flores blancas y un fondo mineral.",
      },
      {
        icono: "🥃",
        titulo: "Paladar",
        texto:
          "Ataque firme, con dulzor contenido y toques de pimienta, tierra húmeda y ceniza fina.",
      },
      {
        icono: "🍊",
        titulo: "Para mezclar",
        texto:
          "Mejor solo; en cocteles va bien con cítricos suaves y miel de agave.",
      },
      {
        icono: "🍽️",
        titulo: "Para acompañar",
        texto:
          "Moles ligeros, queso añejo, chiles rellenos y platos ahumados.",
      },
    ],
  },
  {
    id: "ensamble",
    nombre: "Ensamble de la Casa",
    etiqueta: "Ensamble de la Casa",
    resumen:
      "Mezcla de espadín con agaves silvestres de temporada. Cada lote cambia ligeramente según lo que da la tierra ese año.",
    ficha: [
      "Agaves: Espadín + silvestres de temporada",
      "Grado alcohólico: 46% vol.",
      "Lotes: Cortos, numerados y fechados a mano",
      "Perfil: Equilibrio entre dulzor, ahumado y notas silvestres",
    ],
    notaCata:
      "Pensado para brindar, para compartir y para acompañar música y risas largas.",
    perfil:
      "Equilibrado, redondo, con notas de caramelo ligero, humo suave, cáscara de naranja y hierbas secas.",
    notas: [
      {
        icono: "💧",
        titulo: "Color",
        texto:
          "Brillante y limpio, con lágrima media que revela un cuerpo amable.",
      },
      {
        icono: "🌿",
        titulo: "Aroma",
        texto:
          "Humo suave, cáscara de naranja, vainilla ligera y hierba seca.",
      },
      {
        icono: "🥃",
        titulo: "Paladar",
        texto:
          "Entrada dulce, centro especiado y final seco con recuerdo a semillas tostadas.",
      },
      {
        icono: "🍊",
        titulo: "Para mezclar",
        texto:
          "Perfecto para cocteles de la casa con cítricos, jamaica o frutos rojos.",
      },
      {
        icono: "🍽️",
        titulo: "Para acompañar",
        texto:
          "Tostadas, tacos al carbón, tlayudas y botanas para compartir.",
      },
    ],
  },
];

// =======================
// NAVBAR
// =======================
function Navbar({ cartCount = 0, onCartClick, showCart = true }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src={galloLogo} alt="Gallo Mezcalero" className="navbar-logo" />
          <span className="navbar-brand-text">Gallo Mezcalero</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Inicio
          </Link>
          <Link to="/sobre-nosotros" className="navbar-link">
            Sobre nosotros
          </Link>

          {showCart && (
            <button
              type="button"
              className="navbar-cart-button"
              onClick={onCartClick}
            >
              🛒
              <span className="navbar-cart-count">{cartCount}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// =======================
// SIDEBAR DE CARRITO (PROTOTIPO)
// =======================
const CartSidebar = ({ isCartOpen, handleCloseCart, mezcalInCart }) => {
  return (
    <div
      className={`cart-sidebar-backdrop ${isCartOpen ? "is-open" : ""}`}
      onClick={handleCloseCart}
    >
      <div
        className={`cart-sidebar ${isCartOpen ? "is-open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-sidebar-header">
          <h3>🛒 Tu Pedido</h3>
          <button className="cart-close-button" onClick={handleCloseCart}>
            ✕
          </button>
        </div>

        <div className="cart-sidebar-content">
          <p className="cart-label">1 Producto</p>

          {mezcalInCart && (
            <div className="cart-item">
              <div className="cart-item-info">
                <p className="cart-item-name">{mezcalInCart.etiqueta}</p>
                <p className="cart-item-price">$450 MXN (Prototipo)</p>
              </div>
              <span className="cart-item-qty">x 1</span>
            </div>
          )}
        </div>

        <div className="cart-sidebar-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>$450 MXN</span>
          </div>
          <button className="hero-button cart-checkout-button">
            Comprar Ahora (No Funcional)
          </button>
        </div>
      </div>
    </div>
  );
};

// =======================
// VISTA PÚBLICA (CLIENTE)
// =======================
function PublicSite({ productos }) {
  const [isCartaOpen, setIsCartaOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const mezcalActual = productos.length > 0 ? productos[currentIndex] : null;

  const handleOpenCarta = () => setIsCartaOpen(true);
  const handleCloseCarta = () => setIsCartaOpen(false);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const changeMezcal = (newIndex) => {
    if (
      newIndex < 0 ||
      newIndex >= productos.length ||
      isAnimating ||
      !productos.length
    )
      return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 400);
  };

  const handlePrev = () => changeMezcal(currentIndex - 1);
  const handleNext = () => changeMezcal(currentIndex + 1);

  // Mezcal favorito para la sección especial
  const favorito =
    productos.find((m) => m.id === "espadin") || productos[0] || null;

  return (
    <div className="page">
      {/* NAVBAR */}
      <Navbar cartCount={1} onCartClick={handleOpenCart} showCart={true} />

      {/* HEADER */}
      <header className="hero" style={{ backgroundImage: `url(${agaveImg})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-pill">Mezcal artesanal • Hecho en casa</p>
          <h1 className="hero-title">Gallo Mezcalero</h1>
          <p className="hero-subtitle">
            Palenque de Don Aarón, donde el agave, la tierra y el humo cuentan
            la historia en cada trago, como lo hicieron sus padres y sus
            abuelos.
          </p>
          <button className="hero-button" onClick={handleOpenCarta}>
            Ver carta de mezcales
          </button>
        </div>
      </header>

      {/* FAVORITO DE DON AARÓN */}
      {favorito && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-eyebrow">El favorito de Don Aarón</h2>
            <h3 className="section-title">{favorito.nombre}</h3>
          </div>

          <div className="two-cols">
            <div>
              <p className="section-text">
                Si le preguntas a Don Aarón qué servir primero cuando llega la
                familia al palenque, siempre señala la misma botella: su
                Espadín de confianza. Es el mezcal que abre las noches largas y
                las pláticas bajo las luces del patio.
              </p>
              <p className="section-text">{favorito.resumen}</p>
              <p className="section-text">{favorito.perfil}</p>
            </div>

            <div
              className="owner-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  padding: "1rem 1.5rem 0.5rem",
                }}
              >
                <img
                  src={botellaEspadinImg}
                  alt={`Botella de ${favorito.nombre}`}
                  style={{
                    maxHeight: "260px",
                    width: "auto",
                    filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.9))",
                  }}
                />
              </div>
              <p className="owner-name" style={{ marginTop: "0.8rem" }}>
                {favorito.etiqueta}
              </p>
              <p className="owner-role">Botella de la casa</p>
              <p className="owner-note">
                Servido en jícara, despacio, como le gusta a Don Aarón.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MEZCALES RESUMEN */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-eyebrow">De la tierra al vaso</h2>
          <h3 className="section-title">Mezcales de Gallo Mezcalero</h3>
        </div>

        <p className="section-text">
          Cada etiqueta nace de agaves que han visto pasar años de sol, viento y
          lluvia. La carta completa vive en el libro de la familia: ahí Don
          Arón anotó a mano cada lote y cada nota de cata.
        </p>

        <div className="cards">
          {productos.map((m, i) => (
            <article
              key={m.id}
              className={`card ${i === currentIndex ? "card-active" : ""}`}
            >
              <h4 className="card-title">{m.etiqueta}</h4>
              <p className="card-text">{m.resumen}</p>
              <span className="badge">
                {i === 0
                  ? "Receta de la casa"
                  : i === 1
                  ? "Agave silvestre"
                  : "Ensamble familiar"}
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* AMBIENTE */}
      <section className="section section-earth">
        <div className="section-header">
          <h2 className="section-eyebrow">El lugar</h2>
          <h3 className="section-title">Patio, tierra y fogón</h3>
        </div>

        <p className="section-text">
          La mezcalería parece más la casa de un abuelo que un bar: piso de
          tierra, vigas de madera, fotografías deslavadas y un gallo que canta
          al amanecer. Aquí el tiempo se mide en rondas de mezcal, no en
          relojes.
        </p>

        <ul className="list">
          <li>Catas guiadas con historias de la familia.</li>
          <li>Botellas numeradas por lote.</li>
          <li>
            Botanas sencillas: queso, tortillas al comal y salsas de la casa.
          </li>
        </ul>
      </section>

      {/* RESERVAS */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-eyebrow">Ven al palenque</h2>
          <h3 className="section-title">Reservaciones</h3>
        </div>

        <p className="section-text">
          Si quieres traer a tu familia o amigos, mándanos tu solicitud y
          apartamos una mesa bajo las luces cálidas del patio.
        </p>

        <form className="form">
          <div className="form-group">
            <label>Nombre</label>
            <input placeholder="Tu nombre completo" />
          </div>
          <div className="form-group">
            <label>Personas</label>
            <input type="number" min="1" placeholder="2, 4, 6..." />
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Mensaje</label>
            <textarea placeholder="¿Alguna ocasión especial?"></textarea>
          </div>
          <button type="submit" className="hero-button">
            Enviar solicitud
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
  <p>
    © 2025 Gallo Mezcalero. Mezcal artesanal de la familia de Don Arón.
  </p>

  <p style={{ marginTop: "0.4rem" }}>
    📍 San Nicolás Huajuapan, Junta Auxiliar de Huehuetlán el Grande, Puebla.
  </p>

  <p>
    ☎️ 55 1683 7914
  </p>

  <p>
    📘 Facebook: <strong>El Gallo Mezcalero</strong>
  </p>

  <p style={{ opacity: 0.75, marginTop: "0.4rem" }}>
    “Para todo mal, mezcal. Para todo bien, también.”
  </p>
</footer>


      {/* MODAL CARTA */}
      {isCartaOpen && mezcalActual && (
        <div className="carta-backdrop" onClick={handleCloseCarta}>
          <div
            className="carta-book-shell"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="carta-close" onClick={handleCloseCarta}>
              ✕
            </button>

            {/* BOTÓN ANTERIOR */}
            <button
              className="carta-nav-button carta-nav-prev"
              onClick={handlePrev}
              disabled={currentIndex === 0 || isAnimating}
            >
              ◀
            </button>

            {/* LIBRO */}
            <div
              className="carta-book-vertical"
              style={{ backgroundImage: `url(${oldPagesImg})` }}
            >
              <div
                className={`carta-book-inner ${
                  isAnimating ? "is-animating" : ""
                }`}
              >
                {/* PÁGINA IZQUIERDA */}
                <div className="carta-page carta-page-left">
                  <div className="carta-bottle-layout">
                    <div className="carta-bottle-wrap">
                      <img
                        src={botellaEspadinImg}
                        alt={`Botella de ${mezcalActual.nombre}`}
                        className="carta-bottle-img"
                      />
                    </div>

                    <div className="carta-text-column">
                      <p className="carta-label">Carta de mezcales</p>
                      <h3 className="carta-title">{mezcalActual.nombre}</h3>

                      <p className="carta-text">{mezcalActual.resumen}</p>

                      <ul className="carta-list">
                        {mezcalActual.ficha.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="carta-divider" />

                  <p className="carta-label">Nota de cata</p>
                  <p className="carta-text">{mezcalActual.notaCata}</p>

                  <div className="carta-highlight">
                    <span className="carta-highlight-label">Perfil</span>
                    <p>{mezcalActual.perfil}</p>
                  </div>
                </div>

                {/* PÁGINA DERECHA */}
                <div className="carta-page carta-page-right">
                  <p className="carta-label">Notas de cata detalladas</p>

                  <div className="carta-notes-grid">
                    {mezcalActual.notas.map((n) => (
                      <div key={n.titulo} className="carta-note">
                        <div className="carta-note-icon">{n.icono}</div>
                        <div>
                          <h5>{n.titulo}</h5>
                          <p>{n.texto}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="carta-buy-section">
                    <button className="hero-button" onClick={handleOpenCart}>
                      Añadir al carrito
                    </button>
                    <span className="carta-nav-label">
                      {mezcalActual.etiqueta}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÓN SIGUIENTE */}
            <button
              className="carta-nav-button carta-nav-next"
              onClick={handleNext}
              disabled={
                currentIndex === productos.length - 1 || isAnimating
              }
            >
              ▶
            </button>

            {/* PORTADA ANIMADA */}
            <div className="carta-cover-vertical" />
          </div>
        </div>
      )}

      {/* SIDEBAR DE CARRITO */}
      <CartSidebar
        isCartOpen={isCartOpen}
        handleCloseCart={handleCloseCart}
        mezcalInCart={productos[0]}
      />
    </div>
  );
}

// =======================
// PÁGINA SOBRE NOSOTROS (MÚSICA + VIDEO/FOTOS)
// =======================
function AboutPage() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Música de fondo
    audioRef.current = new Audio(musicaFondo);
    audioRef.current.loop = true;

    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.warn(
          "El navegador bloqueó la reproducción automática hasta que el usuario interactúe con la página."
        );
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="page">
      <Navbar showCart={false} />

      {/* HERO DISTINTA */}
      <header className="hero" style={{ backgroundImage: `url(${agaveImg})` }}>
        <div className="hero-overlay" />
        <div className="hero-content hero-about-content">
          <p className="hero-pill">Palenque, música y familia</p>
          <h1 className="hero-title">Sobre Gallo Mezcalero</h1>
          <p className="hero-subtitle">
            Esta casa mezcalera se cuenta mejor con tres cosas: el humo del
            agave, la voz de la familia y la música que suena de fondo mientras
            las jícaras van y vienen.
          </p>
        </div>
      </header>

      {/* BLOQUE 1: VIDEO + TEXTO */}
      <section className="section section-earth">
        <div
          className="two-cols"
          style={{ gap: "2.2rem", alignItems: "stretch" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 className="section-title">Un palenque de película</h3>
            <p className="section-text">
              Gallo Mezcalero es un palenque vivo: se escucha el crujir del
              horno de piedra, las risas en el patio, el trote de los burros y
              la música de fondo mientras el mezcal descansa en damajuanas de
              vidrio.
            </p>
            <p className="section-text">
              En estas paredes se mezclan generaciones. Don Aarón aprendió aquí
              a leer la madurez del agave, a probar el mezcal directamente del
              alambique y a entender que cada lote trae una historia distinta.
            </p>
            <ul className="list">
              <li>Agaves cuidados durante años antes de ser cocidos.</li>
              <li>
                Lotes pequeños pensados para compartir, no para producir masivo.
              </li>
              <li>
                Catas que combinan tradición, anécdotas familiares y música
                clásica mexicana.
              </li>
            </ul>
          </div>

          {/* VIDEO AJUSTADO */}
          <div
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              border: "1px solid rgba(210,176,117,0.65)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.85)",
              background: "rgba(20,15,10,0.96)",
              maxWidth: "430px",
              alignSelf: "center",
            }}
          >
            <video
              src={mezcalVideo}
              muted
              loop
              autoPlay
              playsInline
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "260px",
                display: "block",
                objectFit: "cover",
              }}
            >
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: DON AARÓN */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-eyebrow">La voz detrás del gallo</h2>
          <h3 className="section-title">Don Aarón</h3>
        </div>

        <div className="two-cols">
          <div className="owner-card">
            <div className="owner-avatar">AA</div>
            <div>
              <p className="owner-name">Don Aarón</p>
              <p className="owner-role">
                Maestro mezcalero y guardián de la receta
              </p>
              <p className="owner-note">
                “El mezcal no se hace para olvidarse: se hace para recordar de
                dónde venimos.”
              </p>
              <p className="owner-note" style={{ fontSize: "0.8rem" }}>
                *Mientras lees esto, suena la canción que acompaña nuestras
                noches largas de cata y charla en el patio.
              </p>
            </div>
          </div>

          <p className="section-text">
            Don Aarón guarda en un viejo cuaderno las notas de cada lote: fecha,
            tipo de agave, clima, tiempo de cocción, cortes y comentarios de
            quienes lo probaron primero. Ese cuaderno es el corazón del
            palenque, y de ahí nace la carta de Gallo Mezcalero.
          </p>
        </div>
      </section>

      {/* BLOQUE 3: GALERÍA */}
      <section className="section section-earth">
        <div className="section-header">
          <h2 className="section-eyebrow">Postales del Gallo Mezcalero</h2>
          <h3 className="section-title">Imágenes que cuentan la historia</h3>
        </div>

        <div className="cards">
          <article className="card">
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "0.8rem",
              }}
            >
              <img
                src={agavee}
                alt="Agaves de noche"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
            <h4 className="card-title">Campo de agaves</h4>
            <p className="card-text">
              Filas de agaves que han crecido durante años antes de llegar al
              horno de piedra. Aquí empieza todo.
            </p>
          </article>

          <article className="card">
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "0.8rem",
              }}
            >
              <img
                src={horno}
                alt="Hornos de piedra"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
            <h4 className="card-title">Horno y humo</h4>
            <p className="card-text">
              El corazón del palenque: el momento en que el agave comienza a
              transformarse en mezcal.
            </p>
          </article>

          <article className="card">
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "0.8rem",
              }}
            >
              <img
                src={botes}
                alt="Patio de la mezcalería"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
            <h4 className="card-title">Patio y música</h4>
            <p className="card-text">
              Mesas, luces cálidas, música mexicana y jícaras al centro. Así se
              vive el mezcal en Gallo Mezcalero.
            </p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2025 Gallo Mezcalero. Palenque familiar de Don Aarón y su gallo
          madrugador.
        </p>
        <p>Te esperamos en el patio, con la jícara lista y la música sonando.</p>
      </footer>
    </div>
  );
}

// =======================
// VISTA ADMINISTRADOR
// =======================
function Admin({ productos, setProductos }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const [formId, setFormId] = useState(null);
  const [formNombre, setFormNombre] = useState("");
  const [formEtiqueta, setFormEtiqueta] = useState("");
  const [formResumen, setFormResumen] = useState("");

  const navigate = useNavigate();

  const fakeClicks = [
    { dia: "Lunes", clicks: 38 },
    { dia: "Martes", clicks: 45 },
    { dia: "Miércoles", clicks: 29 },
    { dia: "Jueves", clicks: 52 },
    { dia: "Viernes", clicks: 61 },
    { dia: "Sábado", clicks: 80 },
    { dia: "Domingo", clicks: 47 },
  ];

  const clicksHoy = fakeClicks[6].clicks;
  const totalSemana = fakeClicks.reduce((acc, d) => acc + d.clicks, 0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "Don Aaron" && pass === "1234") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  const resetForm = () => {
    setFormId(null);
    setFormNombre("");
    setFormEtiqueta("");
    setFormResumen("");
  };

  const handleSubmitProducto = (e) => {
    e.preventDefault();
    if (!formNombre.trim() || !formEtiqueta.trim() || !formResumen.trim()) {
      return;
    }

    if (formId) {
      setProductos(
        productos.map((p) =>
          p.id === formId
            ? {
                ...p,
                nombre: formNombre,
                etiqueta: formEtiqueta,
                resumen: formResumen,
              }
            : p
        )
      );
    } else {
      const newId =
        formNombre
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") +
        "-" +
        Math.floor(Math.random() * 10000);

      const nuevo = {
        id: newId,
        nombre: formNombre,
        etiqueta: formEtiqueta,
        resumen: formResumen,
        ficha: [
          "Agave: Por definir",
          "Grado alcohólico: 45% vol. (prototipo)",
          "Producción: Lotes pequeños",
          "Maestro mezcalero: Don Arón",
        ],
        notaCata: "Nota de cata por definir. Prototipo de producto.",
        perfil:
          "Perfil de sabor por definir. Usa este espacio para describir el carácter del mezcal.",
        notas: [
          {
            icono: "💧",
            titulo: "Color",
            texto: "Descripción de color por definir.",
          },
          {
            icono: "🌿",
            titulo: "Aroma",
            texto: "Descripción de aromas por definir.",
          },
          {
            icono: "🥃",
            titulo: "Paladar",
            texto: "Descripción de paladar por definir.",
          },
          {
            icono: "🍊",
            titulo: "Para mezclar",
            texto: "Sugerencias de coctelería por definir.",
          },
          {
            icono: "🍽️",
            titulo: "Para acompañar",
            texto: "Maridajes sugeridos por definir.",
          },
        ],
      };

      setProductos([...productos, nuevo]);
    }

    resetForm();
  };

  const handleEdit = (p) => {
    setFormId(p.id);
    setFormNombre(p.nombre);
    setFormEtiqueta(p.etiqueta);
    setFormResumen(p.resumen);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este mezcal de la carta?")) {
      setProductos(productos.filter((p) => p.id !== id));
      if (formId === id) resetForm();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser("");
    setPass("");
    resetForm();
  };

  if (!isLoggedIn) {
    return (
      <div
        className="admin-page"
        style={{ backgroundImage: `url(${agaveImg})` }}
      >
        <div className="admin-overlay" />
        <div className="admin-layout admin-login-layout">
          <div className="admin-login-card">
            <h2 className="admin-title">Acceso de administrador</h2>
            <p className="admin-subtitle">
              Sólo para Don Aarón y el gallo madrugador.
            </p>

            <form className="admin-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Usuario</label>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder='Ej. "Don Aaron"'
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••"
                />
              </div>

              {error && <p className="admin-error">{error}</p>}

              <button type="submit" className="hero-button admin-login-button">
                Entrar al palenque
              </button>
            </form>

            <button
              className="admin-back-link"
              type="button"
              onClick={() => navigate("/")}
            >
              ← Volver al sitio público
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="admin-page"
      style={{ backgroundImage: `url(${agaveImg})` }}
    >
      <div className="admin-overlay" />
      <div className="admin-layout">
        <header className="admin-header">
          <div>
            <p className="admin-pill">Panel del palenque</p>
            <h1 className="admin-main-title">Administración Gallo Mezcalero</h1>
            <p className="admin-subtitle">
              Controla la carta de mezcales y revisa cómo se mueve la página.
            </p>
          </div>
          <div className="admin-header-actions">
            <button
              className="admin-link secondary"
              onClick={() => navigate("/")}
            >
              ← Ver sitio público
            </button>
            <button className="admin-link danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="admin-section">
          <div className="admin-grid-3">
            <div className="admin-card">
              <p className="admin-card-label">Mezcales en carta</p>
              <p className="admin-card-number">{productos.length}</p>
              <p className="admin-card-note">
                Productos activos visibles en la página principal.
              </p>
            </div>
            <div className="admin-card">
              <p className="admin-card-label">Clics hoy (prototipo)</p>
              <p className="admin-card-number">{clicksHoy}</p>
              <p className="admin-card-note">
                Visitas simuladas a la carta en el día.
              </p>
            </div>
            <div className="admin-card">
              <p className="admin-card-label">Clics esta semana (prototipo)</p>
              <p className="admin-card-number">{totalSemana}</p>
              <p className="admin-card-note">
                Conteo ficticio para probar la vista de métricas.
              </p>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <h2 className="admin-section-title">Actividad de la semana</h2>
          <div className="admin-clicks-table">
            {fakeClicks.map((c) => (
              <div key={c.dia} className="admin-click-row">
                <span>{c.dia}</span>
                <div className="admin-click-bar-wrap">
                  <div
                    className="admin-click-bar"
                    style={{ width: `${(c.clicks / 80) * 100}%` }}
                  />
                </div>
                <span className="admin-click-number">{c.clicks}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section admin-grid-2">
          <div className="admin-card">
            <h2 className="admin-section-title">
              {formId ? "Editar mezcal" : "Agregar nuevo mezcal"}
            </h2>

            <form className="admin-form" onSubmit={handleSubmitProducto}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  placeholder="Ej. Espadín del Valle"
                />
              </div>
              <div className="form-group">
                <label>Etiqueta corta</label>
                <input
                  value={formEtiqueta}
                  onChange={(e) => setFormEtiqueta(e.target.value)}
                  placeholder="Ej. Espadín Joven"
                />
              </div>
              <div className="form-group">
                <label>Resumen</label>
                <textarea
                  value={formResumen}
                  onChange={(e) => setFormResumen(e.target.value)}
                  placeholder="Descripción breve para la tarjeta principal."
                />
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="hero-button">
                  {formId ? "Guardar cambios" : "Agregar a la carta"}
                </button>
                {formId && (
                  <button
                    type="button"
                    className="admin-link secondary"
                    onClick={resetForm}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-card">
            <h2 className="admin-section-title">Carta actual</h2>
            {productos.length === 0 ? (
              <p className="admin-empty">
                No hay mezcales en la carta. Agrega uno con el formulario.
              </p>
            ) : (
              <ul className="admin-list">
                {productos.map((p) => (
                  <li key={p.id} className="admin-list-item">
                    <div>
                      <p className="admin-list-title">{p.nombre}</p>
                      <p className="admin-list-subtitle">{p.etiqueta}</p>
                    </div>
                    <div className="admin-list-actions">
                      <button
                        type="button"
                        className="admin-chip"
                        onClick={() => handleEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin-chip danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// =======================
// ROOT APP (ROUTER)
// =======================
function App() {
  const [productos, setProductos] = useState(INITIAL_MEZCALES);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite productos={productos} />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route
          path="/admin"
          element={<Admin productos={productos} setProductos={setProductos} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
