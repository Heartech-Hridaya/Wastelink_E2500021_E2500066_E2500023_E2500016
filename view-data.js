
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

    // View users
    const users = await db.all('SELECT * FROM users');
    console.log('USERS:');
    console.table(users);

    // View reports
    const reports = await db.all('SELECT * FROM reports');
    console.log('REPORTS:');
    console.table(reports);

    // View contacts
    const contacts = await db.all('SELECT * FROM contacts');
    console.log('CONTACTS:');
    console.table(contacts);

    await db.close();
  } catch (error) {
    console.error('Error viewing data:', error);
  }
}

viewData();
