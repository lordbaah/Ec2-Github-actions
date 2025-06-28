const express = require('express');

const app = express();
const PORT = 3000;

// Root route with current server time
app.get('/', (req, res) => {
  const now = new Date();
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Status</title>
      </head>
      <body>
        <h1>🟢 Server is up and running on AWS EC2</h1>
        <p>Current server time: ${now.toLocaleString()}</p>
      </body>
    </html>
  `);
});

// Route with a dynamic user name
app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Greeting</title>
      </head>
      <body>
        <h1>Hello, ${name}!</h1>
        <p>Welcome to the EC2-hosted app.</p>
      </body>
    </html>
  `);
});

// Route that uses query parameters
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Greeting</title>
      </head>
      <body>
        <h1>Greetings, ${name}!</h1>
        <p>Use <code>/greet?name=YourName</code> to customize this.</p>
      </body>
    </html>
  `);
});

// JSON response example (keep this as JSON)
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
