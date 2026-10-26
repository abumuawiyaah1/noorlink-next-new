import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import type { DestinationCard } from "@/lib/destinations-catalog";

/**
 * Localized destination catalog blurbs, keyed by `DESTINATION_CARDS[].id`.
 * English stays in `lib/destinations-catalog.ts` (source of truth); this file
 * carries es (LatAm) + ar (MSA) for every curated card.
 */
export type DestinationCopy = {
  title: string;
  description: string;
  thingsToDo: string[];
};

type TranslatedLocale = Exclude<Locale, "en">;

export const DESTINATION_COPY: Record<
  string,
  Record<TranslatedLocale, DestinationCopy>
> = {
  usa: {
    es: {
      title: "Estados Unidos",
      description:
        "Ciudades de costa a costa, parques nacionales y días de viaje siempre conectados.",
      thingsToDo: [
        "Recorre el skyline de Nueva York",
        "Haz un road trip por los parques nacionales",
        "Asiste a un partido en vivo",
      ],
    },
    ar: {
      title: "الولايات المتحدة",
      description:
        "مدن من الساحل إلى الساحل، ومتنزهات وطنية، وأيام سفر متصلة دائمًا بالإنترنت.",
      thingsToDo: [
        "تجوّل تحت أفق مدينة نيويورك",
        "رحلة برية بين المتنزهات الوطنية",
        "احضر مباراة رياضية مباشرة",
      ],
    },
  },
  canada: {
    es: {
      title: "Canadá",
      description:
        "Pueblos de montaña, región de lagos y ciudades vibrantes y bilingües.",
      thingsToDo: [
        "Explora los senderos de Banff",
        "Pasea por el Viejo Quebec",
        "Visita las cataratas del Niágara",
      ],
    },
    ar: {
      title: "كندا",
      description:
        "بلدات جبلية، ومنطقة البحيرات، ومدن نابضة بالحياة ثنائية اللغة.",
      thingsToDo: [
        "استكشف مسارات بانف",
        "تجوّل في مدينة كيبك القديمة",
        "شاهد شلالات نياجرا",
      ],
    },
  },
  mexico: {
    es: {
      title: "México",
      description:
        "Playas, comida callejera y centros coloniales llenos de color.",
      thingsToDo: [
        "Nada en los cenotes de Yucatán",
        "Come tacos en la CDMX",
        "Explora las ruinas de Tulum",
      ],
    },
    ar: {
      title: "المكسيك",
      description:
        "شواطئ وأطعمة شعبية في الشوارع ومراكز استعمارية مفعمة بالألوان.",
      thingsToDo: [
        "اسبح في سينوتات يوكاتان",
        "تذوّق التاكو في مكسيكو سيتي",
        "استكشف آثار تولوم",
      ],
    },
  },
  brazil: {
    es: {
      title: "Brasil",
      description:
        "Ritmos de samba, bordes de selva tropical y vistas costeras icónicas.",
      thingsToDo: [
        "Atardecer en el Pan de Azúcar",
        "Camina por Copacabana",
        "Visita las cataratas del Iguazú",
      ],
    },
    ar: {
      title: "البرازيل",
      description:
        "إيقاعات السامبا، وأطراف الغابات المطيرة، وإطلالات ساحلية مميزة.",
      thingsToDo: [
        "شاهد الغروب من جبل شوغرلوف",
        "تمشَّ على شاطئ كوباكابانا",
        "زر شلالات إيغواسو",
      ],
    },
  },
  jamaica: {
    es: {
      title: "Jamaica",
      description:
        "Aguas turquesa, noches de reggae y mañanas tranquilas en la isla.",
      thingsToDo: [
        "Día de playa en Negril",
        "Baño en una cascada entre las colinas",
        "Almuerzo jerk frente al mar",
      ],
    },
    ar: {
      title: "جامايكا",
      description:
        "مياه فيروزية، وليالٍ على إيقاع الريغي، وصباحات هادئة في الجزيرة.",
      thingsToDo: [
        "يوم على شاطئ نيغريل",
        "السباحة في شلال وسط التلال",
        "غداء جيرك على الساحل",
      ],
    },
  },
  argentina: {
    es: {
      title: "Argentina",
      description:
        "Noches de parrilla, grandes avenidas y paisajes australes imponentes.",
      thingsToDo: [
        "Recorre los barrios de Buenos Aires",
        "Tarde de café",
        "Excursión de un día a la zona de viñedos",
      ],
    },
    ar: {
      title: "الأرجنتين",
      description:
        "ليالي مطاعم اللحوم المشوية، وشوارع واسعة، ومناظر طبيعية جنوبية مذهلة.",
      thingsToDo: [
        "تجوّل في أحياء بوينس آيرس",
        "جلسة قهوة بعد الظهر",
        "رحلة يومية إلى منطقة مزارع الكروم",
      ],
    },
  },
  colombia: {
    es: {
      title: "Colombia",
      description:
        "Ciudades de montaña, costas caribeñas y una vida de calle cálida.",
      thingsToDo: [
        "Paseo por el centro histórico de Cartagena",
        "Día de cata de café",
        "Noche en una plaza",
      ],
    },
    ar: {
      title: "كولومبيا",
      description:
        "مدن جبلية، وسواحل كاريبية، وحياة شوارع دافئة.",
      thingsToDo: [
        "جولة في المدينة القديمة بقرطاجنة",
        "يوم لتذوّق القهوة",
        "أمسية في إحدى الساحات",
      ],
    },
  },
  chile: {
    es: {
      title: "Chile",
      description:
        "Costas del Pacífico, vistas andinas y largos recorridos panorámicos.",
      thingsToDo: [
        "Paseo por Santiago",
        "Excursión de un día a la costa",
        "Cata de vinos en el valle",
      ],
    },
    ar: {
      title: "تشيلي",
      description:
        "سواحل المحيط الهادئ، وإطلالات جبال الأنديز، ورحلات برية طويلة ذات مناظر خلابة.",
      thingsToDo: [
        "جولة في مدينة سانتياغو",
        "رحلة يومية إلى الساحل",
        "تذوّق النبيذ في الوادي",
      ],
    },
  },
  "north-america-regional": {
    es: {
      title: "Norteamérica",
      description:
        "Estados Unidos, Canadá y México con una sola eSIM: ideal para viajes entre fronteras.",
      thingsToDo: [
        "Road trip por el oeste",
        "De Nueva York a Toronto",
        "Escalas en la Ciudad de México",
      ],
    },
    ar: {
      title: "أمريكا الشمالية",
      description:
        "الولايات المتحدة وكندا والمكسيك بشريحة eSIM واحدة، مثالية للرحلات العابرة للحدود. ثبّتها قبل السفر.",
      thingsToDo: [
        "رحلة برية عبر الغرب",
        "من نيويورك إلى تورنتو",
        "محطات توقف في مكسيكو سيتي",
      ],
    },
  },
  europe: {
    es: {
      title: "Europa",
      description:
        "Una sola eSIM para Francia, Alemania, Italia, España y más.",
      thingsToDo: [
        "Recorre capitales europeas",
        "Viaja en tren entre fronteras",
        "Días de cultura de café",
      ],
    },
    ar: {
      title: "أوروبا",
      description:
        "شريحة eSIM واحدة لفرنسا وألمانيا وإيطاليا وإسبانيا وغيرها، ثبّتها قبل السفر.",
      thingsToDo: [
        "تنقّل بين العواصم الأوروبية",
        "سافر بالقطار عبر الحدود",
        "أيام في أجواء المقاهي",
      ],
    },
  },
  uk: {
    es: {
      title: "Reino Unido",
      description:
        "Calles históricas, escapadas al campo y museos de primer nivel.",
      thingsToDo: [
        "Viaja en el metro de Londres",
        "Excursión de un día a Bath",
        "Camina por las Tierras Altas",
      ],
    },
    ar: {
      title: "المملكة المتحدة",
      description:
        "شوارع تاريخية، وإطلالات ريفية للاسترخاء، ومتاحف عالمية المستوى.",
      thingsToDo: [
        "اركب مترو الأنفاق في لندن",
        "رحلة يومية إلى مدينة باث",
        "تمشَّ في المرتفعات الاسكتلندية",
      ],
    },
  },
  france: {
    es: {
      title: "Francia",
      description:
        "Noches parisinas, la luz de la Riviera y fines de semana en el campo.",
      thingsToDo: [
        "Mañana en el Louvre",
        "Paseo nocturno junto al Sena",
        "Un día en la Provenza",
      ],
    },
    ar: {
      title: "فرنسا",
      description:
        "ليالي باريس، وضوء الريفييرا، وعطلات نهاية الأسبوع في الريف.",
      thingsToDo: [
        "صباح في متحف اللوفر",
        "نزهة مسائية على نهر السين",
        "يوم في بروفانس",
      ],
    },
  },
  germany: {
    es: {
      title: "Alemania",
      description:
        "Castillos, capitales del diseño y traslados eficientes entre ciudades.",
      thingsToDo: [
        "Arte urbano en Berlín",
        "Día en Neuschwanstein",
        "Vistas del río Rin",
      ],
    },
    ar: {
      title: "ألمانيا",
      description:
        "قلاع، وعواصم للتصميم، وتنقّل سلس وفعّال بين المدن.",
      thingsToDo: [
        "فن الشارع في برلين",
        "يوم في قلعة نوي شفانشتاين",
        "إطلالات على نهر الراين",
      ],
    },
  },
  italy: {
    es: {
      title: "Italia",
      description:
        "Calles romanas, luz costera y tardes de café sin prisa.",
      thingsToDo: [
        "Camina por el centro de Roma",
        "Un helado tras una noche en la plaza",
        "Excursión de un día a la costa",
      ],
    },
    ar: {
      title: "إيطاليا",
      description:
        "شوارع روما، وضوء السواحل، وأمسيات المقاهي الهادئة.",
      thingsToDo: [
        "تجوّل في وسط روما",
        "جيلاتو بعد أمسية في الساحة",
        "رحلة يومية إلى الساحل",
      ],
    },
  },
  spain: {
    es: {
      title: "España",
      description:
        "Noches de tapas, mañanas mediterráneas y plazas urbanas llenas de vida.",
      thingsToDo: [
        "Tapas en un barrio local",
        "Mañana de playa en el Mediterráneo",
        "Paseo nocturno por la plaza",
      ],
    },
    ar: {
      title: "إسبانيا",
      description:
        "ليالي التاباس، وصباحات المتوسط، وساحات المدن النابضة بالحياة.",
      thingsToDo: [
        "تذوّق التاباس في حيّ محلي",
        "صباح على شاطئ البحر المتوسط",
        "نزهة مسائية في الساحة",
      ],
    },
  },
  portugal: {
    es: {
      title: "Portugal",
      description:
        "Luz atlántica, calles de azulejos y viajes fáciles en tren entre ciudades.",
      thingsToDo: [
        "Paseo en tranvía por Lisboa",
        "Excursión de un día a Sintra",
        "Atardecer en Oporto",
      ],
    },
    ar: {
      title: "البرتغال",
      description:
        "ضوء الأطلسي، وشوارع مزيّنة بالبلاط، ورحلات قطار سهلة بين المدن.",
      thingsToDo: [
        "جولة بالترام في لشبونة",
        "رحلة يومية إلى سينترا",
        "غروب الشمس في بورتو",
      ],
    },
  },
  netherlands: {
    es: {
      title: "Países Bajos",
      description:
        "Canales, ciclovías y ciudades compactas hechas para caminar sin rumbo.",
      thingsToDo: [
        "Paseo por los canales de Ámsterdam",
        "Excursión de un día a Haarlem",
        "Tarde en Museumplein",
      ],
    },
    ar: {
      title: "هولندا",
      description:
        "قنوات مائية، ومسارات للدراجات، ومدن صغيرة مصمّمة للتجوّل.",
      thingsToDo: [
        "نزهة على قنوات أمستردام",
        "رحلة يومية إلى هارلم",
        "عصرية في ساحة المتاحف",
      ],
    },
  },
  ireland: {
    es: {
      title: "Irlanda",
      description:
        "Acantilados verdes, ciudades amables y días de ruta por la costa.",
      thingsToDo: [
        "Camina por las calles de Dublín",
        "Un día en la costa",
        "Noche de música tradicional",
      ],
    },
    ar: {
      title: "أيرلندا",
      description:
        "جروف خضراء، ومدن ودودة، وأيام على الطرق الساحلية.",
      thingsToDo: [
        "تجوّل في شوارع دبلن",
        "يوم على الساحل",
        "أمسية موسيقى تقليدية",
      ],
    },
  },
  asia: {
    es: {
      title: "Asia-Pacífico",
      description: "Japón, Tailandia, Singapur y más en un solo plan.",
      thingsToDo: [
        "Mañanas en templos",
        "Mercados nocturnos",
        "Saltos en tren bala",
      ],
    },
    ar: {
      title: "آسيا والمحيط الهادئ",
      description:
        "اليابان وتايلاند وسنغافورة وغيرها في باقة واحدة، ثبّتها قبل السفر.",
      thingsToDo: [
        "صباحات في المعابد",
        "أسواق الليل",
        "تنقّل بقطار الشينكانسن السريع",
      ],
    },
  },
  japan: {
    es: {
      title: "Japón",
      description:
        "Ciudades de neón, santuarios tranquilos y transporte impecable en todas partes.",
      thingsToDo: [
        "Cruce de Shibuya",
        "Templos de Kioto",
        "Noche en un onsen",
      ],
    },
    ar: {
      title: "اليابان",
      description:
        "مدن مضيئة بالنيون، وأضرحة هادئة، ووسائل نقل سلسة في كل مكان.",
      thingsToDo: [
        "تقاطع شيبويا",
        "معابد كيوتو",
        "أمسية في الينابيع الساخنة (أونسن)",
      ],
    },
  },
  thailand: {
    es: {
      title: "Tailandia",
      description:
        "Templos dorados, ferris entre islas y una legendaria comida callejera.",
      thingsToDo: [
        "Mercado nocturno de Bangkok",
        "Salta entre islas en Phuket",
        "Visita Chiang Mai",
      ],
    },
    ar: {
      title: "تايلاند",
      description:
        "معابد ذهبية، وعبّارات بين الجزر، وأطعمة شوارع أسطورية.",
      thingsToDo: [
        "سوق بانكوك الليلي",
        "التنقّل بين جزر بوكيت",
        "زيارة شيانغ ماي",
      ],
    },
  },
  china: {
    es: {
      title: "China",
      description:
        "Murallas milenarias, rascacielos futuristas y una energía urbana sin fin.",
      thingsToDo: [
        "Camina por la Gran Muralla",
        "El Bund de Shanghái",
        "Parada en una casa de té",
      ],
    },
    ar: {
      title: "الصين",
      description:
        "أسوار عريقة، وأفق مستقبلي، وحيوية لا تنتهي في المدن.",
      thingsToDo: [
        "تمشَّ على سور الصين العظيم",
        "واجهة البند في شنغهاي",
        "استراحة في بيت شاي",
      ],
    },
  },
  india: {
    es: {
      title: "India",
      description:
        "Color, especias y ciudades que premian los paseos sin prisa.",
      thingsToDo: [
        "Amanecer en un sitio patrimonial",
        "Noche de comida callejera",
        "Día en tren entre ciudades",
      ],
    },
    ar: {
      title: "الهند",
      description:
        "ألوان وتوابل ومدن تكافئ من يتجوّل فيها على مهل.",
      thingsToDo: [
        "شروق الشمس عند موقع تراثي",
        "أمسية لتذوّق أطعمة الشوارع",
        "يوم بالقطار بين المدن",
      ],
    },
  },
  australia: {
    es: {
      title: "Australia",
      description:
        "Ciudades portuarias, caminatas costeras y road trips por paisajes abiertos.",
      thingsToDo: [
        "Paseo en ferry por la bahía",
        "Caminata costera",
        "Mañana de café en la ciudad",
      ],
    },
    ar: {
      title: "أستراليا",
      description:
        "مدن مرفئية، ومسارات مشي ساحلية، ورحلات برية في مساحات مفتوحة.",
      thingsToDo: [
        "رحلة بالعبّارة في الميناء",
        "نزهة على الساحل",
        "صباح في مقهى وسط المدينة",
      ],
    },
  },
  singapore: {
    es: {
      title: "Singapur",
      description:
        "Noches en la ciudad jardín, sabores de los hawker y transporte fácil.",
      thingsToDo: [
        "Cena en un hawker centre",
        "Gardens by the Bay",
        "Paseo por el barrio",
      ],
    },
    ar: {
      title: "سنغافورة",
      description:
        "ليالي مدينة الحدائق، ونكهات مراكز الطعام الشعبية، وتنقّل سهل.",
      thingsToDo: [
        "عشاء في مركز طعام شعبي (هوكر)",
        "حدائق الخليج",
        "جولة في أحد الأحياء",
      ],
    },
  },
  indonesia: {
    es: {
      title: "Indonesia",
      description:
        "Mañanas en la isla, visitas a templos y mercados cálidos al anochecer.",
      thingsToDo: [
        "Amanecer en un templo",
        "Tarde de playa",
        "Cena en un warung local",
      ],
    },
    ar: {
      title: "إندونيسيا",
      description:
        "صباحات على الجزر، وزيارات للمعابد، وأسواق مسائية دافئة.",
      thingsToDo: [
        "شروق الشمس عند أحد المعابد",
        "عصرية على الشاطئ",
        "عشاء في مطعم «وارونغ» محلي",
      ],
    },
  },
  "south-korea": {
    es: {
      title: "Corea del Sur",
      description:
        "Noches en Seúl, jardines de palacios y viajes rápidos entre ciudades.",
      thingsToDo: [
        "Mañana en un palacio",
        "Snacks en el mercado nocturno",
        "Excursión de un día en KTX",
      ],
    },
    ar: {
      title: "كوريا الجنوبية",
      description:
        "ليالي سيول، وساحات القصور، وتنقّل سريع بين المدن.",
      thingsToDo: [
        "صباح في أحد القصور",
        "وجبات خفيفة في سوق الليل",
        "رحلة يومية بقطار KTX",
      ],
    },
  },
  "middle-east": {
    es: {
      title: "Medio Oriente",
      description:
        "Emiratos, Turquía, Arabia Saudita y más con un solo plan regional.",
      thingsToDo: [
        "Noches en el desierto",
        "Zocos de ciudades antiguas",
        "Noches con el skyline del Golfo",
      ],
    },
    ar: {
      title: "الشرق الأوسط",
      description:
        "الإمارات وتركيا والمملكة العربية السعودية وغيرها في باقة إقليمية واحدة، جاهزة قبل السفر.",
      thingsToDo: [
        "أمسيات في الصحراء",
        "أسواق المدن القديمة",
        "ليالٍ مع أفق مدن الخليج",
      ],
    },
  },
  caribbean: {
    es: {
      title: "Caribe",
      description:
        "Bahamas, Jamaica, República Dominicana y más de 20 islas con una sola eSIM.",
      thingsToDo: [
        "Salta de isla en isla",
        "Resorts frente al mar",
        "Escalas de crucero",
      ],
    },
    ar: {
      title: "الكاريبي",
      description:
        "جزر البهاما وجامايكا وجمهورية الدومينيكان وأكثر من 20 جزيرة بشريحة eSIM واحدة، ثبّتها قبل السفر.",
      thingsToDo: [
        "التنقّل بين الجزر",
        "منتجعات شاطئية",
        "محطات توقف الرحلات البحرية",
      ],
    },
  },
  turkey: {
    es: {
      title: "Turquía",
      description:
        "Donde se encuentran los continentes: bazares, costas y amaneceres en globo.",
      thingsToDo: [
        "Gran Bazar",
        "Crucero por el Bósforo",
        "Globos en Capadocia",
      ],
    },
    ar: {
      title: "تركيا",
      description:
        "حيث تلتقي القارتان: أسواق عتيقة، وسواحل خلابة، وفجر في أجواء المناطيد.",
      thingsToDo: [
        "البازار الكبير",
        "رحلة بحرية في البوسفور",
        "مناطيد كابادوكيا",
      ],
    },
  },
  "saudi-arabia": {
    es: {
      title: "Arabia Saudita",
      description:
        "Viajes sagrados a Meca y Medina, además de la moderna Riad.",
      thingsToDo: [
        "Viajes de Umrah y Hajj",
        "Visita AlUla",
        "Patrimonio de Diriyah",
      ],
    },
    ar: {
      title: "المملكة العربية السعودية",
      description:
        "رحلات روحانية إلى مكة المكرمة والمدينة المنورة، إضافةً إلى الرياض العصرية. ثبّت شريحتك قبل السفر.",
      thingsToDo: [
        "رحلات العمرة والحج",
        "زيارة العلا",
        "تراث الدرعية",
      ],
    },
  },
  uae: {
    es: {
      title: "Emiratos Árabes Unidos",
      description:
        "Dunas del desierto, noches en la marina y monumentos famosos en todo el mundo.",
      thingsToDo: [
        "Vista desde el Burj Khalifa",
        "Safari por el desierto",
        "Mezquitas de Abu Dabi",
      ],
    },
    ar: {
      title: "الإمارات",
      description:
        "كثبان صحراوية، وليالي المارينا، ومعالم مشهورة عالميًا.",
      thingsToDo: [
        "إطلالة من برج خليفة",
        "سفاري الصحراء",
        "مساجد أبوظبي",
      ],
    },
  },
  egypt: {
    es: {
      title: "Egipto",
      description:
        "Ciudades a orillas del Nilo, sitios antiguos y calles cálidas al anochecer.",
      thingsToDo: [
        "Paseo al atardecer junto al Nilo",
        "Mañana en el museo",
        "Exploración de El Cairo antiguo",
      ],
    },
    ar: {
      title: "مصر",
      description:
        "مدن على ضفاف النيل، ومواقع أثرية، وشوارع دافئة في المساء.",
      thingsToDo: [
        "نزهة مسائية على النيل",
        "صباح في المتحف",
        "استكشاف القاهرة القديمة",
      ],
    },
  },
  qatar: {
    es: {
      title: "Catar",
      description:
        "Frentes marítimos modernos, días de museos y traslados fáciles entre ciudades.",
      thingsToDo: [
        "Paseo por la Corniche",
        "Museo de Arte Islámico",
        "Noche en el zoco",
      ],
    },
    ar: {
      title: "قطر",
      description:
        "واجهات بحرية عصرية، وأيام في المتاحف، وتنقّل سهل بين المدن.",
      thingsToDo: [
        "نزهة على الكورنيش",
        "متحف الفن الإسلامي",
        "أمسية في السوق",
      ],
    },
  },
  jordan: {
    es: {
      title: "Jordania",
      description:
        "Amaneceres en Petra, silencio del desierto y cafés acogedores en la ciudad.",
      thingsToDo: [
        "Mañana en Petra",
        "Parada en un café de Amán",
        "Noche en Wadi Rum",
      ],
    },
    ar: {
      title: "الأردن",
      description:
        "فجر البتراء، وسكون الصحراء، ومقاهٍ مضيافة في المدن.",
      thingsToDo: [
        "صباح في البتراء",
        "استراحة في مقهى بعمّان",
        "أمسية في وادي رم",
      ],
    },
  },
  kuwait: {
    es: {
      title: "Kuwait",
      description:
        "Vistas del skyline del Golfo, paseos costeros y días en una ciudad moderna.",
      thingsToDo: [
        "Paseo por el malecón",
        "Tarde en un museo",
        "Vista nocturna del skyline",
      ],
    },
    ar: {
      title: "الكويت",
      description:
        "إطلالات على أفق الخليج، ونزهات ساحلية، وأيام في مدينة عصرية.",
      thingsToDo: [
        "نزهة على الواجهة البحرية",
        "عصرية في أحد المتاحف",
        "إطلالة مسائية على أفق المدينة",
      ],
    },
  },
  bahrain: {
    es: {
      title: "Baréin",
      description:
        "La energía de una capital isleña, callejones de zocos y un ritmo tranquilo de fin de semana.",
      thingsToDo: [
        "Paseo por el zoco",
        "Visita a un fuerte",
        "Noche frente al mar",
      ],
    },
    ar: {
      title: "البحرين",
      description:
        "حيوية عاصمة جزرية، وأزقّة الأسواق، وإيقاع هادئ لعطلة نهاية الأسبوع.",
      thingsToDo: [
        "جولة في السوق",
        "زيارة قلعة",
        "أمسية على الواجهة البحرية",
      ],
    },
  },
  morocco: {
    es: {
      title: "Marruecos",
      description:
        "Callejones de la medina, té en las azoteas y la luz del Atlas en el horizonte.",
      thingsToDo: [
        "Caminata matutina por la medina",
        "Té en una azotea",
        "Excursión de un día a la costa",
      ],
    },
    ar: {
      title: "المغرب",
      description:
        "أزقّة المدينة القديمة، وشاي على الأسطح، وضوء جبال الأطلس في الأفق.",
      thingsToDo: [
        "جولة صباحية في المدينة القديمة",
        "شاي على سطح المنزل",
        "رحلة يومية إلى الساحل",
      ],
    },
  },
  "south-africa": {
    es: {
      title: "Sudáfrica",
      description:
        "Luz del Cabo, montañas en el horizonte y barrios urbanos llenos de vida.",
      thingsToDo: [
        "Vistas de Table Mountain",
        "Paseo por el Waterfront",
        "Día en el valle del vino",
      ],
    },
    ar: {
      title: "جنوب أفريقيا",
      description:
        "ضوء الكيب، وجبال في الأفق، وأحياء مدن نابضة بالحياة.",
      thingsToDo: [
        "إطلالات من جبل الطاولة",
        "نزهة على الواجهة البحرية",
        "يوم في وادي النبيذ",
      ],
    },
  },
  nigeria: {
    es: {
      title: "Nigeria",
      description:
        "La energía de Lagos, brisa costera y vibrantes distritos creativos.",
      thingsToDo: [
        "Paseo por los barrios de la ciudad",
        "Noche de comida local",
        "Tarde frente al mar",
      ],
    },
    ar: {
      title: "نيجيريا",
      description:
        "حيوية لاغوس، ونسيم الساحل، وأحياء إبداعية نابضة بالحياة.",
      thingsToDo: [
        "جولة في أحياء المدينة",
        "أمسية لتذوّق الطعام المحلي",
        "عصرية على الواجهة البحرية",
      ],
    },
  },
  "africa-regional": {
    es: {
      title: "África",
      description:
        "Sudáfrica, Marruecos, Kenia y más con un solo plan regional.",
      thingsToDo: [
        "La costa de Ciudad del Cabo",
        "La medina de Marrakech",
        "Recorridos de safari",
      ],
    },
    ar: {
      title: "أفريقيا",
      description:
        "جنوب أفريقيا والمغرب وكينيا وغيرها في باقة إقليمية واحدة، جاهزة قبل السفر.",
      thingsToDo: [
        "ساحل كيب تاون",
        "المدينة القديمة في مراكش",
        "جولات السفاري",
      ],
    },
  },
  "south-america-regional": {
    es: {
      title: "Sudamérica",
      description:
        "Brasil, Argentina, Chile y más: una sola eSIM para toda la región.",
      thingsToDo: [
        "Miradores de Río",
        "Senderos de la Patagonia",
        "Ciudades andinas",
      ],
    },
    ar: {
      title: "أمريكا الجنوبية",
      description:
        "البرازيل والأرجنتين وتشيلي وغيرها: شريحة eSIM واحدة للمنطقة بأكملها، ثبّتها قبل السفر.",
      thingsToDo: [
        "إطلالات ريو دي جانيرو",
        "مسارات باتاغونيا",
        "مدن جبال الأنديز",
      ],
    },
  },
  "global-regional": {
    es: {
      title: "Global",
      description:
        "Un solo plan para viajes largos por Europa, América, Asia y más.",
      thingsToDo: [
        "Viajes de negocios por varias regiones",
        "Tramos de vuelta al mundo",
        "Escalas de viajero frecuente",
      ],
    },
    ar: {
      title: "عالمي",
      description:
        "باقة واحدة للرحلات الطويلة التي تشمل أوروبا والأمريكتين وآسيا وغيرها، ثبّتها قبل السفر.",
      thingsToDo: [
        "رحلات عمل متعددة المناطق",
        "محطات رحلة حول العالم",
        "تنقّلات المسافرين الدائمين",
      ],
    },
  },
};

/** Generic copy used for template-generated cards (not in the curated catalog). */
const GENERIC_TIPS_EN = [
  "Stay connected on arrival",
  "Use maps and rideshares",
  "Share photos without roaming fees",
];

const GENERIC_COPY: Record<
  TranslatedLocale,
  {
    instant: (name: string) => string;
    generated: (name: string) => string;
    thingsToDo: string[];
  }
> = {
  es: {
    instant: (name) =>
      `Datos eSIM al instante para ${name}. Al abrir esta tarjeta verás planes en vivo que puedes comprar.`,
    generated: (name) =>
      `Planes eSIM para ${name}. Los planes en vivo se generan desde nuestro catálogo regional.`,
    thingsToDo: [
      "Conéctate apenas llegues",
      "Usa mapas y apps de transporte",
      "Comparte fotos sin cargos de roaming",
    ],
  },
  ar: {
    instant: (name) =>
      `بيانات eSIM فورية لوجهة ${name}. ثبّتها قبل السفر، وعند فتح هذه البطاقة ستظهر لك باقات متاحة للشراء مباشرة.`,
    generated: (name) =>
      `باقات eSIM لوجهة ${name}. تُنشأ الباقات المتاحة من كتالوجنا الإقليمي، وهي جاهزة قبل السفر.`,
    thingsToDo: [
      "ابقَ متصلًا فور وصولك",
      "استخدم الخرائط وتطبيقات التوصيل",
      "شارك صورك دون رسوم تجوال",
    ],
  },
};

function sameTips(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((tip, i) => tip === b[i]);
}

/** Localized `{ title, description, thingsToDo }` for a curated card id, if any. */
export function getDestinationCopy(
  id: string,
  locale?: Locale | string | null,
): DestinationCopy | null {
  const loc = normalizeLocale(locale);
  if (loc === "en") return null;
  return DESTINATION_COPY[id]?.[loc] ?? null;
}

/**
 * Overlay localized title / description / thingsToDo on a destination card.
 * English returns the card unchanged. Template-generated cards (not curated)
 * keep their English title but get localized generic blurbs.
 */
export function localizeDestinationCard<T extends DestinationCard>(
  card: T,
  locale?: Locale | string | null,
): T {
  const loc = normalizeLocale(locale);
  if (loc === "en") return card;

  const copy = DESTINATION_COPY[card.id]?.[loc];
  if (copy) {
    return {
      ...card,
      title: copy.title,
      description: copy.description,
      thingsToDo: [...copy.thingsToDo],
    };
  }

  const generic = GENERIC_COPY[loc];
  let description = card.description;
  if (card.description.startsWith("Instant eSIM data for ")) {
    description = generic.instant(card.title);
  } else if (card.description.startsWith("eSIM plans for ")) {
    description = generic.generated(card.title);
  }
  const thingsToDo = sameTips(card.thingsToDo, GENERIC_TIPS_EN)
    ? [...generic.thingsToDo]
    : card.thingsToDo;

  if (description === card.description && thingsToDo === card.thingsToDo) {
    return card;
  }
  return { ...card, description, thingsToDo };
}
