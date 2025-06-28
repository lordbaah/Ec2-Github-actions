const express = require('express');

const app = express();
const PORT = 3000;

// Root route with current server time
app.get('/', (req, res) => {
  const now = new Date();
  res.send(
    `🟢 Server is up and running on AWS EC2.<br> Current server time: ${now.toLocaleString()}`
  );
});

// Route with a dynamic user name
app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}! Welcome to the EC2-hosted app.`);
});

// Route that uses query parameters
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Greetings, ${name}! Use /greet?name=YourName to customize this.`);
});

// JSON response example
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
