// HU-16 — Mario: tops y recomendaciones editoriales.
// Lee el arreglo "tops" (js/recomendaciones-datos.js) y el arreglo "juegos"
// (js/juegos.js) y dibuja las categorías en recomendaciones.html.
// Cada juego enlaza a ficha.html?id=<id> (HU-09).

(function () {
  "use strict";

  const navegacion = document.getElementById("reco-nav");
  const lista = document.getElementById("reco-lista");
  if (!lista) return;

  const AUTOR_POR_DEFECTO = "Equipo GameCodex";

  // ---------- Utilidades ----------
  // Crea un elemento usando textContent (los datos nunca se insertan como HTML).
  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function buscarJuego(id) {
    return juegos.find(function (j) { return j.id === id; });
  }

  // ---------- Tarjeta de un juego recomendado ----------
  function crearTarjeta(juego, item, posicion) {
    const tarjeta = crear("article", "tarjeta reco-tarjeta");

    // Portada 16:9 (la proporción la fija .tarjeta-imagen en base.css)
    const portada = crear("div", "reco-portada");
    const imagen = crear("img", "tarjeta-imagen");
    imagen.src = juego.imagen;
    imagen.alt = "Portada de " + juego.nombre;
    imagen.width = 640;
    imagen.height = 360;
    imagen.loading = "lazy";
    imagen.addEventListener("error", function () {
      portada.replaceChildren(crear("div", "reco-sin-imagen", "Imagen no disponible"));
    });
    portada.appendChild(imagen);

    // Número de posición (solo en los tops con ranking)
    if (posicion) {
      const numero = crear("span", "reco-posicion", String(posicion));
      numero.setAttribute("aria-hidden", "true");
      portada.appendChild(numero);
    }
    tarjeta.appendChild(portada);

    const cuerpo = crear("div", "tarjeta-cuerpo reco-cuerpo");

    // Título con el enlace a la ficha (cubre toda la tarjeta)
    const titulo = crear("h3", "reco-titulo");
    const enlace = crear("a", "", juego.nombre);
    enlace.href = "ficha.html?id=" + encodeURIComponent(juego.id);
    titulo.appendChild(enlace);
    cuerpo.appendChild(titulo);

    // Géneros (máximo 3)
    const generos = crear("div", "etiquetas");
    generos.setAttribute("aria-label", "Géneros");
    juego.genero.slice(0, 3).forEach(function (genero) {
      generos.appendChild(crear("span", "etiqueta", genero));
    });
    cuerpo.appendChild(generos);

    // Opinión del equipo
    cuerpo.appendChild(crear("p", "reco-motivo", item.motivo));
    cuerpo.appendChild(crear("p", "reco-autor", "Opinión de: " + (item.autor || AUTOR_POR_DEFECTO)));

    tarjeta.appendChild(cuerpo);
    return tarjeta;
  }

  // ---------- Sección de un top ----------
  function crearSeccion(top) {
    const seccion = crear("section", "seccion reco-seccion");
    seccion.id = top.id;
    seccion.setAttribute("aria-labelledby", top.id + "-titulo");

    const contenedor = crear("div", "contenedor");

    const encabezado = crear("div", "encabezado-seccion");
    const titulo = crear("h2", "", top.titulo);
    titulo.id = top.id + "-titulo";
    encabezado.appendChild(titulo);
    if (top.descripcion) encabezado.appendChild(crear("p", "", top.descripcion));
    contenedor.appendChild(encabezado);

    // <ol> si es un top con posiciones; <ul> si es una selección
    const grupo = crear(top.ranking ? "ol" : "ul", "cuadricula reco-grupo");
    let posicion = 0;

    top.items.forEach(function (item) {
      const juego = buscarJuego(item.juegoId);
      if (!juego) {
        // Si el id no existe en el catálogo se omite el juego sin romper la página
        console.warn("Recomendaciones: no existe el juego con id " + item.juegoId + " en juegos.js");
        return;
      }
      posicion += 1;
      const elemento = crear("li", "reco-item");
      elemento.appendChild(crearTarjeta(juego, item, top.ranking ? posicion : 0));
      grupo.appendChild(elemento);
    });

    contenedor.appendChild(grupo);
    seccion.appendChild(contenedor);
    return seccion;
  }

  // ---------- Pantalla ----------
  function mostrarMensaje(texto) {
    lista.replaceChildren(crear("p", "reco-estado", texto));
    if (navegacion) navegacion.hidden = true;
  }

  function mostrarRecomendaciones() {
    // Si algún script no cargó, avisamos en lugar de dejar la página vacía
    if (typeof juegos === "undefined" || !Array.isArray(juegos) ||
        typeof tops === "undefined" || !Array.isArray(tops)) {
      mostrarMensaje("No se pudieron cargar las recomendaciones. Intenta recargar la página.");
      return;
    }
    if (tops.length === 0) {
      mostrarMensaje("Pronto habrá recomendaciones del equipo.");
      return;
    }

    // Chips de acceso rápido a cada categoría
    if (navegacion) {
      const chips = crear("div", "chips");
      tops.forEach(function (top) {
        const chip = crear("a", "chip reco-chip", top.titulo);
        chip.href = "#" + top.id;
        chips.appendChild(chip);
      });
      navegacion.replaceChildren(chips);
    }

    const fragmento = document.createDocumentFragment();
    tops.forEach(function (top) {
      fragmento.appendChild(crearSeccion(top));
    });
    lista.replaceChildren(fragmento);
  }

  mostrarRecomendaciones();
})();
