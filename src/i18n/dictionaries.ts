import type { Locale } from "./config";

const en = {
  brand: "Obsidian River",
  nav: {
    home: "Home",
    shop: "Shop",
    custom: "Custom tables",
    atelier: "Workshop",
    quote: "Ask for a quote",
    contact: "Contact",
  },
  header: {
    langEn: "EN",
    langBg: "BG",
  },
  home: {
    headline: "Epoxy tables and wood pieces from our workshop in Bulgaria.",
    subhead:
      "Coasters, boards, and trays are in the shop with fixed prices and ready to ship. Custom tables start with an enquiry — the photos are examples to help you describe what you want.",
    ctaCollection: "Browse the shop",
    ctaQuote: "Ask about a custom table",
    tablesEyebrow: "Custom work",
    tablesTitle: "Tables made to your sizes",
    tablesHint: "Photos are examples. Send an enquiry if you want something like these.",
    objectsEyebrow: "Shop",
    objectsTitle: "Ready to buy",
    objectsHint: "Fixed prices, blue or black resin, in stock (0 days lead time). Econt delivery.",
    processEyebrow: "How it usually goes",
    processTitle: "A short look at the work",
    process: [
      {
        title: "Choosing the wood",
        body: "We work with walnut, oak, and ash. Real boards, not veneer over particle board.",
      },
      {
        title: "The resin pour",
        body: "Shop pieces come in blue or black resin. Custom tables can use other tones if you ask.",
      },
      {
        title: "Buy or enquire",
        body: "Small pieces go straight to checkout. Tables need a short enquiry so we can quote size and base.",
      },
    ],
    faqEyebrow: "Questions people ask",
    faqTitle: "A few practical answers",
    faqs: [
      {
        q: "Why don’t tables have a price on the site?",
        a: "Because length, thickness, wood grade, and the metal base change the cost a lot. Write to us with what you need and we’ll reply with a number and a timeline.",
      },
      {
        q: "Can I buy the coasters and boards online?",
        a: "Yes. They’re in the Shop with fixed prices, blue or black resin, and 0 days lead time. Checkout asks for Econt delivery details and we email a confirmation.",
      },
      {
        q: "Where do you ship?",
        a: "Smaller pieces go through Econt in Bulgaria. For tables we arrange crating and delivery once the piece is finished. EU shipping is possible — ask us when you write.",
      },
      {
        q: "Do I pay a deposit for a table?",
        a: "Usually about 40% after you accept the quote, so we can buy the wood. The rest is due before delivery.",
      },
    ],
  },
  collection: {
    eyebrow: "Collection",
    title: "What we’re making right now",
    intro:
      "Tables are quoted individually. Coasters, cutting boards, and trays have clear prices and can be ordered with Econt delivery.",
    tablesTitle: "Tables and consoles",
    objectsTitle: "Smaller pieces",
    quoteBadge: "Ask for a quote",
    viewPiece: "View details",
  },
  shop: {
    eyebrow: "Shop",
    title: "Pieces you can buy now",
    intro:
      "Coasters, boards, and trays in blue or black resin. Lead time is 0 days — they’re ready to ship with Econt.",
    buyNow: "Buy",
    resinLabel: "Resin colour",
    resinBlue: "Blue",
    resinBlack: "Black",
    customHint: "Looking for a full-size table instead?",
    customLink: "See custom examples and enquire",
  },
  custom: {
    eyebrow: "Custom",
    title: "Table examples — enquire to order",
    intro:
      "These photos are visual guides, not stock items. If something close to what you want, send an enquiry with sizes and we’ll reply with a quote.",
    exampleBadge: "Example / visual guide",
    viewExample: "View example",
    enquireCta: "Send an enquiry",
    guideNote:
      "This piece isn’t sitting in a warehouse. It’s an example of work we can make for you.",
    shopHint: "Want something ready today?",
    shopLink: "Go to the shop",
  },
  product: {
    signature: "Custom table",
    object: "Ready to order",
    story: "About this piece",
    materials: "Materials",
    dimensions: "Size",
    leadTime: "Lead time",
    price: "Price",
    quoteCta: "Ask for a quote",
    buyCta: "Order with Econt",
    fixedNote: "Price in EUR. Delivery calculated / arranged via Econt at checkout.",
    quoteNote: "We’ll answer within a couple of working days with price and timing.",
  },
  checkout: {
    eyebrow: "Checkout",
    title: "Order and Econt delivery",
    intro:
      "Fill in your details and how you’d like Econt to deliver. We’ll email you a confirmation and prepare the shipment.",
    product: "Product",
    quantity: "Quantity",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    deliveryType: "Delivery type",
    office: "Econt office pickup",
    address: "Address delivery",
    city: "City",
    postCode: "Post code",
    officeCode: "Econt office code",
    officeName: "Econt office name / address",
    officeHint: "You can find office codes on econt.com/offices.",
    street: "Street",
    streetNumber: "No.",
    addressExtra: "Block / entrance / floor / apt (optional)",
    payment: "Payment",
    cod: "Cash on delivery (Econt)",
    bank: "Bank transfer (we’ll send details by email)",
    notes: "Notes for us (optional)",
    submit: "Place order",
    submitting: "Sending…",
    successTitle: "Order received",
    successBody:
      "Thanks — we’ve saved your order and sent a confirmation to your email. We’ll prepare the Econt shipment next.",
    backToProduct: "Back to the product",
  },
  about: {
    eyebrow: "Workshop",
    title: "A small workshop, not a factory line.",
    body: "Obsidian River is run as a small workshop. We make epoxy river tables when someone asks for one, and we keep a few smaller pieces — coasters, boards, trays — that people can order without a long back-and-forth. The wood is chosen by hand. Finishes take the time they take.",
    values: [
      {
        title: "Solid wood",
        body: "Walnut, oak, ash. We don’t hide cheap cores under a thin face.",
      },
      {
        title: "Epoxy that fits the piece",
        body: "We mix pigments for darker, quieter tones. Gloss is kept under control.",
      },
      {
        title: "Built for real rooms",
        body: "Kitchen pieces get food-safe oil. Table bases are made to hold weight, not just look nice in photos.",
      },
    ],
  },
  quote: {
    eyebrow: "Quote",
    title: "Tell us what you need",
    intro:
      "Share the piece you’re interested in, rough sizes, and anything about the room or timeline. We usually reply within two working days.",
    successTitle: "We’ve got your message",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    product: "Piece you’re asking about",
    general: "General question",
    dimensions: "Preferred size",
    message: "Message",
    messagePlaceholder:
      "Room, sizes, wood or resin preferences, when you’d like it…",
    submit: "Send message",
    sending: "Sending…",
  },
  contact: {
    eyebrow: "Contact",
    title: "Write to the workshop",
    intro:
      "Quotes, orders, delivery questions — email is fine. We try to answer within two working days.",
    emailLabel: "Email",
    emailValue: "atelier@obsidianriver.eu",
    hoursLabel: "Hours",
    hoursValue: "Mon–Fri, 10:00–18:00 EET",
    locationLabel: "Where we are",
    locationValue: "Bulgaria · Econt for smaller parcels",
    ctaQuote: "Ask for a quote",
  },
  shipping: {
    eyebrow: "Shipping",
    title: "How delivery works",
    body: "Smaller pieces ship with Econt in Bulgaria — you choose office pickup or address delivery at checkout. Tables are packed in crates; we agree the date with you before they leave the workshop. If you need something sent elsewhere in the EU, say so when you write and we’ll work out the options.",
    bullets: [
      "Econt for coasters, boards, and trays in Bulgaria",
      "Office or address — you pick at checkout",
      "Tables: crated delivery arranged after the piece is ready",
    ],
  },
  returns: {
    eyebrow: "Returns",
    title: "Returns and exchanges",
    body: "If a ready-made piece arrives and it’s unused, you can return it within 14 days. Custom tables and made-to-size work can’t be returned once we’ve started, unless something is wrong with the making — then we repair or remake it.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy",
    body: "We keep the details you give us for quotes and orders — name, email, phone, delivery address, and your message. Orders and inquiries stay in our database so we can fulfill them. We don’t sell that information. Email atelier@obsidianriver.eu if you want something deleted.",
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms",
    body: "A custom table starts after you accept a written quote and pay the deposit. Lead times are estimates and can move if wood is slow to arrive. Photos show typical work; grain and resin never match exactly. Small pieces are priced in EUR; Econt delivery details are collected at checkout.",
  },
  footer: {
    tagline: "Tables and small wood pieces from a workshop in Bulgaria.",
    shop: "Shop",
    help: "Help",
    follow: "Social",
    newsletter: "Email updates",
    newsletterHint: "Occasional notes when we finish new pieces. Easy to unsubscribe.",
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
    title: "We can’t find that page",
    body: "It may have been moved, or the link is old.",
    cta: "Back to the collection",
  },
  seo: {
    siteName: "Obsidian River",
    homeTitle: "Obsidian River — Epoxy tables and wood pieces",
    homeDescription:
      "Custom epoxy tables by quote, plus coasters, cutting boards, and trays with fixed prices. Workshop in Bulgaria. Econt delivery for smaller orders.",
  },
};

const bg: typeof en = {
  brand: "Obsidian River",
  nav: {
    home: "Начало",
    shop: "Магазин",
    custom: "Поръчкови маси",
    atelier: "Работилница",
    quote: "Запитване",
    contact: "Контакти",
  },
  header: {
    langEn: "EN",
    langBg: "BG",
  },
  home: {
    headline: "Епоксидни маси и дървени изделия от нашата работилница в България.",
    subhead:
      "Подложките, дъските и тавите са в магазина с фиксирани цени и готови за изпращане. Поръчковите маси започват със запитване — снимките са примери, за да опишете какво искате.",
    ctaCollection: "Към магазина",
    ctaQuote: "Запитване за поръчкова маса",
    tablesEyebrow: "Поръчкова работа",
    tablesTitle: "Маси по ваши размери",
    tablesHint: "Снимките са примери. Пратете запитване, ако искате нещо подобно.",
    objectsEyebrow: "Магазин",
    objectsTitle: "Готови за покупка",
    objectsHint: "Фиксирани цени, синя или черна смола, налично (0 дни срок). Доставка с Еконт.",
    processEyebrow: "Как обикновено става",
    processTitle: "Накратко за работата",
    process: [
      {
        title: "Избор на дърво",
        body: "Работим с орех, дъб и ясен. Истински плочи, не фурнир върху ПДЧ.",
      },
      {
        title: "Заливката със смола",
        body: "В магазина изделията са със синя или черна смола. При поръчкови маси можем да говорим и за други тонове.",
      },
      {
        title: "Купи или попитай",
        body: "Малките изделия отиват директно към поръчка. За масите е нужно кратко запитване, за да оферираме размер и основа.",
      },
    ],
    faqEyebrow: "Често задавани въпроси",
    faqTitle: "Няколко практически отговора",
    faqs: [
      {
        q: "Защо масите нямат цена на сайта?",
        a: "Защото дължината, дебелината, качеството на дървото и металната основа променят много цената. Пишете ни какво ви трябва и ще върнем сума и срок.",
      },
      {
        q: "Мога ли да купя подложките и дъските онлайн?",
        a: "Да. Те са в Магазина с фиксирани цени, синя или черна смола и срок 0 дни. При поръчка избирате доставка с Еконт и получавате потвърждение по имейл.",
      },
      {
        q: "Къде доставяте?",
        a: "По-малките пратки вървят с Еконт в България. За масите уговаряме опаковка и дата, когато изделието е готово. За ЕС — кажете ни при запитването.",
      },
      {
        q: "Плаща ли се депозит за маса?",
        a: "Обикновено около 40% след като приемете офертата, за да купим дървото. Останалото — преди доставка.",
      },
    ],
  },
  collection: {
    eyebrow: "Колекция",
    title: "Какво правим в момента",
    intro:
      "Масите са с индивидуална оферта. Подложките, дъските и тавите имат ясни цени и се поръчват с доставка чрез Еконт.",
    tablesTitle: "Маси и конзоли",
    objectsTitle: "По-малки изделия",
    quoteBadge: "Запитване за цена",
    viewPiece: "Виж подробности",
  },
  shop: {
    eyebrow: "Магазин",
    title: "Изделия, които можете да купите сега",
    intro:
      "Подложки, дъски и тави в синя или черна смола. Срок 0 дни — готови са за изпращане с Еконт.",
    buyNow: "Купи",
    resinLabel: "Цвят на смолата",
    resinBlue: "Синя",
    resinBlack: "Черна",
    customHint: "Търсите голяма маса?",
    customLink: "Вижте примери и изпратете запитване",
  },
  custom: {
    eyebrow: "Поръчка",
    title: "Примери за маси — запитване за изработка",
    intro:
      "Снимките са визуални ориентири, не налични бройки. Ако нещо е близо до това, което искате, пратете запитване с размери и ще върнем оферта.",
    exampleBadge: "Пример / визуален ориентир",
    viewExample: "Виж примера",
    enquireCta: "Изпрати запитване",
    guideNote:
      "Това изделие не стои на склад. То е пример за работа, която можем да направим за вас.",
    shopHint: "Искате нещо готово днес?",
    shopLink: "Към магазина",
  },
  product: {
    signature: "Поръчкова маса",
    object: "Готово за поръчка",
    story: "За изделието",
    materials: "Материали",
    dimensions: "Размер",
    leadTime: "Срок",
    price: "Цена",
    quoteCta: "Изпрати запитване",
    buyCta: "Поръчай с Еконт",
    fixedNote: "Цена в евро. Доставката се уговаря чрез Еконт при поръчка.",
    quoteNote: "Отговаряме в рамките на два работни дни с цена и срок.",
  },
  checkout: {
    eyebrow: "Поръчка",
    title: "Поръчка и доставка с Еконт",
    intro:
      "Попълнете данните и начина на доставка с Еконт. Ще получите потвърждение по имейл и ще подготвим пратката.",
    product: "Продукт",
    quantity: "Количество",
    name: "Име и фамилия",
    email: "Имейл",
    phone: "Телефон",
    deliveryType: "Начин на доставка",
    office: "До офис на Еконт",
    address: "До адрес",
    city: "Град",
    postCode: "Пощенски код",
    officeCode: "Код на офис Еконт",
    officeName: "Име / адрес на офиса",
    officeHint: "Кодовете на офисите са на econt.com/offices.",
    street: "Улица",
    streetNumber: "№",
    addressExtra: "Блок / вход / етаж / ап. (по желание)",
    payment: "Плащане",
    cod: "Наложен платеж (Еконт)",
    bank: "Банков превод (ще изпратим данни по имейл)",
    notes: "Бележка към нас (по желание)",
    submit: "Поръчай",
    submitting: "Изпращане…",
    successTitle: "Поръчката е приета",
    successBody:
      "Благодарим — запазихме поръчката и изпратихме потвърждение на имейла ви. Следва подготовка на пратката с Еконт.",
    backToProduct: "Обратно към продукта",
  },
  about: {
    eyebrow: "Работилница",
    title: "Малка работилница, не конвейер.",
    body: "Obsidian River е малка работилница. Правим епоксидни river маси, когато някой ни потърси, и държим няколко по-малки изделия — подложки, дъски, тави — които могат да се поръчат без дълга кореспонденция. Дървото се избира на ръка. Покритията отнемат колкото трябва.",
    values: [
      {
        title: "Масивно дърво",
        body: "Орех, дъб, ясен. Не крием евтина сърцевина под тънък фурнир.",
      },
      {
        title: "Смола според изделието",
        body: "Месим пигменти за по-тъмни, спокойни тонове. Гланцът се държи под контрол.",
      },
      {
        title: "За реални пространства",
        body: "Кухненските изделия са с хранително-безопасно масло. Основите на масите държат тежест, не само снимка.",
      },
    ],
  },
  quote: {
    eyebrow: "Запитване",
    title: "Кажете ни какво ви трябва",
    intro:
      "Споделете изделието, приблизителните размери и нещо за помещението или срока. Обикновено отговаряме до два работни дни.",
    successTitle: "Получихме съобщението",
    name: "Име",
    email: "Имейл",
    phone: "Телефон (по желание)",
    product: "За кое изделие питате",
    general: "Общ въпрос",
    dimensions: "Желан размер",
    message: "Съобщение",
    messagePlaceholder: "Помещение, размери, предпочитания за дърво или смола, срок…",
    submit: "Изпрати",
    sending: "Изпращане…",
  },
  contact: {
    eyebrow: "Контакти",
    title: "Пишете на работилницата",
    intro:
      "Оферти, поръчки, доставка — имейлът е най-удобен. Стараем се да отговорим до два работни дни.",
    emailLabel: "Имейл",
    emailValue: "atelier@obsidianriver.eu",
    hoursLabel: "Работно време",
    hoursValue: "Пон–Пет, 10:00–18:00 EET",
    locationLabel: "Къде сме",
    locationValue: "България · Еконт за по-малки пратки",
    ctaQuote: "Изпрати запитване",
  },
  shipping: {
    eyebrow: "Доставка",
    title: "Как става доставката",
    body: "По-малките изделия се изпращат с Еконт в България — при поръчка избирате офис или адрес. Масите се опаковат в каси; уговаряме датата преди да тръгнат. Ако трябва пратка извън България в ЕС, кажете ни при запитването.",
    bullets: [
      "Еконт за подложки, дъски и тави в България",
      "Офис или адрес — избирате при поръчка",
      "Маси: доставка в каса след като изделието е готово",
    ],
  },
  returns: {
    eyebrow: "Връщане",
    title: "Връщане и замяна",
    body: "Ако готово изделие пристигне и не е ползвано, можете да го върнете в 14 дни. Поръчковите маси и индивидуалните размери не се връщат след като сме започнали работа, освен при дефект в изработката — тогава поправяме или правим наново.",
  },
  privacy: {
    eyebrow: "Поверителност",
    title: "Поверителност",
    body: "Пазим данните, които ни давате за запитвания и поръчки — име, имейл, телефон, адрес за доставка и съобщение. Поръчките остават в базата ни, за да ги изпълним. Не продаваме тази информация. За изтриване: atelier@obsidianriver.eu.",
  },
  terms: {
    eyebrow: "Условия",
    title: "Условия",
    body: "Поръчкова маса започва след приета писмена оферта и депозит. Сроковете са ориентировъчни. Снимките показват типична работа; дървото и смолата никога не са еднакви. Малките изделия са с цена в EUR; данните за Еконт се събират при поръчка.",
  },
  footer: {
    tagline: "Маси и малки дървени изделия от работилница в България.",
    shop: "Магазин",
    help: "Помощ",
    follow: "Социални мрежи",
    newsletter: "Имейл новини",
    newsletterHint: "Понякога пишем, когато имаме нови готови изделия. Лесно се отписвате.",
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
    title: "Не намираме тази страница",
    body: "Може да е преместена или връзката да е стара.",
    cta: "Към колекцията",
  },
  seo: {
    siteName: "Obsidian River",
    homeTitle: "Obsidian River — Епоксидни маси и дървени изделия",
    homeDescription:
      "Поръчкови епоксидни маси с оферта, плюс подложки, дъски и тави с фиксирани цени. Работилница в България. Доставка с Еконт за по-малки поръчки.",
  },
};

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, bg };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
