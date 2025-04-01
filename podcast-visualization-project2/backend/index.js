
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.LISTEN_NOTES_API_KEY;
const URL = 'https://listen-api.listennotes.com/api/v2/search';

async function searchPodcasts(query) {
  try {
    const response = await axios.get(URL, {
      headers: {
        'X-ListenAPI-Key': apiKey
      },
      params: {
        q: query,
        type: 'podcast'
      }
    });

    console.log('Search Results:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

searchPodcasts('Technology');

module.exports = searchPodcasts;

// server.js
const express = require('express');


const app = express();
const PORT = 6000;

// Example route: GET /podcasts?query=Technology
app.get('/podcasts', async (req, res) => {
  try {
    // let users pass a "query" parameter, e.g. /podcasts?query=Music
    const { query = 'Technology' } = req.query;  

    // Call the imported function
    const data = await searchPodcasts(query);

    // Send the data as JSON
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server running! on port ${PORT}`);
});
