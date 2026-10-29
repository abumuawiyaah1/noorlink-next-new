import type { PseoDestination } from "@/lib/pseo/types";

/**
 * Versioned pSEO catalog (25 seeds). Mirrors Supabase `pseo_destinations`.
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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

  // ——— Wave C (competitive; polish before index) ———
  {
    slug: "usa",
    plansPath: "/plans/usa",
    wave: "C",
    isIndexed: false,
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
          "The US is a competitive eSIM market — quality setup guidance and honest coverage notes matter more than thin templates.",
        roamingTip:
          "Install before you fly. Select the eSIM for cellular data at the gate, not after you need maps in arrivals.",
      },
    },
  },
  {
    slug: "japan",
    plansPath: "/plans/japan",
    wave: "C",
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
    isIndexed: false,
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
];
