
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function viewData() {
  try {
    // Open SQLite database
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    
    console.log('Connected to database');
    
    // Get users data
    const users = await db.all('SELECT * FROM users');
    console.log('Users:');
    console.table(users);
    
    // Get reports data
    const reports = await db.all('SELECT * FROM reports');
    console.log('Reports:');
    console.table(reports);
    
    // Get contacts data
    const contacts = await db.all('SELECT * FROM contacts');
    console.log('Contacts:');
    console.table(contacts);
    
    await db.close();
  } catch (error) {
    console.error('Error viewing data:', error);
  }
}

viewData();
