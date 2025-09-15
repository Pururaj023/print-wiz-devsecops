CREATE DATABASE IF NOT EXISTS printing_app;

USE printing_app;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  order_date DATE NOT NULL,
  delivery_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);
