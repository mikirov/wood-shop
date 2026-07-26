import type { Locale } from "./config";

const en = {
  brand: "Obsidian River",
  nav: {
    home: "Home",
    collection: "Collection",
    atelier: "Atelier",
    objects: "Small pieces",
    quote: "Request a quote",
    contact: "Contact",
  },
  header: {
    langEn: "EN",
    langBg: "BG",
  },
  home: {
    headline: "Tables carved from smoke, steel, and living wood.",
    subhead:
      "Bespoke epoxy river pieces for dining rooms that prefer dusk to daylight — and smaller atelier objects with fixed prices.",
    ctaCollection: "View collection",
    ctaQuote: "Request a quote",
    tablesEyebrow: "Signature tables",
    tablesTitle: "Commission pieces",
    tablesHint: "Custom sizing · Quote on request",
    objectsEyebrow: "Atelier objects",
    objectsTitle: "Smaller pieces",
    objectsHint: "Fixed prices · Ships across the EU",
    processEyebrow: "How we work",
    processTitle: "From slab to pour",
    process: [
      {
        title: "Wood first",
        body: "Walnut, oak, and ash with character grain — never veneer.",
      },
      {
        title: "Resin as atmosphere",
        body: "Pigmented pours for smoke, ember, and mist — depth without glare.",
      },
      {
        title: "Commission or ready",
        body: "Tables are quoted to your room. Small pieces ship at listed prices.",
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Before you commission",
    faqs: [
      {
        q: "Do tables have a fixed price?",
        a: "No. Every table is quoted for wood, resin, base, and dimensions — the same model used by ateliers like Arbor Studio for large slabs.",
      },
      {
        q: "Can I buy coasters and boards outright?",
        a: "Yes. Smaller pieces have fixed EUR prices and typical lead times of 2–5 weeks.",
      },
      {
        q: "Do you ship in the EU?",
        a: "Yes. We ship within Bulgaria and across the EU. Details are on the Shipping page.",
      },
      {
        q: "What is the deposit for a table?",
        a: "Usually 40% to reserve materials, with the balance before delivery.",
      },
    ],
  },
  collection: {
    eyebrow: "Collection",
    title: "Three rivers. Three tempers. Three objects.",
    intro:
      "Commission tables by quote. Take home coasters, boards, and trays at fixed atelier prices.",
    tablesTitle: "Tables & consoles",
    objectsTitle: "Smaller pieces",
    quoteBadge: "Quote on request",
    viewPiece: "View piece",
  },
  product: {
    signature: "Signature piece",
    object: "Atelier object",
    story: "The story",
    materials: "Materials",
    dimensions: "Dimensions",
    leadTime: "Lead time",
    price: "Price",
    quoteCta: "Request a quote",
    fixedNote: "Fixed price · VAT may apply by destination",
    quoteNote: "Custom commission · We reply within two business days",
  },
  about: {
    eyebrow: "Atelier",
    title: "Old-school craft under a modern pour.",
    body: "Obsidian River is a small atelier for people who want furniture that feels like dusk — live edges, pigmented epoxy rivers, blackened steel, brass that catches firelight. We work slowly. Every slab is selected, dried, and finished by hand.",
    values: [
      {
        title: "Wood first",
        body: "Walnut, oak, and ash with character grain — never veneer, never filler boards.",
      },
      {
        title: "Resin as atmosphere",
        body: "Pours are pigmented for smoke, ember, and mist — gloss held in check, depth kept.",
      },
      {
        title: "Made to last",
        body: "Food-safe finishes on kitchen pieces. Structural bases engineered for real rooms.",
      },
    ],
  },
  quote: {
    eyebrow: "Commission",
    title: "Request a quote",
    intro:
      "Tell us the piece, the room, and the dimensions you have in mind. We reply within two business days with timeline and deposit details.",
    successTitle: "Request received",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    product: "Piece of interest",
    general: "General inquiry",
    dimensions: "Preferred dimensions",
    message: "Message",
    messagePlaceholder:
      "Tell us about the room, timeline, and any wood or resin preferences.",
    submit: "Submit request",
    sending: "Sending…",
  },
  contact: {
    eyebrow: "Contact",
    title: "Speak with the atelier",
    intro:
      "For quotes, shipping questions, or custom finishes — write to us. We answer within two business days.",
    emailLabel: "Email",
    emailValue: "atelier@obsidianriver.eu",
    hoursLabel: "Hours",
    hoursValue: "Mon–Fri, 10:00–18:00 EET",
    locationLabel: "Studio",
    locationValue: "Bulgaria · EU shipping",
    ctaQuote: "Start a quote",
  },
  shipping: {
    eyebrow: "Shipping",
    title: "Delivery across the EU",
    body: "Small pieces ship with tracked courier. Tables and consoles are crated and scheduled with you before dispatch. Bulgaria: typically 2–5 business days after finish. EU: 5–12 business days depending on carrier and destination.",
    bullets: [
      "Tracked shipping on all ready-made objects",
      "Custom crating for tables and consoles",
      "Duties/VAT follow your country’s rules for EU trade",
    ],
  },
  returns: {
    eyebrow: "Returns",
    title: "Returns & exchanges",
    body: "Ready-made objects may be returned within 14 days if unused and in original condition. Custom commissions (tables, sized pieces) are non-returnable once production begins, except for manufacturing defects we will repair or remake.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy policy",
    body: "We collect only what we need to answer quotes and fulfill orders: name, email, phone if provided, and message content. Inquiries are stored securely. We do not sell personal data. Contact atelier@obsidianriver.eu to request deletion.",
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms of service",
    body: "Commissions begin after written quote acceptance and deposit. Lead times are estimates and may shift with material availability. Product photos are representative; natural wood and resin vary. Prices for small pieces are listed in EUR; table work is quoted per project.",
  },
  footer: {
    tagline: "Epoxy and hardwood tables forged in smoke, steel, and patience.",
    shop: "Shop",
    help: "Help",
    follow: "Follow",
    newsletter: "Newsletter",
    newsletterHint: "New pours and atelier notes — no spam.",
    emailPlaceholder: "Email",
    subscribe: "Subscribe",
    rights: "All rights reserved.",
    terms: "Terms",
    privacy: "Privacy",
    returns: "Returns",
    shipping: "Shipping",
    contact: "Contact",
  },
  notFound: {
    code: "404",
    title: "This river runs dry",
    body: "The piece you sought is not in the collection.",
    cta: "Back to collection",
  },
  seo: {
    siteName: "Obsidian River",
    homeTitle: "Obsidian River — Epoxy Tables & Atelier Objects",
    homeDescription:
      "Luxury epoxy river tables by quote and handmade coasters, cutting boards, and trays with fixed EU prices. Crafted in Bulgaria.",
  },
};

export type Dictionary = typeof en;

const bg: Dictionary = {
  brand: "Obsidian River",
  nav: {
    home: "Начало",
    collection: "Колекция",
    atelier: "Ателие",
    objects: "Малки изделия",
    quote: "Заявка за оферта",
    contact: "Контакти",
  },
  header: {
    langEn: "EN",
    langBg: "BG",
  },
  home: {
    headline: "Маси, изваяни от дим, стомана и живо дърво.",
    subhead:
      "Поръчкови епоксидни river маси за трапезарии със сумрачен характер — и по-малки изделия от ателието с фиксирани цени.",
    ctaCollection: "Виж колекцията",
    ctaQuote: "Заяви оферта",
    tablesEyebrow: "Сигнатурни маси",
    tablesTitle: "Поръчкови изделия",
    tablesHint: "Индивидуални размери · Оферта по запитване",
    objectsEyebrow: "Изделия от ателието",
    objectsTitle: "По-малки парчета",
    objectsHint: "Фиксирани цени · Доставка в ЕС",
    processEyebrow: "Как работим",
    processTitle: "От плоча до заливка",
    process: [
      {
        title: "Първо дървото",
        body: "Орех, дъб и ясен с характер — никога фурнир.",
      },
      {
        title: "Смолата като атмосфера",
        body: "Пигментирани заливки за дим, жар и мъгла — дълбочина без блясък.",
      },
      {
        title: "Поръчка или налично",
        body: "Масите са с оферта за вашето пространство. Малките изделия се изпращат с обявена цена.",
      },
    ],
    faqEyebrow: "ЧЗВ",
    faqTitle: "Преди да поръчате",
    faqs: [
      {
        q: "Масите имат ли фиксирана цена?",
        a: "Не. Всяка маса се оферира според дърво, смола, основа и размери — както при ателиета като Arbor Studio за големи плочи.",
      },
      {
        q: "Мога ли да купя подложки и дъски директно?",
        a: "Да. По-малките изделия имат фиксирани цени в евро и срок обикновено 2–5 седмици.",
      },
      {
        q: "Доставяте ли в ЕС?",
        a: "Да. Доставяме в България и в Европейския съюз. Подробности — на страницата Доставка.",
      },
      {
        q: "Какъв е депозитът за маса?",
        a: "Обикновено 40% за резервиране на материали, остатъкът преди доставка.",
      },
    ],
  },
  collection: {
    eyebrow: "Колекция",
    title: "Три реки. Три характера. Три малки изделия.",
    intro:
      "Маси по оферта. Подложки, дъски и тави — с фиксирани цени от ателието.",
    tablesTitle: "Маси и конзоли",
    objectsTitle: "По-малки изделия",
    quoteBadge: "Оферта по запитване",
    viewPiece: "Виж изделието",
  },
  product: {
    signature: "Сигнатурно изделие",
    object: "Изделие от ателието",
    story: "Историята",
    materials: "Материали",
    dimensions: "Размери",
    leadTime: "Срок",
    price: "Цена",
    quoteCta: "Заяви оферта",
    fixedNote: "Фиксирана цена · ДДС според дестинацията",
    quoteNote: "Поръчкова изработка · Отговаряме до два работни дни",
  },
  about: {
    eyebrow: "Ателие",
    title: "Старо школно майсторство с модерна заливка.",
    body: "Obsidian River е малко ателие за хора, които искат мебели със сумрачен характер — живи ръбове, пигментирани епоксидни реки, почернена стомана, месинг, който лови светлината. Работим бавно. Всяка плоча се избира, суши и завършва на ръка.",
    values: [
      {
        title: "Първо дървото",
        body: "Орех, дъб и ясен с характер — никога фурнир, никога запълващи плоскости.",
      },
      {
        title: "Смолата като атмосфера",
        body: "Заливки за дим, жар и мъгла — контролиран гланц, запазена дълбочина.",
      },
      {
        title: "Направено да издържи",
        body: "Хранително-безопасни покрития за кухненски изделия. Носещи основи за реални пространства.",
      },
    ],
  },
  quote: {
    eyebrow: "Поръчка",
    title: "Заявка за оферта",
    intro:
      "Кажете ни изделието, помещението и желаните размери. Отговаряме до два работни дни със срок и депозит.",
    successTitle: "Заявката е получена",
    name: "Име",
    email: "Имейл",
    phone: "Телефон (по желание)",
    product: "Изделие от интерес",
    general: "Общо запитване",
    dimensions: "Желани размери",
    message: "Съобщение",
    messagePlaceholder:
      "Разкажете ни за помещението, срока и предпочитанията за дърво или смола.",
    submit: "Изпрати заявка",
    sending: "Изпращане…",
  },
  contact: {
    eyebrow: "Контакти",
    title: "Свържете се с ателието",
    intro:
      "За оферти, доставка или персонални покрития — пишете ни. Отговаряме до два работни дни.",
    emailLabel: "Имейл",
    emailValue: "atelier@obsidianriver.eu",
    hoursLabel: "Работно време",
    hoursValue: "Пон–Пет, 10:00–18:00 EET",
    locationLabel: "Студио",
    locationValue: "България · Доставка в ЕС",
    ctaQuote: "Започни оферта",
  },
  shipping: {
    eyebrow: "Доставка",
    title: "Доставка в ЕС",
    body: "Малките изделия се изпращат с проследяем куриер. Масите и конзолите се опаковат в дървени каси и се уговарят преди изпращане. България: обикновено 2–5 работни дни след завършване. ЕС: 5–12 работни дни според куриера и дестинацията.",
    bullets: [
      "Проследяема доставка за всички готови изделия",
      "Специална опаковка за маси и конзоли",
      "ДДС/мита според правилата на вашата държава в ЕС",
    ],
  },
  returns: {
    eyebrow: "Връщане",
    title: "Връщане и замяна",
    body: "Готовите изделия могат да се върнат в срок от 14 дни, ако не са ползвани и са в оригинално състояние. Поръчковите изделия (маси, индивидуални размери) не се връщат след започване на производство, освен при производствен дефект — тогава поправяме или изработваме наново.",
  },
  privacy: {
    eyebrow: "Поверителност",
    title: "Политика за поверителност",
    body: "Събираме само необходимото за оферти и поръчки: име, имейл, телефон (ако е предоставен) и съдържание на съобщението. Запитванията се съхраняват сигурно. Не продаваме лични данни. За изтриване: atelier@obsidianriver.eu.",
  },
  terms: {
    eyebrow: "Условия",
    title: "Общи условия",
    body: "Поръчките започват след писмено приемане на офертата и депозит. Сроковете са ориентировъчни и могат да се променят според наличността на материали. Снимките са представителни; естественото дърво и смолата варират. Цените за малки изделия са в EUR; масите се оферират по проект.",
  },
  footer: {
    tagline: "Епоксидни и дървени маси от дим, стомана и търпение.",
    shop: "Магазин",
    help: "Помощ",
    follow: "Последвайте ни",
    newsletter: "Бюлетин",
    newsletterHint: "Нови заливки и новини от ателието — без спам.",
    emailPlaceholder: "Имейл",
    subscribe: "Абониране",
    rights: "Всички права запазени.",
    terms: "Условия",
    privacy: "Поверителност",
    returns: "Връщане",
    shipping: "Доставка",
    contact: "Контакти",
  },
  notFound: {
    code: "404",
    title: "Тази река пресъхна",
    body: "Търсеното изделие не е в колекцията.",
    cta: "Към колекцията",
  },
  seo: {
    siteName: "Obsidian River",
    homeTitle: "Obsidian River — Епоксидни маси и изделия от ателието",
    homeDescription:
      "Луксозни епоксидни river маси по оферта и ръчно изработени подложки, дъски и тави с фиксирани цени в EUR. Изработка в България.",
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  bg,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
