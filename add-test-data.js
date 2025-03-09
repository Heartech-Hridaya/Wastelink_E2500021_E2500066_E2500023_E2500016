
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function addTestData() {
  try {
    // Open SQLite database
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    
    console.log('Connected to database');

    // Add test user
    await db.run(
      `INSERT INTO users (username, email, password_hash) 
       VALUES (?, ?, ?)`,
      ['testuser', 'test@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890']
    );
    console.log('Test user added');

    // Add test report
    await db.run(
      `INSERT INTO reports (name, email, location, message) 
       VALUES (?, ?, ?, ?)`,
      ['John Doe', 'john@example.com', 'Central Park', 'Plastic waste near the pond']
    );
    console.log('Test report added');

    // Add test contact
    await db.run(
      `INSERT INTO contacts (name, email, subject, message) 
       VALUES (?, ?, ?, ?)`,
      ['Jane Smith', 'jane@example.com', 'Volunteer Question', 'How can I join as a volunteer?']
    );
    console.log('Test contact added');

    await db.close();
    console.log('Test data added successfully');
  } catch (error) {
    console.error('Error adding test data:', error);
  }
}

addTestData();
