-- Create a new Database for The Skeddule webpage
DROP DATABASE IF EXISTS skeddule;
CREATE DATABASE skeddule;
USE skeddule;

-- Table for tasks
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255),
    priority bigint,
    due_date DATETIME,
    user_id BIGINT,
    status ENUM('Todo', 'In Progress', 'Completed'),
    createdAt DATETIME,
    updatedAt DATETIME,
    description VARCHAR(255)
);

-- Table for tokens
CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255),
    user_id BIGINT,
    status TINYINT,
    createdAt DATETIME,
    updatedAt DATETIME
);

-- Table for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    avatar VARCHAR(100),
    password VARCHAR(255),
    terms VARCHAR(10),
    status TINYINT,
    createdAt DATETIME,
    updatedAt DATETIME
);


-- Create a new admin user for accessing database
DROP USER IF EXISTS 'jhuss004'@'localhost';
CREATE USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Jahid123!';
GRANT ALL PRIVILEGES ON skeddule.* TO 'root'@'localhost';