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

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  materials: text("materials").notNull(),
  dimensions: text("dimensions").notNull(),
  leadTime: text("lead_time").notNull(),
  priceFrom: text("price_from"),
  heroImage: text("hero_image").notNull(),
  galleryImages: text("gallery_images").notNull().default("[]"),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
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
