// HU-16 — Mario: datos de los tops y recomendaciones editoriales.
// Cada juego se guarda solo con su "juegoId" del catálogo (js/juegos.js);
// el nombre, la imagen, los géneros y el enlace a la ficha salen de allí.
//
// Para agregar un top: copiar un bloque de "tops" y cambiar sus datos.
// Para agregar un juego a un top: agregar { juegoId, motivo, autor } en "items".
//   - juegoId: el "id" del juego en juegos.js.
//   - motivo: opinión del equipo (1 o 2 frases).
//   - autor: opcional; si se omite se muestra "Equipo GameCodex".
// Si "ranking" es true la lista va numerada (es un top); si es false es una
// selección sin posiciones.
//
// IMPORTANTE: los textos son un primer borrador editorial. Cada integrante
// debe revisarlos y reemplazarlos por su opinión personal.

const tops = [
  {
    id: "favoritos-del-equipo",
    titulo: "Favoritos del equipo",
    descripcion: "Los juegos que más nos han marcado. Incluimos la saga Xenoblade completa y un clásico de los metroidvania.",
    ranking: true,
    items: [
      {
        juegoId: 1,
        motivo: "Su reino de insectos es un mundo que se siente vivo y misterioso. Exigente pero justo: cada jefe vencido se disfruta, y la música y el arte acompañan todo el viaje."
      },
      {
        juegoId: 34,
        motivo: "Una historia épica contada sobre los cuerpos de dos titanes gigantes. Es el mejor punto de entrada a la saga, con una banda sonora inolvidable."
      },
      {
        juegoId: 36,
        motivo: "Conecta lo mejor de los juegos anteriores con una trama emocional sobre la guerra y el valor de la vida. El sistema de clases ofrece mucha libertad."
      },
      {
        juegoId: 35,
        motivo: "Un viaje de Rex y Pyra por un mundo de titanes con un combate profundo. Tarda en explicar sus sistemas, pero los personajes y la música lo compensan."
      },
      {
        juegoId: 4,
        motivo: "Hecho casi por una sola persona y lleno de cariño. Cultivar, conocer al pueblo y explorar las cuevas a tu ritmo es pura calma."
      }
    ]
  },
  {
    id: "jugar-con-amigos",
    titulo: "Mejores juegos para jugar con amigos",
    descripcion: "Para reuniones, tardes de sofá o partidas a distancia. Selección sin orden de importancia.",
    ranking: false,
    items: [
      {
        juegoId: 10,
        motivo: "Se juega obligatoriamente entre dos y cada nivel cambia de mecánica. Una aventura cooperativa muy ingeniosa que fue premiada como juego del año en 2021."
      },
      {
        juegoId: 41,
        motivo: "Fácil de aprender para cualquiera, con ayudas de conducción para quienes no tienen experiencia. Siempre termina en risas y reclamos."
      },
      {
        juegoId: 31,
        motivo: "Reúne personajes de muchas franquicias en un mismo ring. Perfecto para torneos entre amigos, aunque no se conozcan los juegos de origen."
      },
      {
        juegoId: 43,
        motivo: "Tableros y minijuegos pensados para grupo. Las partidas son cortas y llenas de giros inesperados."
      },
      {
        juegoId: 17,
        motivo: "Deducción social en una nave espacial: acusaciones, mentiras y discusiones a gritos. Se juega en celular, PC y consola."
      }
    ]
  },
  {
    id: "buenas-historias",
    titulo: "Videojuegos con buenas historias",
    descripcion: "Para quienes juegan por la trama y los personajes más que por la competencia.",
    ranking: false,
    items: [
      {
        juegoId: 54,
        motivo: "El viaje de Joel y Ellie por un mundo postapocalíptico. Sus personajes y su final dan mucho de qué hablar."
      },
      {
        juegoId: 11,
        motivo: "Tres androides y decisiones que cambian la historia. Cada partida puede terminar de manera distinta."
      },
      {
        juegoId: 51,
        motivo: "Kratos y su hijo Atreus en la mitología nórdica. Una historia de padre e hijo que transforma por completo a la saga."
      },
      {
        juegoId: 68,
        motivo: "Una reimaginación de un clásico del rol. Midgar cobra vida con personajes carismáticos y un combate dinámico."
      },
      {
        juegoId: 61,
        motivo: "Un samurái ante la invasión mongola en el Japón del siglo XIII. Muy cinematográfico y con paisajes preciosos."
      }
    ]
  },
  {
    id: "principiantes",
    titulo: "Recomendados para principiantes",
    descripcion: "Juegos amables, fáciles de entender y muy divertidos para dar los primeros pasos.",
    ranking: false,
    items: [
      {
        juegoId: 45,
        motivo: "Plataformas de Mario con sorpresas en cada nivel. Es accesible y permite jugar con otras personas."
      },
      {
        juegoId: 56,
        motivo: "Un plataformas lleno de color y de ideas ingeniosas que fue premiado como juego del año en 2024. Se entiende al instante."
      },
      {
        juegoId: 39,
        motivo: "Sin presión ni final: decorar tu isla y conocer a los vecinos a tu propio ritmo."
      },
      {
        juegoId: 2,
        motivo: "Cada quien decide qué hacer: construir, explorar o sobrevivir. Uno de los juegos más vendidos de la historia."
      },
      {
        juegoId: 5,
        motivo: "Criar slimes de colores en un planeta lejano. Relajado y encantador, con un ritmo muy tranquilo."
      }
    ]
  },
  {
    id: "mundo-abierto",
    titulo: "Mejores juegos de mundo abierto",
    descripcion: "Mundos enormes para explorar sin prisa y perderse a propósito.",
    ranking: false,
    items: [
      {
        juegoId: 27,
        motivo: "Hyrule se puede recorrer casi sin límites, y cada colina invita a descubrir algo. Redefinió lo que es explorar."
      },
      {
        juegoId: 28,
        motivo: "Retoma el mapa anterior y suma cielo y subsuelo, además de construir tus propios inventos. Pura creatividad."
      },
      {
        juegoId: 48,
        motivo: "Los Santos es una ciudad llena de vida, con tres protagonistas muy distintos y mucho por hacer más allá de la historia."
      },
      {
        juegoId: 57,
        motivo: "Balancearse por Nueva York es una de las mejores sensaciones de movimiento que hemos probado."
      },
      {
        juegoId: 60,
        motivo: "Aloy recorre un oeste de máquinas gigantes con un mundo muy variado y espectacular a la vista."
      }
    ]
  }
];
