const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function runMigration() {
  console.log('Starting database migration...');
  
  // Check if required environment variables are set
  const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    console.error('Please check your .env file');
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true, // Allow multiple statements
  });

  try {
    console.log('Connected to database successfully');
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '001_initial_schema.sql');
    const migrationSQL = await fs.readFile(migrationPath, 'utf8');
    
    console.log('Executing migration: 001_initial_schema.sql');
    
    // Execute the migration
    await connection.execute(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    console.log('Database schema has been created with:');
    console.log('  - users table');
    console.log('  - tasks table');
    console.log('  - appropriate indexes and foreign keys');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database access denied. Please check your credentials.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Could not connect to database. Please check your connection settings.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist. Please create the database first.');
    }
    
    process.exit(1);
  } finally {
    await connection.end();
    console.log('Database connection closed');
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration }; 