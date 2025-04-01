// public/script.js

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();

  if (!query) {
    resultsDiv.textContent = 'Please enter a search term.';
    return;
  }

  // Call the back-end endpoint
  fetch(`/api/podcasts?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      // Clear previous results
      resultsDiv.textContent = '';
      // Display the returned JSON
      resultsDiv.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error('Error fetching podcasts:', error);
      resultsDiv.textContent = 'Error fetching podcasts. Check console.';
    });
});
