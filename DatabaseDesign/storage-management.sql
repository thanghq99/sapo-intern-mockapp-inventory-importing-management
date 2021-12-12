CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` INT NOT NULL,
    `description` varchar(255) NULL DEFAULT ''
);
ALTER TABLE
    `categories` ADD PRIMARY KEY `categories_id_primary`(`id`);
CREATE TABLE `products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_id` INT NOT NULL,
    `brand_id` INT NOT NULL,
    `description` varchar(255) NULL DEFAULT '',
    `image_url` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP()
);
ALTER TABLE
    `products` ADD PRIMARY KEY `products_id_primary`(`id`);
CREATE TABLE `suppliers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(16) NOT NULL,
    `address` VARCHAR(128) NOT NULL,
    `phone` VARCHAR(11) NULL,
    `email` VARCHAR(128) NULL,
    `website` VARCHAR(128) NULL,
    `description` varchar(255) NULL DEFAULT '',
    `fax` VARCHAR(32) NULL,
    `debt` DECIMAL(12, 2) NULL
);
ALTER TABLE
    `suppliers` ADD PRIMARY KEY `suppliers_id_primary`(`id`);
CREATE TABLE `variants`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `products_id` INT NOT NULL,
    `code` VARCHAR(16) NOT NULL,
    `inventory_quantity` INT NOT NULL,
    `sellable_quantity` INT NOT NULL,
    `size` VARCHAR(8) NULL,
    `color` VARCHAR(16) NULL,
    `material` VARCHAR(32) NULL,
    `unit` VARCHAR(16) NOT NULL,
    `original_price` DECIMAL(12, 2) NOT NULL,
    `whole_sale_price` DECIMAL(12, 2) NOT NULL,
    `retail_price` DECIMAL(12, 2) NOT NULL
);
ALTER TABLE
    `variants` ADD PRIMARY KEY `variants_id_primary`(`id`);
ALTER TABLE
    `variants` ADD UNIQUE `products_code_unique`(`code`);
CREATE TABLE `supply_orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `supplier_id` INT NOT NULL,
    `total_amount` DECIMAL(12, 2) NOT NULL,
    `paid_amount` DECIMAL(12, 2) NULL DEFAULT 0,
    `status` VARCHAR(16) NULL,
    `transaction_status` VARCHAR(16) NULL,
    `imported_status` VARCHAR(16) NULL,
    `expected_time` DATE NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `created_by` INT NOT NULL,
    `imported_by` INT NULL
);
ALTER TABLE
    `supply_orders` ADD PRIMARY KEY `supply_orders_id_primary`(`id`);
ALTER TABLE
    `supply_orders` ADD UNIQUE `supply_orders_code_unique`(`code`);
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL UNIQUE KEY,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(128) NOT NULL UNIQUE KEY
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
CREATE TABLE `roles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` INT NOT NULL
);
ALTER TABLE
    `roles` ADD PRIMARY KEY `roles_id_primary`(`id`);
CREATE TABLE `user_role`(
    `user_id` INT NOT NULL,
    `role_id` INT NOT NULL
);
ALTER TABLE
    `user_role` ADD PRIMARY KEY `user_role_primary`(`user_id`, `role_id`);
ALTER TABLE
    `user_role` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE
    `user_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
CREATE TABLE `check_sheet`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `created_by` INT NOT NULL,
    `note` VARCHAR(255) NULL
);
ALTER TABLE
    `check_sheet` ADD PRIMARY KEY `check_sheet_id_primary`(`id`);
CREATE TABLE `brands`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` varchar(255) NULL DEFAULT ''
);
ALTER TABLE
    `brands` ADD PRIMARY KEY `brands_id_primary`(`id`);
CREATE TABLE `product_supplyorder`(
    `supply_order_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `supplied_quantity` INT NOT NULL
);
ALTER TABLE
    `product_supplyorder` ADD PRIMARY KEY `product_supplyorder_primary`(`supply_order_id`, `product_id`);
ALTER TABLE
    `product_supplyorder` ADD FOREIGN KEY (`supply_order_id`) REFERENCES `supply_orders` (`id`);
ALTER TABLE
    `product_supplyorder` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
CREATE TABLE `product_checksheet`(
    `product_id` INT NOT NULL,
    `checksheet_id` INT NOT NULL,
    `inventory_quantity` INT NOT NULL,
    `real_quantity` INT NOT NULL,
    `note` VARCHAR(255) NULL
);
ALTER TABLE
    `product_checksheet` ADD PRIMARY KEY `product_checkshee_primary`(`product_id`, `checksheet_id`);
ALTER TABLE
    `product_checksheet` ADD FOREIGN KEY (`checksheet_id`) REFERENCES `check_sheet` (`id`);
ALTER TABLE
    `product_checksheet` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
ALTER TABLE
    `supply_orders` ADD CONSTRAINT `supply_orders_supplier_id_foreign` FOREIGN KEY(`supplier_id`) REFERENCES `suppliers`(`id`);
ALTER TABLE
    `supply_orders` ADD CONSTRAINT `supply_orders_created_by_foreign` FOREIGN KEY(`created_by`) REFERENCES `users`(`id`);
ALTER TABLE
    `supply_orders` ADD CONSTRAINT `supply_orders_imported_by_foreign` FOREIGN KEY(`imported_by`) REFERENCES `users`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY(`brand_id`) REFERENCES `brands`(`id`);
ALTER TABLE
    `variants` ADD CONSTRAINT `variants_products_id_foreign` FOREIGN KEY(`products_id`) REFERENCES `products`(`id`);
ALTER TABLE
    `check_sheet` ADD CONSTRAINT `check_sheet_created_by_foreign` FOREIGN KEY(`created_by`) REFERENCES `users`(`id`);