// HU-09 — Juan: ficha reutilizable de videojuego.
// Se abre como ficha.html?id=3 y busca ese id en el arreglo "juegos" de js/juegos.js.

(function () {
  "use strict";

  const contenedor = document.getElementById("ficha-contenido");
  if (!contenedor) return;

  // ---------- Utilidades ----------
  // Crea un elemento usando textContent (los datos nunca se insertan como HTML).
  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function crearEtiquetas(lista) {
    const grupo = crear("div", "etiquetas");
    lista.forEach(function (texto) {
      grupo.appendChild(crear("span", "etiqueta", texto));
    });
    return grupo;
  }

  function crearDato(titulo, contenido) {
    const dato = crear("div", "ficha-dato");
    dato.appendChild(crear("dt", null, titulo));
    const dd = crear("dd");
    dd.appendChild(typeof contenido === "string" ? document.createTextNode(contenido) : contenido);
    dato.appendChild(dd);
    return dato;
  }

  function crearEstrellas(valoracion) {
    const llenas = Math.max(0, Math.min(5, Math.round(valoracion)));
    const estrellas = crear("span", "valoracion", "★".repeat(llenas) + "☆".repeat(5 - llenas));
    estrellas.setAttribute("aria-hidden", "true");
    return estrellas;
  }

  // ---------- Pantallas ----------
  function mostrarNoEncontrado() {
    document.title = "Videojuego no encontrado | GameCodex";

    const tarjeta = crear("section", "tarjeta tarjeta-fija ficha-vacia");
    tarjeta.appendChild(crear("h1", null, "Videojuego no encontrado"));
    tarjeta.appendChild(crear("p", null, "No existe un videojuego con ese identificador. Vuelve al catálogo y elige uno de la lista."));
    const enlace = crear("a", "btn btn-primario", "Ir al catálogo");
    enlace.href = "catalogo.html";
    tarjeta.appendChild(enlace);

    contenedor.replaceChildren(tarjeta);
  }

  function mostrarFicha(juego) {
    document.title = juego.nombre + " | GameCodex";

    const ficha = crear("article", "ficha");

    // Portada
    const portada = crear("div", "ficha-portada");
    const img = document.createElement("img");
    img.src = juego.imagen;
    img.alt = "Portada de " + juego.nombre;
    img.addEventListener("error", function () {
      portada.replaceChildren(crear("div", "ficha-sin-imagen", "Imagen no disponible"));
    });
    portada.appendChild(img);

    // Información
    const info = crear("div", "ficha-info");
    info.appendChild(crear("span", "ficha-seccion", "Consultar videojuegos"));
    info.appendChild(crear("h1", null, juego.nombre));

    const valoracion = crear("div", "ficha-valoracion");
    valoracion.appendChild(crearEstrellas(juego.valoracion));
    valoracion.appendChild(crear("span", "ficha-valoracion-numero", juego.valoracion.toFixed(1) + " / 5"));
    info.appendChild(valoracion);

    info.appendChild(crear("p", "ficha-descripcion", juego.descripcion));

    const datos = crear("dl", "ficha-datos");
    datos.appendChild(crearDato("Género", crearEtiquetas(juego.genero)));
    datos.appendChild(crearDato("Plataformas", crearEtiquetas(juego.plataformas)));
    datos.appendChild(crearDato("Año de lanzamiento", String(juego.anio)));
    datos.appendChild(crearDato("Desarrolladora", juego.desarrolladora || "No disponible"));
    info.appendChild(datos);

    ficha.appendChild(portada);
    ficha.appendChild(info);
    contenedor.replaceChildren(ficha);
  }

  // ---------- Inicio ----------
  if (typeof juegos === "undefined") {
    mostrarNoEncontrado();
    return;
  }

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const juego = juegos.find(function (j) { return j.id === id; });

  if (juego) {
    mostrarFicha(juego);
  } else {
    mostrarNoEncontrado();
  }
})();
