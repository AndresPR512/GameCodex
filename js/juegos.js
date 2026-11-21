// Datos compartidos
// catálogo, fichas y favoritos.
// id, nombre, año, género, plataformas, descripción, valoración e imagen.
// desarrolladora (agregada para la ficha, HU-09).

const juegos = [
  {
    id: 1,
    nombre: "Hollow Knight",
    anio: 2017,
    desarrolladora: "Team Cherry",
    genero: ["Metroidvania", "Plataformas"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Explora un vasto reino de insectos en ruinas, lleno de secretos y jefes memorables.",
    valoracion: 4.8,
    imagen: "img/juegos/hollow-knight.jpg"
  },
  {
    id: 2,
    nombre: "Minecraft",
    anio: 2011,
    desarrolladora: "Mojang Studios",
    genero: ["Sandbox", "Supervivencia"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Construye, explora y sobrevive en un mundo de bloques generado sin límites.",
    valoracion: 4.7,
    imagen: "img/juegos/minecraft.jpg"
  },
  {
    id: 3,
    nombre: "Bloons TD 6",
    anio: 2018,
    desarrolladora: "Ninja Kiwi",
    genero: ["Estrategia", "Defensa de torres"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Coloca torres de monos y combina mejoras para detener oleadas de globos cada vez más resistentes.",
    valoracion: 4.5,
    imagen: "img/juegos/bloons-td-6.jpg"
  },
  {
    id: 4,
    nombre: "Stardew Valley",
    anio: 2016,
    desarrolladora: "ConcernedApe",
    genero: ["Simulación", "Rol"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Hereda una granja, cultiva la tierra, haz amistades en el pueblo y explora las cuevas cercanas.",
    valoracion: 4.9,
    imagen: "img/juegos/stardew-valley.jpg"
  },
  {
    id: 5,
    nombre: "Slime Rancher",
    anio: 2017,
    desarrolladora: "Monomi Park",
    genero: ["Aventura", "Simulación"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Cuida y cría slimes de colores en un planeta lejano mientras exploras y amplías tu rancho.",
    valoracion: 4.6,
    imagen: "img/juegos/slime-rancher.jpg"
  },
  {
    id: 6,
    nombre: "Blasphemous",
    anio: 2019,
    desarrolladora: "The Game Kitchen",
    genero: ["Metroidvania", "Acción"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Recorre el sombrío reino de Cvstodia en una aventura de acción brutal, cargada de fe, penitencia y jefes inolvidables.",
    valoracion: 4.5,
    imagen: "img/juegos/Blasphemous.jpg"
  },
  {
    id: 7,
    nombre: "Brawl Stars",
    anio: 2018,
    desarrolladora: "Supercell",
    genero: ["Acción", "Multijugador"],
    plataformas: ["Android", "iOS"],
    descripcion: "Participa en combates multijugador utilizando personajes con habilidades únicas en diferentes modos de juego.",
    valoracion: 4.6,
    imagen: "img/juegos/brawl-stars.jpg"
  },
  {
    id: 8,
    nombre: "Clash Royale",
    anio: 2016,
    desarrolladora: "Supercell",
    genero: ["Estrategia", "Cartas"],
    plataformas: ["Android", "iOS"],
    descripcion: "Enfréntate a otros jugadores en duelos estratégicos utilizando cartas, tropas y hechizos para destruir sus torres.",
    valoracion: 4.5,
    imagen: "img/juegos/clash-royale.jpg"
  },
  {
    id: 9,
    nombre: "Fortnite",
    anio: 2017,
    desarrolladora: "Epic Games",
    genero: ["Battle Royale", "Acción"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox", "Android"],
    descripcion: "Compite contra otros jugadores en una isla, consigue recursos y lucha por ser el último superviviente.",
    valoracion: 4.7,
    imagen: "img/juegos/fortnite.jpg"
  },
  {
    id: 10,
    nombre: "It Takes Two",
    anio: 2021,
    desarrolladora: "Hazelight Studios",
    genero: ["Aventura", "Plataformas", "Cooperativo"],
    plataformas: ["PC", "Switch", "PlayStation", "Xbox"],
    descripcion: "Acompaña a Cody y May en una aventura cooperativa donde dos jugadores deben trabajar juntos para superar desafíos y acertijos.",
    valoracion: 4.9,
    imagen: "img/juegos/it-takes-two.jpg"
  },
  {
    id: 11,
    nombre: "Detroit: Become Human",
    anio: 2018,
    desarrolladora: "Quantic Dream",
    genero: ["Aventura", "Narrativo", "Ciencia ficción"],
    plataformas: ["PC", "PlayStation"],
    descripcion: "Toma decisiones que determinan el destino de tres androides en una sociedad futurista donde las máquinas comienzan a desarrollar conciencia.",
    valoracion: 4.8,
    imagen: "img/juegos/detroit-become-human.jpg"
  },
  {
    id: 12,
    nombre: "Clash of Clans",
    anio: 2012,
    desarrolladora: "Supercell",
    genero: ["Estrategia", "Construcción", "Multijugador"],
    plataformas: ["Android", "iOS"],
    descripcion: "Construye y mejora tu aldea, entrena tropas, forma clanes y participa en batallas contra otros jugadores.",
    valoracion: 4.7,
    imagen: "img/juegos/clash-of-clans.jpg"
  },
  {
    id: 13,
    nombre: "Stumble Guys",
    anio: 2021,
    desarrolladora: "Scopely",
    genero: ["Plataformas", "Multijugador", "Party"],
    plataformas: ["PC", "Android", "iOS", "PlayStation", "Xbox"],
    descripcion: "Compite en circuitos de obstáculos contra otros jugadores e intenta llegar a la meta sin quedar eliminado.",
    valoracion: 4.3,
    imagen: "img/juegos/stumble-guys.jpg"
  },
  {
    id: 14,
    nombre: "Pou",
    anio: 2012,
    desarrolladora: "Zakeh",
    genero: ["Simulación", "Mascota virtual"],
    plataformas: ["Android", "iOS"],
    descripcion: "Adopta una mascota virtual, aliméntala, báñala, juega con ella y personaliza su apariencia.",
    valoracion: 4.4,
    imagen: "img/juegos/pou.jpg"
  },
  {
    id: 15,
    nombre: "Roblox",
    anio: 2006,
    desarrolladora: "Roblox Corporation",
    genero: ["Sandbox", "Multijugador", "Creación"],
    plataformas: ["PC", "Android", "iOS", "Xbox", "PlayStation"],
    descripcion: "Explora miles de experiencias creadas por otros usuarios, juega con amigos y desarrolla tus propios mundos virtuales.",
    valoracion: 4.6,
    imagen: "img/juegos/roblox.jpg"
  },
  {
    id: 16,
    nombre: "Slime Rancher 2",
    anio: 2022,
    desarrolladora: "Monomi Park",
    genero: ["Aventura", "Simulación"],
    plataformas: ["PC", "PlayStation", "Xbox"],
    descripcion: "Acompaña a Beatrix LeBeau en una aventura por Rainbow Island, donde descubrirás nuevos slimes, recursos y secretos.",
    valoracion: 4.7,
    imagen: "img/juegos/slime-rancher-2.jpg"
  },
  {
    id: 17,
    nombre: "Among Us",
    anio: 2018,
    desarrolladora: "Innersloth",
    genero: ["Multijugador", "Supervivencia", "Deducción social"],
    plataformas: ["PC", "Android", "iOS", "Switch", "PlayStation", "Xbox"],
    descripcion: "Completa tareas en una nave espacial mientras descubres quiénes son los impostores que intentan sabotear la misión.",
    valoracion: 4.5,
    imagen: "img/juegos/among-us.jpg"
  },
  {
    id: 18,
    nombre: "Free Fire",
    anio: 2017,
    desarrolladora: "Garena",
    genero: ["Battle Royale", "Acción", "Supervivencia"],
    plataformas: ["Android", "iOS"],
    descripcion: "Participa en partidas de supervivencia donde debes conseguir armas y recursos para enfrentarte a otros jugadores.",
    valoracion: 4.5,
    imagen: "img/juegos/free-fire.jpg"
  },
  {
    id: 19,
    nombre: "Gorilla Tag",
    anio: 2022,
    desarrolladora: "Another Axiom",
    genero: ["Multijugador", "Acción", "Realidad virtual"],
    plataformas: ["PC", "Meta Quest"],
    descripcion: "Controla un gorila mediante movimientos de manos para correr, trepar y escapar de otros jugadores.",
    valoracion: 4.4,
    imagen: "img/juegos/gorilla-tag.jpg"
  },
  {
    id: 20,
    nombre: "Do Not Feed the Monkeys",
    anio: 2018,
    desarrolladora: "Fictiorama Studios",
    genero: ["Simulación", "Estrategia", "Aventura"],
    plataformas: ["PC", "Switch", "PlayStation"],
    descripcion: "Observa a diferentes personas mediante cámaras de vigilancia, descubre sus secretos y decide si intervenir en sus vidas.",
    valoracion: 4.5,
    imagen: "img/juegos/do-not-feed-the-monkeys.jpg"
  }
];
