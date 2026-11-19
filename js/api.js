
import { API_KEY, BASE_URL } from './config.js';


function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}


async function fetchJson(path, params) {
  const res = await fetch(buildUrl(path, params));
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status}`);
  }
  return res.json();
}

export async function getTrending() {
  return fetchJson('/trending/movie/week');
}

export async function getTopRated() {
  return fetchJson('/movie/top_rated');
}


export async function getDocumentaries(page = 1) {
  return fetchJson('/discover/movie', { with_genres: 99, page });
}

export async function getSeries(page = 1) {
  return fetchJson('/tv/popular', { page });
}

export async function searchMulti(query, page = 1) {
  return fetchJson('/search/multi', { query, page });
}

export async function getMovieDetails(id) {
  return fetchJson(`/movie/${id}`);
}

export async function getMovieVideos(id) {
  return fetchJson(`/movie/${id}/videos`);
}

export async function getCredits(id) {
  return fetchJson(`/movie/${id}/credits`);
}

export async function getSimilar(id) {
  return fetchJson(`/movie/${id}/similar`);
}