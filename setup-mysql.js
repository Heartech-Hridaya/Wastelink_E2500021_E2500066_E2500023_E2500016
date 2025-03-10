
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setupDatabase() {
  try {
    
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    
    console.log('SQLite database created successfully');

    
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )`);
    console.log('Users table created successfully');

    
    await db.exec(`CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      location TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Reports table created successfully');

    
    await db.exec(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Contacts table created successfully');

    await db.close();
    console.log('Setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();
