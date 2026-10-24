import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";

export type PolicySlug =
  | "terms"
  | "privacy"
  | "refund"
  | "cookie-policy"
  | "kyc"
  | "partners-terms";

export type PolicySection = {
  title: string;
  body?: string[];
  bullets?: string[];
  orderedBullets?: string[];
};

export type PolicyContent = {
  title: string;
  subtitle?: string;
  badge?: string;
  alert?: string;
  sections: PolicySection[];
  metaTitle: string;
  metaDescription: string;
};

const policies: Record<PolicySlug, Record<Locale, PolicyContent>> = {
  terms: {
    en: {
      metaTitle: "Terms of Service | NoorLink",
      metaDescription:
        "Terms governing use of NoorLink travel eSIM services and website.",
      title: "Terms of Service",
      badge: "Last updated: September 4, 2026",
      sections: [
        {
          title: "1. Introduction",
          body: [
            "By accessing NoorLink and purchasing our digital services, including eSIMs and mobile top-ups, you agree to these Terms of Service.",
          ],
        },
        {
          title: "2. Nature of services",
          body: [
            "NoorLink resells travel eSIM data connectivity from authorized wholesale partners. We deliver valid install credentials (such as a QR code) so you can use partner networks abroad.",
            "NoorLink is not a licensed Saudi telecom operator, and we do not provide a local Saudi phone number (+966) with these travel plans. We are not a mobile network operator; coverage and speed depend on local partner networks in each destination (for example STC, Mobily, or Zain in Saudi Arabia).",
            "Plans are data-only travel eSIMs for personal travel use unless a product page clearly states otherwise.",
          ],
        },
        {
          title: "3. Data plans, allowance, and validity",
          body: [
            "Fixed data plans include a specific data allowance (for example, 3 GB, 10 GB, or 20 GB) and a validity period (for example, 7, 15, or 30 days) shown at checkout.",
            "Day-pass or “unlimited” style plans may include a daily high-speed allowance and then continue at a reduced speed, as shown on the product page and at checkout. Always read the throttle or fair-use details before you buy.",
            "Your allowance begins according to the plan terms — typically from activation or first use, as stated on your order confirmation and install email.",
            "When your validity period ends, any unused data expires automatically. Plans do not roll over to a future trip unless we explicitly state otherwise.",
            "You may track estimated data remaining and days left in My eSIMs on noorlink.co after purchase.",
          ],
        },
        {
          title: "4. Fair use",
          body: [
            "Plans are for personal travel use on compatible devices. Excessive usage, resale, or activity that violates carrier fair-use policies may result in throttling or suspension without refund.",
          ],
        },
        {
          title: "5. User responsibilities",
          body: ["You agree to:"],
          bullets: [
            "Provide an accurate email address for delivery.",
            "Confirm that your device is eSIM-compatible and unlocked before purchase.",
            "Use the service in compliance with local laws and regulations.",
          ],
        },
        {
          title: "6. Payments and delivery",
          body: [
            "All prices are in USD. Payment is processed securely through third-party gateways. Digital goods are typically delivered by email after successful payment confirmation.",
          ],
        },
        {
          title: "7. Refunds",
          body: [
            "Refunds follow our Refund Policy. In short: we may refund or replace when activation fails for a technical reason on our side or the provider’s side. Change-of-mind and incompatible or locked devices are not refundable once a working QR has been delivered. See /refund for full details.",
          ],
        },
        {
          title: "8. Limitation of liability",
          body: [
            "NoorLink is not liable for network outages, speed fluctuations, or coverage gaps caused by local carriers such as STC, Mobily, Zain, Vodafone, Orange, or AT&T.",
          ],
        },
        {
          title: "9. Contact us",
          body: [
            "Email: support@noorlink.co",
            "Address: MOUNTAIN ROAD PL NE, Suite R, ALBUQUERQUE, NM 87110, USA",
          ],
        },
      ],
    },
    es: {
      metaTitle: "Términos del servicio | NoorLink",
      metaDescription:
        "Términos que rigen el uso de los servicios de eSIM de viaje y el sitio de NoorLink.",
      title: "Términos del servicio",
      badge: "Última actualización: 4 de septiembre de 2026",
      sections: [
        {
          title: "1. Introducción",
          body: [
            "Al acceder a NoorLink y comprar nuestros servicios digitales, incluidas eSIM y recargas móviles, aceptas estos Términos del servicio.",
          ],
        },
        {
          title: "2. Naturaleza de los servicios",
          body: [
            "NoorLink revende conectividad de datos eSIM de viaje de socios mayoristas autorizados. Entregamos credenciales de instalación válidas (como un código QR) para que uses las redes de nuestros socios en el extranjero.",
            "NoorLink no es un operador de telecomunicaciones autorizado en Arabia Saudita y no entregamos un número local saudí (+966) con estos planes de viaje. No somos un operador de red móvil; la cobertura y la velocidad dependen de las redes locales en cada destino (por ejemplo STC, Mobily o Zain en Arabia Saudita).",
            "Los planes son eSIM de viaje solo de datos para uso personal, salvo que la página del producto indique otra cosa con claridad.",
          ],
        },
        {
          title: "3. Planes de datos, saldo y vigencia",
          body: [
            "Los planes de datos fijos incluyen un saldo específico (por ejemplo, 3 GB, 10 GB o 20 GB) y un período de vigencia (por ejemplo, 7, 15 o 30 días) que se muestra al pagar.",
            "Los planes por día o de estilo “ilimitado” pueden incluir un saldo diario de alta velocidad y luego continuar a velocidad reducida, según la página del producto y el checkout. Lee siempre los detalles de limitación o uso justo antes de comprar.",
            "Tu saldo comienza según los términos del plan — normalmente desde la activación o el primer uso, como indica la confirmación del pedido y el correo de instalación.",
            "Cuando termina la vigencia, cualquier dato no usado vence automáticamente. Los planes no se acumulan para un viaje futuro, salvo que lo indiquemos expresamente.",
            "Después de la compra puedes ver el saldo estimado y los días restantes en Mis eSIMs en noorlink.co.",
          ],
        },
        {
          title: "4. Uso justo",
          body: [
            "Los planes son para uso personal de viaje en dispositivos compatibles. El uso excesivo, la reventa o la actividad que viole las políticas de uso justo del operador puede provocar limitación de velocidad o suspensión sin reembolso.",
          ],
        },
        {
          title: "5. Responsabilidades del usuario",
          body: ["Aceptas:"],
          bullets: [
            "Proporcionar un correo electrónico preciso para la entrega.",
            "Confirmar que tu dispositivo es compatible con eSIM y está desbloqueado antes de comprar.",
            "Usar el servicio conforme a las leyes y normas locales.",
          ],
        },
        {
          title: "6. Pagos y entrega",
          body: [
            "Todos los precios están en USD. El pago se procesa de forma segura mediante pasarelas de terceros. Los productos digitales suelen entregarse por correo tras la confirmación del pago.",
          ],
        },
        {
          title: "7. Reembolsos",
          body: [
            "Los reembolsos siguen nuestra Política de reembolso. En resumen: podemos reembolsar o reemplazar cuando la activación falle por un motivo técnico de nuestra parte o del proveedor. El cambio de opinión y los dispositivos incompatibles o bloqueados no son reembolsables una vez entregado un QR funcional. Consulta /refund para los detalles.",
          ],
        },
        {
          title: "8. Limitación de responsabilidad",
          body: [
            "NoorLink no es responsable de caídas de red, variaciones de velocidad o huecos de cobertura causados por operadores locales como STC, Mobily, Zain, Vodafone, Orange o AT&T.",
          ],
        },
        {
          title: "9. Contáctanos",
          body: [
            "Correo: support@noorlink.co",
            "Dirección: MOUNTAIN ROAD PL NE, Suite R, ALBUQUERQUE, NM 87110, USA",
          ],
        },
      ],
    },
    ar: {
      metaTitle: "شروط الخدمة | NoorLink",
      metaDescription: "الشروط التي تحكم استخدام خدمات eSIM للسفر وموقع NoorLink.",
      title: "شروط الخدمة",
      badge: "آخر تحديث: 4 سبتمبر 2026",
      sections: [
        {
          title: "1. المقدمة",
          body: [
            "باستخدامك NoorLink وشرائك لخدماتنا الرقمية، بما في ذلك شرائح eSIM وشحن البيانات، فإنك توافق على شروط الخدمة هذه.",
          ],
        },
        {
          title: "2. طبيعة الخدمات",
          body: [
            "تعيد NoorLink بيع اتصال بيانات eSIM للسفر من شركاء جملة معتمدين. نسلّم بيانات تثبيت صالحة (مثل رمز QR) لتستخدم شبكات الشركاء في الخارج.",
            "NoorLink ليست مشغّل اتصالات مرخّصًا في السعودية، ولا نقدّم رقم هاتف سعودي محلي (+966) مع خطط السفر هذه. لسنا مشغّل شبكة جوال؛ تعتمد التغطية والسرعة على شبكات الشركاء المحليين في كل وجهة (مثل STC أو Mobily أو Zain في السعودية).",
            "الخطط هي eSIM سفر لبيانات فقط للاستخدام الشخصي أثناء السفر، ما لم توضح صفحة المنتج خلاف ذلك.",
          ],
        },
        {
          title: "3. خطط البيانات والرصيد والصلاحية",
          body: [
            "تتضمن خطط البيانات الثابتة رصيد بيانات محددًا (مثل 3 أو 10 أو 20 جيجابايت) ومدة صلاحية (مثل 7 أو 15 أو 30 يومًا) تظهر عند الدفع.",
            "قد تتضمن خطط المرور اليومي أو ذات الطابع «غير المحدود» رصيدًا يوميًا عالي السرعة ثم تستمر بسرعة مخفّضة، كما يظهر في صفحة المنتج وعند الدفع. اقرأ دائمًا تفاصيل التخفيض أو الاستخدام العادل قبل الشراء.",
            "يبدأ رصيدك وفق شروط الخطة — عادة من التفعيل أو أول استخدام، كما يرد في تأكيد الطلب وبريد التثبيت.",
            "عند انتهاء مدة الصلاحية، تنتهي أي بيانات غير مستخدمة تلقائيًا. لا تُرحَّل الخطط إلى رحلة لاحقة ما لم نذكر ذلك صراحة.",
            "يمكنك متابعة الرصيد التقديري والأيام المتبقية في «شرائح eSIM» على noorlink.co بعد الشراء.",
          ],
        },
        {
          title: "4. الاستخدام العادل",
          body: [
            "الخطط للاستخدام الشخصي أثناء السفر على أجهزة متوافقة. قد يؤدي الاستخدام المفرط أو إعادة البيع أو النشاط الذي يخالف سياسات الاستخدام العادل لدى المشغّل إلى تخفيض السرعة أو الإيقاف دون استرداد.",
          ],
        },
        {
          title: "5. مسؤوليات المستخدم",
          body: ["توافق على أن:"],
          bullets: [
            "تقدّم بريدًا إلكترونيًا دقيقًا للتسليم.",
            "تتأكد أن جهازك يدعم eSIM ومفتوح من شركة الاتصالات قبل الشراء.",
            "تستخدم الخدمة بما يتوافق مع القوانين والأنظمة المحلية.",
          ],
        },
        {
          title: "6. المدفوعات والتسليم",
          body: [
            "جميع الأسعار بالدولار الأمريكي. تُعالَج المدفوعات بأمان عبر بوابات طرف ثالث. تُسلَّم السلع الرقمية عادة بالبريد بعد تأكيد الدفع الناجح.",
          ],
        },
        {
          title: "7. الاسترداد",
          body: [
            "يتبع الاسترداد سياسة الاسترداد لدينا. باختصار: قد نسترد أو نستبدل عند فشل التفعيل لسبب تقني من جانبنا أو من جانب المزود. تغيير الرأي والأجهزة غير المتوافقة أو المقفلة غير قابلة للاسترداد بعد تسليم رمز QR صالح. راجع /refund للتفاصيل الكاملة.",
          ],
        },
        {
          title: "8. تحديد المسؤولية",
          body: [
            "لا تتحمّل NoorLink مسؤولية انقطاع الشبكة أو تذبذب السرعة أو فجوات التغطية الناتجة عن مشغّلين محليين مثل STC أو Mobily أو Zain أو Vodafone أو Orange أو AT&T.",
          ],
        },
        {
          title: "9. تواصل معنا",
          body: [
            "البريد: support@noorlink.co",
            "العنوان: MOUNTAIN ROAD PL NE, Suite R, ALBUQUERQUE, NM 87110, USA",
          ],
        },
      ],
    },
  },

  privacy: {
    en: {
      metaTitle: "Privacy Policy | NoorLink",
      metaDescription:
        "How NoorLink collects, uses, and protects your personal data.",
      title: "Privacy Policy",
      subtitle: "Your data security is our priority.",
      sections: [
        {
          title: "1. Information we collect",
          body: [
            "To provide our services, we collect minimal necessary information, including:",
          ],
          bullets: [
            "Contact information such as your name and email address for delivery and support.",
            "Transaction data such as purchase history and order IDs.",
            "Device and session data such as IP address and device type for fraud prevention.",
          ],
        },
        {
          title: "2. How we use your data",
          body: ["We use your information solely to:"],
          bullets: [
            "Process your orders and deliver digital products.",
            "Send transactional emails such as receipts and QR codes.",
            "Provide customer support.",
            "Comply with legal obligations, including KYC and AML where required.",
          ],
        },
        {
          title: "3. Payment security",
          body: [
            "NoorLink does not store your credit card information. Payments are processed securely through certified gateways such as Stripe using industry-standard encryption.",
          ],
        },
        {
          title: "4. Third-party sharing",
          body: [
            "We do not sell your personal data. We only share the information needed to activate your service with telecom and payment partners involved in fulfilling your order.",
          ],
        },
        {
          title: "5. Contact us",
          body: [
            "If you have questions about your data, contact support@noorlink.co.",
          ],
        },
      ],
    },
    es: {
      metaTitle: "Política de privacidad | NoorLink",
      metaDescription:
        "Cómo NoorLink recopila, usa y protege tus datos personales.",
      title: "Política de privacidad",
      subtitle: "La seguridad de tus datos es nuestra prioridad.",
      sections: [
        {
          title: "1. Información que recopilamos",
          body: [
            "Para prestar nuestros servicios, recopilamos la información mínima necesaria, entre ella:",
          ],
          bullets: [
            "Datos de contacto como tu nombre y correo para la entrega y el soporte.",
            "Datos de transacciones como el historial de compras e IDs de pedido.",
            "Datos de dispositivo y sesión como la IP y el tipo de dispositivo para prevenir fraude.",
          ],
        },
        {
          title: "2. Cómo usamos tus datos",
          body: ["Usamos tu información únicamente para:"],
          bullets: [
            "Procesar tus pedidos y entregar productos digitales.",
            "Enviar correos transaccionales como recibos y códigos QR.",
            "Brindar soporte al cliente.",
            "Cumplir obligaciones legales, incluido KYC y AML cuando corresponda.",
          ],
        },
        {
          title: "3. Seguridad de los pagos",
          body: [
            "NoorLink no almacena la información de tu tarjeta. Los pagos se procesan de forma segura mediante pasarelas certificadas como Stripe con cifrado estándar de la industria.",
          ],
        },
        {
          title: "4. Compartición con terceros",
          body: [
            "No vendemos tus datos personales. Solo compartimos la información necesaria para activar tu servicio con socios de telecomunicaciones y pago que intervienen en el cumplimiento de tu pedido.",
          ],
        },
        {
          title: "5. Contáctanos",
          body: [
            "Si tienes preguntas sobre tus datos, escribe a support@noorlink.co.",
          ],
        },
      ],
    },
    ar: {
      metaTitle: "سياسة الخصوصية | NoorLink",
      metaDescription: "كيف تجمع NoorLink بياناتك الشخصية وتستخدمها وتحميها.",
      title: "سياسة الخصوصية",
      subtitle: "أمان بياناتك أولويتنا.",
      sections: [
        {
          title: "1. المعلومات التي نجمعها",
          body: [
            "لتقديم خدماتنا، نجمع الحد الأدنى اللازم من المعلومات، بما في ذلك:",
          ],
          bullets: [
            "معلومات التواصل مثل الاسم والبريد للتسليم والدعم.",
            "بيانات المعاملات مثل سجل الشراء وأرقام الطلبات.",
            "بيانات الجهاز والجلسة مثل عنوان IP ونوع الجهاز لمنع الاحتيال.",
          ],
        },
        {
          title: "2. كيف نستخدم بياناتك",
          body: ["نستخدم معلوماتك فقط من أجل:"],
          bullets: [
            "معالجة طلباتك وتسليم المنتجات الرقمية.",
            "إرسال رسائل بريد معاملات مثل الإيصالات ورموز QR.",
            "تقديم دعم العملاء.",
            "الامتثال للالتزامات القانونية، بما في ذلك KYC وAML عند الاقتضاء.",
          ],
        },
        {
          title: "3. أمان المدفوعات",
          body: [
            "لا تخزّن NoorLink معلومات بطاقتك. تُعالَج المدفوعات بأمان عبر بوابات معتمدة مثل Stripe باستخدام تشفير قياسي في الصناعة.",
          ],
        },
        {
          title: "4. المشاركة مع أطراف ثالثة",
          body: [
            "لا نبيع بياناتك الشخصية. نشارك فقط المعلومات اللازمة لتفعيل خدمتك مع شركاء الاتصالات والدفع المشاركين في تنفيذ طلبك.",
          ],
        },
        {
          title: "5. تواصل معنا",
          body: [
            "إذا كانت لديك أسئلة عن بياناتك، تواصل مع support@noorlink.co.",
          ],
        },
      ],
    },
  },

  refund: {
    en: {
      metaTitle: "Refund Policy | NoorLink",
      metaDescription:
        "Refund and cancellation policy for NoorLink travel eSIM purchases.",
      title: "Refund & Cancellation Policy",
      badge: "Last updated: August 26, 2026",
      alert:
        'Important notice: eSIMs and top-ups are digital goods. Once a QR code has been generated and delivered, standard "return" rights do not apply.',
      sections: [
        {
          title: "1. General policy",
          body: [
            "We can only offer refunds under specific technical conditions. Change-of-mind or accidental purchases are not refundable once the eSIM has been delivered.",
            "Fixed data plans are sold with a defined allowance and validity period. Unused data that expires at the end of your validity period is not refundable — this is standard for prepaid travel data products.",
          ],
        },
        {
          title: "2. Data allowance and expiry",
          body: [
            "Each plan includes a maximum data allowance and a fixed number of days of validity, as shown at checkout.",
            "Data remaining at the end of the validity period expires and cannot be carried over, converted to cash, or transferred to another order.",
            "NoorLink does not guarantee that you will use your full allowance; your plan price covers the allowance and validity window, not actual consumption.",
          ],
        },
        {
          title: "3. Eligibility for refund",
          body: ["A full refund or replacement may be offered if:"],
          bullets: [
            "The eSIM cannot be installed or connected because of a technical failure on our side or the provider side.",
            "You were charged but the system failed to generate an eSIM due to inventory or provisioning issues.",
            "You did not receive the QR code email within 2 hours of purchase and support could not resolve it.",
          ],
        },
        {
          title: "4. Non-refundable scenarios",
          body: ["Refunds are not available for:"],
          bullets: [
            "Devices that are not eSIM-compatible or are carrier-locked.",
            "Deleted eSIMs that were removed from device settings after delivery.",
            "Plans that were already scanned and activated.",
            "Weak or unavailable local carrier coverage in remote areas.",
            "Unused data remaining after the validity period has expired.",
            "Partial use of a plan where the service worked as described.",
          ],
        },
        {
          title: "5. How to request a refund",
          body: [
            "If you believe your order qualifies, contact support within 5 days of purchase and include the details below.",
          ],
          orderedBullets: [
            "Send your request to support@noorlink.co.",
            "Include your order ID, such as NL-123456.",
            "Attach a screenshot showing the installation error or no-service status.",
          ],
        },
        {
          title: "6. Review timeline",
          body: [
            "Our team investigates the issue with the provider. If a technical failure is confirmed, refunds are returned to the original payment method within 5 to 10 business days.",
          ],
        },
      ],
    },
    es: {
      metaTitle: "Política de reembolso | NoorLink",
      metaDescription:
        "Política de reembolso y cancelación para compras de eSIM de viaje de NoorLink.",
      title: "Política de reembolso y cancelación",
      badge: "Última actualización: 26 de agosto de 2026",
      alert:
        "Aviso importante: las eSIM y las recargas son bienes digitales. Una vez generado y entregado el código QR, no aplican los derechos habituales de «devolución».",
      sections: [
        {
          title: "1. Política general",
          body: [
            "Solo podemos ofrecer reembolsos en condiciones técnicas específicas. El cambio de opinión o las compras accidentales no son reembolsables una vez entregada la eSIM.",
            "Los planes de datos fijos se venden con un saldo y un período de vigencia definidos. Los datos no usados que vencen al final de la vigencia no son reembolsables — es lo habitual en productos de datos de viaje prepago.",
          ],
        },
        {
          title: "2. Saldo de datos y vencimiento",
          body: [
            "Cada plan incluye un saldo máximo de datos y un número fijo de días de vigencia, como se muestra al pagar.",
            "Los datos que queden al final de la vigencia vencen y no se pueden acumular, convertir en dinero ni transferir a otro pedido.",
            "NoorLink no garantiza que uses todo el saldo; el precio del plan cubre el saldo y la ventana de vigencia, no el consumo real.",
          ],
        },
        {
          title: "3. Elegibilidad para reembolso",
          body: ["Puede ofrecerse un reembolso total o un reemplazo si:"],
          bullets: [
            "La eSIM no se puede instalar o conectar por una falla técnica de nuestra parte o del proveedor.",
            "Se te cobró pero el sistema no generó una eSIM por problemas de inventario o aprovisionamiento.",
            "No recibiste el correo con el QR en las 2 horas posteriores a la compra y el soporte no pudo resolverlo.",
          ],
        },
        {
          title: "4. Escenarios no reembolsables",
          body: ["No hay reembolso en estos casos:"],
          bullets: [
            "Dispositivos incompatibles con eSIM o bloqueados por el operador.",
            "eSIM eliminadas de la configuración del dispositivo después de la entrega.",
            "Planes que ya se escanearon y activaron.",
            "Cobertura local débil o no disponible en zonas remotas.",
            "Datos no usados que quedan después de vencida la vigencia.",
            "Uso parcial de un plan cuando el servicio funcionó como se describe.",
          ],
        },
        {
          title: "5. Cómo solicitar un reembolso",
          body: [
            "Si crees que tu pedido califica, contacta a soporte dentro de los 5 días posteriores a la compra e incluye los detalles siguientes.",
          ],
          orderedBullets: [
            "Envía tu solicitud a support@noorlink.co.",
            "Incluye el ID de tu pedido, por ejemplo NL-123456.",
            "Adjunta una captura que muestre el error de instalación o el estado sin servicio.",
          ],
        },
        {
          title: "6. Plazo de revisión",
          body: [
            "Nuestro equipo investiga el caso con el proveedor. Si se confirma una falla técnica, el reembolso vuelve al método de pago original en un plazo de 5 a 10 días hábiles.",
          ],
        },
      ],
    },
    ar: {
      metaTitle: "سياسة الاسترداد | NoorLink",
      metaDescription:
        "سياسة الاسترداد والإلغاء لمشتريات eSIM السفر من NoorLink.",
      title: "سياسة الاسترداد والإلغاء",
      badge: "آخر تحديث: 26 أغسطس 2026",
      alert:
        "تنبيه مهم: شرائح eSIM وشحن البيانات سلع رقمية. بعد إنشاء رمز QR وتسليمه، لا تنطبق حقوق «الإرجاع» المعتادة.",
      sections: [
        {
          title: "1. السياسة العامة",
          body: [
            "لا نقدّم الاسترداد إلا في ظروف تقنية محددة. تغيير الرأي أو الشراء بالخطأ غير قابل للاسترداد بعد تسليم eSIM.",
            "تُباع خطط البيانات الثابتة برصيد ومدة صلاحية محددين. البيانات غير المستخدمة التي تنتهي بنهاية مدة الصلاحية غير قابلة للاسترداد — وهذا معتاد في منتجات بيانات السفر المدفوعة مسبقًا.",
          ],
        },
        {
          title: "2. رصيد البيانات والانتهاء",
          body: [
            "تتضمن كل خطة حدًا أقصى لرصيد البيانات وعدد أيام صلاحية ثابتًا، كما يظهر عند الدفع.",
            "البيانات المتبقية في نهاية مدة الصلاحية تنتهي ولا يمكن ترحيلها أو تحويلها إلى نقد أو نقلها إلى طلب آخر.",
            "لا تضمن NoorLink أن تستخدم كامل الرصيد؛ يغطي سعر الخطة الرصيد ونافذة الصلاحية، وليس الاستهلاك الفعلي.",
          ],
        },
        {
          title: "3. أهلية الاسترداد",
          body: ["قد يُعرض استرداد كامل أو استبدال إذا:"],
          bullets: [
            "تعذّر تثبيت eSIM أو الاتصال بسبب عطل تقني من جانبنا أو من جانب المزود.",
            "تم الخصم لكن النظام فشل في إنشاء eSIM بسبب المخزون أو التزويد.",
            "لم تستلم بريد رمز QR خلال ساعتين من الشراء وتعذّر على الدعم حل المشكلة.",
          ],
        },
        {
          title: "4. حالات غير قابلة للاسترداد",
          body: ["لا يتوفر الاسترداد في الحالات التالية:"],
          bullets: [
            "أجهزة لا تدعم eSIM أو مقفلة من شركة الاتصالات.",
            "شرائح eSIM حُذفت من إعدادات الجهاز بعد التسليم.",
            "خطط تم مسحها وتفعيلها بالفعل.",
            "تغطية محلية ضعيفة أو غير متاحة في مناطق نائية.",
            "بيانات غير مستخدمة متبقية بعد انتهاء مدة الصلاحية.",
            "استخدام جزئي لخطة عملت الخدمة فيها كما وُصفت.",
          ],
        },
        {
          title: "5. كيفية طلب الاسترداد",
          body: [
            "إذا كنت ترى أن طلبك مؤهل، تواصل مع الدعم خلال 5 أيام من الشراء وأدرج التفاصيل أدناه.",
          ],
          orderedBullets: [
            "أرسل طلبك إلى support@noorlink.co.",
            "أدرج رقم طلبك، مثل NL-123456.",
            "أرفق لقطة شاشة تُظهر خطأ التثبيت أو حالة انعدام الخدمة.",
          ],
        },
        {
          title: "6. مدة المراجعة",
          body: [
            "يحقّق فريقنا في المشكلة مع المزود. إذا تأكد عطل تقني، يُعاد المبلغ إلى وسيلة الدفع الأصلية خلال 5 إلى 10 أيام عمل.",
          ],
        },
      ],
    },
  },

  "cookie-policy": {
    en: {
      metaTitle: "Cookie Policy | NoorLink",
      metaDescription:
        "How NoorLink uses cookies and similar technologies on noorlink.co.",
      title: "Cookie Policy",
      subtitle: "How NoorLink uses cookies and similar technologies.",
      sections: [
        {
          title: "1. What cookies do on NoorLink",
          body: [
            "Cookies help the site remember preferences, keep checkout and support tools working, and measure how pages are being used.",
          ],
        },
        {
          title: "2. Types of cookies we may use",
          bullets: [
            "Essential cookies needed for core site functions.",
            "Analytics cookies that help us understand site performance and usage.",
            "Support and messaging cookies used by tools such as WhatsApp deep links when you open chat.",
            "Consent cookies that remember your privacy choices.",
          ],
        },
        {
          title: "3. Managing your choices",
          body: [
            "You can adjust your preferences through the cookie banner when available, and you can also manage or delete cookies from your browser settings at any time.",
          ],
        },
        {
          title: "4. Contact",
          body: [
            "If you have questions about cookies or consent, contact support@noorlink.co.",
          ],
        },
      ],
    },
    es: {
      metaTitle: "Política de cookies | NoorLink",
      metaDescription:
        "Cómo NoorLink usa cookies y tecnologías similares en noorlink.co.",
      title: "Política de cookies",
      subtitle: "Cómo NoorLink usa cookies y tecnologías similares.",
      sections: [
        {
          title: "1. Para qué sirven las cookies en NoorLink",
          body: [
            "Las cookies ayudan al sitio a recordar preferencias, mantener el pago y las herramientas de soporte, y medir cómo se usan las páginas.",
          ],
        },
        {
          title: "2. Tipos de cookies que podemos usar",
          bullets: [
            "Cookies esenciales necesarias para las funciones básicas del sitio.",
            "Cookies de analítica que nos ayudan a entender el rendimiento y el uso del sitio.",
            "Cookies de soporte y mensajería usadas por herramientas como enlaces profundos de WhatsApp cuando abres el chat.",
            "Cookies de consentimiento que recuerdan tus opciones de privacidad.",
          ],
        },
        {
          title: "3. Cómo gestionar tus opciones",
          body: [
            "Puedes ajustar tus preferencias en el banner de cookies cuando esté disponible, y también gestionar o eliminar cookies desde la configuración del navegador en cualquier momento.",
          ],
        },
        {
          title: "4. Contacto",
          body: [
            "Si tienes preguntas sobre cookies o consentimiento, escribe a support@noorlink.co.",
          ],
        },
      ],
    },
    ar: {
      metaTitle: "سياسة ملفات تعريف الارتباط | NoorLink",
      metaDescription:
        "كيف تستخدم NoorLink ملفات تعريف الارتباط والتقنيات المشابهة على noorlink.co.",
      title: "سياسة ملفات تعريف الارتباط",
      subtitle: "كيف تستخدم NoorLink ملفات تعريف الارتباط والتقنيات المشابهة.",
      sections: [
        {
          title: "1. دور ملفات تعريف الارتباط في NoorLink",
          body: [
            "تساعد ملفات تعريف الارتباط الموقع على تذكّر التفضيلات، وإبقاء أدوات الدفع والدعم تعمل، وقياس كيفية استخدام الصفحات.",
          ],
        },
        {
          title: "2. أنواع الملفات التي قد نستخدمها",
          bullets: [
            "ملفات أساسية لازمة لوظائف الموقع الأساسية.",
            "ملفات تحليلات تساعدنا على فهم أداء الموقع واستخدامه.",
            "ملفات دعم ومراسلة تستخدمها أدوات مثل روابط واتساب العميقة عند فتح المحادثة.",
            "ملفات موافقة تتذكّر خيارات الخصوصية لديك.",
          ],
        },
        {
          title: "3. إدارة اختياراتك",
          body: [
            "يمكنك تعديل تفضيلاتك عبر شريط ملفات تعريف الارتباط عند توفره، ويمكنك أيضًا إدارة الملفات أو حذفها من إعدادات المتصفح في أي وقت.",
          ],
        },
        {
          title: "4. التواصل",
          body: [
            "إذا كانت لديك أسئلة عن ملفات تعريف الارتباط أو الموافقة، تواصل مع support@noorlink.co.",
          ],
        },
      ],
    },
  },

  kyc: {
    en: {
      metaTitle: "KYC & AML Policy | NoorLink",
      metaDescription:
        "Know Your Customer and Anti-Money Laundering policy for NoorLink.",
      title: "KYC & AML Policy",
      subtitle: "Know Your Customer and Anti-Money Laundering",
      sections: [
        {
          title: "1. General scope",
          body: [
            "NoorLink primarily provides data-only eSIMs, which often do not require identity checks. We still follow international telecom compliance requirements where they apply.",
          ],
        },
        {
          title: "2. When verification is required",
          body: ["Identity verification may be requested when:"],
          bullets: [
            "A destination requires subscriber registration by law.",
            "A single customer purchases an unusually high volume of eSIMs in a short period.",
            "A transaction exceeds $200 USD and triggers manual review.",
          ],
        },
        {
          title: "3. Verification process",
          body: [
            "If verification is required, we may request a government-issued ID and a selfie for liveness detection. This information is processed securely through compliance partners and is not stored directly on NoorLink systems.",
          ],
        },
        {
          title: "4. Contact",
          body: [
            "For compliance inquiries, contact compliance@noorlink.co.",
          ],
        },
      ],
    },
    es: {
      metaTitle: "Política KYC y AML | NoorLink",
      metaDescription:
        "Política de conocimiento del cliente y prevención de lavado de dinero de NoorLink.",
      title: "Política KYC y AML",
      subtitle: "Conoce a tu cliente y prevención de lavado de dinero",
      sections: [
        {
          title: "1. Alcance general",
          body: [
            "NoorLink ofrece principalmente eSIM solo de datos, que a menudo no requieren verificación de identidad. Aun así seguimos los requisitos internacionales de cumplimiento en telecomunicaciones cuando aplican.",
          ],
        },
        {
          title: "2. Cuándo se pide verificación",
          body: ["Puede pedirse verificación de identidad cuando:"],
          bullets: [
            "Un destino exige por ley el registro del suscriptor.",
            "Un mismo cliente compra un volumen inusualmente alto de eSIM en poco tiempo.",
            "Una transacción supera los USD 200 y activa una revisión manual.",
          ],
        },
        {
          title: "3. Proceso de verificación",
          body: [
            "Si se requiere verificación, podemos pedir una identificación oficial y una selfie para comprobar que eres una persona real. Esta información se procesa de forma segura con socios de cumplimiento y no se almacena directamente en los sistemas de NoorLink.",
          ],
        },
        {
          title: "4. Contacto",
          body: [
            "Para consultas de cumplimiento, escribe a compliance@noorlink.co.",
          ],
        },
      ],
    },
    ar: {
      metaTitle: "سياسة KYC وAML | NoorLink",
      metaDescription:
        "سياسة اعرف عميلك ومكافحة غسل الأموال لدى NoorLink.",
      title: "سياسة KYC وAML",
      subtitle: "اعرف عميلك ومكافحة غسل الأموال",
      sections: [
        {
          title: "1. النطاق العام",
          body: [
            "تقدّم NoorLink أساسًا شرائح eSIM لبيانات فقط، وغالبًا لا تتطلب التحقق من الهوية. ومع ذلك نتبع متطلبات الامتثال الدولية للاتصالات حيث تنطبق.",
          ],
        },
        {
          title: "2. متى يُطلب التحقق",
          body: ["قد يُطلب التحقق من الهوية عندما:"],
          bullets: [
            "تتطلب الوجهة تسجيل المشترك بموجب القانون.",
            "يشتري عميل واحد حجمًا مرتفعًا بشكل غير معتاد من شرائح eSIM في فترة قصيرة.",
            "تتجاوز المعاملة 200 دولار أمريكي وتستدعي مراجعة يدوية.",
          ],
        },
        {
          title: "3. عملية التحقق",
          body: [
            "إذا لزم التحقق، قد نطلب هوية حكومية وصورة شخصية للتحقق من الحيوية. تُعالَج هذه المعلومات بأمان عبر شركاء الامتثال ولا تُخزَّن مباشرة على أنظمة NoorLink.",
          ],
        },
        {
          title: "4. التواصل",
          body: [
            "لاستفسارات الامتثال، تواصل مع compliance@noorlink.co.",
          ],
        },
      ],
    },
  },

  "partners-terms": {
    en: {
      metaTitle: "Partner Program Terms | NoorLink",
      metaDescription:
        "Terms for approved NoorLink cash partners — influencers, masjid and Islamic centers, and travel connectors.",
      title: "Partner Program Terms",
      badge: "Last updated: August 29, 2026",
      subtitle:
        "These terms apply to approved cash partners only — not to regular customers who refer friends after purchase.",
      sections: [
        {
          title: "1. Scope",
          body: [
            "These Partner Program Terms (“Partner Terms”) govern your participation in the NoorLink partner program as an approved influencer, masjid or Islamic center, travel advisor, or connector (“Partner,” “you”).",
            "These Partner Terms do not apply to regular NoorLink customers who share a personal refer-a-friend link after their own purchase. Customer referral rewards (a discount on a future order, not cash) are described on noorlink.co and in our general Terms of Service.",
            "By applying to the program, being approved, or using a partner referral link or dashboard, you agree to these Partner Terms and to our Privacy Policy.",
          ],
        },
        {
          title: "2. Eligibility and approval",
          body: [
            "Partners must be at least 18 years old and able to enter a binding agreement. Organizations must be represented by an authorized contact.",
            "All partners are approved manually by NoorLink. Submitting an application does not guarantee acceptance. We may approve, decline, or revoke participation at our discretion.",
            "We may request additional information about your organization, audience, or promotional methods before or after approval.",
          ],
        },
        {
          title: "3. Partner types and default rates",
          body: [
            "Commission rates, audience discounts, and payout minimums depend on partner type. Default rates below may be customized in writing when you are approved.",
          ],
          bullets: [
            "Influencer / creator: 10% audience discount; 10% commission on qualifying net sales; $25 minimum payout.",
            "Masjid / Islamic center: 5% community discount; 12% commission on qualifying net sales (15% on eligible Hajj & Umrah corridor plans); $50 minimum payout.",
            "Travel advisor / connector: 10% audience discount; 8% commission on qualifying net sales; $25 minimum payout.",
          ],
        },
        {
          title: "4. Referral links and attribution",
          body: [
            "Approved partners receive a unique referral code and link. A sale is attributed to you when a customer completes checkout using your active link or code, subject to these Partner Terms.",
            "Attribution is tracked automatically. We do not guarantee attribution if a customer clears cookies, uses a different device, applies another offer that overrides referral tracking, or completes checkout without your link or code.",
            "You may not use your own referral link or code for personal purchases (“self-referral”). Self-referrals do not earn commission.",
          ],
        },
        {
          title: "5. Commissions",
          body: [
            "Commissions are calculated as a percentage of qualifying net sales — the order subtotal after customer discounts and before tax and payment processing, unless we specify otherwise in your approval email.",
            "A commission becomes eligible after the customer’s order is paid and fulfilled. Commissions may be reversed or adjusted if the underlying order is refunded, charged back, cancelled, or determined to be fraudulent or abusive.",
            "Commission rates, discount levels, and eligible products may change for future orders. We will use reasonable efforts to notify approved partners of material changes.",
            "Commissions are not guaranteed income. Past performance does not guarantee future earnings.",
          ],
        },
        {
          title: "6. Payouts",
          body: [
            "Cash payouts are processed manually by the NoorLink team after you request a withdrawal through the partner dashboard and your approved balance meets the payout minimum for your partner type.",
            "Payout requests are typically reviewed within five (5) business days. We may delay or withhold payout while investigating suspected fraud, policy violations, or account discrepancies.",
            "You are responsible for providing accurate payout contact details (such as PayPal or bank information) when requested. NoorLink is not responsible for failed transfers caused by incorrect details you provide.",
            "Unpaid balances may be forfeited if your account is terminated for cause, or if your account is inactive for twelve (12) consecutive months, except where prohibited by law.",
          ],
        },
        {
          title: "7. Taxes",
          body: [
            "Partners are independent contractors, not employees or agents of NoorLink. You are solely responsible for any taxes, filings, or reporting obligations arising from commissions you receive.",
            "We may request tax information (such as a W-9 for U.S. partners) before issuing payouts above applicable thresholds and may issue informational tax forms where required by law.",
          ],
        },
        {
          title: "8. Brand and marketing",
          body: [
            "You may promote NoorLink using the referral link and factual program details we provide. You agree to:",
          ],
          bullets: [
            "Present NoorLink honestly — as a travel eSIM service, not as a mobile carrier or network operator.",
            "Use accurate descriptions of coverage, data allowances, and pricing as shown on noorlink.co at the time of promotion.",
            "Not modify the NoorLink name, logo, or branding except as we expressly authorize in writing.",
            "Not imply endorsement, employment, or official partnership beyond your approved status.",
            "Frame masjid and community links as a practical travel benefit for your community, not as a generic coupon or misleading discount scheme.",
          ],
        },
        {
          title: "9. Prohibited conduct",
          body: ["You may not:"],
          bullets: [
            "Send unsolicited bulk email (spam), SMS spam, or deceptive ads.",
            "Bid on NoorLink trademarks or brand terms in paid search without our written consent.",
            "Make false or exaggerated claims (for example, “unlimited data everywhere” or guaranteed network speeds).",
            "Use cookie stuffing, fake traffic, incentive sites that mislead customers, or any fraudulent attribution method.",
            "Promote NoorLink on sites or channels that are illegal, hateful, or primarily adult or gambling content.",
            "Resell, sublicense, or white-label NoorLink eSIMs under your own brand without a separate written agreement.",
          ],
        },
        {
          title: "10. Suspension and termination",
          body: [
            "We may suspend or terminate your partner account immediately if you breach these Partner Terms, engage in prohibited conduct, or if we reasonably suspect fraud or harm to customers or the NoorLink brand.",
            "Upon termination, your referral link will stop earning new commissions. We will pay out eligible approved balances that are not connected to fraud or chargebacks, subject to the payout rules above.",
            "You may stop participating at any time by notifying support@noorlink.co. Termination does not affect our right to withhold or reverse commissions tied to invalid orders.",
          ],
        },
        {
          title: "11. Changes",
          body: [
            "We may update these Partner Terms from time to time. The “Last updated” date at the top of this page will change when we do.",
            "Material changes will be posted on noorlink.co/partners/terms. Continued use of your partner link or dashboard after changes take effect constitutes acceptance, except where a change requires separate consent under applicable law.",
          ],
        },
        {
          title: "12. Disclaimer and limitation of liability",
          body: [
            "The partner program and referral tools are provided “as is.” To the fullest extent permitted by law, NoorLink is not liable for indirect, incidental, or consequential damages arising from your participation.",
            "Our total liability to you for any claim related to the partner program is limited to unpaid commissions we have confirmed as approved and not disputed at the time of the claim.",
          ],
        },
        {
          title: "13. General",
          body: [
            "These Partner Terms are governed by the laws of the State of New Mexico, USA, without regard to conflict-of-law rules.",
            "If any provision is unenforceable, the remaining provisions remain in effect.",
            "Questions about these Partner Terms or your partner account: support@noorlink.co",
            "NoorLink · Mountain Road Pl NE, Suite R · Albuquerque, NM 87110, USA",
          ],
        },
      ],
    },
    es: {
      metaTitle: "Términos del programa de socios | NoorLink",
      metaDescription:
        "Términos para socios de efectivo aprobados de NoorLink: influencers, mezquitas y centros islámicos, y conectores de viaje.",
      title: "Términos del programa de socios",
      badge: "Última actualización: 29 de agosto de 2026",
      subtitle:
        "Estos términos aplican solo a socios de efectivo aprobados — no a clientes habituales que recomiendan a amigos después de comprar.",
      sections: [
        {
          title: "1. Alcance",
          body: [
            "Estos Términos del programa de socios («Términos de socio») rigen tu participación en el programa de socios de NoorLink como influencer, mezquita o centro islámico, asesor de viajes o conector aprobado («Socio», «tú»).",
            "Estos Términos de socio no aplican a clientes habituales de NoorLink que comparten un enlace personal de referidos después de su propia compra. Las recompensas de referidos de clientes (un descuento en un pedido futuro, no efectivo) se describen en noorlink.co y en nuestros Términos del servicio generales.",
            "Al postularte al programa, ser aprobado o usar un enlace o panel de socio, aceptas estos Términos de socio y nuestra Política de privacidad.",
          ],
        },
        {
          title: "2. Elegibilidad y aprobación",
          body: [
            "Los socios deben tener al menos 18 años y poder celebrar un acuerdo vinculante. Las organizaciones deben estar representadas por un contacto autorizado.",
            "Todos los socios son aprobados manualmente por NoorLink. Enviar una solicitud no garantiza la aceptación. Podemos aprobar, rechazar o revocar la participación a nuestra discreción.",
            "Podemos pedir información adicional sobre tu organización, audiencia o métodos de promoción antes o después de la aprobación.",
          ],
        },
        {
          title: "3. Tipos de socio y tarifas por defecto",
          body: [
            "Las comisiones, los descuentos para la audiencia y los mínimos de pago dependen del tipo de socio. Las tarifas por defecto siguientes pueden personalizarse por escrito al aprobarte.",
          ],
          bullets: [
            "Influencer / creador: 10% de descuento para la audiencia; 10% de comisión sobre ventas netas elegibles; mínimo de pago de USD 25.",
            "Mezquita / centro islámico: 5% de descuento comunitario; 12% de comisión sobre ventas netas elegibles (15% en planes del corredor Hajj y Umrah elegibles); mínimo de pago de USD 50.",
            "Asesor de viajes / conector: 10% de descuento para la audiencia; 8% de comisión sobre ventas netas elegibles; mínimo de pago de USD 25.",
          ],
        },
        {
          title: "4. Enlaces de referidos y atribución",
          body: [
            "Los socios aprobados reciben un código y enlace de referidos únicos. Una venta se te atribuye cuando un cliente completa el pago con tu enlace o código activo, sujeto a estos Términos de socio.",
            "La atribución se rastrea de forma automática. No garantizamos la atribución si el cliente borra cookies, usa otro dispositivo, aplica otra oferta que anula el seguimiento o completa el pago sin tu enlace o código.",
            "No puedes usar tu propio enlace o código para compras personales («auto-referido»). Los auto-referidos no generan comisión.",
          ],
        },
        {
          title: "5. Comisiones",
          body: [
            "Las comisiones se calculan como un porcentaje de las ventas netas elegibles — el subtotal del pedido después de descuentos al cliente y antes de impuestos y procesamiento de pago, salvo que indiquemos otra cosa en tu correo de aprobación.",
            "Una comisión pasa a ser elegible cuando el pedido del cliente está pagado y cumplido. Las comisiones pueden revertirse o ajustarse si el pedido se reembolsa, se disputa, se cancela o se determina fraudulento o abusivo.",
            "Las tasas de comisión, los niveles de descuento y los productos elegibles pueden cambiar para pedidos futuros. Haremos esfuerzos razonables para avisar a los socios aprobados de cambios materiales.",
            "Las comisiones no son un ingreso garantizado. El desempeño pasado no garantiza ganancias futuras.",
          ],
        },
        {
          title: "6. Pagos",
          body: [
            "Los pagos en efectivo los procesa manualmente el equipo de NoorLink después de que solicitas un retiro en el panel de socio y tu saldo aprobado alcanza el mínimo de pago de tu tipo de socio.",
            "Las solicitudes de pago suelen revisarse en cinco (5) días hábiles. Podemos demorar o retener el pago mientras investigamos sospechas de fraude, infracciones o discrepancias de cuenta.",
            "Eres responsable de proporcionar datos de pago precisos (como PayPal o datos bancarios) cuando se te pidan. NoorLink no es responsable de transferencias fallidas por datos incorrectos que tú proporciones.",
            "Los saldos no pagados pueden perderse si tu cuenta se termina con causa, o si permanece inactiva durante doce (12) meses consecutivos, salvo donde la ley lo prohíba.",
          ],
        },
        {
          title: "7. Impuestos",
          body: [
            "Los socios son contratistas independientes, no empleados ni agentes de NoorLink. Eres el único responsable de impuestos, declaraciones u obligaciones de reporte derivadas de las comisiones que recibas.",
            "Podemos pedir información fiscal (como un W-9 para socios en EE. UU.) antes de emitir pagos por encima de umbrales aplicables y podemos emitir formularios fiscales informativos cuando lo exija la ley.",
          ],
        },
        {
          title: "8. Marca y marketing",
          body: [
            "Puedes promover NoorLink con el enlace de referidos y los datos factuales del programa que te entregamos. Aceptas:",
          ],
          bullets: [
            "Presentar NoorLink con honestidad — como un servicio de eSIM de viaje, no como un operador móvil o de red.",
            "Usar descripciones precisas de cobertura, saldos de datos y precios como se muestran en noorlink.co al momento de la promoción.",
            "No modificar el nombre, el logo ni la marca NoorLink salvo autorización expresa por escrito.",
            "No sugerir respaldo, empleo o asociación oficial más allá de tu estatus aprobado.",
            "Enmarcar los enlaces de mezquita y comunidad como un beneficio práctico de viaje para tu comunidad, no como un cupón genérico o un esquema de descuento engañoso.",
          ],
        },
        {
          title: "9. Conducta prohibida",
          body: ["No puedes:"],
          bullets: [
            "Enviar correo masivo no solicitado (spam), spam por SMS o anuncios engañosos.",
            "Pujar por marcas o términos de NoorLink en búsqueda paga sin nuestro consentimiento escrito.",
            "Hacer afirmaciones falsas o exageradas (por ejemplo, «datos ilimitados en todas partes» o velocidades de red garantizadas).",
            "Usar cookie stuffing, tráfico falso, sitios de incentivos que engañen a los clientes o cualquier método fraudulento de atribución.",
            "Promover NoorLink en sitios o canales ilegales, de odio o principalmente de contenido adulto o de apuestas.",
            "Revender, sublicenciar o marcar con tu propia marca las eSIM de NoorLink sin un acuerdo escrito separado.",
          ],
        },
        {
          title: "10. Suspensión y terminación",
          body: [
            "Podemos suspender o terminar tu cuenta de socio de inmediato si incumples estos Términos de socio, incurres en conducta prohibida, o si sospechamos razonablemente fraude o daño a los clientes o a la marca NoorLink.",
            "Tras la terminación, tu enlace dejará de generar comisiones nuevas. Pagaremos los saldos aprobados elegibles que no estén vinculados a fraude o contracargos, según las reglas de pago anteriores.",
            "Puedes dejar de participar en cualquier momento avisando a support@noorlink.co. La terminación no afecta nuestro derecho a retener o revertir comisiones ligadas a pedidos no válidos.",
          ],
        },
        {
          title: "11. Cambios",
          body: [
            "Podemos actualizar estos Términos de socio de vez en cuando. La fecha de «Última actualización» al inicio de esta página cambiará cuando lo hagamos.",
            "Los cambios materiales se publicarán en noorlink.co/partners/terms. El uso continuo de tu enlace o panel de socio después de que los cambios entren en vigor constituye aceptación, salvo que un cambio exija un consentimiento separado según la ley aplicable.",
          ],
        },
        {
          title: "12. Descargo y limitación de responsabilidad",
          body: [
            "El programa de socios y las herramientas de referidos se ofrecen «tal cual». En la máxima medida permitida por la ley, NoorLink no es responsable de daños indirectos, incidentales o consecuentes derivados de tu participación.",
            "Nuestra responsabilidad total ante ti por cualquier reclamo relacionado con el programa de socios se limita a las comisiones no pagadas que hayamos confirmado como aprobadas y no disputadas al momento del reclamo.",
          ],
        },
        {
          title: "13. General",
          body: [
            "Estos Términos de socio se rigen por las leyes del Estado de Nuevo México, EE. UU., sin considerar normas de conflicto de leyes.",
            "Si alguna disposición no es ejecutable, las demás siguen vigentes.",
            "Preguntas sobre estos Términos de socio o tu cuenta de socio: support@noorlink.co",
            "NoorLink · Mountain Road Pl NE, Suite R · Albuquerque, NM 87110, USA",
          ],
        },
      ],
    },
    ar: {
      metaTitle: "شروط برنامج الشركاء | NoorLink",
      metaDescription:
        "شروط لشركاء NoorLink المعتمدين بالنقد — المؤثرون والمساجد والمراكز الإسلامية وموصلو السفر.",
      title: "شروط برنامج الشركاء",
      badge: "آخر تحديث: 29 أغسطس 2026",
      subtitle:
        "تنطبق هذه الشروط على شركاء النقد المعتمدين فقط — وليس على العملاء العاديين الذين يحيلون أصدقاء بعد الشراء.",
      sections: [
        {
          title: "1. النطاق",
          body: [
            "تحكم شروط برنامج الشركاء هذه («شروط الشريك») مشاركتك في برنامج شركاء NoorLink كمؤثر أو مسجد أو مركز إسلامي أو مستشار سفر أو موصل معتمد («الشريك»، «أنت»).",
            "لا تنطبق شروط الشريك هذه على عملاء NoorLink العاديين الذين يشاركون رابط إحالة شخصية بعد شرائهم. مكافآت إحالة العملاء (خصم على طلب لاحق، وليس نقدًا) موضحة على noorlink.co وفي شروط الخدمة العامة.",
            "بتقديم طلب للبرنامج أو الموافقة عليه أو استخدام رابط إحالة أو لوحة شريك، فإنك توافق على شروط الشريك هذه وعلى سياسة الخصوصية لدينا.",
          ],
        },
        {
          title: "2. الأهلية والموافقة",
          body: [
            "يجب أن يكون عمر الشركاء 18 عامًا على الأقل وأن يكونوا قادرين على إبرام اتفاق ملزم. يجب أن تُمثَّل المؤسسات بجهة اتصال مخوّلة.",
            "يُوافق على جميع الشركاء يدويًا من NoorLink. تقديم الطلب لا يضمن القبول. يجوز لنا الموافقة أو الرفض أو إلغاء المشاركة وفق تقديرنا.",
            "قد نطلب معلومات إضافية عن مؤسستك أو جمهورك أو أساليب الترويج قبل الموافقة أو بعدها.",
          ],
        },
        {
          title: "3. أنواع الشركاء والأسعار الافتراضية",
          body: [
            "تعتمد نسب العمولة وخصومات الجمهور وحدود الدفع الدنيا على نوع الشريك. قد تُخصَّص الأسعار الافتراضية أدناه كتابيًا عند الموافقة.",
          ],
          bullets: [
            "مؤثر / صانع محتوى: خصم جمهور 10٪؛ عمولة 10٪ على صافي المبيعات المؤهلة؛ حد أدنى للدفع 25 دولارًا.",
            "مسجد / مركز إسلامي: خصم مجتمعي 5٪؛ عمولة 12٪ على صافي المبيعات المؤهلة (15٪ على خطط ممر الحج والعمرة المؤهلة)؛ حد أدنى للدفع 50 دولارًا.",
            "مستشار سفر / موصل: خصم جمهور 10٪؛ عمولة 8٪ على صافي المبيعات المؤهلة؛ حد أدنى للدفع 25 دولارًا.",
          ],
        },
        {
          title: "4. روابط الإحالة والإسناد",
          body: [
            "يحصل الشركاء المعتمدون على رمز ورابط إحالة فريدين. تُنسب إليك عملية البيع عندما يُكمل العميل الدفع باستخدام رابطك أو رمزك النشط، وفق شروط الشريك هذه.",
            "يُتتبَّع الإسناد تلقائيًا. لا نضمن الإسناد إذا مسح العميل ملفات تعريف الارتباط أو استخدم جهازًا آخر أو طبّق عرضًا آخر يلغي تتبّع الإحالة أو أكمل الدفع دون رابطك أو رمزك.",
            "لا يجوز استخدام رابطك أو رمزك لمشتريات شخصية («إحالة ذاتية»). الإحالات الذاتية لا تستحق عمولة.",
          ],
        },
        {
          title: "5. العمولات",
          body: [
            "تُحسب العمولات كنسبة من صافي المبيعات المؤهلة — المجموع الفرعي للطلب بعد خصومات العميل وقبل الضريبة ومعالجة الدفع، ما لم نحدد خلاف ذلك في بريد الموافقة.",
            "تصبح العمولة مؤهلة بعد دفع طلب العميل وتنفيذه. قد تُعكس العمولات أو تُعدَّل إذا أُعيد مبلغ الطلب أو رُفض أو أُلغي أو اعتُبر احتياليًا أو مسيئًا.",
            "قد تتغير نسب العمولة ومستويات الخصم والمنتجات المؤهلة للطلبات المستقبلية. نبذل جهدًا معقولًا لإخطار الشركاء المعتمدين بالتغييرات الجوهرية.",
            "العمولات ليست دخلًا مضمونًا. الأداء السابق لا يضمن أرباحًا مستقبلية.",
          ],
        },
        {
          title: "6. المدفوعات",
          body: [
            "يُعالَج الدفع النقدي يدويًا من فريق NoorLink بعد طلبك السحب عبر لوحة الشريك وعندما يبلغ رصيدك المعتمد الحد الأدنى لنوع شريكك.",
            "تُراجع طلبات الدفع عادة خلال خمسة (5) أيام عمل. قد نؤجل أو نحتجز الدفع أثناء التحقيق في شبهة احتيال أو مخالفات أو فروقات في الحساب.",
            "أنت مسؤول عن تقديم بيانات دفع دقيقة (مثل PayPal أو بيانات بنكية) عند الطلب. لا تتحمّل NoorLink مسؤولية التحويلات الفاشلة بسبب بيانات غير صحيحة تقدّمها أنت.",
            "قد تُفقد الأرصدة غير المدفوعة إذا أُنهي حسابك لسبب، أو إذا ظل غير نشط لمدة اثني عشر (12) شهرًا متتاليًا، إلا حيث يحظر القانون ذلك.",
          ],
        },
        {
          title: "7. الضرائب",
          body: [
            "الشركاء مقاولون مستقلون، وليسوا موظفين أو وكلاء لدى NoorLink. أنت وحدك مسؤول عن أي ضرائب أو إقرارات أو التزامات إبلاغ ناشئة عن العمولات التي تستلمها.",
            "قد نطلب معلومات ضريبية (مثل W-9 لشركاء الولايات المتحدة) قبل إصدار مدفوعات فوق الحدود المعمول بها، وقد نصدر نماذج ضريبية معلوماتية حيث يقتضي القانون.",
          ],
        },
        {
          title: "8. العلامة والتسويق",
          body: [
            "يجوز لك الترويج لـ NoorLink باستخدام رابط الإحالة وتفاصيل البرنامج الواقعية التي نقدّمها. توافق على أن:",
          ],
          bullets: [
            "تقدّم NoorLink بصدق — كخدمة eSIM للسفر، وليس كمشغّل جوال أو شبكة.",
            "تستخدم أوصافًا دقيقة للتغطية ورصيد البيانات والأسعار كما تظهر على noorlink.co وقت الترويج.",
            "لا تعدّل اسم NoorLink أو الشعار أو الهوية البصرية إلا بتفويض كتابي صريح منا.",
            "لا توحي بتأييد أو توظيف أو شراكة رسمية تتجاوز وضعك المعتمد.",
            "تعرض روابط المساجد والمجتمع كمنفعة سفر عملية لمجتمعك، وليس كقسيمة عامة أو مخطط خصم مضلّل.",
          ],
        },
        {
          title: "9. السلوك المحظور",
          body: ["لا يجوز لك:"],
          bullets: [
            "إرسال بريد جماعي غير مرغوب (رسائل مزعجة) أو رسائل SMS مزعجة أو إعلانات خادعة.",
            "المزايدة على علامات NoorLink التجارية أو مصطلحات العلامة في البحث المدفوع دون موافقتنا الكتابية.",
            "تقديم ادعاءات كاذبة أو مبالغ فيها (مثل «بيانات غير محدودة في كل مكان» أو سرعات شبكة مضمونة).",
            "استخدام حشو ملفات تعريف الارتباط أو حركة وهمية أو مواقع حوافز تضلل العملاء أو أي أسلوب إسناد احتيالي.",
            "الترويج لـ NoorLink على مواقع أو قنوات غير قانونية أو تحض على الكراهية أو محتوى للبالغين أو المقامرة بشكل أساسي.",
            "إعادة بيع شرائح NoorLink أو ترخيصها من الباطن أو وسمها بعلامتك دون اتفاق كتابي منفصل.",
          ],
        },
        {
          title: "10. الإيقاف والإنهاء",
          body: [
            "يجوز لنا إيقاف أو إنهاء حساب شريكك فورًا إذا خالفت شروط الشريك هذه أو ارتكبت سلوكًا محظورًا أو إذا اشتبهنا بشكل معقول في احتيال أو ضرر للعملاء أو لعلامة NoorLink.",
            "عند الإنهاء، يتوقف رابطك عن كسب عمولات جديدة. سندفع الأرصدة المعتمدة المؤهلة غير المرتبطة بالاحتيال أو الاسترداد العكسي، وفق قواعد الدفع أعلاه.",
            "يمكنك التوقف عن المشاركة في أي وقت بإخطار support@noorlink.co. لا يؤثر الإنهاء على حقنا في احتجاز أو عكس العمولات المرتبطة بطلبات غير صالحة.",
          ],
        },
        {
          title: "11. التغييرات",
          body: [
            "قد نحدّث شروط الشريك هذه من وقت لآخر. سيتغيّر تاريخ «آخر تحديث» أعلى هذه الصفحة عند ذلك.",
            "تُنشر التغييرات الجوهرية على noorlink.co/partners/terms. استمرار استخدام رابط الشريك أو اللوحة بعد سريان التغييرات يُعد قبولًا، إلا حيث يتطلب التغيير موافقة منفصلة بموجب القانون المعمول به.",
          ],
        },
        {
          title: "12. إخلاء المسؤولية وتحديدها",
          body: [
            "يُقدَّم برنامج الشركاء وأدوات الإحالة «كما هي». إلى أقصى حد يسمح به القانون، لا تتحمّل NoorLink مسؤولية الأضرار غير المباشرة أو العرضية أو التبعية الناشئة عن مشاركتك.",
            "تقتصر مسؤوليتنا الإجمالية تجاهك عن أي مطالبة متعلقة ببرنامج الشركاء على العمولات غير المدفوعة التي أكدنا أنها معتمدة وغير متنازع عليها وقت المطالبة.",
          ],
        },
        {
          title: "13. أحكام عامة",
          body: [
            "تخضع شروط الشريك هذه لقوانين ولاية نيو مكسيكو، الولايات المتحدة، دون مراعاة قواعد تنازع القوانين.",
            "إذا تعذّر إنفاذ أي بند، تظل البنود المتبقية سارية.",
            "أسئلة عن شروط الشريك هذه أو حساب شريكك: support@noorlink.co",
            "NoorLink · Mountain Road Pl NE, Suite R · Albuquerque, NM 87110, USA",
          ],
        },
      ],
    },
  },
};

export function getPolicy(
  locale: string | null | undefined,
  slug: PolicySlug,
): PolicyContent {
  const loc = normalizeLocale(locale);
  return policies[slug][loc];
}
