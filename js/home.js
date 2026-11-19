
import { getTrending, getTopRated, getDocumentaries } from './api.js';
import { renderRow, backdropUrl, posterUrl, showMessage } from './ui.js';
import {
  animatePageLoad,
  animateHero,
  animateCards,
  animateSectionOnScroll,
} from './animations.js';
import { initWatchTogether } from './watch-together.js';

const heroBackdrop = document.getElementById('heroBackdrop');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroMore = document.getElementById('heroMore');
const heroPlay = document.getElementById('heroPlay');
const homeSearch = document.getElementById('homeSearch');

const docRow = document.getElementById('documentariesRow');
const trendRow = document.getElementById('trendingRow');
const topRow = document.getElementById('topRatedRow');

// Fill the hero with the first trending movie.
function renderHero(movie) {
  const title = movie.title || movie.name || 'Featured';
  heroBackdrop.style.backgroundImage = `url(${backdropUrl(movie.backdrop_path)})`;
  heroTitle.textContent = title;
  heroDesc.textContent = movie.overview || 'No description available.';
  heroMore.href = `movie.html?id=${movie.id}`;

  heroPlay.addEventListener('click', () => {
    // Home hero has no trailer fetch here; just go to details.
    window.location.href = `movie.html?id=${movie.id}`;
  });
}

async function loadHome() {
  try {
    const [trending, topRated, docs] = await Promise.all([
      getTrending(),
      getTopRated(),
      getDocumentaries(),
    ]);

    // Hero = first trending movie
    if (trending.results && trending.results.length) {
      renderHero(trending.results[0]);
    }

    // Documentaries row (first 4)
    const docCards = renderRow(docRow, docs.results.slice(0, 4), 'Documentary');
    animateCards(docCards);

    // Trending row (first 12)
    const trendCards = renderRow(trendRow, trending.results.slice(0, 12), 'Trending');
    animateCards(trendCards);

    // Top rated row (first 12)
    const topCards = renderRow(topRow, topRated.results.slice(0, 12), 'Top Rated');
    animateCards(topCards);
  } catch (err) {
    console.error(err);
    heroTitle.textContent = 'Something went wrong';
    heroDesc.textContent = 'Could not load movies. Check your API key and connection.';
  }
}

// Search bar: Enter goes to explore.html?search=...
homeSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const q = homeSearch.value.trim();
    if (q) {
      window.location.href = `explore.html?search=${encodeURIComponent(q)}`;
    }
  }
});

// Boot
animatePageLoad();
animateHero();
animateSectionOnScroll('.section-title');
initWatchTogether();
loadHome();