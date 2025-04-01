// index.js
const axios = require('axios');
require('dotenv').config();

const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;
const BASE_URL = 'https://listen-api.listennotes.com/api/v2/search';

// This function gets podcasts from the Listen Notes API
async function fetchPodcasts(query) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'X-ListenAPI-Key': LISTEN_NOTES_API_KEY
      },
      params: {
        q: query,
        type: 'podcast'
      }
    });
    return response.data; // Return the JSON data
  } catch (error) {
    throw new Error(error.message);
  }
}

// Export so server.js can import it
module.exports = fetchPodcasts;
