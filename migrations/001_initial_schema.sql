-- TO-DO-API Database Migration
-- Initial Schema Setup
-- Created based on analysis of controllers and database queries

-- Drop existing tables if they exist (for clean migration)
-- DROP TABLE IF EXISTS tasks;
-- DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);


CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_completed (completed),
    INDEX idx_user_completed (user_id, completed),
    INDEX idx_created_at (created_at)
);

-- Insert sample data (optional - for development)
-- INSERT INTO users (name, email, password) VALUES 
-- ('John Doe', 'john@example.com', '$2a$08$hashedpasswordhere'),
-- ('Jane Smith', 'jane@example.com', '$2a$08$hashedpasswordhere');

-- INSERT INTO tasks (title, description, completed, user_id) VALUES 
-- ('Complete project', 'Finish the TO-DO API project', FALSE, 1),
-- ('Review code', 'Code review for team members', FALSE, 1),
-- ('Setup database', 'Configure MySQL database', TRUE, 2);

 