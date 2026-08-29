export type Kind = 'pelicula' | 'serie'
export type Priority = 'esencial' | 'recomendada' | 'opcional'

export type WatchItem = {
  id: string
  title: string
  year: number
  minutes: number
  kind: Kind
  priority: Priority
  saga: string
  note: string
  latamTitle?: string
  watchFor?: string
  tieIn?: string
  watchUrl?: string
}

const film = (id: string, title: string, year: number, minutes: number, priority: Priority, saga: string, note: string): WatchItem => ({ id, title, year, minutes, priority, saga, note, kind: 'pelicula' })
const show = (id: string, title: string, year: number, minutes: number, priority: Priority, saga: string, note: string): WatchItem => ({ id, title, year, minutes, priority, saga, note, kind: 'serie' })

// Añade `watchUrl` únicamente si tienes derechos de distribución o enlazas una plataforma oficial.
const baseWatchlist: WatchItem[] = [
  film('iron-man','Iron Man',2008,126,'esencial','La Saga del Infinito','Aquí nacen la iniciativa y el tono compartido del universo.'),
  film('hulk','The Incredible Hulk',2008,112,'recomendada','La Saga del Infinito','Ross, Blonsky y Sterns regresan mucho después.'),
  film('iron-man-2','Iron Man 2',2010,124,'esencial','La Saga del Infinito','Presenta a Natasha, Rhodey como War Machine y expande S.H.I.E.L.D.'),
  film('thor','Thor',2011,115,'esencial','La Saga del Infinito','Abre la rama asgardiana y presenta el conflicto entre Thor y Loki.'),
  film('cap-1','Captain America: The First Avenger',2011,124,'esencial','La Saga del Infinito','El origen de Steve Rogers, el Teseracto y el legado del escudo.'),
  film('avengers','The Avengers',2012,143,'esencial','La Saga del Infinito','La primera convergencia y la batalla que cambia la Tierra.'),
  film('iron-man-3','Iron Man 3',2013,130,'recomendada','La Saga del Infinito','Las consecuencias psicológicas de Nueva York siguen hasta Endgame.'),
  film('thor-2','Thor: The Dark World',2013,112,'recomendada','La Saga del Infinito','Introduce una Gema del Infinito y profundiza la relación con Loki.'),
  film('winter-soldier','Captain America: The Winter Soldier',2014,136,'esencial','La Saga del Infinito','Derrumba el orden de S.H.I.E.L.D. y redefine a Bucky.'),
  film('guardians','Guardians of the Galaxy',2014,121,'esencial','La Saga del Infinito','Abre el tablero cósmico y explica mejor las Gemas.'),
  film('age-ultron','Avengers: Age of Ultron',2015,141,'esencial','La Saga del Infinito','Visión, Wanda y el costo de intentar proteger el mundo.'),
  film('ant-man','Ant-Man',2015,117,'recomendada','La Saga del Infinito','Presenta el Reino Cuántico, decisivo más adelante.'),
  film('civil-war','Captain America: Civil War',2016,147,'esencial','La Saga del Infinito','Rompe a los Vengadores y presenta a T’Challa y Peter Parker.'),
  film('black-widow','Black Widow',2021,134,'recomendada','La Saga del Infinito','Mírala después de Civil War; presenta a Yelena y Red Guardian.'),
  film('doctor-strange','Doctor Strange',2016,115,'esencial','La Saga del Infinito','Establece la magia, el multiverso y sus guardianes.'),
  film('guardians-2','Guardians of the Galaxy Vol. 2',2017,136,'recomendada','La Saga del Infinito','Cierra la herida familiar de Peter y suma a Mantis.'),
  film('homecoming','Spider-Man: Homecoming',2017,133,'recomendada','La Saga del Infinito','Define al Peter del MCU y su vínculo con Tony.'),
  film('ragnarok','Thor: Ragnarok',2017,130,'esencial','La Saga del Infinito','Destruye el viejo statu quo y enlaza directamente con Infinity War.'),
  film('black-panther','Black Panther',2018,134,'esencial','La Saga del Infinito','Presenta Wakanda como potencia mundial y tecnológica.'),
  film('infinity-war','Avengers: Infinity War',2018,149,'esencial','La Saga del Infinito','Todas las rutas convergen ante Thanos.'),
  film('ant-wasp','Ant-Man and the Wasp',2018,118,'recomendada','La Saga del Infinito','Su escena final prepara la solución cuántica.'),
  film('captain-marvel','Captain Marvel',2019,124,'recomendada','La Saga del Infinito','Explica el origen de Carol, Fury y el localizador de emergencia.'),
  film('endgame','Avengers: Endgame',2019,181,'esencial','La Saga del Infinito','Cierra la primera gran era y crea nuevas ramificaciones temporales.'),
  show('wandavision','WandaVision',2021,350,'esencial','El Multiverso','El duelo de Wanda altera su poder y el destino de Visión.'),
  show('falcon-winter','The Falcon and the Winter Soldier',2021,305,'esencial','El Multiverso','Sam acepta el escudo y se redefine el legado del Capitán América.'),
  show('loki-1','Loki: Temporada 1',2021,290,'esencial','El Multiverso','La línea temporal se abre y aparece la amenaza de sus variantes.'),
  film('shang-chi','Shang-Chi and the Legend of the Ten Rings',2021,132,'esencial','El Multiverso','Shang-Chi entra al tablero y los anillos emiten una señal desconocida.'),
  show('what-if-1','What If…?: Temporada 1',2021,260,'recomendada','El Multiverso','Ensaya las reglas y consecuencias de realidades alternativas.'),
  film('eternals','Eternals',2021,156,'opcional','El Multiverso','Expande la cosmología y deja una alteración física global.'),
  film('no-way-home','Spider-Man: No Way Home',2021,148,'esencial','El Multiverso','Cruza universos previos y muestra el precio de una incursión personal.'),
  show('hawkeye','Hawkeye',2021,300,'recomendada','El Multiverso','Conecta a Yelena, Kate y Kingpin con la nueva generación.'),
  show('moon-knight','Moon Knight',2022,310,'opcional','El Multiverso','Una rama sobrenatural relativamente independiente.'),
  film('multiverse-madness','Doctor Strange in the Multiverse of Madness',2022,126,'esencial','El Multiverso','Define las incursiones y continúa directamente WandaVision.'),
  show('ms-marvel','Ms. Marvel',2022,300,'recomendada','El Multiverso','Presenta a Kamala y una pieza clave de la nueva generación.'),
  film('love-thunder','Thor: Love and Thunder',2022,119,'recomendada','El Multiverso','Actualiza el estado de Thor antes del próximo encuentro global.'),
  show('she-hulk','She-Hulk: Attorney at Law',2022,270,'opcional','El Multiverso','Amplía el lado cotidiano y legal de los superhumanos.'),
  film('wakanda-forever','Black Panther: Wakanda Forever',2022,161,'esencial','El Multiverso','Wakanda hereda el manto y entra en conflicto con Talokan.'),
  film('quantumania','Ant-Man and the Wasp: Quantumania',2023,125,'esencial','El Multiverso','Presenta de frente la guerra de variantes.'),
  show('secret-invasion','Secret Invasion',2023,280,'opcional','El Multiverso','Cambia el panorama político entre humanos y skrulls.'),
  show('loki-2','Loki: Temporada 2',2023,300,'esencial','El Multiverso','Reformula por completo quién sostiene las líneas temporales.'),
  film('marvels','The Marvels',2023,105,'recomendada','El Multiverso','Su desenlace conecta universos y abre una puerta mutante.'),
  show('echo','Echo',2024,230,'opcional','La Calle','Continúa el conflicto entre Maya, Kingpin y el legado de Daredevil.'),
  film('deadpool-wolverine','Deadpool & Wolverine',2024,128,'esencial','Los Mundos X','Hace oficial el cruce entre la TVA y el universo cinematográfico X-Men.'),
  show('agatha','Agatha All Along',2024,315,'recomendada','El Multiverso','Retoma la magia de WandaVision y amplía sus consecuencias.'),
  film('brave-new-world','Captain America: Brave New World',2025,118,'esencial','La Recta Final','Sam enfrenta su primera crisis global como Capitán América.'),
  show('daredevil-born-again','Daredevil: Born Again',2025,440,'recomendada','La Calle','Matt y Fisk reorganizan el tablero de Nueva York.'),
  film('thunderbolts','Thunderbolts*',2025,126,'esencial','La Recta Final','Reúne a Yelena, Bucky y un nuevo equipo bajo presión.'),
  film('fantastic-four','The Fantastic Four: First Steps',2025,115,'esencial','La Recta Final','Presenta a la familia que ocupará el centro de la próxima colisión.'),
  film('x-men','X-Men',2000,104,'esencial','Los Mundos X','Conoce las versiones de Xavier y Magneto que originaron esta saga.'),
  film('x2','X2: X-Men United',2003,134,'recomendada','Los Mundos X','Profundiza la alianza imposible entre Xavier y Magneto.'),
  film('last-stand','X-Men: The Last Stand',2006,104,'opcional','Los Mundos X','Cierra la trilogía original, aunque su continuidad luego cambia.'),
  film('first-class','X-Men: First Class',2011,132,'recomendada','Los Mundos X','El origen de la amistad y fractura ideológica de sus líderes.'),
  film('days-future-past','X-Men: Days of Future Past',2014,132,'esencial','Los Mundos X','Une generaciones y reescribe la continuidad de los X-Men.'),
  film('logan','Logan',2017,137,'recomendada','Los Mundos X','Un cierre emocional para una variante de Wolverine y Xavier.'),
  film('avengers-doomsday','Avengers: Doomsday',2026,0,'esencial','Destino','La meta de esta ruta. La información se actualizará al acercarse el estreno.')
]

type Extra = Pick<WatchItem, 'latamTitle' | 'watchFor' | 'tieIn'>

const extras: Record<string, Extra> = {
  'iron-man': { latamTitle:'Iron Man: El Hombre de Hierro', watchFor:'El nombre de la agencia de Coulson, la decisión de Tony en la conferencia de prensa y la primera escena poscréditos del UCM.', tieIn:'Nick Fury presenta la Iniciativa Vengadores. Los Diez Anillos reaparecen en Shang-Chi y Rhodey se convierte en War Machine.' },
  'hulk': { latamTitle:'El Increíble Hulk', watchFor:'El proyecto militar que originó a Hulk, lo que cae sobre la herida de Samuel Sterns y la escena final en el bar.', tieIn:'Ross, Blonsky y Sterns regresan años después. El intento de recrear el suero del supersoldado conecta con Capitán América.' },
  'iron-man-2': { watchFor:'La nueva asistente legal de Stark, el monitor de S.H.I.E.L.D. durante el clímax y el cráter de la escena poscréditos.', tieIn:'Debutan Natasha Romanoff y War Machine. El monitor enlaza con Hulk y el martillo conduce directamente a Thor.' },
  'thor': { watchFor:'Cómo Loki descubre su origen, el sacrificio que vuelve digno a Thor y la intervención de Hawkeye en la base.', tieIn:'Loki prepara la invasión de Nueva York. El Teseracto y el control mental regresan en The Avengers.' },
  'cap-1': { latamTitle:'Capitán América: El Primer Vengador', watchFor:'El Teseracto, el destino de Bucky, el mapa que muestra Zola y el último baile prometido a Peggy.', tieIn:'El sacrificio de Steve lo lleva al presente. El legado del suero, Hydra y el escudo atraviesa todo el UCM.' },
  'avengers': { latamTitle:'Los Vengadores', watchFor:'La dinámica entre los seis héroes, el ataque chitauri y las dos escenas después de los créditos.', tieIn:'La batalla de Nueva York marca a Tony, origina el daño de Control de Daños y pone a Thanos en el tablero.' },
  'iron-man-3': { watchFor:'Los ataques de ansiedad de Tony, la verdad detrás del Mandarín y quién escucha toda la historia al final.', tieIn:'El trauma de Tony impulsa a Ultrón. Shang-Chi aclara años después qué era realmente la organización de los Diez Anillos.' },
  'thor-2': { latamTitle:'Thor: Un Mundo Oscuro', watchFor:'El Éter, el costo personal para Loki y la entrega del artefacto en la escena de mitad de créditos.', tieIn:'El Éter es la Gema de la Realidad. El Coleccionista y su búsqueda enlazan con Guardianes de la Galaxia.' },
  'winter-soldier': { latamTitle:'Capitán América y el Soldado del Invierno', watchFor:'La identidad del Soldado del Invierno, el algoritmo de Zola y los dos sujetos de la escena de mitad de créditos.', tieIn:'La caída de S.H.I.E.L.D. cambia todo el UCM. Bucky, Wanda y Pietro pasan al centro de la historia.' },
  'guardians': { latamTitle:'Guardianes de la Galaxia', watchFor:'La explicación del Coleccionista sobre las Gemas, la reacción de Peter a la piedra y el origen desconocido de su padre.', tieIn:'La Gema del Poder completa otra pieza del guantelete. Nebula y Gamora se vuelven esenciales para enfrentar a Thanos.' },
  'age-ultron': { latamTitle:'Avengers: Era de Ultrón', watchFor:'Las visiones provocadas por Wanda, el nacimiento de Visión y la conversación sobre levantar el martillo.', tieIn:'Sokovia provoca los Acuerdos de Civil War. Wanda, Visión y el nuevo equipo de Vengadores definen la siguiente etapa.' },
  'ant-man': { watchFor:'El primer ingreso al Reino Cuántico, el cameo de un Vengador y la escena que anticipa Civil War.', tieIn:'La tecnología Pym y el Reino Cuántico permiten el plan de Endgame y sostienen Quantumania.' },
  'civil-war': { latamTitle:'Capitán América: Civil War', watchFor:'El método de Zemo, el video del 16 de diciembre de 1991 y los debuts de Pantera Negra y Spider-Man.', tieIn:'Los Acuerdos separan a los Vengadores antes de Thanos. La herida entre Steve y Tony no cierra hasta Endgame.' },
  'black-widow': { latamTitle:'Black Widow: Viuda Negra', watchFor:'La familia sustituta de Natasha, el control químico de Dreykov y la escena poscréditos. Esa escena sucede mucho después.', tieIn:'Yelena, Red Guardian y Taskmaster llegan a Thunderbolts*. Valentina dirige a Yelena hacia Hawkeye.' },
  'doctor-strange': { latamTitle:'Doctor Strange: Hechicero Supremo', watchFor:'Las reglas de la magia, el Ojo de Agamotto, la Dimensión Oscura y las consecuencias para Mordo.', tieIn:'La Gema del Tiempo será crucial contra Thanos. Strange se convierte en guardián de amenazas multiversales.' },
  'guardians-2': { latamTitle:'Guardianes de la Galaxia Vol. 2', watchFor:'La naturaleza de Ego, la relación entre Gamora y Nebula y todas las escenas durante los créditos.', tieIn:'Mantis entra al equipo, Nebula decide enfrentar a Thanos y aparece el capullo de Adam Warlock.' },
  'homecoming': { latamTitle:'Spider-Man: De Regreso a Casa', watchFor:'Quién compra los restos de la batalla de Nueva York, el giro familiar de Vulture y la decisión final de Peter.', tieIn:'Peter define qué clase de héroe quiere ser. Su relación con Tony hace mucho más fuerte el impacto de Infinity War y Endgame.' },
  'ragnarok': { latamTitle:'Thor: Ragnarok', watchFor:'La destrucción del martillo, la verdadera historia de Asgard y la enorme nave en la primera escena de créditos.', tieIn:'Asgard cae y sus sobrevivientes parten a la Tierra. La nave de Thanos enlaza inmediatamente con Infinity War.' },
  'black-panther': { latamTitle:'Pantera Negra', watchFor:'La política de aislamiento de Wakanda, las razones de Killmonger y la decisión de abrirse al mundo.', tieIn:'Wakanda se convierte en refugio y campo de batalla en Infinity War. Su liderazgo cambia por completo en Wakanda por Siempre.' },
  'infinity-war': { latamTitle:'Avengers: Infinity War', watchFor:'Qué Gema busca Thanos en cada tramo, la única victoria que Strange considera posible y la señal enviada al final.', tieIn:'El Blip divide la historia del UCM. La señal poscréditos convoca a Capitana Marvel y Endgame continúa semanas después.' },
  'ant-wasp': { latamTitle:'Ant-Man and The Wasp', watchFor:'La experiencia de Janet dentro del Reino Cuántico y, sobre todo, la primera escena de mitad de créditos.', tieIn:'Scott queda atrapado mientras ocurre el Blip. Su regreso cinco años después hace posible el viaje temporal de Endgame.' },
  'captain-marvel': { latamTitle:'Capitana Marvel', watchFor:'La identidad real de los skrulls, el origen del nombre “Vengadores” y cómo Fury pierde el ojo.', tieIn:'Carol responde al localizador de Fury. Los skrulls, el Teseracto y Monica Rambeau regresan en varias historias posteriores.' },
  'endgame': { latamTitle:'Avengers: Endgame', watchFor:'Las reglas específicas del viaje temporal, la fuga de Loki en 2012 y a quién entrega Steve el escudo.', tieIn:'La fuga crea la serie Loki. Sam hereda el legado del Capitán y varias líneas temporales quedan expuestas al multiverso.' },
  'wandavision': { watchFor:'Los comerciales, el cambio de formato de cada década, quién controla realmente Westview y el nombre “Bruja Escarlata”.', tieIn:'Wanda obtiene el Darkhold, Monica desarrolla poderes y Visión Blanco queda libre. Multiverso de la Locura continúa este arco.' },
  'falcon-winter': { latamTitle:'Falcon y el Soldado del Invierno', watchFor:'La lucha de Sam con el escudo, el pasado de Isaiah Bradley y quién recluta a John Walker.', tieIn:'Sam se convierte en Capitán América. Valentina incorpora a Walker al grupo que terminará siendo Thunderbolts*.' },
  'loki-1': { watchFor:'Las variantes, los Guardianes del Tiempo, el origen de la TVA y la advertencia final de Aquel que Permanece.', tieIn:'La muerte de Aquel que Permanece libera incontables líneas temporales y variantes. Es el punto de quiebre de la Saga del Multiverso.' },
  'shang-chi': { latamTitle:'Shang-Chi y la Leyenda de los Diez Anillos', watchFor:'La conexión con el falso Mandarín, el regreso de Abominación y las dos escenas durante los créditos.', tieIn:'Shang-Chi entra al círculo de Wong y los Vengadores. Los anillos emiten una señal cuyo origen aún no se explica.' },
  'what-if-1': { latamTitle:'¿Qué Pasaría Si…?', watchFor:'Cómo una sola decisión crea mundos distintos y qué personajes reconoce el Vigilante al formar su equipo.', tieIn:'Establece variantes y amenazas que existen fuera de la línea principal. Algunos conceptos y personajes pasan luego a acción real.' },
  'eternals': { latamTitle:'Eternals', watchFor:'La verdadera misión de los Eternos, el origen de los Desviantes y ambas escenas adicionales.', tieIn:'La Tierra conserva el cuerpo de un Celestial. Eros, Pip, Dane Whitman y la voz de Blade abren varias líneas futuras.' },
  'no-way-home': { latamTitle:'Spider-Man: Sin Camino a Casa', watchFor:'Qué sabe cada villano de su propio destino, las reglas del hechizo y el sacrificio final de Peter.', tieIn:'El multiverso reúne tres sagas de Spider-Man. Doctor Strange queda más expuesto a sus peligros antes de su siguiente película.' },
  'hawkeye': { watchFor:'La identidad de Ronin, el vínculo de Kate con los sucesos de 2012 y quién está detrás de la operación criminal.', tieIn:'Yelena procesa la muerte de Natasha, Kate toma el relevo de Clint y Kingpin entra formalmente al UCM.' },
  'moon-knight': { watchFor:'Los cambios entre Marc y Steven, los reflejos, la balanza del Duat y la escena después de los créditos.', tieIn:'Confirma una capa de dioses y avatares egipcios. Jake Lockley deja abierta la historia de Moon Knight.' },
  'multiverse-madness': { latamTitle:'Doctor Strange en el Multiverso de la Locura', watchFor:'La definición de “incursión”, la Tierra-838, el costo del Darkhold y las dos escenas de créditos.', tieIn:'Las incursiones ponen nombre al choque de universos. Clea recluta a Strange para reparar una y América puede viajar entre realidades.' },
  'ms-marvel': { watchFor:'El origen familiar del brazalete, la Partición de India, la palabra que Bruno usa sobre los genes de Kamala y el final.', tieIn:'Kamala queda vinculada a los mutantes y a Capitana Marvel. Su brazalete conecta directamente con The Marvels.' },
  'love-thunder': { latamTitle:'Thor: Amor y Trueno', watchFor:'La promesa de Gorr, la elección de Jane, el nuevo propósito de Thor y las dos escenas finales.', tieIn:'Thor termina cuidando a Love. Hércules recibe la misión de enfrentarlo y Valhalla queda confirmado.' },
  'she-hulk': { latamTitle:'She-Hulk: Defensora de Héroes', watchFor:'Los casos relacionados con Abominación, Wong y Daredevil, además de cómo Jennifer rompe las reglas de la propia serie.', tieIn:'Integra a Daredevil al tono cotidiano del UCM, presenta a Skaar y deja a Abominación bajo la protección de Wong.' },
  'wakanda-forever': { latamTitle:'Pantera Negra: Wakanda por Siempre', watchFor:'Las motivaciones de Namor, el ascenso de Shuri, el papel de Riri Williams y la escena de mitad de créditos.', tieIn:'Shuri hereda el manto, Talokan queda como potencia secreta y el linaje de T’Challa continúa.' },
  'quantumania': { latamTitle:'Ant-Man and The Wasp: Quantumania', watchFor:'Lo que Janet oculta sobre Kang y las dos escenas durante los créditos, especialmente la segunda.', tieIn:'Presenta el Consejo de Kangs y conecta de manera directa con Loki. Cassie queda establecida como heroína joven.' },
  'secret-invasion': { latamTitle:'Invasión Secreta', watchFor:'Qué personajes pueden ser skrulls, el pasado de Fury durante el Blip y el efecto de la paranoia presidencial.', tieIn:'La hostilidad oficial contra especies extraterrestres cambia la Tierra. G’iah termina con un conjunto extraordinario de poderes.' },
  'loki-2': { watchFor:'El deslizamiento temporal, la verdadera identidad de Ouroboros y la decisión que Loki toma en el episodio final.', tieIn:'Loki se convierte en el sostén del multiverso y transforma la TVA en una organización que vigila sus amenazas.' },
  'marvels': { latamTitle:'The Marvels', watchFor:'Por qué Carol, Monica y Kamala intercambian lugares, el origen de la anomalía y la escena de mitad de créditos.', tieIn:'Monica termina en otra realidad junto a una versión de su madre y Bestia. Kamala comienza a reclutar héroes jóvenes.' },
  'echo': { watchFor:'La relación entre Maya y Kingpin, el origen de sus habilidades y la ambición política que aparece al final.', tieIn:'Kingpin considera postularse para alcalde de Nueva York, punto de partida para Daredevil: Born Again.' },
  'deadpool-wolverine': { latamTitle:'Deadpool & Wolverine', watchFor:'La TVA, los “seres ancla”, el Vacío y las variantes de héroes provenientes de otras sagas.', tieIn:'Integra oficialmente personajes de antiguas películas de Marvel al multiverso y deja intacta la Tierra de Deadpool.' },
  'agatha': { latamTitle:'Agatha en Todas Partes', watchFor:'Las identidades en el aquelarre, las reglas del Sendero de las Brujas y quién creó realmente ese mundo.', tieIn:'Billy Maximoff regresa y emprende la búsqueda de Tommy. Agatha permanece a su lado en una nueva forma.' },
  'brave-new-world': { latamTitle:'Capitán América: Un Nuevo Mundo', watchFor:'El papel de Samuel Sterns, la presión política sobre Sam y el origen del nuevo material estratégico.', tieIn:'Sam consolida su lugar como Capitán América. La isla Celestial se convierte en fuente de adamantium y altera el equilibrio mundial.' },
  'daredevil-born-again': { latamTitle:'Daredevil: Born Again', watchFor:'La campaña de Fisk, la nueva situación de Matt y cómo la ciudad responde a los justicieros enmascarados.', tieIn:'Kingpin obtiene poder político y el conflicto callejero de Nueva York se encamina hacia una resistencia mayor.' },
  'thunderbolts': { latamTitle:'Thunderbolts*', watchFor:'Por qué Valentina reúne al equipo, la identidad y fragilidad de Bob y el significado del asterisco.', tieIn:'El grupo adopta el nombre de Nuevos Vengadores y entra en conflicto con quién tiene derecho a usar ese legado.' },
  'fantastic-four': { latamTitle:'Los 4 Fantásticos: Primeros Pasos', watchFor:'El mundo retrofuturista de la Tierra-828, el poder de Franklin y las escenas durante y después de los créditos.', tieIn:'La familia queda vinculada a Doctor Doom y al multiverso. Su universo y sus personajes conducen directamente hacia Doomsday.' },
  'x-men': { latamTitle:'X-Men', watchFor:'La relación ideológica entre Xavier y Magneto, la llegada de Logan y el temor público hacia los mutantes.', tieIn:'Establece las versiones clásicas de Xavier, Magneto, Cyclops, Jean y Mystique que sostienen toda la saga cinematográfica X-Men.' },
  'x2': { latamTitle:'X-Men 2', watchFor:'El pasado de Logan, la alianza temporal entre rivales y la imagen que aparece bajo el agua al final.', tieIn:'Profundiza la amistad rota de Xavier y Magneto y anticipa el arco de Fénix en la tercera película.' },
  'last-stand': { latamTitle:'X-Men: La Batalla Final', watchFor:'La “cura” mutante, el poder de Jean como Fénix y las escenas que cuestionan algunas muertes.', tieIn:'Cierra la trilogía original, pero Days of Future Past reescribe buena parte de estas consecuencias.' },
  'first-class': { latamTitle:'X-Men: Primera Generación', watchFor:'Cómo se conocen Charles y Erik, la lesión de Xavier y el momento exacto en que sus caminos se separan.', tieIn:'Da contexto emocional a Days of Future Past y convierte el conflicto Xavier-Magneto en una historia de amistad perdida.' },
  'days-future-past': { latamTitle:'X-Men: Días del Futuro Pasado', watchFor:'Las dos épocas, el papel de Mystique y qué cambia en la mansión cuando Logan despierta.', tieIn:'Reescribe la continuidad de las películas X-Men y permite que distintas versiones del elenco coexistan.' },
  'logan': { watchFor:'El deterioro de Logan y Xavier, la relación con Laura y el significado visual de la escena final.', tieIn:'Funciona como final de una rama futura de los X-Men. Deadpool & Wolverine respeta ese cierre mientras incorpora otra variante.' },
  'avengers-doomsday': { latamTitle:'Avengers: Doomsday', watchFor:'La guía se actualizará con una sección sin spoilers cuando exista información oficial suficiente.', tieIn:'Es el destino de esta ruta y el puente previsto hacia Avengers: Secret Wars.' }
}

export const watchlist: WatchItem[] = baseWatchlist.map(item => ({ ...item, ...extras[item.id] }))

export const sagas = [...new Set(watchlist.map(item => item.saga))]
