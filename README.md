# SCENE - Movie Streaming Website

## Project Overview
SCENE is a 3-page movie streaming application built as a front-end project. It features a modern, dark-themed UI with pink/purple gradients, smooth GSAP animations, and live data from The Movie Database (TMDB) API.

## Technologies Used
- **HTML**: Semantic markup.
- **CSS**: Flexbox, CSS Grid, Custom Variables (for the PRD color palette), and fully responsive design (mobile bottom navigation).
- ** JavaScript **: Async/Await, ES Modules, and DOM manipulation.
- **GSAP 3 & ScrollTrigger**: Page load animations, staggered card reveals, and scroll-triggered section headings.
- **TMDB API**: Live data for trending movies, top-rated, documentaries, search, cast, and trailers.

## Features
- **Home Page**: Hero section (dynamic from trending API), search bar, documentary row, trending row, and top-rated row.
- **Explore Page**: Multi-search with 400ms debounce, filter tabs (All, Series, Movies, Documentaries), responsive grid, and "Load More" pagination.
- **Movie Details**: Dynamic backdrop, poster, genres, release year, rating, overview, cast slider, similar movies, and YouTube trailer modal.
- **Watch Together**: Front-end only modal that generates a random 6-character room code (with clipboard copy) and a join room UI.

## Folder Structure
```text
scene/
├── index.html
├── explore.html
├── movie.html
├── profile.html
├── css/
│   └── style.css
└── js/
    ├── config.js       (API Key)
    ├── api.js          (Fetch functions)
    ├── ui.js           (Card rendering)
    ├── animations.js   (GSAP logic)
    ├── watch-together.js (Modal logic)
    ├── home.js
    ├── explore.js
    └── movie.js
