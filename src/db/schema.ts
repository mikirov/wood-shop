import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "contacted",
  "closed",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "new",
  "confirmed",
  "shipped",
  "cancelled",
]);

export const deliveryTypeEnum = pgEnum("delivery_type", ["office", "address"]);

export const paymentMethodEnum = pgEnum("payment_method", ["cod", "bank"]);

export const productCategoryEnum = pgEnum("product_category", [
  "shop",
  "custom",
]);

export const pricingTypeEnum = pgEnum("pricing_type", ["fixed", "quote"]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  category: productCategoryEnum("category").notNull().default("shop"),
  family: text("family"),
  resin: text("resin"),
  name: text("name").notNull(),
  nameBg: text("name_bg"),
  tagline: text("tagline").notNull(),
  taglineBg: text("tagline_bg"),
  description: text("description").notNull(),
  descriptionBg: text("description_bg"),
  materials: text("materials").notNull(),
  materialsBg: text("materials_bg"),
  dimensions: text("dimensions").notNull(),
  dimensionsBg: text("dimensions_bg"),
  leadTime: text("lead_time").notNull(),
  leadTimeBg: text("lead_time_bg"),
  pricingType: pricingTypeEnum("pricing_type").notNull().default("fixed"),
  priceEur: numeric("price_eur", { precision: 10, scale: 2 }),
  priceFrom: text("price_from"),
  heroImage: text("hero_image").notNull(),
  galleryImages: text("gallery_images").notNull().default("[]"),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  productId: uuid("product_id").references(() => products.id),
  preferredDimensions: text("preferred_dimensions"),
  message: text("message").notNull(),
  status: inquiryStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id),
  productSlug: text("product_slug").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPriceEur: numeric("unit_price_eur", { precision: 10, scale: 2 }).notNull(),
  totalEur: numeric("total_eur", { precision: 10, scale: 2 }).notNull(),
  lineItemsJson: text("line_items_json").notNull().default("[]"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  deliveryType: deliveryTypeEnum("delivery_type").notNull(),
  city: text("city").notNull(),
  postCode: text("post_code").notNull(),
  econtOfficeCode: text("econt_office_code"),
  econtOfficeName: text("econt_office_name"),
  street: text("street"),
  streetNumber: text("street_number"),
  addressExtra: text("address_extra"),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  notes: text("notes"),
  status: orderStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type InquiryStatus = (typeof inquiryStatusEnum.enumValues)[number];
export type OrderStatus = (typeof orderStatusEnum.enumValues)[number];
