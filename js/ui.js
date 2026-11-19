
import { IMG_POSTER, IMG_BACKDROP, PLACEHOLDER_POSTER, PLACEHOLDER_BACKDROP } from './config.js';


function getLabel(item) {
  if (item.media_type === 'tv') return 'Series';
  if (item.genre_ids && item.genre_ids.includes(99)) return 'Documentary';
  return 'Movie';
}

// Build a full poster URL, falling back to placeholder.
export function posterUrl(path) {
  return path ? `${IMG_POSTER}${path}` : PLACEHOLDER_POSTER;
}

export function backdropUrl(path) {
  return path ? `${IMG_BACKDROP}${path}` : PLACEHOLDER_BACKDROP;
}


export function createMovieCard(item, label) {
  const card = document.createElement('article');
  card.className = 'movie-card';

  const title = item.title || item.name || 'Untitled';
  const id = item.id;

  card.innerHTML = `
    <img
      class="movie-card__poster"
      src="${posterUrl(item.poster_path)}"
      alt="${title} poster"
      loading="lazy"
    />
    <div class="movie-card__body">
      <h3 class="movie-card__title">${title}</h3>
      <p class="movie-card__label">${label || getLabel(item)}</p>
    </div>
    <div class="movie-card__overlay">
      <span class="movie-card__overlay-text">${title}</span>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.href = `movie.html?id=${id}`;
  });

  return card;
}


export function renderRow(container, items, label) {
  container.innerHTML = '';
  const cards = items.map((item) => createMovieCard(item, label));
  cards.forEach((card) => container.appendChild(card));
  return cards;
}

// Fill the explore grid.
export function renderGrid(container, items) {
  const cards = items.map((item) => createMovieCard(item));
  cards.forEach((card) => container.appendChild(card));
  return cards;
}

// Cast card.
export function createCastCard(person) {
  const card = document.createElement('div');
  card.className = 'cast-card';
  const photo = person.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : 'https://via.placeholder.com/185x185/1e1e1e/ffffff?text=?';
  card.innerHTML = `
    <img class="cast-card__photo" src="${photo}" alt="${person.name}" loading="lazy" />
    <p class="cast-card__name">${person.name}</p>
  `;
  return card;
}

// Simple friendly error message helper.
export function showMessage(el, text) {
  el.textContent = text;
  el.hidden = false;
}