-- init.sql
-- Auto-run by the MariaDB container on first startup (mounted to
-- /docker-entrypoint-initdb.d/init.sql). Recreates the abdulsTobacco
-- schema and seed data from abdulsTobacco.sql.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `abdulsTobacco`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `abdulsTobacco`;

-- --------------------------------------------------------
-- Table structure for table `contact_us`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `contact_us` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `contact_us` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'Mohammad Ayub Idrees', 'ayubbscs@gmail.com', '39409034093', 'Lorum ipsum', '2026-08-12 14:47:08'),
(2, 'ljlks', 'ksdjg@yopmai.com', '803943434', 'lorum ipsum', '2026-08-12 15:18:17');

ALTER TABLE `contact_us` AUTO_INCREMENT = 3;

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` text DEFAULT NULL,
  `alt` text DEFAULT NULL,
  `badge` varchar(50) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `stock` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `brand`, `name`, `price`, `image`, `alt`, `badge`, `category`, `quantity`, `created_at`, `stock`) VALUES
('geekbar-pulse-orange', 'GEEK BAR', 'Pulse 15000 - Orange Pop', 19.99, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-25apy4L6jU-JaGocPMSYZcgUjp05uX8xQzgB2Rsy7yGiVtRtWBCHHt69GUyBb0JuiC2fwtpLypO2my6ubEv34rlqtoOApivHsxzBzHcRUaJ9O5qzmb-bi0XQfVBOrtR5yVCJ0F9MPJlcMR9kc6qXFkCy6QZR10SJRC96uqPSjsEKbCKKrteTfj9UapaY6YJ-y2cFNAHR6fiufT5UrnjTbMADwj0HIkiwZsMTzmzBTYf2bfROJ1m', 'A floating Geek Bar Pulse disposable vape with a digital screen glowing neon orange.', 'HOT', 'Vape', 0, '2026-08-12 14:13:45', 0),
('smok-dual-cylinder-vape', 'SMOK', 'Dual Cylinder Vape 200', 5.99, 'http://localhost:4000/uploads/1787177730623-496534695.jpg', '', NULL, 'Vape', 0, '2026-08-19 22:15:43', 53),
('vaporesso-xros4-silver', 'VAPORESSO', 'XROS 4 Pod Kit - Silver', 34.99, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI_S-J6fk3IR7_joT5otLDi8omtQkxbW2VbYKJMuiR9ezZiIi2N4BafgIZEkNmRDAzPpdUfyB-rXocR6gnXuY8JUxw-RREnq9cCVJ5yaz97zjQVgFfK0QyqfUQhQVsChJh-_ZhlCcqV7yN2eF6RZUHvXA9fmszQMDm4Gmgk0yHkDfUeAdc5wE3wS6L60SDD_gWhhDEn3cimIfHXT2-IcqljXQlrNp_z31MN1KUjD6v8FdOaaixk1vv', 'Vaporesso XROS 4 pod kit in a metallic silver finish.', NULL, 'Vape', 0, '2026-08-12 14:13:45', 0),
('zyn-coolmint-6mg', 'ZYN', 'Cool Mint 6mg - 5 Pack', 24.50, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ2RNn-bwcLM7s7PWnkLsDGWYzXD39ULex4r1EfRz4s5PHdEQVpEN-__73FI7Prlvr_CYRHb2GL14zryHpvEhwDkwBJHEhNOvcm3H8H32P2oH7C7RkcyqTXdivlHaLDJfPHsECuY7xd5nYM7NjY07H-yIa_dY_u29AoCEev0nsx-E2rV0Z-NcPD-6vSsjog9LX8qixdoujX_BqyBgZ6x-lEfoFgX9ljkWiXnuPH1aP1GuXfUr8nNu8', 'ZYN Nicotine Pouches tin in Cool Mint flavor.', NULL, 'Pouch', 0, '2026-08-12 14:13:45', 0);

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- NOTE: passwords below are bcrypt hashes carried over from the original
-- dump. Change these (or re-seed) before using this in production.
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@at.com', '$2b$10$guWvRLWXpqpNjMf5/BndcuVjnqVKKMnmiCCb6AA7sJ.CO.MpWDE8K', 'admin', '2026-08-19 14:29:56'),
(2, 'johndoe', 'john@example.com', '$2b$10$tiGnJ2jXLj/F/fvJyfYXdOYxPoOAV1FE83dRGGm2HefaNQJrwPmiS', 'customer', '2026-08-19 14:29:56'),
(3, 'john', 'john@yopmail.com', '$2b$10$8LKBMbVnnrtoyM4DEqCDbOHpWFoW5lKE2/8Hv3jkNVOMZDJXrJQBy', 'customer', '2026-08-19 20:00:37'),
(4, 'Warner', 'warner@yopmail.com', '$2b$10$qxf1pt0tG09Tz3O27ATvrOecVJwiJMoBQVy4ew5b.C453NTsu3GyW', 'customer', '2026-08-19 20:02:23');

ALTER TABLE `users` AUTO_INCREMENT = 5;

-- No explicit GRANT needed here: the official mariadb image already
-- grants MYSQL_USER full privileges on MYSQL_DATABASE automatically.
