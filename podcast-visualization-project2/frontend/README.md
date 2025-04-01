
# Podcast Visualization Project

This project demonstrates how to visualize podcast data using the Listen Notes API.

## Project Structure

- `backend/`: Contains Node.js server code to fetch podcast data from Listen Notes.
- `frontend/`: Contains the HTML and JavaScript for the frontend to display the podcasts.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the necessary dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your Listen Notes API key:
   ```
   LISTEN_NOTES_API_KEY=your_api_key_here
   ```

4. Start the backend server:
   ```
   npm start
   ```

The backend will be running at `http://localhost:4000`.

### Frontend
1. Open `frontend/index.html` in your browser.
2. Click the **Load Podcasts** button to load podcast data.

The frontend fetches data from the backend at `http://localhost:4000/api/podcasts`.

## Notes
- Make sure the backend is running before you access the frontend.
- The `.env` file should not be pushed to version control (ensure it's added to `.gitignore`).
