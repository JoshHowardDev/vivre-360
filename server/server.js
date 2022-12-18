const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Express main page');
});

app.get('/api', (req, res) => {
  res.send('Hello there!');
});

app.listen(port);
