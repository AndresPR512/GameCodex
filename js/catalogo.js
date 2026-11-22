// HU-04 — Adrián: catálogo de videojuegos.
// Dibuja una tarjeta por cada elemento del arreglo "juegos" de js/juegos.js.
// Cada juego nuevo que se agregue a juegos.js aparece solo.
// Cada tarjeta enlaza a ficha.html?id=<id> (HU-09).

(function () {
  "use strict";

  const lista = document.getElementById("catalogo-lista");
  const contador = document.getElementById("catalogo-contador");
  if (!lista) return;

  // ---------- Utilidades ----------
  // Crea un elemento usando textContent (los datos nunca se insertan como HTML).
  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function crearEstrellas(valoracion) {
    const llenas = Math.max(0, Math.min(5, Math.round(valoracion)));
    const estrellas = crear("span", "valoracion", "★".repeat(llenas) + "☆".repeat(5 - llenas));
    estrellas.setAttribute("aria-hidden", "true");
    return estrellas;
  }

  // ---------- Tarjeta ----------
  function crearTarjeta(juego) {
    const tarjeta = crear("article", "tarjeta tarjeta-juego");

    // Portada 16:9 (la proporción la fija .tarjeta-imagen en base.css)
    const imagen = crear("img", "tarjeta-imagen");
    imagen.src = juego.imagen;
    imagen.alt = "Portada de " + juego.nombre;
    imagen.width = 640;
    imagen.height = 360;
    imagen.loading = "lazy";
    tarjeta.appendChild(imagen);

    const cuerpo = crear("div", "tarjeta-cuerpo");

    // Título con el enlace a la ficha (cubre toda la tarjeta)
    const titulo = crear("h3", "juego-titulo");
    const enlace = crear("a", "", juego.nombre);
    enlace.href = "ficha.html?id=" + encodeURIComponent(juego.id);
    titulo.appendChild(enlace);
    cuerpo.appendChild(titulo);

    // Géneros (máximo 3 para que la tarjeta no crezca demasiado)
    const generos = crear("div", "etiquetas");
    generos.setAttribute("aria-label", "Géneros");
    juego.genero.slice(0, 3).forEach(function (genero) {
      generos.appendChild(crear("span", "etiqueta", genero));
    });
    cuerpo.appendChild(generos);

    // Plataformas
    const plataformas = crear("p", "juego-plataformas", juego.plataformas.join(" · "));
    plataformas.setAttribute("aria-label", "Plataformas: " + juego.plataformas.join(", "));
    cuerpo.appendChild(plataformas);

    cuerpo.appendChild(crear("p", "juego-descripcion", juego.descripcion));

    // Valoración
    const valoracion = crear("div", "juego-valoracion");
    valoracion.appendChild(crearEstrellas(juego.valoracion));
    valoracion.appendChild(crear("span", "", Number(juego.valoracion).toFixed(1) + " / 5"));
    cuerpo.appendChild(valoracion);

    tarjeta.appendChild(cuerpo);
    return tarjeta;
  }

  // ---------- Pantalla ----------
  function mostrarMensaje(texto) {
    lista.replaceChildren(crear("p", "catalogo-estado", texto));
    if (contador) contador.textContent = "";
  }

  function mostrarCatalogo() {
    // Si juegos.js no cargó, avisamos en lugar de dejar la página vacía
    if (typeof juegos === "undefined" || !Array.isArray(juegos)) {
      mostrarMensaje("No se pudo cargar el catálogo. Intenta recargar la página.");
      return;
    }
    if (juegos.length === 0) {
      mostrarMensaje("Aún no hay videojuegos en el catálogo.");
      return;
    }

    const fragmento = document.createDocumentFragment();
    juegos.forEach(function (juego) {
      fragmento.appendChild(crearTarjeta(juego));
    });
    lista.replaceChildren(fragmento);

    if (contador) {
      contador.textContent = juegos.length === 1 ? "1 videojuego" : juegos.length + " videojuegos";
    }
  }

  mostrarCatalogo();
})();