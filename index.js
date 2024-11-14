const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/fetch-url', async (req, res) => {
  try {
    const url = 'http://localhost:3000/fetch-url'; // Replace with your URL
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from URL');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
