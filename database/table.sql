CREATE DATABASE IF NOT EXISTS contact_manager;

USE contact_manager;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL,
    address VARCHAR(255) NULL
);

USE contact_manager;
SELECT * FROM contacts;