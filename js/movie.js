
import {
  getMovieDetails,
  getMovieVideos,
  getCredits,
  getSimilar,
} from './api.js';
import {
  posterUrl,
  backdropUrl,
  createMovieCard,
  createCastCard,
  showMessage,
} from './ui.js';
import {
  animatePageLoad,
  animateMovieDetails,
  animateCards,
  openModal,
  closeModal,
} from './animations.js';
import { initWatchTogether } from './watch-together.js';

// Elements
const backdropEl = document.getElementById('movieBackdrop');
const posterEl = document.getElementById('moviePoster');
const titleEl = document.getElementById('movieTitle');
const genresEl = document.getElementById('movieGenres');
const yearEl = document.getElementById('movieYear');
const ratingEl = document.getElementById('movieRating');
const descEl = document.getElementById('movieDesc');
const playBtn = document.getElementById('playNowBtn');
const castRow = document.getElementById('castRow');
const similarRow = document.getElementById('similarRow');

const trailerModal = document.getElementById('trailerModal');
const trailerClose = document.getElementById('trailerClose');
const trailerWrap = document.getElementById('trailerWrap');

// Get ?id= from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

let currentTrailerKey = null;

// Render the details section.
function renderDetails(movie) {
  document.title = `SCENE · ${movie.title}`;

  backdropEl.style.backgroundImage = `url(${backdropUrl(movie.backdrop_path)})`;
  posterEl.src = posterUrl(movie.poster_path);
  posterEl.alt = `${movie.title} poster`;

  titleEl.textContent = movie.title;
  genresEl.textContent = movie.genres.map((g) => g.name).join(', ');
  yearEl.textContent = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  ratingEl.textContent = `⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`;
  descEl.textContent = movie.overview || 'No description available.';
}

// Play Now → open trailer if available.
async function handlePlayNow() {
  if (!movieId) return;

  try {
    if (!currentTrailerKey) {
      const data = await getMovieVideos(movieId);
      const trailer = data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) currentTrailerKey = trailer.key;
    }

    if (currentTrailerKey) {
      trailerWrap.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${currentTrailerKey}?autoplay=1"
          title="Movie trailer"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      `;
      openModal(trailerModal);
    } else {
      alert('No trailer available for this movie.');
    }
  } catch (err) {
    console.error(err);
    alert('Could not load the trailer.');
  }
}

async function loadMoviePage() {
  if (!movieId) {
    titleEl.textContent = 'Movie not found';
    descEl.textContent = 'No movie ID was provided in the URL.';
    return;
  }

  try {
    const movie = await getMovieDetails(movieId);
    renderDetails(movie);
    animateMovieDetails();

    // Cast
    const credits = await getCredits(movieId);
    castRow.innerHTML = '';
    credits.cast.slice(0, 12).forEach((person) => {
      castRow.appendChild(createCastCard(person));
    });

    // Similar
    const similar = await getSimilar(movieId);
    similarRow.innerHTML = '';
    const similarCards = similar.results
      .slice(0, 12)
      .map((item) => createMovieCard(item));
    similarCards.forEach((card) => similarRow.appendChild(card));
    animateCards(similarCards);
  } catch (err) {
    console.error(err);
    titleEl.textContent = 'Could not load movie';
    descEl.textContent = 'Check your API key or try again later.';
  }
}

// Events
playBtn.addEventListener('click', handlePlayNow);

trailerClose.addEventListener('click', () => {
  trailerWrap.innerHTML = '';
  closeModal(trailerModal);
});

trailerModal.addEventListener('click', (e) => {
  if (e.target === trailerModal) {
    trailerWrap.innerHTML = '';
    closeModal(trailerModal);
  }
});

// Watch Together from details page
document
  .getElementById('watchTogetherDetailBtn')
  .addEventListener('click', () => {
    const wt = document.getElementById('watchTogetherModal');
    if (wt) openModal(wt);
  });

// Boot
animatePageLoad();
initWatchTogether();
loadMoviePage();