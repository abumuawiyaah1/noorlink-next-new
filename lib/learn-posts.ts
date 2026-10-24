import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export type LearnTopic =
  | "Family travel"
  | "On the ground"
  | "Before you fly"
  | "Umrah & Hajj";

export type LearnLink = { href: string; label: string };

export type LearnPostCopy = {
  title: string;
  description: string;
  topic: string;
  excerpt: string;
  paragraphs: string[];
  pivotTitle: string;
  pivot: string;
  links: LearnLink[];
};

export type LearnPost = {
  slug: string;
  published: string;
  /** English topic key kept for grouping; display topic comes from locale copy. */
  topicKey: LearnTopic;
  en: LearnPostCopy;
  es: LearnPostCopy;
  ar: LearnPostCopy;
};

export type LocalizedLearnPost = LearnPostCopy & {
  slug: string;
  published: string;
  topicKey: LearnTopic;
};

const readyForUmrahEn: LearnPostCopy = {
  title: "Are you ready for Umrah?",
  description:
    "Spiritual and physical steps to prepare for Makkah before Umrah season, from intention and duas to walking, documents, and a family meeting point.",
  topic: "Umrah & Hajj",
  excerpt:
    "What have you actually done to prepare for Makkah? A short list for the worship, and for the body that has to walk it.",
  paragraphs: [
    "Are you ready for Umrah? The more useful question is simpler: what have you actually done to prepare for Makkah?",
    "The days there move quickly. Tawaf, sa'i, the heat, the crowds, and the people you are traveling with. Travelers who feel calm usually did a little work at home, in two parts: the worship, and the body.",
    "Start with the spiritual side. Set your intention and keep it simple. You are going to worship, not to collect photos. Learn the order of Umrah before you fly: ihram, tawaf, sa'i, then shaving or trimming the hair. A short lesson from someone you trust is enough. Memorize a few duas and the Talbiyah, so you are not reading everything off a screen in the crowd. Make peace where you can. Pay what you owe. Ask forgiveness. Leave the house lighter than you arrived in it. And decide now to be patient. The Haram is full. Delays are part of the trip.",
    "Then the physical side. Walk. Tawaf and sa'i are distance, often in heat, and a few weeks of daily walking helps more than new shoes on the day you land. Pack what you will wear: ihram for men, modest comfortable clothes for women, and sandals you have already walked in. Bring the medicine you use at home, and anything you need for standing a long time. Put your documents in one place: passport, visa, hotel, and the group plan if you are not traveling alone.",
    "Know how you will meet your family if you get separated. A meeting point is a plan. “I’ll just call” is not a plan until you have landed and the phone works.",
  ],
  pivotTitle: "Worship first, logistics in the background",
  pivot:
    "Umrah is worship first. Preparation is how you keep the logistics out of the prayer. If the phone is part of your meeting plan, set it up on Wi‑Fi at home, then use the Umrah guide so arrival is not a settings lesson.",
  links: [
    { href: "/help/umrah-esim-before-you-fly", label: "Umrah steps before you fly" },
    { href: "/hajj-umrah", label: "Pilgrimage plans" },
    { href: "/help/hajj-umrah-phone-check", label: "Phone check" },
  ],
};

export const LEARN_POSTS: LearnPost[] = [
  {
    slug: "ready-for-umrah",
    published: "2026-09-28",
    topicKey: "Umrah & Hajj",
    en: readyForUmrahEn,
    es: {
      title: "¿Estás listo para la Umrah?",
      description:
        "Pasos espirituales y físicos para prepararte para Meca antes de la temporada de Umrah: intención, duas, caminar, documentos y un punto de encuentro familiar.",
      topic: "Umrah y Hajj",
      excerpt:
        "¿Qué has hecho de verdad para prepararte para Meca? Una lista corta para la adoración y para el cuerpo que debe caminarla.",
      paragraphs: [
        "¿Estás listo para la Umrah? La pregunta más útil es más simple: ¿qué has hecho de verdad para prepararte para Meca?",
        "Los días allá pasan rápido. Tawaf, sa'i, el calor, las multitudes y las personas con las que viajas. Quienes se sienten tranquilos casi siempre hicieron un poco de trabajo en casa, en dos partes: la adoración y el cuerpo.",
        "Empieza por lo espiritual. Fija tu intención y mantenla simple. Vas a adorar, no a juntar fotos. Aprende el orden de la Umrah antes de viajar: ihram, tawaf, sa'i y luego afeitar o recortar el cabello. Una lección breve de alguien de confianza alcanza. Memoriza unas cuantas duas y la Talbiyah, para no leerlo todo en la pantalla en medio de la multitud. Haz las paces donde puedas. Paga lo que debas. Pide perdón. Sal de casa más ligero de como llegaste. Y decide ya ser paciente. El Haram está lleno. Las demoras son parte del viaje.",
        "Luego lo físico. Camina. El tawaf y el sa'i son distancia, a menudo con calor, y unas semanas de caminata diaria ayudan más que zapatos nuevos el día que aterrizas. Empaca lo que vas a usar: ihram para hombres, ropa modesta y cómoda para mujeres, y sandalias en las que ya hayas caminado. Lleva la medicina que usas en casa y lo que necesites para estar de pie mucho tiempo. Pon tus documentos en un solo lugar: pasaporte, visa, hotel y el plan del grupo si no viajas solo.",
        "Sabe cómo te reunirás con tu familia si se separan. Un punto de encuentro es un plan. “Ya te llamo” no es un plan hasta que hayas aterrizado y el teléfono funcione.",
      ],
      pivotTitle: "La adoración primero, la logística en segundo plano",
      pivot:
        "La Umrah es adoración primero. Prepararte es cómo mantienes la logística fuera de la oración. Si el teléfono es parte de tu plan de encuentro, configúralo en el Wi‑Fi de casa y usa la guía de Umrah para que la llegada no sea una clase de ajustes.",
      links: [
        {
          href: "/help/umrah-esim-before-you-fly",
          label: "Pasos de Umrah antes de viajar",
        },
        { href: "/hajj-umrah", label: "Planes de peregrinación" },
        { href: "/help/hajj-umrah-phone-check", label: "Revisión del teléfono" },
      ],
    },
    ar: {
      title: "هل أنت مستعد للعمرة؟",
      description:
        "خطوات روحية وجسدية للتحضير لمكة قبل موسم العمرة: النيّة والأدعية والمشي والوثائق ونقطة لقاء عائلية.",
      topic: "العمرة والحج",
      excerpt:
        "ماذا فعلت فعليًا للتحضير لمكة؟ قائمة قصيرة للعبادة وللجسد الذي سيمشيها.",
      paragraphs: [
        "هل أنت مستعد للعمرة؟ السؤال الأجدى أبسط: ماذا فعلت فعليًا للتحضير لمكة؟",
        "الأيام هناك تمر سريعًا. الطواف والسعي والحر والزحام ومن تسافر معهم. من يشعر بالهدوء عادةً عمل قليلًا في البيت على جزءين: العبادة والجسد.",
        "ابدأ بالجانب الروحي. حدّد نيّتك وأبقِها بسيطة. تذهب للعبادة لا لجمع الصور. تعلّم ترتيب العمرة قبل السفر: الإحرام والطواف والسعي ثم الحلق أو التقصير. درس قصير ممن تثق به يكفي. احفظ بعض الأدعية والتلبية حتى لا تقرأ كل شيء من الشاشة وسط الزحام. أصلح ما استطعت. أدِّ ما عليك. اطلب المغفرة. اخرج من البيت أخف مما دخلت. وقرّر الآن أن تصبر. الحرم ممتلئ. والتأخير جزء من الرحلة.",
        "ثم الجانب الجسدي. امشِ. الطواف والسعي مسافة، غالبًا في الحر، وأسابيع من المشي اليومي تساعد أكثر من حذاء جديد يوم الهبوط. جهّز ما سترتديه: إحرام للرجال وملابس محتشمة مريحة للنساء وصنادل مشيت بها من قبل. خذ دواءك المعتاد وما تحتاجه للوقوف طويلًا. ضع وثائقك في مكان واحد: جواز السفر والتأشيرة والفندق وخطة المجموعة إن لم تسافر وحدك.",
        "اعرف كيف تلتقي بعائلتك إن تفرّقتم. نقطة اللقاء خطة. «سأتصل فقط» ليست خطة حتى تهبط ويعمل الهاتف.",
      ],
      pivotTitle: "العبادة أولًا واللوجستيات في الخلفية",
      pivot:
        "العمرة عبادة أولًا. التحضير هو كيف تُبقي اللوجستيات خارج الصلاة. إن كان الهاتف جزءًا من خطة اللقاء، جهّزه على Wi‑Fi المنزل ثم استخدم دليل العمرة حتى لا يكون الوصول درس إعدادات.",
      links: [
        {
          href: "/help/umrah-esim-before-you-fly",
          label: "خطوات العمرة قبل السفر",
        },
        { href: "/hajj-umrah", label: "خطط الحج والعمرة" },
        { href: "/help/hajj-umrah-phone-check", label: "فحص الهاتف" },
      ],
    },
  },
  {
    slug: "egypt-without-internet",
    published: "2026-09-24",
    topicKey: "Family travel",
    en: {
      title: "Our family landed in Egypt with no internet",
      description:
        "A family arrival with no data: airport Wi‑Fi for a ride, roaming that cost too much, and an eSIM with no one to ask.",
      topic: "Family travel",
      excerpt:
        "Maps would not load. Messages home would not send. The first day became a hunt for connection instead of the trip we came for.",
      paragraphs: [
        "When our family went to Egypt, we landed without a working phone line and no internet. In this era, almost everything needs data. Maps, a ride, a message to say you landed — those are the simple things that make travel feel safe, and they disappeared the moment we stepped into the arrivals hall.",
        "The first day we paid for Wi‑Fi at the airport just to order an Uber and reach people back home. Then came the dilemma. Call our telephone provider for roaming, and it was too expensive. Buy a plastic SIM, and we would have to hunt for one. Someone told us about eSIM. We ended up buying one, but we had no real support when we needed help.",
        "That trip stayed with us. Travel should be about the places you came to see, not about losing connection the moment you need directions, a ride, or a check-in with family.",
      ],
      pivotTitle: "What we would do on the next trip",
      pivot:
        "Buy a plan before you fly, install it on Wi‑Fi at home, and land with working data. That is the whole lesson behind NoorLink: the plan, a clear way to set it up, and someone to message if something feels confusing. Egypt is still a beautiful trip. The phone should stay in the background.",
      links: [
        { href: "/destinations", label: "See Egypt and other plans" },
        { href: "/help/before-you-fly", label: "Install before you fly" },
        { href: "/about", label: "Read why we built NoorLink" },
      ],
    },
    es: {
      title: "Nuestra familia aterrizó en Egipto sin internet",
      description:
        "Una llegada en familia sin datos: Wi‑Fi del aeropuerto para un viaje, roaming demasiado caro y una eSIM sin a quién preguntar.",
      topic: "Viaje en familia",
      excerpt:
        "Los mapas no cargaban. Los mensajes a casa no salían. El primer día se volvió una búsqueda de conexión en lugar del viaje que vinimos a hacer.",
      paragraphs: [
        "Cuando nuestra familia fue a Egipto, aterrizamos sin una línea que funcionara y sin internet. En esta era, casi todo necesita datos. Mapas, un viaje, un mensaje para decir que llegaste: son las cosas simples que hacen que el viaje se sienta seguro, y desaparecieron en cuanto entramos a la sala de llegadas.",
        "El primer día pagamos Wi‑Fi en el aeropuerto solo para pedir un Uber y avisar a casa. Luego vino el dilema. Llamar a nuestra compañía por roaming era demasiado caro. Comprar una SIM plástica significaba salir a buscarla. Alguien nos habló de eSIM. Terminamos comprando una, pero no tuvimos soporte real cuando necesitamos ayuda.",
        "Ese viaje se nos quedó. Viajar debería ser sobre los lugares que viniste a ver, no sobre perder la conexión justo cuando necesitas direcciones, un viaje o avisar a la familia.",
      ],
      pivotTitle: "Lo que haríamos en el próximo viaje",
      pivot:
        "Compra un plan antes de viajar, instálalo en el Wi‑Fi de casa y aterriza con datos funcionando. Esa es toda la lección detrás de NoorLink: el plan, una forma clara de configurarlo y alguien a quien escribir si algo confunde. Egipto sigue siendo un viaje hermoso. El teléfono debería quedarse en segundo plano.",
      links: [
        { href: "/destinations", label: "Ver Egipto y otros planes" },
        { href: "/help/before-you-fly", label: "Instálala antes de viajar" },
        { href: "/about", label: "Por qué construimos NoorLink" },
      ],
    },
    ar: {
      title: "هبطت عائلتنا في مصر بلا إنترنت",
      description:
        "وصول عائلي بلا بيانات: Wi‑Fi المطار لطلب رحلة، وتجوال باهظ، وeSIM بلا من يسأل.",
      topic: "سفر العائلة",
      excerpt:
        "الخرائط لا تُحمَّل. الرسائل إلى البيت لا تُرسل. صار اليوم الأول بحثًا عن اتصال بدل الرحلة التي جئنا لأجلها.",
      paragraphs: [
        "عندما ذهبت عائلتنا إلى مصر، هبطنا بلا خط يعمل وبلا إنترنت. في هذا العصر، يكاد كل شيء يحتاج بيانات. الخرائط وطلب رحلة ورسالة تقول إنك وصلت — أشياء بسيطة تجعل السفر آمنًا، واختفت لحظة دخولنا صالة الوصول.",
        "في اليوم الأول دفعنا مقابل Wi‑Fi في المطار فقط لطلب أوبر وإخبار أهلنا. ثم جاء الحرج: الاتصال بشركتنا للتجوال كان غاليًا جدًا. شراء شريحة بلاستيكية يعني البحث عنها. أخبرنا أحدهم عن eSIM. اشترينا واحدة، لكن لم يكن لدينا دعم حقيقي حين احتجنا المساعدة.",
        "بقيت تلك الرحلة معنا. يجب أن يكون السفر عن الأماكن التي جئت لتراها، لا عن فقدان الاتصال لحظة احتياجك للاتجاهات أو رحلة أو طمأنة العائلة.",
      ],
      pivotTitle: "ما الذي سنفعله في الرحلة التالية",
      pivot:
        "اشترِ خطة قبل السفر، وثبّتها على Wi‑Fi المنزل، واهبط ببيانات تعمل. هذا درس NoorLink كله: الخطة، وطريقة واضحة للإعداد، وشخص تراسله إن التبس أمر. مصر ما زالت رحلة جميلة. وينبغي أن يبقى الهاتف في الخلفية.",
      links: [
        { href: "/destinations", label: "شاهد مصر وخططًا أخرى" },
        { href: "/help/before-you-fly", label: "ثبّت قبل السفر" },
        { href: "/about", label: "لماذا بنينا NoorLink" },
      ],
    },
  },
  {
    slug: "first-hour-after-you-land",
    published: "2026-09-25",
    topicKey: "On the ground",
    en: {
      title: "The first hour after you land",
      description:
        "The hour between the plane and the hotel is when maps, rides, and family messages matter most.",
      topic: "On the ground",
      excerpt:
        "Passport, bags, a ride, a text home. That hour is easier when the phone already has data.",
      paragraphs: [
        "The first hour in a new city is rarely the sightseeing. It is the exit, the bags, the person meeting you, or the ride you still need to book. Tired travelers make small decisions quickly, and most of those decisions need a map or a message.",
        "Hotel Wi‑Fi does not help in the arrivals hall. Airport café Wi‑Fi is a pause, not a plan. Roaming is there, and the bill shows up later. A local SIM shop can eat the part of the day you meant to spend getting to where you are staying.",
        "Families feel this more than solo travelers. If you split up at baggage claim, the phone is how you find each other again.",
      ],
      pivotTitle: "Prepare the phone before that hour",
      pivot:
        "The calm version is boring, which is the point. Install the travel line on home Wi‑Fi. When you land, the data line is already the one your phone uses. You are not learning a new setup next to a taxi queue.",
      links: [
        { href: "/learn/installed-is-not-ready", label: "Installed is not the same as ready" },
        { href: "/help/before-you-fly", label: "The before-you-fly steps" },
        { href: "/destinations", label: "Pick a destination" },
      ],
    },
    es: {
      title: "La primera hora después de aterrizar",
      description:
        "La hora entre el avión y el hotel es cuando más importan los mapas, los viajes y los mensajes a la familia.",
      topic: "En destino",
      excerpt:
        "Pasaporte, maletas, un viaje, un mensaje a casa. Esa hora es más fácil cuando el teléfono ya tiene datos.",
      paragraphs: [
        "La primera hora en una ciudad nueva rara vez es turismo. Es la salida, las maletas, quien te espera o el viaje que aún debes pedir. Los viajeros cansados toman decisiones pequeñas rápido, y la mayoría necesita un mapa o un mensaje.",
        "El Wi‑Fi del hotel no ayuda en la sala de llegadas. El Wi‑Fi del café del aeropuerto es una pausa, no un plan. El roaming está ahí y la factura llega después. Una tienda de SIM local puede comerse la parte del día que querías usar para llegar a donde te hospedas.",
        "Las familias lo sienten más que quien viaja solo. Si se separan en la cinta de equipaje, el teléfono es cómo se encuentran otra vez.",
      ],
      pivotTitle: "Prepara el teléfono antes de esa hora",
      pivot:
        "La versión calmada es aburrida, y ese es el punto. Instala la línea de viaje en el Wi‑Fi de casa. Cuando aterrizas, la línea de datos ya es la que usa tu teléfono. No estás aprendiendo una configuración nueva junto a la fila de taxis.",
      links: [
        {
          href: "/learn/installed-is-not-ready",
          label: "Instalada no es lo mismo que lista",
        },
        { href: "/help/before-you-fly", label: "Los pasos antes de viajar" },
        { href: "/destinations", label: "Elige un destino" },
      ],
    },
    ar: {
      title: "الساعة الأولى بعد الهبوط",
      description:
        "الساعة بين الطائرة والفندق هي حين تهمّ الخرائط والرحلات ورسائل العائلة أكثر.",
      topic: "على الأرض",
      excerpt:
        "جواز، حقائب، رحلة، رسالة للبيت. تلك الساعة أسهل حين يكون للهاتف بيانات مسبقًا.",
      paragraphs: [
        "الساعة الأولى في مدينة جديدة نادرًا ما تكون للمشاهدة. هي الخروج والحقائب ومن يستقبلك أو الرحلة التي ما زلت تحتاج حجزها. المسافرون المتعبون يتخذون قرارات صغيرة بسرعة، ومعظمها يحتاج خريطة أو رسالة.",
        "Wi‑Fi الفندق لا يساعد في صالة الوصول. Wi‑Fi مقهى المطار وقفة لا خطة. التجوال موجود والفاتورة تأتي لاحقًا. محل شريحة محلية قد يأكل جزء اليوم الذي أردت قضاءه في الوصول إلى مكان إقامتك.",
        "العائلات تشعر بهذا أكثر من المسافر وحده. إن تفرّقتم عند استلام الحقائب، الهاتف هو كيف تجدون بعضكم.",
      ],
      pivotTitle: "جهّز الهاتف قبل تلك الساعة",
      pivot:
        "النسخة الهادئة مملّة، وهذا هو المقصود. ثبّت خط السفر على Wi‑Fi المنزل. عند الهبوط، يكون خط البيانات هو ما يستخدمه هاتفك بالفعل. لست تتعلّم إعدادًا جديدًا بجانب طابور التاكسي.",
      links: [
        {
          href: "/learn/installed-is-not-ready",
          label: "مثبّتة ليست جاهزة",
        },
        { href: "/help/before-you-fly", label: "خطوات ما قبل السفر" },
        { href: "/destinations", label: "اختر وجهة" },
      ],
    },
  },
  {
    slug: "two-checks-before-your-phone-travels",
    published: "2026-09-25",
    topicKey: "Before you fly",
    en: {
      title: "Two checks before your phone travels",
      description:
        "A travel phone needs two things: eSIM support, and a carrier unlock. One without the other still leaves you stuck.",
      topic: "Before you fly",
      excerpt:
        "Compatible and unlocked are two different checks. Most airport surprises come from treating them as one.",
      paragraphs: [
        "People say “my phone is new, so it should work abroad.” New is not the same as ready. A phone can support eSIM and still be locked to the carrier you bought it from. A phone can be unlocked and still be an older model that only takes a plastic SIM.",
        "Do both checks at home, while you can still ask your carrier or choose a different plan. At the gate, or in the arrivals hall, those answers are harder to get.",
        "If you are traveling with family, check every phone that needs data, not only yours. One working phone and two locked ones is how a group ends up sharing a single hotspot all week.",
      ],
      pivotTitle: "Then you can buy with a clear head",
      pivot:
        "A travel eSIM is a data line your phone downloads. It does not replace your usual number, and it cannot unlock a phone your carrier still controls. Run a compatibility check first. If the phone passes, install on Wi‑Fi before the flight.",
      links: [
        { href: "/help/hajj-umrah-phone-check", label: "Free phone check" },
        { href: "/faq", label: "eSIM questions" },
      ],
    },
    es: {
      title: "Dos revisiones antes de que tu teléfono viaje",
      description:
        "Un teléfono de viaje necesita dos cosas: compatibilidad con eSIM y estar desbloqueado del operador. Una sin la otra igual te deja atascado.",
      topic: "Antes de viajar",
      excerpt:
        "Compatible y desbloqueado son dos revisiones distintas. La mayoría de las sorpresas en el aeropuerto vienen de tratarlas como una sola.",
      paragraphs: [
        "La gente dice “mi teléfono es nuevo, así que debería funcionar en el extranjero”. Nuevo no es lo mismo que listo. Un teléfono puede soportar eSIM y seguir bloqueado al operador con el que lo compraste. Puede estar desbloqueado y ser un modelo viejo que solo acepta SIM plástica.",
        "Haz ambas revisiones en casa, mientras aún puedes preguntar a tu operador o elegir otro plan. En la puerta de embarque o en llegadas, esas respuestas son más difíciles.",
        "Si viajas en familia, revisa cada teléfono que necesite datos, no solo el tuyo. Un teléfono que funciona y dos bloqueados es cómo un grupo termina compartiendo un solo hotspot toda la semana.",
      ],
      pivotTitle: "Entonces puedes comprar con la cabeza clara",
      pivot:
        "Una eSIM de viaje es una línea de datos que tu teléfono descarga. No reemplaza tu número habitual y no puede desbloquear un teléfono que tu operador aún controla. Haz primero una revisión de compatibilidad. Si el teléfono pasa, instala en Wi‑Fi antes del vuelo.",
      links: [
        { href: "/help/hajj-umrah-phone-check", label: "Revisión gratis del teléfono" },
        { href: "/faq", label: "Preguntas sobre eSIM" },
      ],
    },
    ar: {
      title: "فحصان قبل أن يسافر هاتفك",
      description:
        "هاتف السفر يحتاج أمرين: دعم eSIM وفك قفل الشبكة. أحدهما دون الآخر يُبقيك عالقًا.",
      topic: "قبل السفر",
      excerpt:
        "متوافق ومفتوح الشبكة فحصان مختلفان. معظم مفاجآت المطار تأتي من معاملتهما كواحد.",
      paragraphs: [
        "يقول الناس «هاتفي جديد، إذن سيعمل في الخارج». الجديد ليس الجاهز. قد يدعم الهاتف eSIM ويبقى مقفلًا على شركة الشراء. وقد يكون مفتوحًا ويكون طرازًا قديمًا يقبل شريحة بلاستيكية فقط.",
        "أجرِ الفحصين في المنزل وأنت ما زلت تستطيع سؤال شركتك أو اختيار خطة أخرى. عند البوابة أو في صالة الوصول يصعب الحصول على تلك الإجابات.",
        "إن سافرت مع العائلة، افحص كل هاتف يحتاج بيانات لا هاتفك فقط. هاتف يعمل واثنان مقفلان هو كيف تنتهي المجموعة بمشاركة نقطة ساخنة واحدة طوال الأسبوع.",
      ],
      pivotTitle: "ثم تشتري وأنت مرتاح",
      pivot:
        "eSIM السفر خط بيانات يحمّله هاتفك. لا يستبدل رقمك المعتاد ولا يفتح هاتفًا تتحكم به شركتك. ابدأ بفحص التوافق. إن نجح الهاتف، ثبّت على Wi‑Fi قبل الرحلة.",
      links: [
        { href: "/help/hajj-umrah-phone-check", label: "فحص هاتف مجاني" },
        { href: "/faq", label: "أسئلة eSIM" },
      ],
    },
  },
  {
    slug: "installed-is-not-ready",
    published: "2026-09-26",
    topicKey: "Before you fly",
    en: {
      title: "Installed is not the same as ready",
      description:
        "Adding an eSIM is only the download. The phone still needs the travel line selected for data before you fly.",
      topic: "Before you fly",
      excerpt:
        "The QR can be on the phone and maps can still fail when you land, if the data line was never turned on.",
      paragraphs: [
        "Scanning the QR feels like the finish. It is the middle. The profile sits in your phone settings, next to your usual line, and it does nothing until you choose it for mobile data.",
        "At home, on Wi‑Fi, set three things and leave them: the travel line on, data roaming on for that line, and Cellular or Mobile Data pointed at the travel eSIM. Your normal number can stay available for calls and WhatsApp.",
        "If you wait until you land, you are doing that setup in a crowd, often without Wi‑Fi, often while someone is asking where to meet.",
      ],
      pivotTitle: "Land with no switches left to flip",
      pivot:
        "Install before you fly so arrival is automatic. If a screen looks wrong, do not delete the eSIM. Message support and keep the line. Deleting it is the step that turns a small mix-up into a new order.",
      links: [
        { href: "/help/before-you-fly", label: "See the steps" },
        { href: "/support", label: "Message support" },
      ],
    },
    es: {
      title: "Instalada no es lo mismo que lista",
      description:
        "Agregar una eSIM es solo la descarga. El teléfono aún necesita la línea de viaje elegida para datos antes de viajar.",
      topic: "Antes de viajar",
      excerpt:
        "El QR puede estar en el teléfono y los mapas igual fallar al aterrizar, si la línea de datos nunca se activó.",
      paragraphs: [
        "Escanear el QR se siente como el final. Es la mitad. El perfil queda en los ajustes, junto a tu línea habitual, y no hace nada hasta que la eliges para datos móviles.",
        "En casa, con Wi‑Fi, configura tres cosas y déjalas: la línea de viaje encendida, el roaming de datos de esa línea encendido, y Celular o Datos móviles apuntando a la eSIM de viaje. Tu número normal puede seguir disponible para llamadas y WhatsApp.",
        "Si esperas a aterrizar, haces esa configuración en una multitud, a menudo sin Wi‑Fi, a menudo mientras alguien pregunta dónde reunirse.",
      ],
      pivotTitle: "Aterriza sin interruptores pendientes",
      pivot:
        "Instala antes de viajar para que la llegada sea automática. Si una pantalla se ve mal, no borres la eSIM. Escribe a soporte y conserva la línea. Borrarla es el paso que convierte un pequeño lío en un pedido nuevo.",
      links: [
        { href: "/help/before-you-fly", label: "Ver los pasos" },
        { href: "/support", label: "Escribir a soporte" },
      ],
    },
    ar: {
      title: "مثبّتة ليست جاهزة",
      description:
        "إضافة eSIM مجرد تنزيل. ما زال الهاتف يحتاج اختيار خط السفر للبيانات قبل السفر.",
      topic: "قبل السفر",
      excerpt:
        "قد يكون رمز QR على الهاتف وتفشل الخرائط عند الهبوط إن لم تُفعَّل خط البيانات.",
      paragraphs: [
        "مسح رمز QR يبدو كالنهاية. هو الوسط. يبقى الملف في إعدادات هاتفك بجانب خطك المعتاد ولا يفعل شيئًا حتى تختاره لبيانات الجوّال.",
        "في المنزل على Wi‑Fi اضبط ثلاثة أمور واتركها: خط السفر قيد التشغيل، وتجوال البيانات لذلك الخط قيد التشغيل، وCellular أو Mobile Data موجّه إلى eSIM السفر. يمكن أن يبقى رقمك العادي متاحًا للمكالمات وواتساب.",
        "إن انتظرت حتى الهبوط، تفعل ذلك الإعداد وسط زحام، غالبًا بلا Wi‑Fi، وغالبًا بينما يسأل أحدهم أين نلتقي.",
      ],
      pivotTitle: "اهبط بلا مفاتيح متبقية",
      pivot:
        "ثبّت قبل السفر ليكون الوصول تلقائيًا. إن بدت شاشة خاطئة، لا تحذف eSIM. راسل الدعم وأبقِ الخط. الحذف هو الخطوة التي تحوّل لبسًا صغيرًا إلى طلب جديد.",
      links: [
        { href: "/help/before-you-fly", label: "اطّلع على الخطوات" },
        { href: "/support", label: "راسل الدعم" },
      ],
    },
  },
  {
    slug: "umrah-season-quiet-prep",
    published: "2026-09-26",
    topicKey: "Umrah & Hajj",
    en: {
      title: "Umrah season, and the quiet work before Ramadan",
      description:
        "Pilgrimage travel is busy now, and Ramadan Umrah planning starts before the month does.",
      topic: "Umrah & Hajj",
      excerpt:
        "The useful prep is not a new app. It is a phone that already has data when you reach Makkah or Madinah.",
      paragraphs: [
        "Umrah season is when families travel together, meet a group at the airport, and move between Jeddah, Makkah, and Madinah. The days are full. The phone is for maps, WhatsApp, and the occasional ride — not for a long settings lesson.",
        "Ramadan brings another wave, and people book before the month starts. The same small problem shows up every year: a phone that was fine at home goes quiet in the arrivals hall, and the group chat is the thing everyone needs.",
        "The calm work fits in an evening at home. Check the phone, choose a plan that matches the days you will actually be there, and install on Wi‑Fi. Hotspot matters if a parent or a child is on your data.",
      ],
      pivotTitle: "A pilgrimage plan, not only a country name",
      pivot:
        "Saudi Arabia as a country pack is not the same as a plan shaped for Umrah or Hajj. Look for coverage you can use in Makkah and Madinah, hotspot included, and a person you can message if install feels confusing the night before you fly.",
      links: [
        { href: "/hajj-umrah", label: "Umrah and Hajj plans" },
        { href: "/help/umrah-esim-before-you-fly", label: "Umrah install guide" },
        { href: "/help/hajj-umrah-phone-check", label: "Phone check" },
      ],
    },
    es: {
      title: "Temporada de Umrah y el trabajo tranquilo antes de Ramadán",
      description:
        "El viaje de peregrinación está ocupado ahora, y la planificación de Umrah en Ramadán empieza antes del mes.",
      topic: "Umrah y Hajj",
      excerpt:
        "La preparación útil no es una app nueva. Es un teléfono que ya tiene datos cuando llegas a Meca o Medina.",
      paragraphs: [
        "La temporada de Umrah es cuando las familias viajan juntas, se encuentran con un grupo en el aeropuerto y se mueven entre Jeddah, Meca y Medina. Los días están llenos. El teléfono es para mapas, WhatsApp y algún viaje — no para una larga clase de ajustes.",
        "Ramadán trae otra ola, y la gente reserva antes de que empiece el mes. El mismo problema pequeño aparece cada año: un teléfono que iba bien en casa se calla en la sala de llegadas, y el chat del grupo es lo que todos necesitan.",
        "El trabajo calmado cabe en una noche en casa. Revisa el teléfono, elige un plan que coincida con los días que sí estarás allá e instala en Wi‑Fi. El hotspot importa si un padre o un hijo usa tus datos.",
      ],
      pivotTitle: "Un plan de peregrinación, no solo el nombre de un país",
      pivot:
        "Arabia Saudita como paquete de país no es lo mismo que un plan pensado para Umrah o Hajj. Busca cobertura que puedas usar en Meca y Medina, hotspot incluido, y a alguien a quien escribir si la instalación confunde la noche antes de viajar.",
      links: [
        { href: "/hajj-umrah", label: "Planes de Umrah y Hajj" },
        {
          href: "/help/umrah-esim-before-you-fly",
          label: "Guía de instalación de Umrah",
        },
        { href: "/help/hajj-umrah-phone-check", label: "Revisión del teléfono" },
      ],
    },
    ar: {
      title: "موسم العمرة والعمل الهادئ قبل رمضان",
      description:
        "سفر الحج والعمرة مزدحم الآن، وتخطيط عمرة رمضان يبدأ قبل دخول الشهر.",
      topic: "العمرة والحج",
      excerpt:
        "التحضير المفيد ليس تطبيقًا جديدًا. هو هاتف لديه بيانات حين تصل مكة أو المدينة.",
      paragraphs: [
        "موسم العمرة حين تسافر العائلات معًا وتلتقي مجموعة في المطار وتنتقل بين جدة ومكة والمدينة. الأيام ممتلئة. الهاتف للخرائط وواتساب ورحلة أحيانًا — لا لدرس إعدادات طويل.",
        "رمضان يجلب موجة أخرى، والناس يحجزون قبل دخول الشهر. المشكلة الصغيرة نفسها تظهر كل عام: هاتف كان يعمل في البيت يصمت في صالة الوصول، ودردشة المجموعة هي ما يحتاجه الجميع.",
        "العمل الهادئ يناسب مساءً في المنزل. افحص الهاتف، واختر خطة تطابق أيام وجودك فعليًا، وثبّت على Wi‑Fi. النقطة الساخنة تهم إن كان والد أو طفل على بياناتك.",
      ],
      pivotTitle: "خطة حج وعمرة، لا اسم بلد فقط",
      pivot:
        "السعودية كحزمة بلد ليست كخطة مصمّمة للعمرة أو الحج. ابحث عن تغطية تستخدمها في مكة والمدينة مع نقطة ساخنة، وشخص تراسله إن التبس التثبيت ليلة السفر.",
      links: [
        { href: "/hajj-umrah", label: "خطط العمرة والحج" },
        {
          href: "/help/umrah-esim-before-you-fly",
          label: "دليل تثبيت العمرة",
        },
        { href: "/help/hajj-umrah-phone-check", label: "فحص الهاتف" },
      ],
    },
  },
];

const POSTS_BY_SLUG = new Map(LEARN_POSTS.map((post) => [post.slug, post]));

export function getLearnPost(slug: string): LearnPost | undefined {
  return POSTS_BY_SLUG.get(slug);
}

export function localizeLearnPost(
  post: LearnPost,
  locale?: string | null,
): LocalizedLearnPost {
  const loc = normalizeLocale(locale) as Locale;
  const copy = post[loc] ?? post.en;
  return {
    slug: post.slug,
    published: post.published,
    topicKey: post.topicKey,
    ...copy,
  };
}

export function getLocalizedLearnPost(
  slug: string,
  locale?: string | null,
): LocalizedLearnPost | undefined {
  const post = getLearnPost(slug);
  if (!post) return undefined;
  return localizeLearnPost(post, locale);
}

export function learnPostsNewestFirst(
  locale?: string | null,
): LocalizedLearnPost[] {
  return [...LEARN_POSTS]
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .map((post) => localizeLearnPost(post, locale));
}

export function formatLearnDate(
  iso: string,
  locale?: string | null,
): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const months = getDictionary(locale).learnPage.months;
  return `${months[month - 1]} ${day}, ${year}`;
}
