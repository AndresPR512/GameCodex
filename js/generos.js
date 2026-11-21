/* ==========================================================================
   GameCodex — generos.js (HU-13)
   Dibuja las tarjetas de géneros y el filtro con chips.
   Usa la constante global "juegos" de js/juegos.js para ejemplos e imágenes.
   Cada juego nuevo que se agregue a juegos.js aparece solo. Si trae un
   género que no está en la lista de abajo, se crea una tarjeta automática.
   ========================================================================== */

/* ---------- 1. Datos de los géneros ----------
   "nombre" es el nombre que se muestra y el que se envía al catálogo.
   Los ejemplos salen SIEMPRE de juegos.js. */
const generosBase = [
  {
    id: "accion", nombre: "Acción",
    descripcion: "Juegos rápidos donde los reflejos y la coordinación son lo más importante.",
    caracteristicas: ["Combates en tiempo real", "Reacción rápida ante enemigos", "Jefes y desafíos de habilidad"]
  },
  {
    id: "aventura", nombre: "Aventura",
    descripcion: "Te invitan a explorar mundos, descubrir secretos y avanzar en una historia.",
    caracteristicas: ["Exploración de escenarios", "Resolución de acertijos", "Historia y personajes"]
  },
  {
    id: "rol", nombre: "Rol",
    descripcion: "Controlas a un personaje que crece y se vuelve más fuerte con tus decisiones.",
    caracteristicas: ["Subir de nivel y mejorar habilidades", "Misiones y decisiones", "Inventario y equipamiento"]
  },
  {
    id: "estrategia", nombre: "Estrategia",
    descripcion: "Gana quien mejor planifica: hay que pensar antes de actuar.",
    caracteristicas: ["Gestión de recursos", "Planificación a largo plazo", "Control de unidades o defensas"]
  },
  {
    id: "simulacion", nombre: "Simulación",
    descripcion: "Recrean actividades de la vida real o imaginarias, como cultivar o administrar.",
    caracteristicas: ["Rutinas y tareas diarias", "Construir y administrar", "Ritmo tranquilo y libre"]
  },
  {
    id: "deportes", nombre: "Deportes",
    descripcion: "Llevan deportes reales a la pantalla para jugar partidos y torneos.",
    caracteristicas: ["Reglas del deporte real", "Equipos y jugadores", "Modo competitivo y multijugador"]
  },
  {
    id: "terror", nombre: "Terror",
    descripcion: "Buscan asustarte con ambientes oscuros, sonidos inquietantes y tensión constante.",
    caracteristicas: ["Ambiente oscuro y sonoro", "Recursos limitados", "Huir o esconderse"]
  },
  {
    id: "plataformas", nombre: "Plataformas",
    descripcion: "Saltar con precisión entre plataformas y esquivar obstáculos es la clave.",
    caracteristicas: ["Saltos precisos", "Obstáculos y trampas", "Niveles por superar"]
  },
  {
    id: "metroidvania", nombre: "Metroidvania",
    descripcion: "Un gran mapa conectado que se abre a medida que consigues nuevas habilidades.",
    caracteristicas: ["Mapa interconectado", "Habilidades que abren caminos", "Regresar a zonas anteriores"]
  },
  {
    id: "sandbox", nombre: "Sandbox",
    descripcion: "Mundos abiertos donde tú decides qué hacer y qué construir.",
    caracteristicas: ["Libertad total", "Construcción y creatividad", "Sin un camino obligatorio"]
  },
  {
    id: "supervivencia", nombre: "Supervivencia",
    descripcion: "Debes conseguir comida, refugio y herramientas para mantenerte con vida.",
    caracteristicas: ["Recolectar y fabricar", "Hambre, salud y peligros", "Refugio y defensa"]
  },
  {
    id: "defensa-de-torres", nombre: "Defensa de torres",
    descripcion: "Colocas torres en el camino para detener oleadas de enemigos.",
    caracteristicas: ["Oleadas de enemigos", "Ubicar y mejorar torres", "Administrar el dinero"]
  }
];

/* Otras formas de escribir un mismo género en juegos.js (sin tildes, en minúscula) */
const aliasGeneros = {
  "rol": ["rpg", "jrpg", "juego de rol"],
  "accion": ["action"],
  "aventura": ["adventure"],
  "estrategia": ["strategy"],
  "simulacion": ["simulator"],
  "deportes": ["deporte", "sports"],
  "terror": ["horror"],
  "plataformas": ["plataforma", "platformer"]
};

/* Cuántos juegos se muestran antes del botón "Ver todos" */
const MAX_EJEMPLOS = 8;

/* ---------- 2. Referencias al HTML ---------- */
const contenedorFiltros = document.getElementById("generos-filtros");
const contenedorLista = document.getElementById("generos-lista");
const textoEstado = document.getElementById("generos-estado");

/* ¿El usuario prefiere menos movimiento? */
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 3. Funciones de ayuda ---------- */

/* Crea un elemento con clase y texto en una sola línea */
function crear(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (texto) elemento.textContent = texto;
  return elemento;
}

/* Texto sin tildes, mayúsculas ni espacios sobrantes: "Acción " -> "accion" */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/* Convierte un nombre en un id válido para el HTML: "Defensa de torres" -> "defensa-de-torres" */
function crearId(texto) {
  return normalizar(texto).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* Une cada juego de juegos.js con su género. Si el género no existe, lo crea. */
function armarGeneros() {
  const lista = generosBase.map(function (g) {
    return { id: g.id, nombre: g.nombre, descripcion: g.descripcion, caracteristicas: g.caracteristicas, juegos: [] };
  });

  // Si juegos.js no cargó, mostramos solo los géneros base
  if (typeof juegos === "undefined") return lista;

  function buscar(nombre) {
    const n = normalizar(nombre);
    return lista.find(function (g) {
      return normalizar(g.nombre) === n || (aliasGeneros[g.id] || []).includes(n);
    });
  }

  juegos.forEach(function (juego) {
    (juego.genero || []).forEach(function (nombreGenero) {
      let genero = buscar(nombreGenero);

      // Género nuevo en el catálogo: se crea su tarjeta automáticamente
      if (!genero) {
        genero = {
          id: crearId(nombreGenero),
          nombre: nombreGenero,
          descripcion: "Juegos del género " + nombreGenero + " que forman parte del catálogo de GameCodex.",
          caracteristicas: ["Presente en el catálogo", "Consulta cada juego en su ficha", "Descripción ampliada próximamente"],
          juegos: []
        };
        lista.push(genero);
      }
      if (!genero.juegos.includes(juego)) genero.juegos.push(juego);
    });
  });

  return lista;
}

/* ---------- 4. Crear una tarjeta ---------- */
function crearTarjeta(genero) {
  const lista = genero.juegos;

  const tarjeta = crear("article", "tarjeta genero-card");
  tarjeta.id = genero.id;
  tarjeta.dataset.genero = genero.id;

  // Portada: imagen del primer juego con imagen, o el degradado con el nombre del género
  const portada = crear("div", "genero-portada");
  const nombrePortada = crear("span", "genero-portada-nombre", genero.nombre);
  nombrePortada.setAttribute("aria-hidden", "true");
  const primero = lista.find(function (juego) { return juego.imagen; });

  if (primero) {
    const imagen = document.createElement("img");
    imagen.src = primero.imagen;
    imagen.alt = "Portada de " + primero.nombre + ", ejemplo del género " + genero.nombre;
    imagen.loading = "lazy";
    // Si la imagen falla, la quitamos y queda el degradado
    imagen.addEventListener("error", function () {
      imagen.remove();
      portada.classList.add("sin-imagen");
    });
    portada.appendChild(imagen);
  } else {
    portada.classList.add("sin-imagen");
  }
  portada.appendChild(nombrePortada);

  // Cantidad de juegos del género en el catálogo
  const textoCantidad = lista.length === 1 ? "1 juego" : lista.length + " juegos";
  portada.appendChild(crear("span", "genero-contador", textoCantidad));
  tarjeta.appendChild(portada);

  // Cuerpo de la tarjeta
  const cuerpo = crear("div", "tarjeta-cuerpo");
  cuerpo.appendChild(crear("h3", "", genero.nombre));
  cuerpo.appendChild(crear("p", "", genero.descripcion));

  // Características
  cuerpo.appendChild(crear("h4", "genero-subtitulo", "Características"));
  const ul = crear("ul", "genero-caracteristicas");
  genero.caracteristicas.forEach(function (texto) {
    ul.appendChild(crear("li", "", texto));
  });
  cuerpo.appendChild(ul);

  // Ejemplos: todos los juegos de juegos.js con este género
  cuerpo.appendChild(crear("h4", "genero-subtitulo", "Ejemplos"));
  const ejemplos = crear("div", "etiquetas genero-ejemplos");
  if (lista.length > 0) {
    lista.forEach(function (juego, posicion) {
      const enlace = crear("a", "etiqueta", juego.nombre);
      enlace.href = "ficha.html?id=" + juego.id;
      // Los que pasan del límite quedan ocultos hasta pulsar "Ver todos"
      if (posicion >= MAX_EJEMPLOS) enlace.classList.add("oculto", "ejemplo-extra");
      ejemplos.appendChild(enlace);
    });
  } else {
    ejemplos.appendChild(crear("span", "etiqueta etiqueta-vacia", "Aún no hay juegos de este género en el catálogo"));
  }
  cuerpo.appendChild(ejemplos);

  // Botón para ver todos los juegos cuando son muchos
  if (lista.length > MAX_EJEMPLOS) {
    const textoVer = "Ver los " + lista.length + " juegos";
    const botonMas = crear("button", "genero-mas", textoVer);
    botonMas.type = "button";
    botonMas.setAttribute("aria-expanded", "false");
    botonMas.addEventListener("click", function () {
      const abierto = botonMas.getAttribute("aria-expanded") === "true";
      ejemplos.querySelectorAll(".ejemplo-extra").forEach(function (enlace) {
        enlace.classList.toggle("oculto", abierto);
      });
      botonMas.setAttribute("aria-expanded", abierto ? "false" : "true");
      botonMas.textContent = abierto ? textoVer : "Ver menos";
    });
    cuerpo.appendChild(botonMas);
  }

  // Botón hacia el catálogo filtrado
  const boton = crear("a", "btn btn-secundario", "Ver en el catálogo");
  boton.href = "catalogo.html?genero=" + encodeURIComponent(genero.nombre);
  boton.setAttribute("aria-label", "Ver juegos de " + genero.nombre + " en el catálogo");
  cuerpo.appendChild(boton);

  tarjeta.appendChild(cuerpo);
  return tarjeta;
}

/* ---------- 5. Animación de entrada con IntersectionObserver ---------- */
let observador = null;

if ("IntersectionObserver" in window && !reducirMovimiento) {
  observador = new IntersectionObserver(function (entradas) {
    let orden = 0;
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        // Retraso progresivo: cada tarjeta entra un poco después
        entrada.target.style.transitionDelay = (orden * 0.08) + "s";
        entrada.target.classList.add("visible");
        orden++;
        observador.unobserve(entrada.target);
        // Quitamos el retraso para que el hover no se sienta lento
        setTimeout(function () { entrada.target.style.transitionDelay = ""; }, 600 + orden * 80);
      }
    });
  }, { threshold: 0.15 });
}

/* ---------- 6. Filtro con chips ---------- */
function crearChip(texto, valor) {
  const chip = crear("button", "chip", texto);
  chip.type = "button";
  chip.dataset.valor = valor;
  chip.setAttribute("aria-pressed", "false");
  chip.addEventListener("click", function () { filtrar(valor, true); });
  return chip;
}

/* "animar" es false solo al cargar la página: así la entrada escalonada
   la controla el IntersectionObserver y no se pisa con el filtro. */
function filtrar(valor, animar) {
  let nombreActivo = "";

  // Actualizar chips
  contenedorFiltros.querySelectorAll(".chip").forEach(function (chip) {
    const activo = chip.dataset.valor === valor;
    chip.classList.toggle("activo", activo);
    chip.setAttribute("aria-pressed", activo ? "true" : "false");
    if (activo) nombreActivo = chip.textContent;
  });

  // Mostrar u ocultar tarjetas con una aparición suave
  let visibles = 0;
  contenedorLista.querySelectorAll(".genero-card").forEach(function (tarjeta) {
    const mostrar = valor === "todos" || tarjeta.dataset.genero === valor;
    tarjeta.classList.toggle("oculto", !mostrar);
    tarjeta.classList.remove("aparecer");
    if (mostrar) {
      visibles++;
      if (animar) {
        tarjeta.classList.add("visible");
        if (!reducirMovimiento) {
          void tarjeta.offsetWidth; // reinicia la animación
          tarjeta.classList.add("aparecer");
        }
      }
    }
  });

  if (animar) {
    textoEstado.textContent = valor === "todos"
      ? "Mostrando todos los géneros (" + visibles + ")."
      : "Mostrando el género " + nombreActivo + ".";
  }
}

/* ---------- 7. Iniciar la página ---------- */
function iniciar() {
  const generos = armarGeneros();

  contenedorFiltros.appendChild(crearChip("Todos", "todos"));

  generos.forEach(function (genero) {
    contenedorFiltros.appendChild(crearChip(genero.nombre, genero.id));
    const tarjeta = crearTarjeta(genero);
    contenedorLista.appendChild(tarjeta);
    if (observador) observador.observe(tarjeta);
    else tarjeta.classList.add("visible");
  });

  filtrar("todos", false);

  // Soporte para generos.html#rol: ir directo a ese género
  const ancla = decodeURIComponent(window.location.hash.slice(1));
  const destino = ancla ? document.getElementById(ancla) : null;
  if (destino && destino.classList.contains("genero-card")) {
    destino.classList.add("visible", "destacada");
    destino.scrollIntoView({ behavior: reducirMovimiento ? "auto" : "smooth", block: "start" });
  }
}

iniciar();
