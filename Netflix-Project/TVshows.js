// scripts.js

// Mock API URL
const API_URL = "https://api.tvmaze.com/shows";

// Elements
const showsContainer = document.getElementById('showsContainer');
const videoModal = document.getElementById('videoModal');
const showPlayer = document.getElementById('showPlayer');
const closeBtn = document.getElementById('closeBtn');

// Fetch shows data from the API
async function fetchShows() {
    try {
        const response = await fetch(API_URL);
        const shows = await response.json();
        displayShows(shows.slice(0, 20)); // Limit to 20 shows for display
    } catch (error) {
        console.error("Error fetching shows:", error);
    }
}

// Display shows as cards
function displayShows(shows) {
    shows.forEach(show => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${show.image?.medium}" alt="${show.name}">
            <h3>${show.name}</h3>
        `;
        card.addEventListener('click', () => playShow(show));
        showsContainer.appendChild(card);
    });
}

// Play show (mock with trailer link)
function playShow(show) {
    showPlayer.src = show.officialSite || "https://www.example.com/trailer.mp4"; // Replace with actual video link
    videoModal.classList.remove('hidden');
}

// Close the video modal
closeBtn.addEventListener('click', () => {
    videoModal.classList.add('hidden');
    showPlayer.pause();
});

// Close modal on outside click
videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) {
        videoModal.classList.add('hidden');
        showPlayer.pause();
    }
});

// Load shows on page load
fetchShows();
