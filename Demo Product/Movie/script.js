const STORAGE_KEY = 'movie_reviews';
const TMDB_KEY_STORAGE = 'movie_tmdb_key';
const RT_SEARCH_BASE = 'https://www.rottentomatoes.com/search?search=';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

let reviews = [];

// Initialize
function init() {
    loadReviews();
    setupEventListeners();
    renderReviews();
}

function loadReviews() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        reviews = saved ? JSON.parse(saved) : [];
        let migrated = false;
        reviews.forEach((r) => {
            if (typeof r.rating === 'number' && r.rating >= 1 && r.rating <= 5) {
                r.rating = r.rating * 20;
                migrated = true;
            }
        });
        if (migrated) saveReviews();
    } catch (e) {
        reviews = [];
    }
}

function saveReviews() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function setupEventListeners() {
    document.getElementById('review-form')?.addEventListener('submit', handleSubmit);

    const tmdbKeyEl = document.getElementById('tmdb-key');
    const savedKey = localStorage.getItem(TMDB_KEY_STORAGE);
    if (tmdbKeyEl && savedKey) tmdbKeyEl.value = savedKey;
    tmdbKeyEl?.addEventListener('change', (e) => {
        const v = e.target.value.trim();
        if (v) localStorage.setItem(TMDB_KEY_STORAGE, v);
        else localStorage.removeItem(TMDB_KEY_STORAGE);
    });

    document.querySelectorAll('input[name="sort"]').forEach((radio) => {
        radio.addEventListener('change', () => renderReviews());
    });

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
}

async function fetchPosterFromTMDB(title, year) {
    const key = localStorage.getItem(TMDB_KEY_STORAGE)?.trim();
    if (!key) return null;
    const query = encodeURIComponent(title);
    const yearParam = year ? `&year=${year}` : '';
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}${yearParam}`
        );
        const data = await res.json();
        const movie = data.results?.[0];
        if (movie?.poster_path) {
            return TMDB_IMAGE_BASE + movie.poster_path;
        }
    } catch (e) {}
    return null;
}

function getRTSearchUrl(title, year) {
    const query = year ? `${title} ${year}` : title;
    return RT_SEARCH_BASE + encodeURIComponent(query);
}

async function handleSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('movie-title').value.trim();
    const yearInput = document.getElementById('movie-year').value;
    const year = yearInput ? parseInt(yearInput, 10) : new Date().getFullYear();
    const ratingInput = document.getElementById('movie-rating').value;
    const rating = ratingInput ? Math.min(100, Math.max(0, parseInt(ratingInput, 10))) : 0;
    const reviewText = document.getElementById('movie-review').value.trim();
    let posterUrl = document.getElementById('movie-poster')?.value.trim() || null;

    if (!title) return;
    if (rating < 0 || rating > 100) {
        alert('Please enter a rating between 0 and 100.');
        return;
    }

    if (!posterUrl) {
        posterUrl = await fetchPosterFromTMDB(title, year);
    }

    const review = {
        id: Date.now().toString(),
        title,
        year,
        rating,
        review: reviewText,
        poster: posterUrl,
        date: new Date().toISOString()
    };

    reviews.unshift(review);
    saveReviews();
    renderReviews();

    document.getElementById('review-form').reset();
    document.getElementById('movie-year').value = '';
}

function getSortedReviews() {
    const sortBy = document.querySelector('input[name="sort"]:checked')?.value || 'newest';

    if (sortBy === 'rating') {
        return [...reviews].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return [...reviews];
}

function isFresh(rating) {
    return rating >= 60;
}

function renderReviews() {
    const listEl = document.getElementById('reviews-list');
    const emptyEl = document.getElementById('empty-state');

    if (reviews.length === 0) {
        listEl.innerHTML = '';
        emptyEl?.classList.remove('hidden');
        return;
    }

    emptyEl?.classList.add('hidden');

    const sorted = getSortedReviews();
    listEl.innerHTML = sorted.map((r) => {
        const pct = typeof r.rating === 'number' ? r.rating : parseInt(String(r.rating || 0), 10);
        const fresh = isFresh(pct);
        const rtUrl = getRTSearchUrl(r.title, r.year);
        const poster = r.poster ? `<img class="review-card-poster" src="${escapeAttr(r.poster)}" alt="${escapeAttr(r.title)} poster" loading="lazy" onerror="this.style.display='none'">` : '';
        return `
        <article class="review-card" data-id="${escapeAttr(r.id)}">
            ${poster}
            <div class="review-card-body">
                <div class="review-card-header">
                    <div>
                        <h3 class="review-title">${escapeHtml(r.title)}${r.year ? ` <span class="review-year">(${r.year})</span>` : ''}</h3>
                    </div>
                    <div class="review-rating-badge">
                        <span class="review-rating-percent ${fresh ? 'fresh' : 'rotten'}">${pct}%</span>
                    </div>
                </div>
                ${r.review ? `<p class="review-text">${escapeHtml(r.review)}</p>` : ''}
                <div class="review-meta">
                    <span class="review-date">${formatDate(r.date)}</span>
                    <a href="${escapeAttr(rtUrl)}" target="_blank" rel="noopener" class="review-rt-link">View on Rotten Tomatoes →</a>
                    <button type="button" class="delete-btn" data-id="${escapeAttr(r.id)}">Delete</button>
                </div>
            </div>
        </article>
    `;
    }).join('');

    listEl.querySelectorAll('.delete-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteReview(btn.dataset.id);
        });
    });
}

function deleteReview(id) {
    reviews = reviews.filter((r) => r.id !== id);
    saveReviews();
    renderReviews();
}

function formatDate(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeAttr(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
        localStorage.setItem('movie-theme', next);
    } catch (e) {}
}

init();
