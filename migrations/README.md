# Database Migrations

This directory contains database migration files for the TO-DO-API project.

## Migration Files

### `001_initial_schema.sql`
Initial database schema setup that creates the core tables for the application.

## Database Schema

### Users Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT): Unique user identifier
- `name` (VARCHAR(255), NOT NULL): User's full name
- `email` (VARCHAR(255), NOT NULL, UNIQUE): User's email address
- `password` (VARCHAR(255), NOT NULL): Hashed password using bcrypt
- `created_at` (TIMESTAMP): Record creation timestamp
- `updated_at` (TIMESTAMP): Record last update timestamp

### Tasks Table
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT): Unique task identifier
- `title` (VARCHAR(255), NOT NULL): Task title
- `description` (TEXT): Task description (optional)
- `completed` (BOOLEAN, DEFAULT FALSE): Task completion status
- `user_id` (INT, NOT NULL, FOREIGN KEY): Reference to users table
- `created_at` (TIMESTAMP): Record creation timestamp
- `updated_at` (TIMESTAMP): Record last update timestamp

## Relationships
- **One-to-Many**: Users can have multiple tasks
- **Foreign Key**: `tasks.user_id` references `users.id` with CASCADE DELETE

## Indexes
- `users.email`: For fast user lookup by email
- `tasks.user_id`: For fast task filtering by user
- `tasks.completed`: For fast completed/uncompleted task queries
- `tasks.user_id, completed`: Composite index for user-specific task status queries
- `tasks.created_at`: For chronological task ordering

## How to Run Migrations

### Using MySQL Command Line
```bash
# Connect to your database
mysql -u your_username -p your_database_name

# Run the migration
source migrations/001_initial_schema.sql
```

### Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your database
3. Open the migration file
4. Execute the SQL statements

### Using Node.js Script
You can also create a Node.js script to run migrations programmatically:

```javascript
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
require('dotenv').config();

async function runMigration() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const migrationSQL = await fs.readFile('./migrations/001_initial_schema.sql', 'utf8');
    const statements = migrationSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log('Executed:', statement.substring(0, 50) + '...');
      }
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
```

## Notes
- The migration includes sample data insertion (commented out) for development purposes
- All passwords should be hashed using bcrypt before insertion
- The schema supports the JWT authentication system used in the controllers
- Foreign key constraints ensure data integrity
- Indexes are optimized for the query patterns used in the controllers

## API Endpoints Supported
Based on the controllers analysis, this schema supports:

### Users
- `POST /users` - Create user account
- `POST /users/login` - User login
- `GET /users/tasks` - Get user's tasks

### Tasks
- `POST /tasks` - Create task
- `GET /tasks` - Get all tasks (deprecated)
- `GET /tasks/unfinished` - Get unfinished tasks
- `GET /tasks/completed` - Get completed tasks
- `GET /tasks/:taskId` - Get single task
- `PUT /tasks/:taskId` - Update task
- `DELETE /tasks/completed` - Delete all completed tasks
- `DELETE /tasks/:taskId` - Delete specific task
- `DELETE /tasks` - Delete all tasks 