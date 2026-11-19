
import { searchMulti, getDocumentaries, getSeries, getTrending } from './api.js';
import { renderGrid, showMessage } from './ui.js';
import { animatePageLoad, animateCards } from './animations.js';
import { initWatchTogether } from './watch-together.js';

const searchInput = document.getElementById('exploreSearch');
const filterTabs = document.getElementById('filterTabs');
const grid = document.getElementById('movieGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const message = document.getElementById('exploreMessage');

let currentFilter = 'all';
let currentQuery = '';
let currentPage = 1;
let totalPages = 1;
let debounceTimer = null;

function readUrlSearch() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('search');
  if (q) {
    currentQuery = q;
    searchInput.value = q;
  }
}

async function loadFirstPage() {
  currentPage = 1;
  grid.innerHTML = '';
  message.hidden = true;
  loadMoreBtn.hidden = false;

  try {
    let results = [];
    let apiTotalPages = 1;

    console.log("Fetching movies for filter:", currentFilter, "Query:", currentQuery);

    if (currentFilter === 'documentary') {
      const data = await getDocumentaries(1);
      results = data.results;
      apiTotalPages = data.total_pages;
    } else if (currentFilter === 'tv' && !currentQuery) {
      const data = await getSeries(1);
      results = data.results;
      apiTotalPages = data.total_pages;
    } else if (currentQuery) {
      const data = await searchMulti(currentQuery, 1);
      apiTotalPages = data.total_pages;
      results = data.results.filter((r) => r.media_type !== 'person');
      if (currentFilter === 'movie') results = results.filter((r) => r.media_type === 'movie');
      if (currentFilter === 'tv') results = results.filter((r) => r.media_type === 'tv');
    } else {
      // Default "All"
      const data = await getTrending();
      results = data.results;
      apiTotalPages = 1; 
    }

    totalPages = apiTotalPages;
    console.log("Results found:", results.length);

    if (!results || results.length === 0) {
      showMessage(message, 'No results found. Try a different search!');
      loadMoreBtn.hidden = true;
      return;
    }

    
    const cards = renderGrid(grid, results);
    animateCards(cards);

  } catch (err) {
    console.error("API ERROR:", err);
    showMessage(message, 'Could not load results. Check your connection.');
    loadMoreBtn.hidden = true;
  }

  if (currentPage >= totalPages) {
    loadMoreBtn.hidden = true;
  }
}

async function loadNextPage() {
  currentPage += 1;
  try {
    let results = [];

    if (currentFilter === 'documentary') {
      const data = await getDocumentaries(currentPage);
      results = data.results;
    } else if (currentFilter === 'tv' && !currentQuery) {
      const data = await getSeries(currentPage);
      results = data.results;
    } else if (currentQuery) {
      const data = await searchMulti(currentQuery, currentPage);
      results = data.results.filter((r) => r.media_type !== 'person');
      if (currentFilter === 'movie') results = results.filter((r) => r.media_type === 'movie');
      if (currentFilter === 'tv') results = results.filter((r) => r.media_type === 'tv');
    }

    if (results && results.length > 0) {
      const cards = renderGrid(grid, results);
      animateCards(cards);
    }
  } catch (err) {
    console.error(err);
    showMessage(message, 'Could not load more results.');
  }

  if (currentPage >= totalPages) {
    loadMoreBtn.hidden = true;
  }
}

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentQuery = searchInput.value.trim();
    loadFirstPage();
  }, 400);
});

filterTabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('filter-tab--active'));
  tab.classList.add('filter-tab--active');
  currentFilter = tab.dataset.filter;
  loadFirstPage();
});

loadMoreBtn.addEventListener('click', loadNextPage);

animatePageLoad();
initWatchTogether();
readUrlSearch();
loadFirstPage();