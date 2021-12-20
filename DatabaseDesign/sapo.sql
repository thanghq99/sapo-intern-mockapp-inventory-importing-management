-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sapo_mock
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB-1:10.5.9+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `check_sheets`
--

DROP TABLE IF EXISTS `check_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_sheets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL UNIQUE KEY,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint unsigned NOT NULL,
  `note` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `check_sheets_created_by_foreign` (`created_by`),
  CONSTRAINT `check_sheets_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `import_receipts`
--

DROP TABLE IF EXISTS `import_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_receipts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `import_receipts_fk_orders` (`order_id`),
  KEY `import_receipts_fk_users` (`created_by`),
  CONSTRAINT `import_receipts_fk_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `import_receipts_fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL,
  `supplier_id` bigint unsigned NOT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `paid_amount` decimal(12,2) DEFAULT 0.00,
  `expected_time` date NOT NULL,
  `status` varchar(32) DEFAULT 'Đang giao dịch' CHECK (`status` in ('Đang giao dịch','Đã huỷ')),
  `transaction_status` varchar(32) DEFAULT 'Chưa thanh toán' CHECK (`transaction_status` in ('Chưa thanh toán','Thanh toán một phần','Đã thanh toán')),
  `imported_status` varchar(32) DEFAULT 'Chờ nhập kho' CHECK (`imported_status` in ('Chờ nhập kho','Đã nhập kho','Hoàn trả một phần','Hoàn trả toàn bộ')),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_code_unique` (`code`),
  KEY `orders_supplier_id_foreign` (`supplier_id`),
  KEY `orders_created_by_foreign` (`created_by`),
  CONSTRAINT `orders_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment_invoice`
--

DROP TABLE IF EXISTS `payment_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_invoice` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL CHECK (`amount` >= 0),
  `order_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_invoice_fk_orders` (`order_id`),
  KEY `payment_invoice_fk_users` (`created_by`),
  CONSTRAINT `payment_invoice_fk_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `payment_invoice_fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `brand` varchar(32) NULL DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `address` varchar(128) NOT NULL,
  `phone` varchar(11) DEFAULT '',
  `email` varchar(128) DEFAULT '',
  `website` varchar(128) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `fax` varchar(32) DEFAULT '',
  `debt` decimal(12,2) DEFAULT 0.00,
  `activity_status` varchar(32) DEFAULT 'Đang hợp tác' CHECK (`activity_status` in ('Đang hợp tác','Ngừng hợp tác')),
  `record_status` varchar(32) DEFAULT 'Đang hoạt động' CHECK (`record_status` in ('Đang hoạt động','Đã xoá')),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `variants_check_sheets`
--

DROP TABLE IF EXISTS `variants_check_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_check_sheets` (
  `variant_id` bigint unsigned NOT NULL,
  `checksheet_id` bigint unsigned NOT NULL,
  `inventory_quantity` bigint NOT NULL,
  `real_quantity` bigint NOT NULL,
  `note` varchar(255) DEFAULT '',
  PRIMARY KEY (`variant_id`,`checksheet_id`),
  KEY `checksheet_id` (`checksheet_id`),
  CONSTRAINT `variants_check_sheets_ibfk_1` FOREIGN KEY (`checksheet_id`) REFERENCES `check_sheets` (`id`),
  CONSTRAINT `variants_check_sheets_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `variants`
--

DROP TABLE IF EXISTS `variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `code` varchar(16) NOT NULL,
  `inventory_quantity` bigint NOT NULL,
  `sellable_quantity` bigint NOT NULL,
  `size` varchar(8) DEFAULT '',
  `color` varchar(16) DEFAULT '',
  `material` varchar(32) DEFAULT '',
  `unit` varchar(16) NULL DEFAULT '',
  `original_price` decimal(12,2) NOT NULL,
  `whole_sale_price` decimal(12,2) NOT NULL,
  `retail_price` decimal(12,2) NOT NULL,
  `record_status` varchar(32) DEFAULT 'Đang hoạt động' CHECK (`record_status` in ('Đang hoạt động','Đã xoá')),
  PRIMARY KEY (`id`),
  UNIQUE KEY `variants_code_unique` (`code`),
  KEY `variants_product_id_foreign` (`product_id`),
  CONSTRAINT `variants_products_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `variants_import_receipts`
--

DROP TABLE IF EXISTS `variants_import_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_import_receipts` (
  `variant_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `import_receipt_id` bigint unsigned NOT NULL,
  `quantity` bigint NOT NULL CHECK (`quantity` >= 0),
  PRIMARY KEY (`variant_id`,`import_receipt_id`),
  CONSTRAINT `fk_variants` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`),
  CONSTRAINT `fk_import_receipts` FOREIGN KEY (`import_receipt_id`) REFERENCES `import_receipts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `variants_orders`
--

DROP TABLE IF EXISTS `variants_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_orders` (
  `order_id` bigint unsigned NOT NULL,
  `variant_id` bigint unsigned NOT NULL,
  `supplied_quantity` bigint NOT NULL,
  PRIMARY KEY (`order_id`,`variant_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `variants_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `variants_orders_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'sapo_mock'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-18 10:03:10