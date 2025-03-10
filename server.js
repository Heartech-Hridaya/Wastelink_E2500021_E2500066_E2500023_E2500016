
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));


async function getDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}


app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const db = await getDb();
    
    
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      await db.close();
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    
    await db.run(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    
    await db.close();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    
    const db = await getDb();
    
    
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    await db.close();
    
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    
    const { password_hash, ...userInfo } = user;
    res.json({ success: true, message: 'Login successful', user: userInfo });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/reports', async (req, res) => {
  try {
    const { name, email, location, message } = req.body;
    
    if (!name || !email || !location || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const db = await getDb();
    
    await db.run(
      'INSERT INTO reports (name, email, location, message) VALUES (?, ?, ?, ?)',
      [name, email, location, message]
    );
    
    await db.close();
    res.status(201).json({ success: true, message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const db = await getDb();
    
    await db.run(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    
    await db.close();
    res.status(201).json({ success: true, message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
