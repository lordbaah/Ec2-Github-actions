const express = require('express');

const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
  res.send('Hello server is up and running on AWS EC2 Instance');
});

server.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
