// GameCodex, HU-02: menú de navegación y pie de página compartidos.
// Se carga con defer en todas las páginas. Todo va dentro de una función
// para no chocar con las variables globales de otros archivos (generos.js, etc.).

(function () {
  "use strict";

  // ---------- 1. Datos de la navegación ----------
  // Un grupo por épica del User Story Map (el color sale de --epic-N en CSS).
  // fase "mvp" = enlace activo; "v2" y "backlog" se muestran deshabilitados.
  // Sin "archivo" el ítem es solo informativo (las fichas necesitan ?id=).
  const grupos = [
    {
      titulo: "Conocer GameCodex",
      enlaces: [
        { texto: "Inicio", archivo: "index.html", pagina: "index", fase: "mvp" }
      ]
    },
    {
      titulo: "Explorar videojuegos",
      enlaces: [
        { texto: "Catálogo", archivo: "catalogo.html", pagina: "catalogo", fase: "mvp" }
      ]
    },
    {
      titulo: "Consultar videojuegos",
      enlaces: [
        { texto: "Fichas de videojuegos", pagina: "ficha", fase: "mvp", nota: "Elige un juego en el catálogo" },
        { texto: "Favoritos", archivo: "favoritos.html", pagina: "favoritos", fase: "v2" },
        { texto: "Galería", archivo: "galeria.html", pagina: "galeria", fase: "backlog" }
      ]
    },
    {
      titulo: "Aprender sobre videojuegos",
      enlaces: [
        { texto: "Géneros", archivo: "generos.html", pagina: "generos", fase: "mvp" },
        { texto: "Consolas y plataformas", archivo: "consolas.html", pagina: "consolas", fase: "mvp" }
      ]
    },
    {
      titulo: "Descubrir recomendaciones",
      enlaces: [
        { texto: "Tops y recomendaciones", archivo: "recomendaciones.html", pagina: "recomendaciones", fase: "mvp" },
        { texto: "Curiosidades", archivo: "curiosidades.html", pagina: "curiosidades", fase: "backlog" }
      ]
    },
    {
      titulo: "Participar en la Zona Gamer",
      enlaces: [
        { texto: "Trivia gamer", archivo: "trivia.html", pagina: "trivia", fase: "mvp" }
      ]
    }
  ];

  const eslogan = "Tu enciclopedia gamer";
  const integrantes = ["Andrés Paredes", "Adrian Rosales", "Juan Jaramillo", "Eric Núñez", "Mario González"];

  // Etiqueta que se muestra junto a las páginas que aún no están disponibles
  const etiquetasFase = {
    v2: { texto: "V2", clase: "etiqueta-v2" },
    backlog: { texto: "Backlog", clase: "etiqueta-backlog" }
  };

  // data-pagina del <body> indica en qué sección estamos
  const paginaActual = document.body.dataset.pagina || "";

  // ---------- 2. Funciones de ayuda ----------

  // Crea un elemento con clase y texto (textContent, nunca HTML)
  function crear(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
  }

  // Logotipo "GameCodex" con "Codex" resaltado, enlazado al inicio
  function crearLogo(clase) {
    const logo = crear("a", clase, "Game");
    logo.href = "index.html";
    logo.setAttribute("aria-label", "GameCodex, ir al inicio");
    logo.appendChild(crear("span", "", "Codex"));
    return logo;
  }

  // Botones y enlaces del panel que pueden recibir foco en este momento
  function enfocables(panel) {
    return Array.from(panel.querySelectorAll("a[href], button")).filter(function (el) {
      return getComputedStyle(el).visibility !== "hidden";
    });
  }

  // ---------- 3. Construcción del menú ----------

  // Un ítem de la lista: enlace, página no disponible o ítem informativo
  function crearItem(item) {
    const esEnlace = Boolean(item.archivo) && item.fase === "mvp";
    const elemento = crear(esEnlace ? "a" : "span", esEnlace ? "menu-enlace" : "menu-enlace menu-enlace-inactivo");

    if (esEnlace) elemento.href = item.archivo;
    if (item.pagina === paginaActual) {
      elemento.classList.add("activo");
      elemento.setAttribute("aria-current", "page");
    }

    const texto = crear("span", "menu-texto");
    texto.appendChild(crear("span", "", item.texto));
    if (item.nota) texto.appendChild(crear("span", "menu-nota", item.nota));
    elemento.appendChild(texto);

    // V2 y Backlog: etiqueta visible y aviso para lectores de pantalla
    const fase = etiquetasFase[item.fase];
    if (fase) {
      elemento.appendChild(crear("span", "etiqueta-fase " + fase.clase, fase.texto));
      elemento.appendChild(crear("span", "sr-only", "(próximamente)"));
    }

    const li = crear("li");
    li.appendChild(elemento);
    return li;
  }

  // Un grupo desplegable. El grupo de la página actual empieza abierto.
  function crearGrupo(grupo, numero) {
    const idLista = "menu-grupo-" + numero;
    const abierto = grupo.enlaces.some(function (item) { return item.pagina === paginaActual; });

    const li = crear("li", "menu-grupo" + (abierto ? " abierto" : ""));
    li.style.setProperty("--epica", "var(--epic-" + numero + ")");

    const boton = crear("button", "menu-grupo-boton");
    boton.type = "button";
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    boton.setAttribute("aria-controls", idLista);
    boton.appendChild(crear("span", "menu-punto"));
    boton.appendChild(crear("span", "", grupo.titulo));
    boton.addEventListener("click", function () {
      const ahoraAbierto = li.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", ahoraAbierto ? "true" : "false");
    });

    const lista = crear("ul", "menu-enlaces");
    grupo.enlaces.forEach(function (item) { lista.appendChild(crearItem(item)); });

    const sublista = crear("div", "menu-sublista");
    sublista.id = idLista;
    sublista.appendChild(lista);

    li.appendChild(boton);
    li.appendChild(sublista);
    return li;
  }

  // Rellena el <nav id="menu-lateral"> y devuelve su botón de cerrar
  function construirPanel(panel) {
    panel.classList.add("menu-panel");

    const botonCerrar = crear("button", "menu-cerrar");
    botonCerrar.type = "button";
    botonCerrar.setAttribute("aria-label", "Cerrar menú");

    const cabecera = crear("div", "menu-cabecera");
    cabecera.appendChild(crearLogo("menu-logo"));
    cabecera.appendChild(botonCerrar);

    const lista = crear("ul", "menu-grupos");
    grupos.forEach(function (grupo, i) { lista.appendChild(crearGrupo(grupo, i + 1)); });

    panel.appendChild(cabecera);
    panel.appendChild(crear("p", "menu-eslogan", eslogan));
    panel.appendChild(lista);
    return botonCerrar;
  }

  // Barra superior con la hamburguesa; devuelve el botón de abrir
  function construirBarra() {
    const boton = crear("button", "menu-boton");
    boton.type = "button";
    boton.setAttribute("aria-label", "Menú de navegación");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", "menu-lateral");
    for (let i = 0; i < 3; i++) boton.appendChild(crear("span", "menu-boton-linea"));

    const barra = crear("header", "barra-superior");
    barra.appendChild(boton);
    barra.appendChild(crearLogo("menu-logo"));
    document.body.prepend(barra);
    return boton;
  }

  // ---------- 4. Comportamiento: abrir, cerrar y teclado ----------
  function iniciarMenu() {
    const panel = document.getElementById("menu-lateral");
    if (!panel) return;

    const botonCerrar = construirPanel(panel);
    const botonAbrir = construirBarra();
    const fondo = crear("div", "menu-fondo");
    panel.before(fondo);

    let abierto = false;

    // Muestra el panel y lleva el foco adentro
    function abrir() {
      abierto = true;
      panel.classList.add("abierto");
      fondo.classList.add("visible");
      document.documentElement.classList.add("menu-abierto");
      botonAbrir.setAttribute("aria-expanded", "true");
      botonCerrar.focus();
    }

    // Oculta el panel; devolverFoco regresa el foco a la hamburguesa
    function cerrar(devolverFoco) {
      if (!abierto) return;
      abierto = false;
      panel.classList.remove("abierto");
      fondo.classList.remove("visible");
      document.documentElement.classList.remove("menu-abierto");
      botonAbrir.setAttribute("aria-expanded", "false");
      // preventScroll: sin esto el navegador sube la página al enfocar la barra pegajosa
      if (devolverFoco) botonAbrir.focus({ preventScroll: true });
    }

    botonAbrir.addEventListener("click", abrir);
    botonCerrar.addEventListener("click", function () { cerrar(true); });
    fondo.addEventListener("click", function () { cerrar(true); });

    // Escape cierra; Tab y Shift+Tab se quedan dentro del panel mientras está abierto
    document.addEventListener("keydown", function (evento) {
      if (!abierto) return;
      if (evento.key === "Escape") {
        cerrar(true);
        return;
      }
      if (evento.key !== "Tab") return;

      const lista = enfocables(panel);
      const primero = lista[0];
      const ultimo = lista[lista.length - 1];
      const dentro = panel.contains(document.activeElement);

      if (!dentro || (evento.shiftKey && document.activeElement === primero)) {
        evento.preventDefault();
        (evento.shiftKey ? ultimo : primero).focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    });

    // Al volver con "Atrás" el navegador puede restaurar la página con el menú abierto
    window.addEventListener("pageshow", function (evento) {
      if (evento.persisted) cerrar(false);
    });
  }

  // ---------- 5. Pie de página ----------

  // Columna del pie con título y una lista
  function crearColumna(titulo, lista) {
    const columna = crear("div");
    columna.appendChild(crear("h2", "pie-titulo", titulo));
    columna.appendChild(lista);
    return columna;
  }

  // Rellena el <footer id="pie-pagina">
  function iniciarPie() {
    const pie = document.getElementById("pie-pagina");
    if (!pie) return;
    pie.classList.add("pie");

    const marca = crear("div", "pie-marca");
    marca.appendChild(crearLogo("pie-logo"));
    marca.appendChild(crear("p", "pie-eslogan", eslogan));

    // Enlaces rápidos: salen de la misma lista que el menú (solo páginas con enlace)
    const enlaces = crear("ul", "pie-lista");
    grupos.forEach(function (grupo) {
      grupo.enlaces.forEach(function (item) {
        if (!item.archivo || item.fase !== "mvp") return;
        const enlace = crear("a", item.pagina === paginaActual ? "activo" : "", item.texto);
        enlace.href = item.archivo;
        if (item.pagina === paginaActual) enlace.setAttribute("aria-current", "page");
        const li = crear("li");
        li.appendChild(enlace);
        enlaces.appendChild(li);
      });
    });

    const equipo = crear("ul", "pie-lista");
    integrantes.forEach(function (nombre) { equipo.appendChild(crear("li", "", nombre)); });

    const creditos = crear("div");
    creditos.appendChild(crear("h2", "pie-titulo", "Créditos"));
    creditos.appendChild(crear("p", "pie-curso", "Proyecto final de Sistemas Colaborativos, Universidad Tecnológica de Panamá."));
    creditos.appendChild(equipo);

    const contenido = crear("div", "pie-contenido");
    contenido.appendChild(marca);
    contenido.appendChild(crearColumna("Enlaces rápidos", enlaces));
    contenido.appendChild(creditos);

    const contenedor = crear("div", "contenedor");
    contenedor.appendChild(contenido);
    contenedor.appendChild(crear("p", "pie-copia", "© 2026 GameCodex. Proyecto académico."));
    pie.appendChild(contenedor);
  }

  // ---------- 6. Inicio ----------
  iniciarMenu();
  iniciarPie();
})();
