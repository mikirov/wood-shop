import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type CatalogProduct = {
  slug: string;
  category: "table" | "object";
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

export const CATALOG: CatalogProduct[] = [
  {
    slug: "midnight-vein",
    category: "table",
    name: {
      en: "Midnight Vein Dining Table",
      bg: "Трапезна маса Midnight Vein",
    },
    tagline: {
      en: "Walnut slabs parted by a charcoal–indigo resin river.",
      bg: "Орехови плочи, разделени от въглено-индиго епоксидна река.",
    },
    description: {
      en: "Two live-edge walnut flanks frame a deep charcoal-to-indigo epoxy pour, laced with faint smoke swirls that catch candlelight. Blackened steel legs taper to a quiet point. Built for formal dining — eight to ten seats — and rooms that prefer shadow over glare.",
      bg: "Две орехови крила с жив ръб обрамчват дълбока въглено-индиго епоксидна заливка с леки димни вихри. Крака от почернена стомана. За трапезария с 8–10 места.",
    },
    materials: {
      en: "European walnut, pigmented epoxy resin, blackened steel base, oil-rubbed finish",
      bg: "Европейски орех, пигментирана епоксидна смола, основа от почернена стомана, маслено покритие",
    },
    dimensions: {
      en: "Typical: 240–280 cm L × 100–110 cm W × 75 cm H. Custom lengths on request.",
      bg: "Обичайно: 240–280 см Д × 100–110 см Ш × 75 см В. Индивидуални дължини по заявка.",
    },
    leadTime: {
      en: "10–14 weeks from deposit",
      bg: "10–14 седмици след депозит",
    },
    pricing: { type: "quote" },
    heroImage: "/products/midnight-vein.jpg",
    galleryImages: ["/products/midnight-vein.jpg"],
    sortOrder: 1,
  },
  {
    slug: "ember-fracture",
    category: "table",
    name: {
      en: "Ember Fracture Console",
      bg: "Конзола Ember Fracture",
    },
    tagline: {
      en: "Charred oak split by a cooled-lava amber seam.",
      bg: "Опушен дъб, разцепен от кехлибарена смола като застинала лава.",
    },
    description: {
      en: "A narrow entry console in charred oak, fractured by an amber–ember resin seam that reads like lava sealed under glass. Brass foot caps warm the silhouette. Suited to hallways, bars, and quiet thresholds.",
      bg: "Тясна конзола от опушен дъб с кехлибарено-жарена смола. Месингови накрайници. За коридор, бар или праг.",
    },
    materials: {
      en: "Charred oak, amber epoxy resin, solid brass foot caps, matte oil finish",
      bg: "Опушен дъб, кехлибарена епоксидна смола, масивни месингови накрайници, матово маслено покритие",
    },
    dimensions: {
      en: "Typical: 150 cm L × 35 cm W × 80 cm H. Custom widths available.",
      bg: "Обичайно: 150 см Д × 35 см Ш × 80 см В. Индивидуални ширини.",
    },
    leadTime: {
      en: "8–12 weeks from deposit",
      bg: "8–12 седмици след депозит",
    },
    pricing: { type: "quote" },
    heroImage: "/products/ember-fracture.jpg",
    galleryImages: ["/products/ember-fracture.jpg"],
    sortOrder: 2,
  },
  {
    slug: "ashmoor-conference",
    category: "table",
    name: {
      en: "Ashmoor Conference Slab",
      bg: "Конферентна маса Ashmoor",
    },
    tagline: {
      en: "Ash veiled in smoky grey epoxy mist and metal flecks.",
      bg: "Ясен, обвит в опушена сива епоксидна мъгла и метални частици.",
    },
    description: {
      en: "A wide ash conference slab washed with a translucent grey epoxy mist and subtle metallic flecks. Matte iron trestle base keeps the weight grounded. Boardroom and library scale — made for long conversations.",
      bg: "Широка ясенова плоча с полупрозрачна сива епоксидна мъгла и метални частици. Матова желязна основа. За заседателна зала или библиотека.",
    },
    materials: {
      en: "European ash, translucent grey epoxy with metallic flecks, matte iron trestle",
      bg: "Европейски ясен, полупрозрачна сива епоксидна смола с метални частици, матова желязна основа",
    },
    dimensions: {
      en: "Typical: 300–360 cm L × 110–120 cm W × 75 cm H. Seats 10–14.",
      bg: "Обичайно: 300–360 см Д × 110–120 см Ш × 75 см В. 10–14 места.",
    },
    leadTime: {
      en: "12–16 weeks from deposit",
      bg: "12–16 седмици след депозит",
    },
    pricing: { type: "quote" },
    heroImage: "/products/ashmoor-conference.jpg",
    galleryImages: ["/products/ashmoor-conference.jpg"],
    sortOrder: 3,
  },
  {
    slug: "night-tide-coasters",
    category: "object",
    name: {
      en: "Night Tide Coasters",
      bg: "Подложки Night Tide",
    },
    tagline: {
      en: "A set of four walnut discs with indigo resin veins.",
      bg: "Комплект от четири орехови подложки с индиго смола.",
    },
    description: {
      en: "Four hand-finished walnut coasters, each with a charcoal–indigo epoxy vein under a soft gloss. Felted undersides protect stone and wood.",
      bg: "Четири ръчно завършени орехови подложки с въглено-индиго епоксидна жилка. Филцова основа предпазва плотовете.",
    },
    materials: {
      en: "Walnut, pigmented epoxy resin, cork/felt base, food-safe finish",
      bg: "Орех, пигментирана епоксидна смола, корк/филц, хранително-безопасно покритие",
    },
    dimensions: {
      en: "Set of 4 · Ø 10 cm × 1 cm thick",
      bg: "Комплект от 4 · Ø 10 см × 1 см",
    },
    leadTime: {
      en: "2–3 weeks",
      bg: "2–3 седмици",
    },
    pricing: { type: "fixed", amountEur: 42 },
    heroImage: "/products/night-tide-coasters.jpg",
    galleryImages: ["/products/night-tide-coasters.jpg"],
    sortOrder: 4,
  },
  {
    slug: "ember-grain-board",
    category: "object",
    name: {
      en: "Ember Grain Cutting Board",
      bg: "Дъска за рязане Ember Grain",
    },
    tagline: {
      en: "Charred oak board fractured by an amber epoxy seam.",
      bg: "Опушена дъбова дъска с кехлибарена епоксидна фуга.",
    },
    description: {
      en: "A substantial cutting and serving board in charred oak, split by a cooled-lava amber resin line. Built to live on the counter.",
      bg: "Солидна дъска за рязане и сервиране от опушен дъб с кехлибарена смола. За да живее на плота — не в чекмеджето.",
    },
    materials: {
      en: "Charred oak, amber epoxy resin, food-safe oil finish, brass hanging detail",
      bg: "Опушен дъб, кехлибарена епоксидна смола, хранително-безопасно масло, месингов детайл",
    },
    dimensions: {
      en: "Typical: 45 × 30 × 3.5 cm",
      bg: "Обичайно: 45 × 30 × 3.5 см",
    },
    leadTime: {
      en: "3–5 weeks",
      bg: "3–5 седмици",
    },
    pricing: { type: "fixed", amountEur: 78 },
    heroImage: "/products/ember-grain-board.jpg",
    galleryImages: ["/products/ember-grain-board.jpg"],
    sortOrder: 5,
  },
  {
    slug: "ash-vein-tray",
    category: "object",
    name: {
      en: "Ash Vein Catch Tray",
      bg: "Тава Ash Vein",
    },
    tagline: {
      en: "Shallow ash tray veiled in smoky grey resin mist.",
      bg: "Плитка ясенова тава с опушена сива смола.",
    },
    description: {
      en: "A shallow catch-all for keys, cufflinks, and evening clutter. Pale ash with translucent grey epoxy mist and faint metallic flecks.",
      bg: "Плитка тава за ключове и дребни вещи. Светъл ясен с полупрозрачна сива епоксидна мъгла и метални частици.",
    },
    materials: {
      en: "European ash, translucent grey epoxy with metallic flecks, matte oil finish",
      bg: "Европейски ясен, полупрозрачна сива епоксидна смола с метални частици, матово масло",
    },
    dimensions: {
      en: "Typical: 28 × 18 × 3 cm",
      bg: "Обичайно: 28 × 18 × 3 см",
    },
    leadTime: {
      en: "2–4 weeks",
      bg: "2–4 седмици",
    },
    pricing: { type: "fixed", amountEur: 64 },
    heroImage: "/products/ash-vein-tray.jpg",
    galleryImages: ["/products/ash-vein-tray.jpg"],
    sortOrder: 6,
  },
];

export function getCatalogProduct(slug: string) {
  return CATALOG.find((product) => product.slug === slug);
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
