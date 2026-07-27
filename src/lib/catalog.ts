import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type ResinColor = "blue" | "black";

export type CatalogProduct = {
  slug: string;
  category: "shop" | "custom";
  family?: string;
  resin?: ResinColor;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  materials: LocalizedText;
  dimensions: LocalizedText;
  leadTime: LocalizedText;
  pricing: { type: "quote" } | { type: "fixed"; amountEur: number };
  heroImage: string;
  galleryImages: string[];
  sortOrder: number;
  stockQty?: number;
};

const readyLeadTime: LocalizedText = {
  en: "0 days — ready to ship",
  bg: "0 дни — готово за изпращане",
};

export const CATALOG: CatalogProduct[] = [
  {
    slug: "midnight-vein",
    category: "custom",
    name: {
      en: "Midnight Vein Dining Table",
      bg: "Трапезна маса Midnight Vein",
    },
    tagline: {
      en: "Example: walnut with a dark resin river. Made to your length.",
      bg: "Пример: орех с тъмна смолна река. По ваша дължина.",
    },
    description: {
      en: "This is an example of the kind of dining table we build. Two live-edge walnut sides with a dark charcoal-to-indigo epoxy pour. Blackened steel legs. Usually seats eight to ten. If you like this direction, send sizes and we’ll quote it.",
      bg: "Това е пример за трапезна маса, каквато правим. Две орехови страни с тъмна въглено-индиго епоксидна заливка. Крака от почернена стомана. Обикновено за 8–10 места. Ако ви харесва тази посока, пратете размери и ще дадем оферта.",
    },
    materials: {
      en: "European walnut, pigmented epoxy, blackened steel base",
      bg: "Европейски орех, пигментирана епоксидна смола, основа от почернена стомана",
    },
    dimensions: {
      en: "Typical guide: 240–280 cm L × 100–110 cm W × 75 cm H",
      bg: "Ориентир: 240–280 см Д × 100–110 см Ш × 75 см В",
    },
    leadTime: {
      en: "Usually 10–14 weeks after deposit",
      bg: "Обикновено 10–14 седмици след депозит",
    },
    pricing: { type: "quote" },
    heroImage: "/products/midnight-vein.jpg",
    galleryImages: ["/products/midnight-vein.jpg"],
    sortOrder: 1,
  },
  {
    slug: "ember-fracture",
    category: "custom",
    name: {
      en: "Ember Fracture Console",
      bg: "Конзола Ember Fracture",
    },
    tagline: {
      en: "Example: narrow console with an amber resin line.",
      bg: "Пример: тясна конзола с кехлибарена смолна линия.",
    },
    description: {
      en: "A reference piece for hallway or bar consoles — charred oak with an amber epoxy seam and brass feet. Use it as a visual guide when you enquire; we’ll adjust width and length to your space.",
      bg: "Референция за конзола в коридор или до бар — опушен дъб с кехлибарена епоксидна фуга и месингови накрайници. Ползвайте я като визуален ориентир при запитване; нагласяме ширина и дължина към пространството ви.",
    },
    materials: {
      en: "Charred oak, amber epoxy, brass foot caps",
      bg: "Опушен дъб, кехлибарена епоксидна смола, месингови накрайници",
    },
    dimensions: {
      en: "Typical guide: 150 cm L × 35 cm W × 80 cm H",
      bg: "Ориентир: 150 см Д × 35 см Ш × 80 см В",
    },
    leadTime: {
      en: "Usually 8–12 weeks after deposit",
      bg: "Обикновено 8–12 седмици след депозит",
    },
    pricing: { type: "quote" },
    heroImage: "/products/ember-fracture.jpg",
    galleryImages: ["/products/ember-fracture.jpg"],
    sortOrder: 2,
  },
  {
    slug: "ashmoor-conference",
    category: "custom",
    name: {
      en: "Ashmoor Conference Slab",
      bg: "Конферентна маса Ashmoor",
    },
    tagline: {
      en: "Example: long ash table with grey resin mist.",
      bg: "Пример: дълга ясенова маса със сива смолна мъгла.",
    },
    description: {
      en: "An example of a longer meeting or dining slab — ash with a translucent grey epoxy pour and an iron trestle. Photos here are for orientation; every commission is sized to the room.",
      bg: "Пример за по-дълга заседателна или трапезна плоча — ясен с полупрозрачна сива епоксидна заливка и желязна основа. Снимките са за ориентир; всяка поръчка се оразмерява към помещението.",
    },
    materials: {
      en: "European ash, grey epoxy with metal flecks, iron trestle",
      bg: "Европейски ясен, сива епоксидна смола с метални частици, желязна основа",
    },
    dimensions: {
      en: "Typical guide: 300–360 cm L × 110–120 cm W × 75 cm H",
      bg: "Ориентир: 300–360 см Д × 110–120 см Ш × 75 см В",
    },
    leadTime: {
      en: "Usually 12–16 weeks after deposit",
      bg: "Обикновено 12–16 седмици след депозит",
    },
    pricing: { type: "quote" },
    heroImage: "/products/ashmoor-conference.jpg",
    galleryImages: ["/products/ashmoor-conference.jpg"],
    sortOrder: 3,
  },
  {
    slug: "coasters-blue",
    category: "shop",
    family: "coasters",
    resin: "blue",
    name: {
      en: "Walnut coasters — blue resin",
      bg: "Орехови подложки — синя смола",
    },
    tagline: {
      en: "Set of four. Deep blue epoxy veins.",
      bg: "Комплект от четири. Дълбоко сини епоксидни линии.",
    },
    description: {
      en: "Four walnut coasters with a blue epoxy line in each. Soft finish on top, felt underneath. In stock — choose black resin if you prefer a darker look.",
      bg: "Четири орехови подложки със синя епоксидна линия във всяка. Меко покритие отгоре, филц отдолу. Налични — има и вариант с черна смола.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, felt base, food-safe finish",
      bg: "Орех, синя епоксидна смола, филцова основа, хранително-безопасно покритие",
    },
    dimensions: {
      en: "Set of 4 · Ø 10 cm × 1 cm",
      bg: "Комплект от 4 · Ø 10 см × 1 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 42 },
    heroImage: "/products/coasters-blue.jpg",
    galleryImages: ["/products/coasters-blue.jpg"],
    sortOrder: 10,
  },
  {
    slug: "coasters-black",
    category: "shop",
    family: "coasters",
    resin: "black",
    name: {
      en: "Walnut coasters — black resin",
      bg: "Орехови подложки — черна смола",
    },
    tagline: {
      en: "Set of four. Jet-black epoxy veins.",
      bg: "Комплект от четири. Черни епоксидни линии.",
    },
    description: {
      en: "Same walnut coaster set with opaque black resin instead of blue. Ready to ship.",
      bg: "Същият комплект орехови подложки с черна смола вместо синя. Готово за изпращане.",
    },
    materials: {
      en: "Walnut, black epoxy resin, felt base, food-safe finish",
      bg: "Орех, черна епоксидна смола, филцова основа, хранително-безопасно покритие",
    },
    dimensions: {
      en: "Set of 4 · Ø 10 cm × 1 cm",
      bg: "Комплект от 4 · Ø 10 см × 1 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 42 },
    heroImage: "/products/coasters-black.jpg",
    galleryImages: ["/products/coasters-black.jpg"],
    sortOrder: 11,
  },
  {
    slug: "board-blue",
    category: "shop",
    family: "board",
    resin: "blue",
    name: {
      en: "Cutting board — blue resin",
      bg: "Дъска за рязане — синя смола",
    },
    tagline: {
      en: "Oak board with a blue epoxy seam.",
      bg: "Дъбова дъска със синя епоксидна фуга.",
    },
    description: {
      en: "Oak cutting and serving board with a blue resin seam through the middle. Food-safe oil. In stock; also available in black resin.",
      bg: "Дъбова дъска за рязане и сервиране със синя смолна фуга по средата. Хранително-безопасно масло. Налична; има и с черна смола.",
    },
    materials: {
      en: "Oak, blue epoxy resin, food-safe oil",
      bg: "Дъб, синя епоксидна смола, хранително-безопасно масло",
    },
    dimensions: {
      en: "About 45 × 30 × 3.5 cm",
      bg: "Около 45 × 30 × 3.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 78 },
    heroImage: "/products/board-blue.jpg",
    galleryImages: ["/products/board-blue.jpg"],
    sortOrder: 12,
  },
  {
    slug: "board-black",
    category: "shop",
    family: "board",
    resin: "black",
    name: {
      en: "Cutting board — black resin",
      bg: "Дъска за рязане — черна смола",
    },
    tagline: {
      en: "Oak board with a black epoxy seam.",
      bg: "Дъбова дъска с черна епоксидна фуга.",
    },
    description: {
      en: "Same oak board shape with jet-black resin. Ready to ship via Econt.",
      bg: "Същата дъбова форма с черна смола. Готова за изпращане с Еконт.",
    },
    materials: {
      en: "Oak, black epoxy resin, food-safe oil",
      bg: "Дъб, черна епоксидна смола, хранително-безопасно масло",
    },
    dimensions: {
      en: "About 45 × 30 × 3.5 cm",
      bg: "Около 45 × 30 × 3.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 78 },
    heroImage: "/products/board-black.jpg",
    galleryImages: ["/products/board-black.jpg"],
    sortOrder: 13,
  },
  {
    slug: "tray-blue",
    category: "shop",
    family: "tray",
    resin: "blue",
    name: {
      en: "Catch tray — blue resin",
      bg: "Тава — синя смола",
    },
    tagline: {
      en: "Shallow ash tray with a blue epoxy pour.",
      bg: "Плитка ясенова тава със синя епоксидна заливка.",
    },
    description: {
      en: "Small ash tray for keys and odds by the door. Blue resin pour. In stock; black resin variant available too.",
      bg: "Малка ясенова тава за ключове до вратата. Синя смолна заливка. Налична; има и с черна смола.",
    },
    materials: {
      en: "Ash, blue epoxy resin, oil finish",
      bg: "Ясен, синя епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About 28 × 18 × 3 cm",
      bg: "Около 28 × 18 × 3 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 64 },
    heroImage: "/products/tray-blue.jpg",
    galleryImages: ["/products/tray-blue.jpg"],
    sortOrder: 14,
  },
  {
    slug: "tray-black",
    category: "shop",
    family: "tray",
    resin: "black",
    name: {
      en: "Catch tray — black resin",
      bg: "Тава — черна смола",
    },
    tagline: {
      en: "Shallow ash tray with a black epoxy pour.",
      bg: "Плитка ясенова тава с черна епоксидна заливка.",
    },
    description: {
      en: "Same tray in ash with opaque black resin. Ready to ship.",
      bg: "Същата тава от ясен с черна смола. Готова за изпращане.",
    },
    materials: {
      en: "Ash, black epoxy resin, oil finish",
      bg: "Ясен, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About 28 × 18 × 3 cm",
      bg: "Около 28 × 18 × 3 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 64 },
    heroImage: "/products/tray-black.jpg",
    galleryImages: ["/products/tray-black.jpg"],
    sortOrder: 15,
  },
  {
    slug: "ashtray-blue",
    category: "shop",
    family: "ashtray",
    resin: "blue",
    name: {
      en: "Ashtray — blue resin",
      bg: "Пепелник — синя смола",
    },
    tagline: {
      en: "Lathe dish with a blue resin well.",
      bg: "Стругована чиния със синя смолна падина.",
    },
    description: {
      en: "Round ash dish with a shallow bowl, one rest notch, and a blue epoxy pour in the center. Easy CNC/lathe profile. In stock; black resin available too.",
      bg: "Кръгъл пепелник с плитка падина, едно гнездо за цигара и синя епоксидна заливка в средата. Лесен за CNC/струг профил. Наличен; има и с черна смола.",
    },
    materials: {
      en: "Ash, blue epoxy resin, oil finish",
      bg: "Ясен, синя епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 12 cm × 2.5 cm",
      bg: "Около Ø 12 см × 2.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 54 },
    heroImage: "/products/ashtray-blue.jpg",
    galleryImages: ["/products/ashtray-blue.jpg"],
    sortOrder: 18,
  },
  {
    slug: "ashtray-black",
    category: "shop",
    family: "ashtray",
    resin: "black",
    name: {
      en: "Ashtray — black resin",
      bg: "Пепелник — черна смола",
    },
    tagline: {
      en: "Lathe dish with a black resin well.",
      bg: "Стругована чиния с черна смолна падина.",
    },
    description: {
      en: "Same ashtray form with charcoal-black resin. Ready to ship.",
      bg: "Същата форма с въглено-черна смола. Готов за изпращане.",
    },
    materials: {
      en: "Ash, black epoxy resin, oil finish",
      bg: "Ясен, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 12 cm × 2.5 cm",
      bg: "Около Ø 12 см × 2.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 54 },
    heroImage: "/products/ashtray-black.jpg",
    galleryImages: ["/products/ashtray-black.jpg"],
    sortOrder: 19,
  },
  {
    slug: "phone-stand-blue",
    category: "shop",
    family: "phone-stand",
    resin: "blue",
    name: {
      en: "Phone stand — blue resin",
      bg: "Стойка за телефон — синя смола",
    },
    tagline: {
      en: "Flat angled wedge for desk or kitchen.",
      bg: "Плоска наклонена подпора за бюро или кухня.",
    },
    description: {
      en: "A simple CNC wedge that holds a phone upright with a small lip. Blue resin stripe across the face. Thin profile, easy to machine.",
      bg: "Проста CNC подпора, която държи телефона изправен с малък праг. Синя смолна лента отпред. Тънък профил, лесен за обработка.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, oil finish",
      bg: "Орех, синя епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About 12 × 8 × 2.5 cm",
      bg: "Около 12 × 8 × 2.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 36 },
    heroImage: "/products/phone-stand-blue.jpg",
    galleryImages: ["/products/phone-stand-blue.jpg"],
    sortOrder: 20,
  },
  {
    slug: "soap-dish-black",
    category: "shop",
    family: "soap-dish",
    resin: "black",
    name: {
      en: "Soap dish — black resin",
      bg: "Сапунерка — черна смола",
    },
    tagline: {
      en: "Slotted board for the sink edge.",
      bg: "Плочка с канали за мивката.",
    },
    description: {
      en: "Flat oak soap dish with drainage grooves and a black resin edge. Keeps the bar dry without a thick profile.",
      bg: "Плоска дъбова сапунерка с отводнителни канали и черен смолен кант. Държи сапуна сух без дебел профил.",
    },
    materials: {
      en: "Oak, black epoxy resin, oil finish",
      bg: "Дъб, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About 12 × 9 × 1.5 cm",
      bg: "Около 12 × 9 × 1.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 32 },
    heroImage: "/products/soap-dish-black.jpg",
    galleryImages: ["/products/soap-dish-black.jpg"],
    sortOrder: 21,
  },
  {
    slug: "spoon-rest-blue",
    category: "shop",
    family: "spoon-rest",
    resin: "blue",
    name: {
      en: "Spoon rest — blue resin",
      bg: "Поставка за лъжица — синя смола",
    },
    tagline: {
      en: "Stovetop rest with a shallow channel.",
      bg: "Поставка до котлона с плитък улей.",
    },
    description: {
      en: "Curved walnut rest for a cooking spoon. Flat enough to mill quickly, blue resin line as a quiet accent.",
      bg: "Извита орехова поставка за готварска лъжица. Достатъчно плоска за бързо фрезоване, синя смолна линия като акцент.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, food-safe oil",
      bg: "Орех, синя епоксидна смола, хранително-безопасно масло",
    },
    dimensions: {
      en: "About 22 × 9 × 1.8 cm",
      bg: "Около 22 × 9 × 1.8 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 34 },
    heroImage: "/products/spoon-rest-blue.jpg",
    galleryImages: ["/products/spoon-rest-blue.jpg"],
    sortOrder: 22,
  },
  {
    slug: "trivet-black",
    category: "shop",
    family: "trivet",
    resin: "black",
    name: {
      en: "Trivet — black resin",
      bg: "Подложка за горещо — черна смола",
    },
    tagline: {
      en: "Round hot pad with a resin ring.",
      bg: "Кръгла подложка с смолен пръстен.",
    },
    description: {
      en: "Thin ash disc for pots and pans. Cutouts keep it light; black resin ring frames the face. Easy flat CNC job.",
      bg: "Тънък ясенов диск за тенджери и тигани. Изрезите го олекотяват; черен смолен пръстен рамкира лицето. Лесна плоска CNC работа.",
    },
    materials: {
      en: "Ash, black epoxy resin, oil finish",
      bg: "Ясен, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 18 cm × 1.2 cm",
      bg: "Около Ø 18 см × 1.2 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 38 },
    heroImage: "/products/trivet-black.jpg",
    galleryImages: ["/products/trivet-black.jpg"],
    sortOrder: 23,
  },
  {
    slug: "jewelry-dish-blue",
    category: "shop",
    family: "jewelry-dish",
    resin: "blue",
    name: {
      en: "Jewelry dish — blue resin",
      bg: "Купичка за бижута — синя смола",
    },
    tagline: {
      en: "Bedside catch for rings and earrings.",
      bg: "Нощна купичка за пръстени и обеци.",
    },
    description: {
      en: "Shallow round walnut dish with a blue resin well. Flat enough for a quick lathe or CNC pass.",
      bg: "Плитка кръгла орехова купичка със синя смолна падина. Достатъчно плоска за бърз струг или CNC.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, oil finish",
      bg: "Орех, синя епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 10 cm × 1.5 cm",
      bg: "Около Ø 10 см × 1.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 28 },
    heroImage: "/products/jewelry-dish-blue.jpg",
    galleryImages: ["/products/jewelry-dish-blue.jpg"],
    sortOrder: 24,
  },
  {
    slug: "pen-rest-black",
    category: "shop",
    family: "pen-rest",
    resin: "black",
    name: {
      en: "Pen rest — black resin",
      bg: "Поставка за писалки — черна смола",
    },
    tagline: {
      en: "Long desk groove for pens.",
      bg: "Дълъг улей за бюрото.",
    },
    description: {
      en: "A slim oak bar with a pen groove and black resin stripe. Sits flat on the desk; mills from a thin blank.",
      bg: "Тънка дъбова летва с улей за писалки и черна смолна лента. Лежи плоско на бюрото; фрезова се от тънък заготовък.",
    },
    materials: {
      en: "Oak, black epoxy resin, oil finish",
      bg: "Дъб, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About 24 × 5 × 1.5 cm",
      bg: "Около 24 × 5 × 1.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 30 },
    heroImage: "/products/pen-rest-black.jpg",
    galleryImages: ["/products/pen-rest-black.jpg"],
    sortOrder: 25,
  },
  {
    slug: "cheese-spreader-blue",
    category: "shop",
    family: "cheese-spreader",
    resin: "blue",
    name: {
      en: "Cheese spreader — blue resin",
      bg: "Ножче за сирене — синя смола",
    },
    tagline: {
      en: "Flat spreader for soft cheese and butter.",
      bg: "Плоско ножче за меко сирене и масло.",
    },
    description: {
      en: "Thin walnut spreader with a blue resin accent in the handle. Food-safe oil; simple 2D profile.",
      bg: "Тънко орехово ножче със син смолен акцент в дръжката. Хранително-безопасно масло; прост 2D профил.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, food-safe oil",
      bg: "Орех, синя епоксидна смола, хранително-безопасно масло",
    },
    dimensions: {
      en: "About 16 × 3 × 0.8 cm",
      bg: "Около 16 × 3 × 0.8 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 26 },
    heroImage: "/products/cheese-spreader-blue.jpg",
    galleryImages: ["/products/cheese-spreader-blue.jpg"],
    sortOrder: 26,
  },
  {
    slug: "bottle-opener-black",
    category: "shop",
    family: "bottle-opener",
    resin: "black",
    name: {
      en: "Bottle opener — black resin",
      bg: "Отварачка — черна смола",
    },
    tagline: {
      en: "Flat paddle opener for the drawer.",
      bg: "Плоска отварачка за чекмеджето.",
    },
    description: {
      en: "Ash paddle with black resin inlay and a metal opener insert. Thin blank, easy to batch on a CNC.",
      bg: "Ясенова лопатка с черна смолна инкрустация и метална отварачка. Тънък заготовък, удобен за серия на CNC.",
    },
    materials: {
      en: "Ash, black epoxy resin, metal opener insert, oil finish",
      bg: "Ясен, черна епоксидна смола, метална отварачка, маслено покритие",
    },
    dimensions: {
      en: "About 15 × 4 × 1.2 cm",
      bg: "Около 15 × 4 × 1.2 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 29 },
    heroImage: "/products/bottle-opener-black.jpg",
    galleryImages: ["/products/bottle-opener-black.jpg"],
    sortOrder: 27,
  },
  {
    slug: "match-tray-blue",
    category: "shop",
    family: "match-tray",
    resin: "blue",
    name: {
      en: "Match tray — blue resin",
      bg: "Тавичка за кибрити — синя смола",
    },
    tagline: {
      en: "Recessed tray for a matchbox by the stove.",
      bg: "Вдлъбната тавичка за кибрит до котлона.",
    },
    description: {
      en: "Flat walnut board with a matchbox well and blue resin stripe. Useful next to a candle or gas hob.",
      bg: "Плоска орехова дъска с гнездо за кибрит и синя смолна лента. Удобна до свещ или газов котлон.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, oil finish",
      bg: "Орех, синя епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About 14 × 8 × 1.5 cm",
      bg: "Около 14 × 8 × 1.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 27 },
    heroImage: "/products/match-tray-blue.jpg",
    galleryImages: ["/products/match-tray-blue.jpg"],
    sortOrder: 28,
  },
  {
    slug: "plant-saucer-black",
    category: "shop",
    family: "plant-saucer",
    resin: "black",
    name: {
      en: "Plant saucer — black resin",
      bg: "Чинийка за саксия — черна смола",
    },
    tagline: {
      en: "Drip tray for a small pot.",
      bg: "Подложка против теч за малка саксия.",
    },
    description: {
      en: "Round oak saucer with a raised rim and black resin ring. Protects shelves from watering spills; flat CNC disc.",
      bg: "Кръгла дъбова чинийка с ръб и черен смолен пръстен. Пази рафтове от поливане; плосък CNC диск.",
    },
    materials: {
      en: "Oak, black epoxy resin, oil finish",
      bg: "Дъб, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 14 cm × 1.5 cm",
      bg: "Около Ø 14 см × 1.5 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 33 },
    heroImage: "/products/plant-saucer-black.jpg",
    galleryImages: ["/products/plant-saucer-black.jpg"],
    sortOrder: 29,
  },
];

export function getCatalogProduct(slug: string) {
  return CATALOG.find((product) => product.slug === slug);
}

export function getShopProducts() {
  return CATALOG.filter((p) => p.category === "shop").sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

export function getCustomExamples() {
  return CATALOG.filter((p) => p.category === "custom").sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

export function getFamilyVariants(family: NonNullable<CatalogProduct["family"]>) {
  return CATALOG.filter((p) => p.family === family);
}

export function formatFixedPrice(amountEur: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-EU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amountEur);
}

export function localizeProduct(product: CatalogProduct, locale: Locale) {
  return {
    ...product,
    name: product.name[locale],
    tagline: product.tagline[locale],
    description: product.description[locale],
    materials: product.materials[locale],
    dimensions: product.dimensions[locale],
    leadTime: product.leadTime[locale],
    priceLabel:
      product.pricing.type === "fixed"
        ? formatFixedPrice(product.pricing.amountEur, locale)
        : null,
  };
}
