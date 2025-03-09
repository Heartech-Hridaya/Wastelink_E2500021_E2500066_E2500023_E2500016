
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 3002;

// Log database operations for debugging
const logDbOperation = (operation, result) => {
  console.log(`[DB ${operation}]`, result);
};

app.use(express.json());

// Setup database connection
async function getDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

// Routes
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>WasteLink Admin</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #4CAF50; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>WasteLink Database Admin</h1>
        <div id="users"></div>
        <div id="reports"></div>
        <div id="contacts"></div>
        
        <script>
          async function fetchData() {
            try {
              // Fetch users
              const usersResponse = await fetch('/api/users');
              const users = await usersResponse.json();
              document.getElementById('users').innerHTML = createTable('Users', users);
              
              // Fetch reports
              const reportsResponse = await fetch('/api/reports');
              const reports = await reportsResponse.json();
              document.getElementById('reports').innerHTML = createTable('Reports', reports);
              
              // Fetch contacts
              const contactsResponse = await fetch('/api/contacts');
              const contacts = await contactsResponse.json();
              document.getElementById('contacts').innerHTML = createTable('Contacts', contacts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          
          function createTable(title, data) {
            if (!data || data.length === 0) return \`<h2>\${title}</h2><p>No data found</p>\`;
            
            const headers = Object.keys(data[0]);
            let table = \`<h2>\${title}</h2><table><tr>\`;
            
            // Add headers
            headers.forEach(header => {
              table += \`<th>\${header}</th>\`;
            });
            table += '</tr>';
            
            // Add rows
            data.forEach(row => {
              table += '<tr>';
              headers.forEach(header => {
                table += \`<td>\${row[header] || ''}</td>\`;
              });
              table += '</tr>';
            });
            
            table += '</table>';
            return table;
          }
          
          // Load data on page load
          fetchData();
        </script>
      </body>
    </html>
  `);
});

// API endpoints
app.get('/api/users', async (req, res) => {
  try {
    const db = await getDb();
    const users = await db.all('SELECT * FROM users');
    logDbOperation('GET users', users);
    await db.close();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const db = await getDb();
    const reports = await db.all('SELECT * FROM reports');
    logDbOperation('GET reports', reports);
    await db.close();
    res.json(reports);
  } catch (error) {
    console.error('Error getting reports:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const db = await getDb();
    const contacts = await db.all('SELECT * FROM contacts');
    logDbOperation('GET contacts', contacts);
    await db.close();
    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Admin panel running at http://0.0.0.0:${PORT}`);
});
