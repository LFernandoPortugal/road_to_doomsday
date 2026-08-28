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
  watchUrl?: string
}

const film = (id: string, title: string, year: number, minutes: number, priority: Priority, saga: string, note: string): WatchItem => ({ id, title, year, minutes, priority, saga, note, kind: 'pelicula' })
const show = (id: string, title: string, year: number, minutes: number, priority: Priority, saga: string, note: string): WatchItem => ({ id, title, year, minutes, priority, saga, note, kind: 'serie' })

// Añade `watchUrl` únicamente si tienes derechos de distribución o enlazas una plataforma oficial.
export const watchlist: WatchItem[] = [
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

export const sagas = [...new Set(watchlist.map(item => item.saga))]
