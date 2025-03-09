
const mysql = require('mysql2');
const util = require('util');

async function setupDatabase() {
  // Create connection without database selection
  const connection = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: '',
  });

  // Convert query to promise-based
  const query = util.promisify(connection.query).bind(connection);

  try {
    // Create the database
    await query('CREATE DATABASE IF NOT EXISTS waste_management');
    console.log('Database created successfully');

    // Switch to the new database
    await query('USE waste_management');

    // Create users table
    await query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL
    )`);
    console.log('Users table created successfully');

    // Create reports table
    await query(`CREATE TABLE IF NOT EXISTS reports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      location TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Reports table created successfully');

    // Create contacts table
    await query(`CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      subject VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Contacts table created successfully');

  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    connection.end();
    console.log('Setup complete');
  }
}

setupDatabase();
