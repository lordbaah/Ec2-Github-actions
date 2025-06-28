const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  const now = new Date();
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Status</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js" defer></script>
      </head>
      <body>
        <h1>🟢 Server is up and running on AWS EC2</h1>
        <p>Current server time: ${now.toLocaleString()}</p>
      </body>
    </html>
  `);
});

// Dynamic user route
app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Greeting</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js" defer></script>
      </head>
      <body>
        <h1>Hello, ${name}!</h1>
        <p>Welcome to the EC2-hosted app.</p>
      </body>
    </html>
  `);
});

// Query param greeting
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Greeting</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js" defer></script>
      </head>
      <body>
        <h1>Greetings, ${name}!</h1>
        <p>Use <code>/greet?name=YourName</code> to customize this.</p>
      </body>
    </html>
  `);
});

// JSON API route
app.get('/api/info', (req, res) => {
  res.json({
    status: 'ok',
    uptime: `${process.uptime().toFixed(2)} seconds`,
    timestamp: new Date(),
    instance: 'AWS EC2',
  });
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
