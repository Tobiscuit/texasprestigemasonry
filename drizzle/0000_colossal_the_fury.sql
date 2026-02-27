CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`square_invoice_id` text NOT NULL,
	`order_id` text,
	`amount` real NOT NULL,
	`status` text,
	`customer_id` text,
	`public_url` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invoices_square_invoice_id_unique` ON `invoices` (`square_invoice_id`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`square_payment_id` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text,
	`status` text,
	`source_type` text,
	`note` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payments_square_payment_id_unique` ON `payments` (`square_payment_id`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text,
	`html_content` text,
	`featured_image_id` text,
	`category` text NOT NULL,
	`keywords` text,
	`published_at` text,
	`status` text DEFAULT 'draft',
	`quick_notes` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`client` text NOT NULL,
	`location` text NOT NULL,
	`completion_date` text,
	`install_date` text,
	`warranty_expiration` text,
	`description` text NOT NULL,
	`challenge` text NOT NULL,
	`solution` text NOT NULL,
	`image_style` text NOT NULL,
	`gallery` text,
	`tags` text,
	`stats` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `service_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`issue_description` text NOT NULL,
	`urgency` text DEFAULT 'standard',
	`scheduled_time` text,
	`status` text DEFAULT 'pending',
	`assigned_tech_id` text,
	`trip_fee_payment` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assigned_tech_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_requests_ticket_id_unique` ON `service_requests` (`ticket_id`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`category` text NOT NULL,
	`price` real,
	`description` text NOT NULL,
	`features` text,
	`icon` text NOT NULL,
	`highlight` integer DEFAULT false,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`quote` text NOT NULL,
	`author` text NOT NULL,
	`location` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`featured` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text DEFAULT 'customer' NOT NULL,
	`customer_type` text DEFAULT 'residential',
	`company_name` text,
	`name` text,
	`phone` text,
	`address` text,
	`last_login` text,
	`push_subscription` text,
	`square_customer_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
