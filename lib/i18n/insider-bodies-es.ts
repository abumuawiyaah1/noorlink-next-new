/**
 * Insider long-form body overlays — Spanish (Latin America).
 * Voice: calm, practical travel-advisor. Install phrasing: «antes de viajar».
 * Keys are issue slugs (see lib/insider-issues*.ts, lib/insider-specials.ts).
 */

import { RAMADAN_GIVING } from "@/lib/giving";
import type { InsiderBodyCatalog } from "@/lib/i18n/insider-bodies";

const RAMADAN_DISCOUNT = RAMADAN_GIVING.customerDiscountPercent;
const RAMADAN_PROFIT = RAMADAN_GIVING.profitSharePercent;

export const INSIDER_BODIES_ES: InsiderBodyCatalog = {
  /* ─────────────── Year 1 ─────────────── */

  "2026-09-fall-turkey": {
    destinationBody: [
      "Turquía premia a quien aterriza listo. Los mapas, las apps de transporte y la mensajería funcionan mejor cuando tu plan de datos ya está instalado.",
    ],
    tips: [
      "Estambul son dos aeropuertos y mucho caminar: los mapas sin conexión ayudan, pero la navegación en vivo es más fluida con datos locales.",
      "Los viajes entre ciudades (Estambul → Capadocia / Antalya) son comunes; ten el hotspot disponible para tablets y acompañantes de viaje.",
      "Instala tu eSIM antes de viajar y activa el roaming de datos de la línea eSIM al aterrizar.",
    ],
    connectivityBody:
      "Compra e instala antes de viajar. En la puerta de embarque o con el Wi‑Fi del hotel, vas improvisando. En casa puedes probar la instalación, conservar tu número principal para llamadas/SMS si lo necesitas y pasar los datos a NoorLink al llegar. Verificación rápida: ¿tu teléfono es compatible con eSIM? Usa el verificador de dispositivos en noorlink.co antes de pagar.",
    hajjBody:
      "Si harás la Umrah este otoño o invierno, empieza ahora una lista sencilla: confirma la compatibilidad de tu teléfono, elige un plan de peregrinación con hotspot, instala antes de viajar y guarda sin conexión los contactos del hotel y del grupo de WhatsApp como respaldo. Los meses de mayor afluencia se llenan: prepararte con tiempo vale más que buscar una SIM en el aeropuerto.",
    dealBody:
      "Oferta Insider de este mes: 10% de descuento con el código INSIDER-SEP26 al pagar (termina el 30 de septiembre de 2026). Fíjate en los precios iniciales de Turquía y Medio Oriente; y si Europa también está en tu lista, un plan regional puede cubrir varios países.",
    closing:
      "Novedades de viaje, no ruido en tu bandeja. Nos vemos el próximo mes.",
  },

  "2026-10-france-uk": {
    destinationBody: [
      "Los fines de semana en la ciudad pasan rápido: trenes, viajes compartidos, entradas a museos y reservas de última hora para cenar necesitan datos que simplemente funcionen.",
    ],
    tips: [
      "Si pasarás por más de un país, prefiere un plan regional de Europa en lugar de SIMs de un solo país.",
      "Descarga mapas sin conexión de las estaciones de metro antes de bajar al subsuelo.",
      "El hotspot cubre la tablet de tu acompañante sin necesidad de un segundo plan.",
    ],
    connectivityBody:
      "Cruzar fronteras es donde los planes de un solo país más frustran. Con una eSIM regional de Europa instalas una vez y sigues usando mensajes, mapas y boletos mientras te desplazas.",
    hajjBody:
      "Las Umrah cortas se benefician del mismo hábito que las escapadas urbanas: instalar antes de viajar, hotspot para la familia y tener guardado el WhatsApp de soporte. La conectividad debe ser un fondo silencioso, no un proyecto en Meca.",
    dealBody:
      "Oferta Insider: 10% de descuento con INSIDER-OCT26 hasta el 31 de octubre de 2026. Buen momento para el plan regional de Europa si tienes escapadas de otoño en el calendario.",
    closing: "Viajes cortos. Señal clara. Nos vemos el próximo mes.",
  },

  "2026-11-winter-sun": {
    destinationBody: [
      "Las ciudades del Golfo funcionan con apps: transporte, pagos, reservas y navegación. Llegar sin datos convierte una llegada fluida en un apuro.",
    ],
    tips: [
      "Instala antes de viajar: el Wi‑Fi del aeropuerto no es confiable para configurar una eSIM.",
      "Ten el hotspot listo para un segundo dispositivo en el hotel.",
      "Guarda sin conexión la dirección del hotel y los códigos de reserva como respaldo.",
    ],
    connectivityBody:
      "Los destinos cálidos agotan los teléfonos al aire libre. Usa el hotspot en ratos cortos, lleva una batería externa (power bank) y deja descargados los mapas para el primer traslado del aeropuerto al hotel.",
    hajjBody:
      "Las temporadas de Umrah previas al invierno se llenan. Confirma la compatibilidad con tiempo, elige un plan de peregrinación con hotspot e instala días antes de viajar, no en la puerta de embarque.",
    dealBody:
      "Oferta Insider: INSIDER-NOV26 con 10% de descuento hasta el 30 de noviembre de 2026. Útil para los corredores de Emiratos y de sol de invierno mientras los boletos aún son flexibles.",
    closing: "Destinos cálidos. Conectividad tranquila.",
  },

  "2026-12-japan-holiday": {
    destinationBody: [
      "Las tarjetas IC, los transbordos de tren y las filas en los restaurantes avanzan más rápido cuando tu teléfono no anda buscando Wi‑Fi.",
    ],
    tips: [
      "Instala tu eSIM antes del vuelo de larga distancia.",
      "Los mapas sin conexión de las estaciones ayudan bajo tierra; los datos en vivo, en la superficie.",
      "El hotspot cubre a tu pareja o acompañante sin comprar un segundo plan.",
    ],
    connectivityBody:
      "Las semanas de fiestas son cuando la gente deja sin querer el roaming de su línea de casa activado. Instala NoorLink, pasa los datos a la línea de viaje al aterrizar y conserva tu número principal para SMS si tu banco lo necesita.",
    hajjBody:
      "Si Meca es después de las fiestas, aprovecha la bandeja más tranquila de diciembre para cerrar lo básico: verificación de compatibilidad, plan con hotspot y un ensayo de instalación en casa.",
    dealBody:
      "Oferta Insider: INSIDER-DEC26 — 10% de descuento hasta el 31 de diciembre de 2026. Un buen regalo de fin de año para tu yo del futuro: datos listos antes de viajar.",
    closing: "Viajes de fin de año, menos sorpresas.",
  },

  "2027-01-north-america": {
    destinationBody: [
      "Los viajes compartidos, los mapas y el chat de trabajo dominan estos viajes. Del aeropuerto al hotel es donde suelen empezar las facturas de roaming, a menos que tu eSIM de viaje ya esté activa.",
    ],
    connectivityBody:
      "Si estarás en llamadas o en Slack, no dependas solo del Wi‑Fi del lobby del hotel. Una eSIM de viaje con hotspot mantiene tu laptop en línea cuando falla la red de la habitación.",
    hajjBody:
      "Las reservas de Umrah después de las fiestas se reactivan. La misma lista: teléfono compatible, plan con hotspot e instalar antes de viajar.",
    dealBody:
      "Oferta Insider: INSIDER-JAN27 con 10% de descuento hasta el 31 de enero de 2027.",
    closing: "Año nuevo. La misma conectividad tranquila.",
  },

  "2027-02-umrah-prep": {
    destinationBody: [
      "Tus prioridades son la adoración (ibadah) y la logística. Elige un plan de peregrinación con hotspot, instala antes de viajar y mantén simple la coordinación del grupo.",
    ],
    tips: [
      "Confirma la compatibilidad de tu eSIM con semanas de anticipación.",
      "Instala en casa con buen Wi‑Fi.",
      "Comparte el hotspot con los dispositivos de la familia cuando haga falta.",
      "Haz capturas de pantalla de los contactos del hotel y de la agencia.",
    ],
    connectivityBody:
      "Un plan sólido con hotspot suele ser mejor que cuatro SIMs separadas. Acuerden quién lleva el hotspot, roten el turno de la batería y deja las apps de mensajería con la sesión iniciada antes de perder el Wi‑Fi del hotel.",
    hajjBody:
      "No vamos a fingir que todas las redes son perfectas en todas partes. Lo que sí prometemos: planes de peregrinación claros, hotspot incluido en las opciones de NoorLink y soporte cuando la instalación se complique.",
    dealBody:
      "Oferta Insider: INSIDER-FEB27 — 10% de descuento hasta el 28 de febrero de 2027. Usa Hajj & Umrah Connect para el camino dedicado.",
    closing: "Que tu viaje sea fácil. La conectividad, resuelta.",
  },

  "2027-03-europe-spring": {
    destinationBody: [
      "Los trenes, los cafés y los boletos de último minuto suponen que tu teléfono funciona. El plan regional de Europa está pensado justo para ese patrón.",
    ],
    connectivityBody:
      "Si tu itinerario incluye más de un país, evita acumular SIMs de un solo país. Instala el plan regional de Europa antes de viajar y activa los datos al aterrizar.",
    hajjBody:
      "Si todavía tienes la Umrah por delante esta primavera, termina ya el ensayo de instalación. No dejes la configuración de la eSIM para el aeropuerto.",
    dealBody:
      "Oferta Insider: INSIDER-MAR27 con 10% de descuento hasta el 31 de marzo de 2027.",
    closing: "Luz de primavera. Señal clara.",
  },

  "2027-04-asia-shoulder": {
    destinationBody: [
      "Las apps de transporte, los traductores y los traslados entre islas dependen de los datos. Instala antes de viajar; no esperes al Wi‑Fi del hotel en una zona horaria nueva.",
    ],
    connectivityBody:
      "El Wi‑Fi de los resorts suele ser lento. El hotspot de tu eSIM de viaje mantiene usables los mapas y la mensajería cuando la red del lobby se atasca.",
    hajjBody:
      "Muchas familias hacen un viaje de descanso después de la Umrah. La misma regla: compra e instala antes de viajar para que el primer día transcurra en paz.",
    dealBody:
      "Oferta Insider: INSIDER-APR27 — 10% de descuento hasta el 30 de abril de 2027. Fíjate en los precios iniciales de Asia mientras dure la temporada intermedia.",
    closing: "Temporada intermedia. Aterrizajes tranquilos.",
  },

  "2027-05-summer-planning": {
    destinationBody: [
      "Los días de tren y los de museo consumen datos. El plan regional de Europa cubre el recorrido sin cambiar de SIM en cada parada.",
    ],
    connectivityBody:
      "Acuerden un dispositivo anfitrión, lleven una batería externa compartida y descarguen el entretenimiento de los niños con Wi‑Fi antes de los tramos largos en tren.",
    hajjBody:
      "Ya sea un viaje de ocio en verano o una peregrinación posterior, los viajes en familia salen bien cuando la conectividad se decide con tiempo, no se negocia en la fila del aeropuerto.",
    dealBody:
      "Oferta Insider: INSIDER-MAY27 con 10% de descuento hasta el 31 de mayo de 2027. Asegura la conectividad de tu verano en Europa mientras los planes aún son flexibles.",
    closing: "Planea ahora. Viaja tranquilo después.",
  },

  "2027-06-peak-summer": {
    destinationBody: [
      "Días largos, mucha caminata, muchas fotos. La conectividad importa para los traslados entre la playa y el pueblo, las filas en los restaurantes y los reencuentros del grupo.",
    ],
    connectivityBody:
      "Una persona lleva el hotspot; roten el turno de la batería. Descarga mapas sin conexión para los laberintos de los cascos antiguos. Deja las apps de mensajería con la sesión iniciada antes de quedarte sin Wi‑Fi.",
    hajjBody:
      "La temporada de Hajj se empieza a tener en cuenta antes de lo que la gente cree. Si podrías viajar en este ciclo, guarda Hajj & Umrah Connect en favoritos y confirma ya que tu teléfono es compatible con eSIM.",
    dealBody:
      "Oferta Insider: INSIDER-JUN27 — 10% de descuento hasta el 30 de junio de 2027. Compra cuando los vuelos estén firmes; instala unos días antes de la salida.",
    closing: "Más sol. Menos sorpresas de roaming.",
  },

  "2027-07-americas": {
    destinationBody: [
      "Las ciudades y los pueblos costeros dependen de los viajes compartidos, los mapas y la mensajería. En viajes por varios países de América, revisa la cobertura regional en lugar de suponer que el plan de un país cubre todo.",
    ],
    connectivityBody:
      "Los días de calor agotan los teléfonos. Baja el brillo al aire libre, usa el hotspot en ratos cortos y lleva una batería externa para los días de muchos mapas.",
    hajjBody:
      "Incluso en la temporada de ocio del verano, la planificación de la peregrinación sigue su curso para muchas familias. Deja hecha tu verificación de compatibilidad para que nada te bloquee más adelante.",
    dealBody:
      "Oferta Insider: INSIDER-JUL27 con 10% de descuento hasta el 31 de julio de 2027.",
    closing: "Días largos. Señal clara.",
  },

  "2027-08-hajj-season": {
    destinationBody: [
      "Si el Hajj está cerca: primero la adoración y la logística. Elige un plan de peregrinación con hotspot, instala antes de viajar y mantén simple la coordinación del grupo. Si aún estás en un viaje de ocio: instala con tiempo, activa la línea de viaje al aterrizar y usa el hotspot cuando otro dispositivo necesite ayuda.",
    ],
    connectivityBody:
      "La noche antes de viajar: confirma que la eSIM aparezca como instalada, haz una captura de los detalles del plan, carga tu batería externa y descarga mapas sin conexión de las zonas del primer día.",
    hajjBody:
      "La demanda y las condiciones del Hajj cambian. No vamos a fingir que todas las redes son perfectas en todas partes. Planes claros, hotspot en las opciones de peregrinación y soporte cuando la instalación se complique: esa es la promesa.",
    dealBody:
      "Oferta Insider: INSIDER-AUG27 — 10% de descuento hasta el 31 de agosto de 2027. A finales del verano también se reserva la Umrah de otoño: compra la conectividad cuando compres los vuelos.",
    closing:
      "Eso es un año completo de notas Insider. Consejos de viaje, tiempos reales, ofertas ocasionales, sin ruido.",
  },

  /* ─────────────── Year 2 ─────────────── */

  "2027-09-morocco-maghreb": {
    destinationBody: [
      "La navegación por las medinas y los viajes entre ciudades funcionan mejor con datos locales ya instalados. Ten el hotspot disponible si un acompañante comparte tu plan.",
    ],
    tips: [
      "Instala en casa; activa la línea de datos de la eSIM al aterrizar.",
      "Los mapas sin conexión ayudan dentro de las medinas densas; los datos en vivo, entre ciudades.",
      "Si la Umrah es más adelante este año, haz ya la verificación del dispositivo, no la semana en que viajes.",
    ],
    connectivityBody:
      "En Ajustes, cambia el nombre de la eSIM para que nunca actives la línea equivocada. Un hábito pequeño, menos errores en el aeropuerto.",
    hajjBody:
      "El otoño es cuando muchas familias bosquejan las fechas de la Umrah de invierno. Primero la compatibilidad, luego el plan, e instala antes de la salida.",
    dealBody:
      "Oferta Insider: INSIDER-SEP27 con 10% de descuento hasta el 30 de septiembre de 2027.",
    closing:
      "Novedades de viaje, no ruido en tu bandeja. Nos vemos el próximo mes.",
  },

  "2027-10-balkans": {
    destinationBody: [
      "Los fines de semana que cruzan fronteras son comunes. Un plan regional de Europa suele ser mejor que comprar una SIM nueva en cada ciudad.",
    ],
    tips: [
      "Instala antes de viajar; activa los datos al aterrizar.",
      "El hotspot ayuda a una tablet con boletos y pases de abordar.",
      "Haz capturas de las direcciones de los hoteles para usarlas sin conexión.",
    ],
    connectivityBody:
      "Si tu viaje abarca dos o tres países, empieza con cobertura regional. Elimina la pregunta de «¿qué SIM uso hoy?».",
    hajjBody:
      "Los viajes cortos de ocio enseñan el mismo hábito que necesita la peregrinación: instalar temprano, mantener el teléfono simple y reservar batería para lo que importa.",
    dealBody:
      "Oferta Insider: INSIDER-OCT27 con 10% de descuento hasta el 31 de octubre de 2027.",
    closing: "Viajes cortos. Señal clara.",
  },

  "2027-11-egypt-nile": {
    destinationBody: [
      "Los días de ciudad y los de sitios arqueológicos se benefician de mapas y mensajería que ya funcionan. Instala antes de la salida; activa al llegar.",
    ],
    tips: [
      "Las baterías externas importan en los días largos de visita a los sitios.",
      "Un hotspot para un segundo dispositivo es mejor que comprar algo a último minuto.",
      "Si la Umrah viene poco después, guarda tu lista de peregrinación en la misma app de notas.",
    ],
    connectivityBody:
      "Compatibilidad → comprar → instalar → aterrizar → activar. La misma secuencia sirve para un viaje de ocio a Egipto y para Meca más adelante.",
    hajjBody:
      "El tráfico de Umrah de invierno aumenta a lo largo del final del otoño. Confirma ya la compatibilidad de tu teléfono si las fechas están firmes.",
    dealBody:
      "Oferta Insider: INSIDER-NOV27 con 10% de descuento hasta el 30 de noviembre de 2027.",
    closing: "Rutas cálidas. Hábitos tranquilos.",
  },

  "2027-12-southeast-asia": {
    destinationBody: [
      "Tanto los saltos entre islas como las paradas en ciudades castigan a quien espera el Wi‑Fi del aeropuerto. Aterriza con un plan que ya esté en el teléfono.",
    ],
    tips: [
      "Instala antes de la temporada alta de fiestas, no en la sala de embarque.",
      "Ponle un nombre claro a la línea eSIM.",
      "Guarda una lista breve sin conexión: hotel, traslado y contacto de emergencia.",
    ],
    connectivityBody:
      "Los días largos de fotos agotan los teléfonos. Baja el brillo al aire libre y usa el hotspot en ratos cortos.",
    hajjBody:
      "Incluso en el mes de las fiestas: compatibilidad, plan de peregrinación con hotspot e instalar antes de viajar. Sin ruido; solo estar listo.",
    dealBody:
      "Oferta Insider: INSIDER-DEC27 con 10% de descuento hasta el 31 de diciembre de 2027.",
    closing: "Calma de fin de año. Señal clara.",
  },

  "2028-01-gulf-leisure": {
    destinationBody: [
      "Las apps de transporte, la logística del hotel y los chats grupales funcionan mejor cuando los datos locales ya están instalados.",
    ],
    tips: [
      "Instala antes de la salida; activa al aterrizar.",
      "Hotspot para las tablets en viajes familiares.",
      "Si la Umrah es lo siguiente, ten a mano los planes de Arabia Saudita.",
    ],
    connectivityBody:
      "Conserva tu número principal para SMS/llamadas si hace falta; usa NoorLink para los datos en el extranjero. Cambia de línea de forma consciente.",
    hajjBody:
      "Las reservas de Umrah después de las fiestas se reactivan. Trata la conectividad como un pase de abordar: resuelta con tiempo.",
    dealBody:
      "Oferta Insider: INSIDER-JAN28 con 10% de descuento hasta el 31 de enero de 2028.",
    closing: "Año nuevo. Hábitos constantes.",
  },

  "2028-02-umrah-window": {
    destinationBody: [
      "No vas a buscar tiendas de SIM. Elige un plan de peregrinación con hotspot, instala antes de viajar y mantén simple la coordinación del grupo.",
    ],
    tips: [
      "Confirma la compatibilidad de tu eSIM.",
      "Instala con el Wi‑Fi de casa.",
      "Activa el roaming de datos de la eSIM al llegar.",
      "Ten el hotspot listo para compartir con la familia.",
    ],
    connectivityBody:
      "Ponle nombre a la línea, haz una captura de los detalles del plan, carga una batería externa y descarga mapas sin conexión de las zonas del primer día.",
    hajjBody:
      "Si tu Umrah es en las próximas 4–8 semanas, trata la conectividad como un pase de abordar. Visita Hajj & Umrah Connect para ver planes enfocados en la peregrinación.",
    dealBody:
      "Oferta Insider: INSIDER-FEB28 con 10% de descuento hasta el 29 de febrero de 2028.",
    closing: "Que tu viaje sea tranquilo y tu conexión, estable.",
  },

  "2028-03-uk-spring": {
    destinationBody: [
      "Las apps de transporte y la navegación a pie funcionan mejor con un plan instalado antes de aterrizar.",
    ],
    tips: [
      "Instala antes de viajar.",
      "Usa el hotspot para el dispositivo de tu acompañante cuando haga falta.",
      "Haz capturas de las confirmaciones de reserva.",
    ],
    connectivityBody:
      "Haz la parte confusa en casa. En la puerta de embarque solo deberías activar una línea en la que ya confías.",
    hajjBody:
      "Si la Umrah de primavera está cerca, termina la instalación ya. Las semanas de mayor afluencia son para la adoración, no para resolver problemas técnicos.",
    dealBody:
      "Oferta Insider: INSIDER-MAR28 con 10% de descuento hasta el 31 de marzo de 2028.",
    closing: "Luz de primavera. Señal clara.",
  },

  "2028-04-turkey-spring": {
    destinationBody: [
      "Los días caminando por Estambul y los vuelos internos se benefician de datos locales y de un hotspot para un segundo dispositivo.",
    ],
    tips: [
      "Instala antes de la salida.",
      "Los mapas sin conexión ayudan; la navegación en vivo es más fluida con datos.",
      "Los viajes de descanso después de la Umrah combinan bien con hábitos de conectividad tranquilos.",
    ],
    connectivityBody:
      "Un plan, una instalación y luego activas al aterrizar en cada tramo. Evita comprar SIMs a mitad del viaje.",
    hajjBody:
      "Si acabas de volver de la Umrah, mantén el mismo hábito de instalar antes de viajar en tus viajes de ocio: se acumula con el tiempo.",
    dealBody:
      "Oferta Insider: INSIDER-APR28 con 10% de descuento hasta el 30 de abril de 2028.",
    closing: "Temporada intermedia. Hábitos constantes.",
  },

  "2028-05-iberia": {
    destinationBody: [
      "Los trenes, las plazas y las excursiones de un día salen mejor cuando los mapas y los boletos ya funcionan con y sin conexión.",
    ],
    tips: [
      "Elige el plan regional de Europa si cruzas fronteras.",
      "Hotspot para las tablets de la familia.",
      "Instala antes de viajar.",
    ],
    connectivityBody:
      "Acuerden quién lleva el teléfono con el hotspot. Un plan claro vale más que tres SIMs confusas.",
    hajjBody:
      "El ocio de verano y la peregrinación posterior necesitan la misma base: un teléfono compatible, instalación temprana y un plan del tamaño justo.",
    dealBody:
      "Oferta Insider: INSIDER-MAY28 con 10% de descuento hasta el 31 de mayo de 2028.",
    closing: "Final de primavera. Mapas claros.",
  },

  "2028-06-alps-north": {
    destinationBody: [
      "La navegación en los valles y en las ciudades se beneficia de datos que funcionan al llegar, no después de buscar una SIM.",
    ],
    tips: [
      "Instala antes de la salida.",
      "Hotspot para coordinar al grupo.",
      "Baterías externas para los días largos al aire libre.",
    ],
    connectivityBody:
      "Un solo teléfono con el hotspot compartido, nombres claros y una batería cargada valen más que cuatro planes a medias.",
    hajjBody:
      "El momento del Hajj sigue en muchos calendarios familiares a mediados del verano. Si vas a ir, empieza pronto con la verificación de compatibilidad.",
    dealBody:
      "Oferta Insider: INSIDER-JUN28 con 10% de descuento hasta el 30 de junio de 2028.",
    closing: "Pleno verano. Señal estable.",
  },

  "2028-07-caribbean": {
    destinationBody: [
      "Los traslados, los mapas y los chats familiares funcionan mejor cuando los datos locales están listos antes de salir de la sala del aeropuerto.",
    ],
    tips: [
      "Instala con tiempo; activa al aterrizar.",
      "El calor agota las baterías: las baterías externas importan.",
      "Dimensiona los datos para los días de hotspot, no solo para navegar a solas.",
    ],
    connectivityBody:
      "Baja el brillo al aire libre, usa el hotspot en ratos cortos y lleva una batería externa para los días de muchos mapas.",
    hajjBody:
      "La temporada de ocio todavía coincide con la planificación de la peregrinación de muchos hogares. Deja hecha la compatibilidad para que nada te bloquee más adelante.",
    dealBody:
      "Oferta Insider: INSIDER-JUL28 con 10% de descuento hasta el 31 de julio de 2028.",
    closing: "Días largos. Señal clara.",
  },

  "2028-08-pilgrimage-prep": {
    destinationBody: [
      "Si la peregrinación está cerca: primero la adoración y la logística. Elige un plan con hotspot, instala antes de viajar y mantén simple la coordinación del grupo.",
    ],
    tips: [
      "Ritual de la noche anterior: confirma la instalación, haz capturas de los detalles y carga la batería externa.",
      "Descarga mapas sin conexión de las zonas del primer día.",
      "Compra la conectividad cuando compres los vuelos.",
    ],
    connectivityBody:
      "Confirma que la eSIM esté instalada, que los detalles del plan estén guardados y que los dispositivos estén cargados. Adivinar en la puerta de embarque es estrés opcional.",
    hajjBody:
      "La demanda y las condiciones cambian. Planes claros, hotspot en las opciones de peregrinación y soporte cuando la instalación se complique: esa es la promesa.",
    dealBody:
      "Oferta Insider: INSIDER-AUG28 con 10% de descuento hasta el 31 de agosto de 2028.",
    closing:
      "Eso son dos años de notas Insider. Consejos de viaje, tiempos reales, ofertas ocasionales, sin ruido.",
  },

  /* ─────────────── Special editions ─────────────── */

  "2027-01-ramadan-special": {
    destinationBody: [
      "Si viajas a Meca o a Medina esta temporada, trata la conectividad como preparar tu ihram: decidida con tiempo, no improvisada en el aeropuerto. Los mapas, los mensajes del grupo y la coordinación del hotel importan, pero deben quedar en segundo plano de tu adoración.",
      "Elige un plan de peregrinación con hotspot si varios familiares comparten una línea. Instala en casa con Wi‑Fi. Al llegar, activa la línea de datos de la eSIM de viaje y mantén tu atención donde corresponde.",
    ],
    tips: [
      "Confirma la compatibilidad de la eSIM antes de comprar los vuelos.",
      "Instala NoorLink antes de viajar; ponle un nombre claro a la línea en Ajustes.",
      "Descarga apps del Corán y mapas sin conexión como respaldo: los datos en vivo son para coordinar, no para depender de ellos.",
      "El hotspot ayuda a un dispositivo de tu acompañante sin comprar un segundo plan por impulso.",
    ],
    connectivityBody:
      "Las noches pico de Ramadán son concurridas. Un plan que ya funciona vale más que buscar Wi‑Fi afuera del Haram. Instala antes de viajar, activa el roaming de datos de la eSIM al aterrizar y usa el brillo y el hotspot con intención para que la batería aguante las noches largas.",
    dealBody: `INSIDER-RAMADAN27 · ${RAMADAN_DISCOUNT}% de descuento hasta el 28 de febrero de 2027. También nos comprometemos a donar el ${RAMADAN_PROFIT}% de nuestra ganancia de las compras elegibles a la caridad.`,
    closing:
      "Que Allah acepte tu ayuno, tu Umrah, tus du‘ā’ y tu viaje. Mantente sincero, y mantente conectado solo lo necesario.",
    dealGiving: {
      body: `En Ramadán el Profeta ﷺ era más generoso que en otros meses. Con este código recibes ${RAMADAN_DISCOUNT}% de descuento, y NoorLink se compromete a donar el ${RAMADAN_PROFIT}% de nuestra ganancia de las compras elegibles a la caridad.`,
      ctaLabel: "Nuestro compromiso de Ramadán",
    },
    emailBrief: {
      highlight:
        "Cuando llegue Ramadán, ve a hacer la Umrah, porque la Umrah en Ramadán equivale al Hajj.",
      highlightReference: "Bujari 1782 · Muslim 1256",
      note: "Un breve recordatorio, algunas du‘ā’ para Meca y Medina, y hábitos de conectividad tranquila; la versión completa está en el sitio.",
    },
    islamicReminders: {
      quran: [
        {
          reference: "Corán 2:185",
          text: "El mes de Ramadán es aquel en el que fue revelado el Corán, como guía para la humanidad y como pruebas claras de la guía y el criterio…",
        },
        {
          reference: "Corán 2:186",
          text: "Y cuando Mis siervos te pregunten por Mí, ciertamente estoy cerca. Respondo a la súplica de quien Me invoca cuando Me invoca…",
        },
      ],
      hadith: [
        {
          reference: "Bujari 1782 · Muslim 1256 — Ibn ‘Abbās",
          text: "Cuando una mujer de los Ansar no pudo unirse al Hajj, el Profeta ﷺ dijo: «Cuando llegue Ramadán, ve a hacer la Umrah, porque la Umrah en Ramadán equivale al Hajj».",
        },
        {
          reference: "Bujari y Muslim — sobre la generosidad en Ramadán",
          text: "El Mensajero de Allah ﷺ era el más generoso de las personas, y lo era aún más en Ramadán que en otros meses.",
        },
        {
          reference: "Bujari y Muslim — sobre la intención",
          text: "Las acciones valen según las intenciones, y cada persona obtendrá solo lo que se haya propuesto.",
        },
        {
          reference: "Tirmidhi — sobre la du‘ā’ de viaje",
          text: "Cuando el Profeta ﷺ viajaba, decía: «Oh Allah, te pedimos rectitud y temor de Ti en este viaje…».",
        },
      ],
      duas: [
        {
          occasion: "Al romper el ayuno",
          text: "Se fue la sed, se humedecieron las venas y el premio está confirmado, si Allah quiere.",
          reference: "Abu Dawud",
        },
        {
          occasion:
            "Durante el ṭawāf (entre la Esquina Yemení y la Piedra Negra)",
          text: "Señor nuestro, danos el bien en esta vida y el bien en la Otra, y protégenos del castigo del Fuego.",
          reference: "Corán 2:201 · se practica en el ṭawāf",
        },
        {
          occasion: "Al entrar en la Mezquita Sagrada (Meca o Medina)",
          text: "Oh Allah, ábreme las puertas de Tu misericordia.",
          reference: "Muslim — al entrar en una mezquita",
        },
        {
          occasion: "Enviar el salām al Profeta ﷺ en Medina",
          text: "La paz sea contigo, oh Mensajero de Allah.",
          reference: "Etiqueta de la visita a la Mezquita del Profeta",
        },
      ],
    },
  },

  "2027-04-hajj-special": {
    destinationBody: [
      "Los días del Hajj exigen mucho, física y espiritualmente. La cobertura y las multitudes varían según la zona y la hora. No prometeremos perfección en todas partes; sí prometemos planes claros, hotspot en las opciones de peregrinación y soporte cuando la instalación te confunda.",
      "Instala antes de viajar. Ten disponibles sin conexión los contactos del hotel, del guía del grupo y de emergencia. Usa el hotspot para una tablet compartida o para el teléfono de un familiar cuando haga falta.",
    ],
    tips: [
      "Haz la verificación del dispositivo en casa, no en Mina.",
      "Haz capturas de los detalles del plan y de la confirmación del QR/instalación antes de que se acabe el Wi‑Fi de viaje.",
      "Lleva una batería externa; los días de mapas y mensajería agotan las baterías rápido.",
      "Acuerden un plan sencillo de contacto del grupo para que la conectividad sirva a la seguridad, no al scroll.",
    ],
    connectivityBody:
      "La noche antes de salir: confirma que la eSIM esté instalada, carga los dispositivos y las baterías externas, descarga mapas sin conexión de las zonas clave y activa la línea de viaje solo cuando necesites datos locales. Mantén tu número principal disponible para llamadas/SMS si tu operador lo permite.",
    dealBody:
      "Oferta Insider para peregrinos: INSIDER-HAJJ27 con 10% de descuento hasta el 31 de mayo de 2027 en Hajj & Umrah Connect y planes relacionados de Arabia Saudita.",
    closing:
      "Que Allah te conceda un Hajj aceptado, un viaje seguro y un corazón tranquilo. Nosotros estamos para la señal; tú estás ahí para algo mucho más grande.",
    emailBrief: {
      highlight:
        "Quien realiza el Hajj por Allah y no comete obscenidad ni transgresión regresará libre de pecados, como el día en que su madre lo dio a luz.",
      highlightReference: "Bujari y Muslim",
      note: "Una pausa respetuosa antes de la temporada: Corán, Sunnah y orientación tranquila para instalar antes de viajar. Recordatorio completo en el sitio.",
    },
    islamicReminders: {
      quran: [
        {
          reference: "Corán 22:27",
          text: "Y proclama a la gente el Hajj: vendrán a ti a pie y sobre toda montura flaca, llegando por todo camino lejano.",
        },
        {
          reference: "Corán 2:197",
          text: "El Hajj tiene lugar en meses conocidos; quien se imponga el Hajj en ellos, que sepa que no hay relaciones íntimas, ni desobediencia, ni disputa durante el Hajj…",
        },
      ],
      hadith: [
        {
          reference: "Bujari y Muslim — sobre un Hajj aceptado",
          text: "Quien realiza el Hajj por Allah y no comete obscenidad ni transgresión regresará libre de pecados, como el día en que su madre lo dio a luz.",
        },
        {
          reference: "Muslim — sobre la facilidad y la amabilidad",
          text: "Faciliten las cosas y no las dificulten; den buenas noticias y no alejen a la gente.",
        },
      ],
      duas: [
        {
          occasion: "Talbiyah (Ihrām)",
          text: "Heme aquí, oh Allah, heme aquí. Heme aquí, Tú no tienes asociado, heme aquí. Ciertamente la alabanza, el favor y la soberanía son Tuyos. Tú no tienes asociado.",
          reference: "Bujari y Muslim",
        },
        {
          occasion:
            "Durante el ṭawāf (entre la Esquina Yemení y la Piedra Negra)",
          text: "Señor nuestro, danos el bien en esta vida y el bien en la Otra, y protégenos del castigo del Fuego.",
          reference: "Corán 2:201 · se practica en el ṭawāf",
        },
        {
          occasion: "En el día de ‘Arafah",
          text: "No hay más dios que Allah, único, sin asociado. Suyo es el dominio y Suya la alabanza, y Él tiene poder sobre todas las cosas.",
          reference: "Tirmidhi — la mejor du‘ā’ en ‘Arafah",
        },
        {
          occasion: "Enviar el salām al Profeta ﷺ en Medina",
          text: "La paz sea contigo, oh Mensajero de Allah.",
          reference: "Etiqueta de la visita a la Mezquita del Profeta",
        },
      ],
    },
  },
};
