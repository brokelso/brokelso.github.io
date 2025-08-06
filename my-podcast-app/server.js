// server.js
require('dotenv').config();
const express = require('express');
const { Client } = require('podcast-api');

const app = express();
const port = 4000;

// Create a client with your Listen Notes key
const client = Client({ apiKey: process.env.LISTEN_NOTES_API_KEY });

// Serve anything in "public" as static files
app.use(express.static('public'));

// A route that fetches raw data from Listen Notes and returns it
app.get('/best', async (req, res) => {
  try {
    const response = await client.fetchBestPodcasts({
      genre_id: 93,
      page: 2,
      region: 'us',
      sort: 'listen_score',
      safe_mode: 0
    });
    // Return the raw JSON from the API
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
