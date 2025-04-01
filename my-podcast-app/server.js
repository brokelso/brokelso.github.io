// server.js
const express = require('express');
const path = require('path');
const fetchPodcasts = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything in the "public" folder as static files
app.use(express.static(path.join(__dirname, 'public')));

// Simple API route - call it e.g. GET /api/podcasts?query=Technology
app.get('/api/podcasts', async (req, res) => {
  try {
    // const query = req.query.query || 'Technology';
    const data = await fetchPodcasts(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
