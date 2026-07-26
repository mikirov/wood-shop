import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type ResinColor = "blue" | "black";

export type CatalogProduct = {
  slug: string;
  category: "shop" | "custom";
  family?: "coasters" | "board" | "tray" | "candle-holder" | "ashtray";
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
    slug: "candle-holder-blue",
    category: "shop",
    family: "candle-holder",
    resin: "blue",
    name: {
      en: "Candle holder — blue resin",
      bg: "Свещник — синя смола",
    },
    tagline: {
      en: "Turned cylinder with a blue resin ring.",
      bg: "Стругован цилиндър със син смолен пръстен.",
    },
    description: {
      en: "A short walnut cylinder with a centered candle recess and a blue epoxy ring turned into a groove. Simple lathe form — ready to ship; also in black resin.",
      bg: "Къс орехов цилиндър с гнездо за свещ и син епоксиден пръстен в стругована бразда. Проста форма за струг — готово за изпращане; има и с черна смола.",
    },
    materials: {
      en: "Walnut, blue epoxy resin, oil finish",
      bg: "Орех, синя епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 8 cm × 8 cm H · candle recess Ø 2.2 cm",
      bg: "Около Ø 8 см × 8 см В · гнездо Ø 2.2 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 48 },
    heroImage: "/products/candle-holder-blue.jpg",
    galleryImages: ["/products/candle-holder-blue.jpg"],
    sortOrder: 16,
  },
  {
    slug: "candle-holder-black",
    category: "shop",
    family: "candle-holder",
    resin: "black",
    name: {
      en: "Candle holder — black resin",
      bg: "Свещник — черна смола",
    },
    tagline: {
      en: "Turned cylinder with a black resin ring.",
      bg: "Стругован цилиндър с черен смолен пръстен.",
    },
    description: {
      en: "Same machinable candle holder with opaque black resin. Ready to ship via Econt.",
      bg: "Същият свещник с черна смола. Готов за изпращане с Еконт.",
    },
    materials: {
      en: "Walnut, black epoxy resin, oil finish",
      bg: "Орех, черна епоксидна смола, маслено покритие",
    },
    dimensions: {
      en: "About Ø 8 cm × 8 cm H · candle recess Ø 2.2 cm",
      bg: "Около Ø 8 см × 8 см В · гнездо Ø 2.2 см",
    },
    leadTime: readyLeadTime,
    pricing: { type: "fixed", amountEur: 48 },
    heroImage: "/products/candle-holder-black.jpg",
    galleryImages: ["/products/candle-holder-black.jpg"],
    sortOrder: 17,
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
