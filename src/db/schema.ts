import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  role: text('role').notNull().default('customer'), // admin, technician, dispatcher, customer
  customerType: text('customer_type').default('residential'), // residential, builder
  companyName: text('company_name'),
  name: text('name'),
  phone: text('phone'),
  address: text('address'),
  lastLogin: text('last_login'), // ISO string format
  pushSubscription: text('push_subscription'), // JSON stringified
  squareCustomerId: text('square_customer_id'),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  price: real('price'),
  description: text('description').notNull(),
  features: text('features'), // JSON stringified array of strings
  icon: text('icon').notNull(), // lightning, building, clipboard, phone
  highlight: integer('highlight', { mode: 'boolean' }).default(false),
  order: integer('order').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  client: text('client').notNull(),
  location: text('location').notNull(),
  completionDate: text('completion_date'),
  installDate: text('install_date'),
  warrantyExpiration: text('warranty_expiration'),
  description: text('description').notNull(),    // Rich text / HTML
  challenge: text('challenge').notNull(),        // Rich text / HTML
  solution: text('solution').notNull(),          // Rich text / HTML
  imageStyle: text('image_style').notNull(),
  gallery: text('gallery'),                      // JSON array of objects { image, caption }
  tags: text('tags'),                            // JSON array of strings
  stats: text('stats'),                          // JSON array of { label, value }
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const serviceRequests = sqliteTable('service_requests', {
  id: text('id').primaryKey(),
  ticketId: text('ticket_id').notNull().unique(),
  customerId: text('customer_id').notNull().references(() => users.id),
  issueDescription: text('issue_description').notNull(),
  urgency: text('urgency').default('standard'), // standard, emergency
  scheduledTime: text('scheduled_time'),
  status: text('status').default('pending'),     // pending, confirmed, dispatched, on_site, completed, cancelled
  assignedTechId: text('assigned_tech_id').references(() => users.id),
  tripFeePayment: text('trip_fee_payment'),      // JSON
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'), // JSON for Lexical
  htmlContent: text('html_content'),
  featuredImageId: text('featured_image_id'),
  category: text('category').notNull(),
  keywords: text('keywords'), // JSON array
  publishedAt: text('published_at'),
  status: text('status').default('draft'),
  quickNotes: text('quick_notes'),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const testimonials = sqliteTable('testimonials', {
  id: text('id').primaryKey(),
  quote: text('quote').notNull(),
  author: text('author').notNull(),
  location: text('location').notNull(),
  rating: integer('rating').notNull().default(5),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  squareInvoiceId: text('square_invoice_id').notNull().unique(),
  orderId: text('order_id'),
  amount: real('amount').notNull(),
  status: text('status'),
  customerId: text('customer_id').references(() => users.id),
  publicUrl: text('public_url'),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  squarePaymentId: text('square_payment_id').notNull().unique(),
  amount: real('amount').notNull(),
  currency: text('currency'),
  status: text('status'),
  sourceType: text('source_type'),
  note: text('note'),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

/**
 * Site Settings — single-row key-value store.
 *
 * Uses 'singleton' as the sole primary key value to enforce
 * a single row. Contains company contact info and brand voice
 * settings that feed AI prompt templates.
 */
export const siteSettings = sqliteTable('site_settings', {
  id: text('id').primaryKey().default('singleton'),
  companyName: text('company_name').notNull().default('Texas Prestige Masonry'),
  phone: text('phone').default(''),
  email: text('email').default(''),
  licenseNumber: text('license_number').default(''),
  insuranceAmount: text('insurance_amount').default(''),
  bbbRating: text('bbb_rating').default(''),
  missionStatement: text('mission_statement').default(''),
  brandVoice: text('brand_voice').default(''),
  brandTone: text('brand_tone').default(''),
  brandAvoid: text('brand_avoid').default(''),
  themePreference: text('theme_preference').default('candlelight'),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});
