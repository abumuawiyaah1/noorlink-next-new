import type { PseoDestination } from "@/lib/pseo/types";

/**
 * Versioned pSEO catalog. Mirrors Supabase `pseo_destinations`.
 * Only `isIndexed: true` rows are sitemapped / statically generated for crawl.
 */
export const PSEO_DESTINATIONS: PseoDestination[] = [
  // ——— Wave A (index first) ———
  {
    slug: "turkey",
    plansPath: "/plans/turkey",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Turkcell",
    secondaryCarrier: "Vodafone TR",
    apnName: "internet",
    apnNotes: "Most travel eSIMs auto-configure APN. If data stalls, set APN to internet and enable data roaming on the eSIM line only.",
    supportedFrequencies: "5G / 4G LTE (bands vary by city; Istanbul & Antalya usually strongest)",
    popularCities: ["Istanbul", "Ankara", "Antalya", "Izmir", "Cappadocia"],
    locales: {
      en: {
        countryName: "Turkey",
        intro:
          "Turkey is one of the highest-demand travel eSIM routes from Europe and the Gulf. A local-profile eSIM avoids expensive roaming while you move between Istanbul’s metro, Aegean coasts, and Cappadocia day trips.",
        roamingTip:
          "Turn off your home SIM’s data; keep it for WhatsApp calls if needed. Enable data roaming only on the NoorLink eSIM. Metro Wi‑Fi is common in Istanbul, but ferries and intercity buses are where prepaid data pays off.",
      },
      ar: {
        countryName: "تركيا",
        intro:
          "تركيا من أكثر وجهات شرائح eSIM طلباً للمسافرين من الخليج وأوروبا. شريحة سفر محلية تجنّبك تجوال الشبكة المكلف بين إسطنبول والساحل وكابدوكيا.",
        roamingTip:
          "عطّل بيانات شريحتك الأساسية وفعّل تجوال البيانات على شريحة NoorLink فقط. شبكات المترو في إسطنبول جيدة، لكن الحافلات والعبارات تحتاج بيانات موثوقة.",
      },
      es: {
        countryName: "Turquía",
        intro:
          "Turquía es una de las rutas eSIM con más demanda desde Europa y el Golfo. Una eSIM de viaje evita el roaming caro entre Estambul, la costa y Capadocia.",
        roamingTip:
          "Desactiva los datos de tu SIM habitual y activa el roaming solo en la eSIM de NoorLink. El metro de Estambul tiene Wi‑Fi, pero buses y ferris necesitan datos estables.",
      },
    },
  },
  {
    slug: "thailand",
    plansPath: "/plans/thailand",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "AIS",
    secondaryCarrier: "TrueMove H",
    apnName: "internet",
    apnNotes: "Thai networks usually push APN automatically. If MMS or data fails after landing, toggle airplane mode once, then confirm APN internet on the eSIM.",
    supportedFrequencies: "5G / 4G LTE (Bangkok & Phuket 5G coverage is strong; islands may drop to 4G)",
    popularCities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi"],
    locales: {
      en: {
        countryName: "Thailand",
        intro:
          "Thailand rewards travelers who install data before the airport queue. From BTS rides in Bangkok to island hops in the south, a travel eSIM keeps maps, Grab, and boarding passes online without hunting for a tourist SIM desk.",
        roamingTip:
          "Install on Wi‑Fi before you fly. After landing at BKK or DMK, select the eSIM as your mobile data line. Grab and Google Maps work best on 4G/5G — café Wi‑Fi alone is not enough between neighborhoods.",
      },
    },
  },
  {
    slug: "mexico",
    plansPath: "/plans/mexico",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Telcel",
    secondaryCarrier: "Movistar MX",
    apnName: "internet.itelcel.com",
    apnNotes: "Telcel-profile eSIMs often use internet.itelcel.com. If your plan’s QR sets APN automatically, leave it. Manual fallback: internet.itelcel.com with APN type default.",
    supportedFrequencies: "5G / 4G LTE (CDMX, Monterrey, Cancún strong; rural Yucatán may be 4G/3G)",
    popularCities: ["Mexico City", "Cancún", "Guadalajara", "Monterrey", "Tulum"],
    locales: {
      en: {
        countryName: "Mexico",
        intro:
          "Mexico spans dense city 5G and beach-town 4G. A travel eSIM on Telcel-class coverage is the simplest way to stay online from CDMX metros to Cancún transfers without US/Canada roaming rates.",
        roamingTip:
          "At MEX or CUN, enable the eSIM data line before you leave the terminal. Uber and airport Wi‑Fi help, but highway and cenote days need your own data.",
      },
      es: {
        countryName: "México",
        intro:
          "México mezcla 5G en ciudades grandes y 4G en destinos de playa. Una eSIM de viaje con cobertura tipo Telcel evita el roaming caro desde el AICM hasta Cancún.",
        roamingTip:
          "Activa la eSIM como línea de datos al aterrizar. Uber y el Wi‑Fi del aeropuerto ayudan, pero carretera y cenotes requieren tus propios datos.",
      },
    },
  },
  {
    slug: "colombia",
    plansPath: "/plans/colombia",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Claro",
    secondaryCarrier: "Movistar CO",
    apnName: "internet.comcel.com.co",
    apnNotes: "Claro-profile APNs commonly use internet.comcel.com.co. Keep data roaming on for the eSIM only; leave the home SIM on voice/SMS if you need 2FA.",
    supportedFrequencies: "4G LTE / expanding 5G (Bogotá & Medellín strongest)",
    popularCities: ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta"],
    locales: {
      en: {
        countryName: "Colombia",
        intro:
          "Colombia’s cities are steep and transit-heavy — Bogotá TransMilenio, Medellín metros, Cartagena walks. A prepaid travel eSIM beats buying a stall SIM after a long flight.",
        roamingTip:
          "Altitude and rain can soften speeds in the Andes. Download offline maps for day trips; keep the eSIM for live navigation in Bogotá and Medellín.",
      },
      es: {
        countryName: "Colombia",
        intro:
          "Las ciudades de Colombia son exigentes con el tránsito: TransMilenio, metro de Medellín, casco de Cartagena. Una eSIM de viaje evita comprar SIM en el aeropuerto tras un vuelo largo.",
        roamingTip:
          "En los Andes la lluvia puede bajar la velocidad. Descarga mapas offline y reserva la eSIM para navegación en Bogotá y Medellín.",
      },
    },
  },
  {
    slug: "dominican-republic",
    plansPath: "/plans/dominican-republic",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Claro DO",
    secondaryCarrier: "Altice",
    apnName: "internet.ideafoon.com.do",
    apnNotes: "Resort Wi‑Fi is unreliable outside the lobby. Ensure the eSIM APN is set and data roaming is on for that line before the resort shuttle.",
    supportedFrequencies: "4G LTE (Punta Cana & Santo Domingo best; remote beaches thinner)",
    popularCities: ["Punta Cana", "Santo Domingo", "Puerto Plata", "La Romana", "Samaná"],
    locales: {
      en: {
        countryName: "Dominican Republic",
        intro:
          "Dominican trips are airport-to-resort heavy. A travel eSIM keeps transfers, WhatsApp with drivers, and boarding passes alive when hotel Wi‑Fi drops between lobbies and beaches.",
        roamingTip:
          "Install before you fly. On the PUJ road, do not rely on café Wi‑Fi — keep eSIM data on for navigation and ride apps.",
      },
      es: {
        countryName: "República Dominicana",
        intro:
          "Los viajes a RD suelen ser aeropuerto–resort. Una eSIM mantiene traslados, WhatsApp y tarjetas de embarque cuando el Wi‑Fi del hotel falla entre lobby y playa.",
        roamingTip:
          "Instálala antes de volar. En la ruta a PUJ no dependas del Wi‑Fi: deja los datos de la eSIM activos para mapas y apps de transporte.",
      },
    },
  },
  {
    slug: "egypt",
    plansPath: "/plans/egypt",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Vodafone Egypt",
    secondaryCarrier: "Orange EG",
    apnName: "internet.vodafone.net",
    apnNotes: "If data does not start after landing in CAI, toggle the eSIM line off/on and confirm APN internet.vodafone.net (or the value your QR provisioned).",
    supportedFrequencies: "4G LTE / selective 5G (Cairo & Alexandria denser; Nile cruise segments weaker)",
    popularCities: ["Cairo", "Giza", "Luxor", "Aswan", "Hurghada"],
    locales: {
      en: {
        countryName: "Egypt",
        intro:
          "Egypt itineraries jump from dense Cairo traffic to Nile corridors and Red Sea resorts. A travel eSIM is simpler than airport SIM queues after immigration.",
        roamingTip:
          "Keep offline maps for Giza and Luxor temple days. Use eSIM data for Uber/Careem in Cairo and for hotel confirmations in Hurghada.",
      },
      ar: {
        countryName: "مصر",
        intro:
          "برامج مصر تنتقل من زحام القاهرة إلى النيل والبحر الأحمر. شريحة eSIM للسفر أسهل من طوابير شراء SIM بعد الجوازات.",
        roamingTip:
          "حمّل خرائط دون اتصال للأهرام والأقصر. استخدم بيانات eSIM لتطبيقات النقل في القاهرة وتأكيد الفنادق في الغردقة.",
      },
    },
  },
  {
    slug: "uae",
    plansPath: "/plans/uae",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Etisalat (e&)",
    secondaryCarrier: "du",
    apnName: "internet",
    apnNotes: "UAE networks typically auto-provision. Enable data roaming on the eSIM; Dubai Metro and malls have Wi‑Fi but taxis and desert edges need cellular.",
    supportedFrequencies: "5G / 4G LTE (Dubai & Abu Dhabi excellent 5G footprint)",
    popularCities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    locales: {
      en: {
        countryName: "United Arab Emirates",
        intro:
          "The UAE is a 5G-forward destination where navigation, Careem, and hotel apps are part of every transfer. A travel eSIM avoids bill shock from home-carrier roaming in Dubai and Abu Dhabi.",
        roamingTip:
          "Land at DXB or AUH with the eSIM already installed. Use it as mobile data from the moment you leave free airport Wi‑Fi.",
      },
      ar: {
        countryName: "الإمارات العربية المتحدة",
        intro:
          "الإمارات وجهة 5G تعتمد على الخرائط وتطبيقات النقل والفنادق في كل تنقّل. شريحة eSIM للسفر تجنّبك صدمة تجوال الشبكة في دبي وأبوظبي.",
        roamingTip:
          "صل إلى دبي أو أبوظبي والشريحة مثبّتة مسبقاً، واستخدمها للبيانات فور مغادرة Wi‑Fi المطار.",
      },
    },
  },
  {
    slug: "morocco",
    plansPath: "/plans/morocco",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Maroc Telecom",
    secondaryCarrier: "Orange MA",
    apnName: "internet.iam.ma", // common IAM profile; plans may override
    apnNotes: "Medina Wi‑Fi is patchy. Set the eSIM as primary data before entering old cities where GPS still needs a signal between riads.",
    supportedFrequencies: "4G LTE (Casablanca, Marrakech, Rabat strongest)",
    popularCities: ["Marrakech", "Casablanca", "Fes", "Rabat", "Tangier"],
    locales: {
      en: {
        countryName: "Morocco",
        intro:
          "Morocco mixes tram cities and medina lanes where offline maps and live pins both matter. A travel eSIM covers airport arrivals and intercity CTM/train days.",
        roamingTip:
          "Download offline maps for Fes and Marrakech medinas. Keep eSIM data for train tickets and ride apps in Casablanca.",
      },
      ar: {
        countryName: "المغرب",
        intro:
          "المغرب يجمع مدناً حديثة وأزقّة مدن قديمة تحتاج خرائط دون اتصال وإشارة حيّة. شريحة eSIM تغطي الوصول والمواصلات بين المدن.",
        roamingTip:
          "حمّل خرائط فاس ومراكش دون اتصال، وأبقِ بيانات eSIM لتذاكر القطار وتطبيقات النقل في الدار البيضاء.",
      },
    },
  },
  {
    slug: "indonesia",
    plansPath: "/plans/indonesia",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Telkomsel",
    secondaryCarrier: "XL Axiata",
    apnName: "internet",
    apnNotes: "Bali and Jakarta coverage differs. If data is slow after landing in DPS, toggle airplane mode; confirm APN internet on the eSIM line.",
    supportedFrequencies: "4G LTE / selective 5G (Jakarta denser; island interiors thinner)",
    popularCities: ["Jakarta", "Denpasar", "Ubud", "Yogyakarta", "Surabaya"],
    locales: {
      en: {
        countryName: "Indonesia",
        intro:
          "Indonesia trips often mean Jakarta connections plus Bali scooters and island boats. A travel eSIM is easier than finding a kiosk that matches your phone’s bands.",
        roamingTip:
          "Install before the long-haul flight. On Bali, expect strong coverage in south tourist corridors and weaker pockets inland — download maps for Ubud day trips.",
      },
    },
  },
  {
    slug: "costa-rica",
    plansPath: "/plans/costa-rica",
    wave: "A",
    isIndexed: true,
    primaryCarrier: "Kölbi (ICE)",
    secondaryCarrier: "Movistar CR",
    apnName: "kolbi3g",
    apnNotes: "Mountain and park coverage can thin out. Keep offline maps for volcano and cloud-forest days; use eSIM data in San José and along main highways.",
    supportedFrequencies: "4G LTE (Central Valley strongest; remote parks limited)",
    popularCities: ["San José", "La Fortuna", "Manuel Antonio", "Tamarindo", "Monteverde"],
    locales: {
      en: {
        countryName: "Costa Rica",
        intro:
          "Costa Rica itineraries swing from San José highways to park gates with weak Wi‑Fi. A travel eSIM keeps navigation and lodge WhatsApp threads alive between stops.",
        roamingTip:
          "Renting a car? Download offline Google Maps for mountain roads. Use eSIM data in towns to re-sync when you have signal.",
      },
      es: {
        countryName: "Costa Rica",
        intro:
          "Los itinerarios en Costa Rica van de carreteras en San José a parques con poco Wi‑Fi. Una eSIM mantiene mapas y WhatsApp entre paradas.",
        roamingTip:
          "Si rentas auto, descarga mapas offline para rutas de montaña. Usa datos eSIM en los pueblos para sincronizar cuando haya señal.",
      },
    },
  },

  // ——— Wave B (content ready, not indexed yet) ———
  {
    slug: "jamaica",
    plansPath: "/plans/jamaica",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "Digicel",
    secondaryCarrier: "Flow",
    apnName: "internet",
    apnNotes: "Resort Wi‑Fi is inconsistent. Enable eSIM data before the airport transfer.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Montego Bay", "Kingston", "Ocho Rios", "Negril"],
    locales: {
      en: {
        countryName: "Jamaica",
        intro:
          "Jamaica trips are transfer-heavy between airports and resorts. A travel eSIM covers the gaps hotel Wi‑Fi leaves on the road.",
        roamingTip:
          "Install before you fly into MBJ or KIN. Keep eSIM data on for taxis and offline-to-online map handoffs.",
      },
    },
  },
  {
    slug: "bahamas",
    plansPath: "/plans/bahamas",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "BTC",
    secondaryCarrier: "Aliv",
    apnName: "internet",
    apnNotes: "Island coverage varies; keep eSIM active for ferry and water-taxi days.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Nassau", "Paradise Island", "Freeport", "Exuma"],
    locales: {
      en: {
        countryName: "Bahamas",
        intro:
          "Bahamas travel is island-hopping and cruise-port logistics. A travel eSIM beats relying on port Wi‑Fi alone.",
        roamingTip:
          "Enable the eSIM before leaving the ship or airport shuttle zone.",
      },
    },
  },
  {
    slug: "barbados",
    plansPath: "/plans/barbados",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "Flow",
    secondaryCarrier: "Digicel",
    apnName: "internet",
    apnNotes: "Coastal coverage is generally solid; confirm data roaming on the eSIM after landing at BGI.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Bridgetown", "Holetown", "Oistins", "Speightstown"],
    locales: {
      en: {
        countryName: "Barbados",
        intro:
          "Barbados is compact but still needs data for taxis, maps, and boarding passes between beach days.",
        roamingTip:
          "Install on Wi‑Fi before you fly; switch to eSIM data at BGI.",
      },
    },
  },
  {
    slug: "spain",
    plansPath: "/plans/spain",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "Movistar",
    secondaryCarrier: "Orange ES",
    apnName: "telefonica.es",
    apnNotes: "EU roaming rules do not replace a travel eSIM if your home plan excludes Spain or caps data.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Madrid", "Barcelona", "Seville", "Valencia", "Malaga"],
    locales: {
      en: {
        countryName: "Spain",
        intro:
          "Spain’s AVE, metros, and tapas crawls are easier with reliable data from day one.",
        roamingTip:
          "Use eSIM data underground between metro stops when station Wi‑Fi drops.",
      },
      es: {
        countryName: "España",
        intro:
          "AVE, metro y días de ciudad en España funcionan mejor con datos desde el primer día.",
        roamingTip:
          "Usa la eSIM en el metro cuando falle el Wi‑Fi de los andenes.",
      },
    },
  },
  {
    slug: "italy",
    plansPath: "/plans/italy",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "TIM",
    secondaryCarrier: "Vodafone IT",
    apnName: "ibox.tim.it",
    apnNotes: "Train travel between cities benefits from onboard data when Wi‑Fi is crowded.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Rome", "Milan", "Florence", "Venice", "Naples"],
    locales: {
      en: {
        countryName: "Italy",
        intro:
          "Italy itineraries stack trains, museums, and old towns — a travel eSIM keeps tickets and maps ready.",
        roamingTip:
          "Download offline maps for historic centers; use eSIM for Trenitalia/Italo apps.",
      },
    },
  },
  {
    slug: "france",
    plansPath: "/plans/france",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "Orange FR",
    secondaryCarrier: "SFR",
    apnName: "orange",
    apnNotes: "Paris metro Wi‑Fi is uneven; keep eSIM data for RATP and ride apps.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Paris", "Lyon", "Nice", "Marseille", "Bordeaux"],
    locales: {
      en: {
        countryName: "France",
        intro:
          "France is a high-intent eSIM search market for city breaks and TGV trips.",
        roamingTip:
          "Install before CDG/ORY queues; enable eSIM data for airport transit.",
      },
      es: {
        countryName: "Francia",
        intro:
          "Francia es un mercado eSIM fuerte para city breaks y trayectos en TGV.",
        roamingTip:
          "Instálala antes de las colas de CDG/ORY y actívala en el tránsito del aeropuerto.",
      },
    },
  },
  {
    slug: "brazil",
    plansPath: "/plans/brazil",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "Vivo",
    secondaryCarrier: "Claro BR",
    apnName: "zap.vivo.com.br",
    apnNotes: "Large cities have strong LTE/5G; confirm APN if data does not attach after landing.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Florianópolis"],
    locales: {
      en: {
        countryName: "Brazil",
        intro:
          "Brazil’s cities reward travelers who land with data for Uber and maps already working.",
        roamingTip:
          "Enable eSIM data before leaving GRU or GIG terminals.",
      },
      es: {
        countryName: "Brasil",
        intro:
          "En Brasil conviene aterrizar con datos listos para Uber y mapas.",
        roamingTip:
          "Activa la eSIM antes de salir de las terminales de GRU o GIG.",
      },
    },
  },
  {
    slug: "canada",
    plansPath: "/plans/canada",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "Rogers",
    secondaryCarrier: "Bell",
    apnName: "internet.com",
    apnNotes: "Cross-border USA–Canada trips should use a plan that matches your route; enable the correct eSIM line per country.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    locales: {
      en: {
        countryName: "Canada",
        intro:
          "Canada city breaks and rockies road trips need highway data that hotel Wi‑Fi cannot cover.",
        roamingTip:
          "Install before YYZ/YVR; keep eSIM on for transit and winter navigation.",
      },
    },
  },
  {
    slug: "saudi-arabia",
    plansPath: "/hajj-umrah",
    wave: "B",
    isIndexed: true,
    primaryCarrier: "STC",
    secondaryCarrier: "Mobily",
    apnName: "jawalnet.com.sa",
    apnNotes: "Pilgrim itineraries should install before travel. Use NoorLink Hajj & Umrah plans for Makkah/Madinah-focused coverage.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Makkah", "Madinah", "Jeddah", "Riyadh"],
    locales: {
      en: {
        countryName: "Saudi Arabia",
        intro:
          "Saudi pilgrim and visitor trips need reliable data around the Haramain. Use dedicated Hajj & Umrah eSIM plans rather than generic roaming.",
        roamingTip:
          "Install before you fly. Keep your home number for OTP if required; use eSIM for maps and group coordination.",
      },
      ar: {
        countryName: "المملكة العربية السعودية",
        intro:
          "رحلات الحج والعمرة تحتاج بيانات موثوقة حول الحرمين. استخدم خطط NoorLink المخصّصة بدل التجوال العام.",
        roamingTip:
          "ثبّت الشريحة قبل السفر. أبقِ رقمك الأساسي للتحقق عند الحاجة واستخدم eSIM للخرائط والتنسيق.",
      },
    },
  },

  // ——— Wave C (competitive hubs + catalog expansion) ———
  {
    slug: "usa",
    plansPath: "/plans/usa",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "T-Mobile",
    secondaryCarrier: "AT&T",
    apnName: "fast.t-mobile.com",
    apnNotes: "US coverage is generally automatic. Enable data roaming on the eSIM; keep home SIM off data to avoid bill shock.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["New York", "Los Angeles", "Chicago", "Miami", "San Francisco"],
    locales: {
      en: {
        countryName: "United States",
        intro:
          "Coast-to-coast US trips need data the moment you leave the gate — rideshares, terminals, and national-park days without home-carrier roaming bills.",
        roamingTip:
          "Install before you fly. Select the eSIM for cellular data at the gate, not after you need maps in arrivals.",
      },
    },
  },
  {
    slug: "japan",
    plansPath: "/plans/japan",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "NTT Docomo",
    secondaryCarrier: "SoftBank",
    apnName: "internet",
    apnNotes: "IC card + maps + translate apps need steady data between station Wi‑Fi hops.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Tokyo", "Osaka", "Kyoto", "Fukuoka", "Sapporo"],
    locales: {
      en: {
        countryName: "Japan",
        intro:
          "Japan travel runs on trains and apps. A travel eSIM keeps Google Maps and translation working between stations.",
        roamingTip:
          "Install before landing at NRT/HND. Enable eSIM data before leaving free airport Wi‑Fi.",
      },
    },
  },
  {
    slug: "uk",
    plansPath: "/plans/uk",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "EE",
    secondaryCarrier: "Vodafone UK",
    apnName: "everywhere",
    apnNotes: "Tube Wi‑Fi is limited; keep eSIM data for TfL and ride apps between stations.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["London", "Edinburgh", "Manchester", "Birmingham", "Glasgow"],
    locales: {
      en: {
        countryName: "United Kingdom",
        intro:
          "UK city breaks need data for trains, contactless tips, and maps the moment you leave Heathrow or Manchester.",
        roamingTip:
          "Switch to eSIM data after landing — do not wait until you are underground.",
      },
    },
  },
  {
    slug: "germany",
    plansPath: "/plans/germany",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Deutsche Telekom",
    secondaryCarrier: "Vodafone DE",
    apnName: "internet.t-d1.de",
    apnNotes: "ICE Wi‑Fi varies; eSIM data covers booking apps and maps on connections.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
    locales: {
      en: {
        countryName: "Germany",
        intro:
          "Germany’s rail-heavy trips are smoother with data ready for DB apps and city navigation.",
        roamingTip:
          "Install before FRA/MUC; enable eSIM data for S-Bahn transfers.",
      },
    },
  },
  {
    slug: "south-korea",
    plansPath: "/plans/south-korea",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "SK Telecom",
    secondaryCarrier: "KT",
    apnName: "internet",
    apnNotes: "KakaoMaps/Naver and subway transfers need cellular between Wi‑Fi zones.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Seoul", "Busan", "Incheon", "Jeju", "Daegu"],
    locales: {
      en: {
        countryName: "South Korea",
        intro:
          "Korea is 5G-dense and app-centric — a travel eSIM is the default for Seoul subway weeks.",
        roamingTip:
          "Install before ICN. Use eSIM data for Kakao T and maps from the airport railroad.",
      },
    },
  },
  {
    slug: "australia",
    plansPath: "/plans/australia",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Telstra",
    secondaryCarrier: "Optus",
    apnName: "telstra.internet",
    apnNotes: "Coastal cities are strong; outback coverage thins — download offline maps for road trips.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Gold Coast"],
    locales: {
      en: {
        countryName: "Australia",
        intro:
          "Australia long-hauls deserve data at the gate for rides, maps, and hotel chat after 14-hour flights.",
        roamingTip:
          "Install before SYD/MEL. Enable eSIM data before leaving airport Wi‑Fi.",
      },
    },
  },

  // ——— Wave C expansion (catalog-aligned) ———
  {
    slug: "portugal",
    plansPath: "/plans/portugal",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "MEO",
    secondaryCarrier: "Vodafone PT",
    apnName: "internet",
    apnNotes: "Coastal and city coverage is strong; enable data roaming on the eSIM only.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Lisbon", "Porto", "Faro", "Sintra", "Madeira"],
    locales: {
      en: {
        countryName: "Portugal",
        intro:
          "Lisbon trams, Porto walks, and Algarve day trips are easier when maps and ride apps work the moment you leave LIS or OPO.",
        roamingTip:
          "Install before you fly. Switch to eSIM data after landing — café Wi‑Fi alone is not enough between neighborhoods.",
      },
      es: {
        countryName: "Portugal",
        intro:
          "Tranvías en Lisboa, paseos en Oporto y días en el Algarve piden datos listos al salir del aeropuerto.",
        roamingTip:
          "Instala antes de volar y activa la eSIM al aterrizar; el Wi‑Fi de cafeterías no alcanza entre barrios.",
      },
    },
  },
  {
    slug: "greece",
    plansPath: "/plans/greece",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Cosmote",
    secondaryCarrier: "Vodafone GR",
    apnName: "internet",
    apnNotes: "Island hops may drop to 4G; download offline maps for ferry days.",
    supportedFrequencies: "5G / 4G LTE (Athens strong; islands vary)",
    popularCities: ["Athens", "Santorini", "Mykonos", "Crete", "Thessaloniki"],
    locales: {
      en: {
        countryName: "Greece",
        intro:
          "Athens metros and island ferries need data for tickets, maps, and group chats — install before you land at ATH.",
        roamingTip:
          "Enable eSIM data after landing. Ferry Wi‑Fi is unreliable; keep cellular for port transfers.",
      },
    },
  },
  {
    slug: "netherlands",
    plansPath: "/plans/netherlands",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "KPN",
    secondaryCarrier: "Vodafone NL",
    apnName: "internet",
    apnNotes: "NS and city bikes need steady data between station Wi‑Fi pockets.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    locales: {
      en: {
        countryName: "Netherlands",
        intro:
          "Dutch city breaks run on trains, bikes, and booking apps. A travel eSIM keeps NS and maps online from Schiphol onward.",
        roamingTip:
          "Install before AMS. Select the eSIM for data before you leave the terminal.",
      },
    },
  },
  {
    slug: "switzerland",
    plansPath: "/plans/switzerland",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Swisscom",
    secondaryCarrier: "Sunrise",
    apnName: "internet",
    apnNotes: "Alpine valleys can thin coverage — download offline maps for mountain days.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Zurich", "Geneva", "Bern", "Lucerne", "Interlaken"],
    locales: {
      en: {
        countryName: "Switzerland",
        intro:
          "Swiss rail and mountain transfers are smoother with data ready for SBB apps and alpine navigation.",
        roamingTip:
          "Install before ZRH/GVA. Enable eSIM data for train connections; do not rely on station Wi‑Fi alone.",
      },
    },
  },
  {
    slug: "ireland",
    plansPath: "/plans/ireland",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Vodafone IE",
    secondaryCarrier: "Three IE",
    apnName: "internet",
    apnNotes: "Rural west coast coverage varies; keep offline maps for cliff drives.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Dublin", "Cork", "Galway", "Limerick", "Belfast"],
    locales: {
      en: {
        countryName: "Ireland",
        intro:
          "Dublin arrivals and west-coast drives need maps and ride apps without EU roaming surprises from a home SIM.",
        roamingTip:
          "Install before DUB. Switch to eSIM data after landing for Leap and Google Maps.",
      },
    },
  },
  {
    slug: "singapore",
    plansPath: "/plans/singapore",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Singtel",
    secondaryCarrier: "StarHub",
    apnName: "internet",
    apnNotes: "Coverage is dense island-wide; APN is usually automatic.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Marina Bay", "Orchard", "Chinatown", "Sentosa", "Changi"],
    locales: {
      en: {
        countryName: "Singapore",
        intro:
          "Singapore is compact and app-heavy — Grab, maps, and transit work best on cellular from Changi to the CBD.",
        roamingTip:
          "Install before SIN. Enable eSIM data before leaving airport Wi‑Fi for Grab pickups.",
      },
    },
  },
  {
    slug: "vietnam",
    plansPath: "/plans/vietnam",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Viettel",
    secondaryCarrier: "Vinaphone",
    apnName: "internet",
    apnNotes: "Grab and maps need cellular between café Wi‑Fi; island coverage varies.",
    supportedFrequencies: "4G LTE / expanding 5G",
    popularCities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hoi An", "Nha Trang"],
    locales: {
      en: {
        countryName: "Vietnam",
        intro:
          "Scooter cities and overnight trains are simpler with Grab and maps ready before you leave SGN or HAN.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing — airport SIM desks are optional, not required.",
      },
    },
  },
  {
    slug: "india",
    plansPath: "/plans/india",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Jio",
    secondaryCarrier: "Airtel",
    apnName: "internet",
    apnNotes: "UPI, maps, and ride apps need cellular; keep home SIM for OTP if banks require it.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Delhi", "Mumbai", "Bengaluru", "Jaipur", "Goa"],
    locales: {
      en: {
        countryName: "India",
        intro:
          "India travel runs on UPI, maps, and ride apps. A travel eSIM keeps you online from DEL or BOM without airport SIM queues.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing; keep your home number available for banking OTPs.",
      },
    },
  },
  {
    slug: "philippines",
    plansPath: "/plans/philippines",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Globe",
    secondaryCarrier: "Smart",
    apnName: "internet",
    apnNotes: "Island hops can thin coverage — download offline maps for ferry days.",
    supportedFrequencies: "4G LTE / expanding 5G",
    popularCities: ["Manila", "Cebu", "Boracay", "Davao", "Palawan"],
    locales: {
      en: {
        countryName: "Philippines",
        intro:
          "Manila traffic and island transfers need Grab and maps ready — install data before you land at MNL or CEB.",
        roamingTip:
          "Enable eSIM data after landing. Ferry and provincial Wi‑Fi is uneven; keep cellular for bookings.",
      },
    },
  },
  {
    slug: "malaysia",
    plansPath: "/plans/malaysia",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Maxis",
    secondaryCarrier: "CelcomDigi",
    apnName: "internet",
    apnNotes: "KL and Penang are strong; highland coverage can thin — keep offline maps for Cameron Highlands.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Kuala Lumpur", "Penang", "Langkawi", "Malacca", "Johor Bahru"],
    locales: {
      en: {
        countryName: "Malaysia",
        intro:
          "KLIA arrivals, Grab rides, and Penang walks are smoother with data ready before you leave the terminal.",
        roamingTip:
          "Install before KUL. Switch to eSIM data for Grab and maps from the airport train.",
      },
    },
  },
  {
    slug: "ghana",
    plansPath: "/plans/ghana",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "MTN",
    secondaryCarrier: "Vodafone GH",
    apnName: "internet",
    apnNotes: "Accra coverage is strong on MTN-class routes; keep data roaming on for the eSIM only.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Accra", "Kumasi", "Cape Coast", "Tamale", "Tema"],
    locales: {
      en: {
        countryName: "Ghana",
        intro:
          "Accra arrivals and coastal trips need maps and messaging without hunting for a local SIM after a long flight.",
        roamingTip:
          "Install before ACC. Enable eSIM data after landing for rides and WhatsApp with family.",
      },
    },
  },
  {
    slug: "kenya",
    plansPath: "/plans/kenya",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Safaricom",
    secondaryCarrier: "Airtel KE",
    apnName: "internet",
    apnNotes: "Nairobi and Mombasa are strong; safari lodges may be limited — download offline maps before game drives.",
    supportedFrequencies: "4G LTE / expanding 5G",
    popularCities: ["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Diani"],
    locales: {
      en: {
        countryName: "Kenya",
        intro:
          "Nairobi traffic and safari logistics are easier with Safaricom-class data ready before you leave NBO.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing; download offline maps before remote lodge days.",
      },
    },
  },
  {
    slug: "nigeria",
    plansPath: "/plans/nigeria",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "MTN",
    secondaryCarrier: "Airtel NG",
    apnName: "internet",
    apnNotes: "Lagos and Abuja coverage varies by neighborhood; keep offline maps for traffic days.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"],
    locales: {
      en: {
        countryName: "Nigeria",
        intro:
          "Lagos and Abuja trips need maps and messaging the moment you leave LOS or ABV — without expensive home roaming.",
        roamingTip:
          "Install before you fly. Switch to eSIM data after landing for ride apps and navigation.",
      },
    },
  },
  {
    slug: "south-africa",
    plansPath: "/plans/south-africa",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Vodacom",
    secondaryCarrier: "MTN ZA",
    apnName: "internet",
    apnNotes: "City coverage is strong; garden-route and reserve coverage thins — keep offline maps for road trips.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Stellenbosch"],
    locales: {
      en: {
        countryName: "South Africa",
        intro:
          "Cape Town and Joburg arrivals need Uber and maps ready — install a travel eSIM before JNB or CPT.",
        roamingTip:
          "Enable eSIM data after landing. Download offline maps before Garden Route or reserve drives.",
      },
    },
  },
  {
    slug: "argentina",
    plansPath: "/plans/argentina",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Claro",
    secondaryCarrier: "Movistar AR",
    apnName: "internet.ctimovil.com.ar",
    apnNotes: "Buenos Aires is strong; Patagonia thins — download offline maps for southbound trips.",
    supportedFrequencies: "4G LTE / expanding 5G",
    popularCities: ["Buenos Aires", "Mendoza", "Córdoba", "Bariloche", "Ushuaia"],
    locales: {
      en: {
        countryName: "Argentina",
        intro:
          "Buenos Aires metros and wine-country drives are smoother with Claro-class data ready after EZE or AEP.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing for SUBE tips and maps.",
      },
      es: {
        countryName: "Argentina",
        intro:
          "Buenos Aires y los viajes al interior piden datos listos al salir de EZE o AEP, sin roaming caro.",
        roamingTip:
          "Instala antes de volar y activa la eSIM al aterrizar para mapas y apps de movilidad.",
      },
    },
  },
  {
    slug: "peru",
    plansPath: "/plans/peru",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Movistar",
    secondaryCarrier: "Claro PE",
    apnName: "movistar.pe",
    apnNotes: "Lima and Cusco are workable; Inca Trail and high Andes need offline maps.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Lima", "Cusco", "Arequipa", "Miraflores", "Sacred Valley"],
    locales: {
      en: {
        countryName: "Peru",
        intro:
          "Lima arrivals and Cusco days need maps and bookings online — install data before LIM, not after altitude hits.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing; download offline maps before Sacred Valley days.",
      },
      es: {
        countryName: "Perú",
        intro:
          "Lima y Cusco piden mapas y reservas listas. Instala la eSIM antes de LIM, no cuando ya estés en altura.",
        roamingTip:
          "Activa la eSIM al aterrizar y descarga mapas offline antes del Valle Sagrado.",
      },
    },
  },
  {
    slug: "chile",
    plansPath: "/plans/chile",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Entel",
    secondaryCarrier: "Movistar CL",
    apnName: "bam.entelpcs.cl",
    apnNotes: "Santiago is strong; Atacama and Patagonia thin — keep offline maps for desert and fjord days.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Santiago", "Valparaíso", "Viña del Mar", "Puerto Varas", "San Pedro de Atacama"],
    locales: {
      en: {
        countryName: "Chile",
        intro:
          "Santiago metros and long north–south hops are easier with Entel-class data ready at SCL.",
        roamingTip:
          "Install before SCL. Enable eSIM data after landing; download offline maps before Atacama or Patagonia.",
      },
      es: {
        countryName: "Chile",
        intro:
          "Santiago y los saltos norte–sur piden datos listos al salir de SCL, sin roaming de la SIM de casa.",
        roamingTip:
          "Activa la eSIM al aterrizar y descarga mapas offline antes de Atacama o Patagonia.",
      },
    },
  },
  {
    slug: "panama",
    plansPath: "/plans/panama",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "+Móvil",
    secondaryCarrier: "Claro PA",
    apnName: "internet",
    apnNotes: "Panama City coverage is strong; Bocas and highland towns can thin.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Panama City", "Casco Viejo", "Boquete", "Bocas del Toro", "Coronado"],
    locales: {
      en: {
        countryName: "Panama",
        intro:
          "Tocumen arrivals and canal-city days need Uber and maps without US roaming rates on your home line.",
        roamingTip:
          "Install before PTY. Enable eSIM data after landing for rides into the city.",
      },
      es: {
        countryName: "Panamá",
        intro:
          "Llegadas a Tocumen y días en la ciudad piden Uber y mapas sin roaming caro de tu SIM habitual.",
        roamingTip:
          "Instala antes de PTY y activa la eSIM al aterrizar para el traslado a la ciudad.",
      },
    },
  },
  {
    slug: "qatar",
    plansPath: "/plans/qatar",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Ooredoo",
    secondaryCarrier: "Vodafone QA",
    apnName: "internet",
    apnNotes: "DOH layover and city coverage is strong; APN is usually automatic.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Doha", "The Pearl", "Katara", "Souq Waqif", "Lusail"],
    locales: {
      en: {
        countryName: "Qatar",
        intro:
          "Doha layovers and city stays need maps and ride apps from the moment you leave Hamad International.",
        roamingTip:
          "Install before DOH. Enable eSIM data after landing for Metro and ride apps.",
      },
      ar: {
        countryName: "قطر",
        intro:
          "توقفات الدوحة والزيارات القصيرة تحتاج بيانات للخرائط والتطبيقات فور مغادرة مطار حمد.",
        roamingTip:
          "ثبّت الشريحة قبل السفر وفعّل بيانات eSIM بعد الهبوط للمترو وتطبيقات النقل.",
      },
    },
  },
  {
    slug: "jordan",
    plansPath: "/plans/jordan",
    wave: "C",
    isIndexed: true,
    primaryCarrier: "Zain",
    secondaryCarrier: "Orange JO",
    apnName: "internet",
    apnNotes: "Amman and Petra corridor coverage is workable; Wadi Rum camps need offline maps.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Amman", "Petra", "Aqaba", "Dead Sea", "Wadi Rum"],
    locales: {
      en: {
        countryName: "Jordan",
        intro:
          "Amman arrivals and Petra day trips need maps and bookings ready — install before AMM, not at the visitor center.",
        roamingTip:
          "Enable eSIM data after landing. Download offline maps before Wadi Rum or desert drives.",
      },
      ar: {
        countryName: "الأردن",
        intro:
          "عمّان والبتراء يحتاجان خرائط وحجوزات جاهزة. ثبّت الشريحة قبل عمّان لا عند مركز الزوار.",
        roamingTip:
          "فعّل بيانات eSIM بعد الهبوط وحمل خرائط دون اتصال قبل وادي رم.",
      },
    },
  },

  // ——— Wave D (staged — flip isIndexed next week) ———
  {
    slug: "kuwait",
    plansPath: "/plans/kuwait",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Zain",
    secondaryCarrier: "Ooredoo KW",
    apnName: "internet",
    apnNotes: "Kuwait City coverage is strong; APN is usually automatic on travel eSIMs.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Kuwait City", "Salmiya", "Hawalli", "Jahra", "Fahaheel"],
    locales: {
      en: {
        countryName: "Kuwait",
        intro:
          "Kuwait City stays and Gulf stopovers need maps and ride apps ready the moment you leave KWI — without home-carrier roaming.",
        roamingTip:
          "Install before KWI. Enable eSIM data after landing for Careem and navigation.",
      },
      ar: {
        countryName: "الكويت",
        intro:
          "زيارات الكويت والتوقفات القصيرة تحتاج بيانات للخرائط والتطبيقات فور مغادرة المطار.",
        roamingTip:
          "ثبّت الشريحة قبل السفر وفعّل بيانات eSIM بعد الهبوط لكريم والملاحة.",
      },
    },
  },
  {
    slug: "bahrain",
    plansPath: "/plans/bahrain",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Batelco",
    secondaryCarrier: "Zain BH",
    apnName: "internet",
    apnNotes: "Manama and the causeway corridor are well covered; APN is usually automatic.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Manama", "Muharraq", "Riffa", "Seef", "Amwaj"],
    locales: {
      en: {
        countryName: "Bahrain",
        intro:
          "Manama weekends and BAH layovers are smoother with data ready for maps, banking apps, and rides from the terminal.",
        roamingTip:
          "Install before BAH. Switch to eSIM data after landing — do not wait until you leave free airport Wi‑Fi.",
      },
      ar: {
        countryName: "البحرين",
        intro:
          "منامة وعطلات نهاية الأسبوع تحتاج بيانات جاهزة للخرائط والتطبيقات من لحظة مغادرة المطار.",
        roamingTip:
          "ثبّت الشريحة قبل السفر وفعّل eSIM بعد الهبوط قبل مغادرة واي فاي المطار.",
      },
    },
  },
  {
    slug: "oman",
    plansPath: "/plans/oman",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Omantel",
    secondaryCarrier: "Ooredoo OM",
    apnName: "internet",
    apnNotes: "Muscat is strong; mountain and desert roads thin — download offline maps for day trips.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Muscat", "Salalah", "Nizwa", "Sur", "Sohar"],
    locales: {
      en: {
        countryName: "Oman",
        intro:
          "Muscat arrivals and mountain or wadi day trips need maps ready before you leave MCT — install data at home, not at the visitor desk.",
        roamingTip:
          "Enable eSIM data after landing. Download offline maps before Jebel Akhdar or desert drives.",
      },
      ar: {
        countryName: "عُمان",
        intro:
          "مسقط والرحلات إلى الجبال والأودية تحتاج خرائط جاهزة قبل مغادرة المطار.",
        roamingTip:
          "فعّل بيانات eSIM بعد الهبوط وحمل خرائط دون اتصال قبل الرحلات الجبلية.",
      },
    },
  },
  {
    slug: "trinidad-and-tobago",
    plansPath: "/plans/trinidad-and-tobago",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Digicel",
    secondaryCarrier: "bmobile",
    apnName: "internet",
    apnNotes: "Port of Spain and Tobago towns are workable; rural coverage varies — keep offline maps for coastline drives.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Port of Spain", "San Fernando", "Scarborough", "Chaguanas", "Crown Point"],
    locales: {
      en: {
        countryName: "Trinidad and Tobago",
        intro:
          "Carnival weeks and dual-island hops need WhatsApp and maps without hunting for a tourist SIM after POS or TAB.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing for rides and ferry updates.",
      },
    },
  },
  {
    slug: "aruba",
    plansPath: "/plans/aruba",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Digicel",
    secondaryCarrier: "Setar",
    apnName: "internet",
    apnNotes: "Oranjestad and Palm Beach are strong; inland coverage is usually fine for a small island.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Oranjestad", "Palm Beach", "Noord", "San Nicolas", "Eagle Beach"],
    locales: {
      en: {
        countryName: "Aruba",
        intro:
          "Beach weeks and AUA arrivals are calmer when rides and maps work from the terminal — install before you leave home Wi‑Fi.",
        roamingTip:
          "Enable eSIM data after landing. Keep your home number for OTP; use the travel line for data.",
      },
      es: {
        countryName: "Aruba",
        intro:
          "Semanas de playa y llegadas a AUA son más tranquilas con mapas y rides listos desde la terminal.",
        roamingTip:
          "Activa la eSIM al aterrizar. Mantén tu número habitual para OTP y usa la línea de viaje para datos.",
      },
    },
  },
  {
    slug: "puerto-rico",
    plansPath: "/plans/puerto-rico",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "T-Mobile",
    secondaryCarrier: "Claro PR",
    apnName: "fast.t-mobile.com",
    apnNotes: "San Juan coverage is strong; mountain towns can thin — download offline maps for island drives.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["San Juan", "Condado", "Old San Juan", "Ponce", "Rincón"],
    locales: {
      en: {
        countryName: "Puerto Rico",
        intro:
          "SJU arrivals and island road trips need maps and rides without surprise US roaming on a foreign home SIM.",
        roamingTip:
          "Install before SJU. Enable eSIM data after landing for Uber and navigation.",
      },
      es: {
        countryName: "Puerto Rico",
        intro:
          "Llegadas a SJU y rutas por la isla piden mapas y rides sin roaming sorpresa de tu SIM extranjera.",
        roamingTip:
          "Instala antes de SJU y activa la eSIM al aterrizar para Uber y navegación.",
      },
    },
  },
  {
    slug: "austria",
    plansPath: "/plans/austria",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "A1",
    secondaryCarrier: "Magenta",
    apnName: "internet",
    apnNotes: "Vienna and Salzburg are strong; alpine valleys thin — keep offline maps for ski or hiking days.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Hallstatt"],
    locales: {
      en: {
        countryName: "Austria",
        intro:
          "Vienna metros and alpine transfers are smoother with data ready for ÖBB apps and maps from VIE onward.",
        roamingTip:
          "Install before VIE. Enable eSIM data for S-Bahn and train connections; download offline maps before mountain days.",
      },
    },
  },
  {
    slug: "belgium",
    plansPath: "/plans/belgium",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Proximus",
    secondaryCarrier: "Orange BE",
    apnName: "internet",
    apnNotes: "Brussels and Antwerp are strong; Eurostar/Thalys days need cellular between station Wi‑Fi pockets.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Brussels", "Antwerp", "Bruges", "Ghent", "Leuven"],
    locales: {
      en: {
        countryName: "Belgium",
        intro:
          "Brussels weekends and train hops to Bruges need maps and tickets online the moment you leave BRU.",
        roamingTip:
          "Install before BRU. Switch to eSIM data after landing for STIB and ride apps.",
      },
    },
  },
  {
    slug: "poland",
    plansPath: "/plans/poland",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Orange PL",
    secondaryCarrier: "Play",
    apnName: "internet",
    apnNotes: "Warsaw and Kraków are strong; countryside coverage varies — keep offline maps for day trips.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Warsaw", "Kraków", "Gdańsk", "Wrocław", "Poznań"],
    locales: {
      en: {
        countryName: "Poland",
        intro:
          "Warsaw arrivals and Kraków city breaks need maps and ride apps without EU roaming surprises from a non‑EU home SIM.",
        roamingTip:
          "Install before WAW or KRK. Enable eSIM data after landing for Jakdojade and navigation.",
      },
    },
  },
  {
    slug: "sweden",
    plansPath: "/plans/sweden",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Telia",
    secondaryCarrier: "Tele2",
    apnName: "internet",
    apnNotes: "Stockholm and Gothenburg are strong; far-north coverage thins — download offline maps for Lapland.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Kiruna"],
    locales: {
      en: {
        countryName: "Sweden",
        intro:
          "Stockholm archipelago days and winter north trips are easier with data ready for SL apps and maps from ARN.",
        roamingTip:
          "Install before ARN. Enable eSIM data after landing; download offline maps before Lapland drives.",
      },
    },
  },
  {
    slug: "maldives",
    plansPath: "/plans/maldives",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "Dhiraagu",
    secondaryCarrier: "Ooredoo MV",
    apnName: "internet",
    apnNotes: "Malé and resort islands vary — some resorts have Wi‑Fi only; keep eSIM for speedboat and seaplane days.",
    supportedFrequencies: "4G LTE",
    popularCities: ["Malé", "Hulhumalé", "Maafushi", "Addu", "Ari Atoll"],
    locales: {
      en: {
        countryName: "Maldives",
        intro:
          "MLE arrivals and atoll transfers need WhatsApp and boarding updates when resort Wi‑Fi is still hours away.",
        roamingTip:
          "Install before MLE. Enable eSIM data after landing for speedboat or seaplane coordination.",
      },
    },
  },
  {
    slug: "china",
    plansPath: "/plans/china",
    wave: "D",
    isIndexed: false,
    primaryCarrier: "China Mobile",
    secondaryCarrier: "China Unicom",
    apnName: "cmnet",
    apnNotes: "Install before you fly. Many Western apps need a travel eSIM or VPN plan — set expectations before arrival.",
    supportedFrequencies: "5G / 4G LTE",
    popularCities: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu"],
    locales: {
      en: {
        countryName: "China",
        intro:
          "China city weeks need maps and payments ready from PVG or PEK — a travel eSIM beats scrambling for a local stall after immigration.",
        roamingTip:
          "Install before you fly. Enable eSIM data after landing; plan ahead for apps that may need a VPN on some networks.",
      },
    },
  },
];
