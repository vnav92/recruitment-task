const express = require('express');
const sectionsData = require('./data/sections.json');
const app = express();
var cors = require('cors');

const PORT = 5000;
const MOCK_DELAY_MS = 400;

app.use(cors());

app.get('/sections', (req, res) => {
  // Mock of real network delay. Gives possibility to make skeleton
  // displayed on the front-end more visible.
  setTimeout(() => {
    res.send(sectionsData)
  }, MOCK_DELAY_MS)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})