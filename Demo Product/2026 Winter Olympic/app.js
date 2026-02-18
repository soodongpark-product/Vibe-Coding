// NOC to ISO 3166-1 alpha-2 for flagcdn.com
const nocToIso = {
  NOR: 'no', ITA: 'it', USA: 'us', NED: 'nl', AUT: 'at', FRA: 'fr', SWE: 'se',
  SUI: 'ch', GER: 'de', JPN: 'jp', CAN: 'ca', AUS: 'au', GBR: 'gb', CZE: 'cz',
  SLO: 'si', KOR: 'kr', BRA: 'br', KAZ: 'kz', CHN: 'cn'
};

function getFlagUrl(noc) {
  const iso = nocToIso[noc] || 'un';
  return `https://flagcdn.com/w80/${iso}.png`;
}

// Upcoming events (source: Olympics.com Milano Cortina 2026 schedule)
const upcomingEvents = [
  { when: 'Feb 18, 08:05', countries: 'China, Denmark, USA, Great Britain', game: "Curling Women's Round Robin" },
  { when: 'Feb 18, 09:00', countries: 'Norway, Austria, Sweden', game: "Alpine Skiing Women's Slalom" },
  { when: 'Feb 18, 10:45', countries: 'Norway, Sweden, Finland', game: "Cross-Country Women's Team Sprint" },
  { when: 'Feb 18, 12:00', countries: 'China, Australia, USA', game: "Freestyle Skiing Women's Aerials Finals" },
  { when: 'Feb 18, 13:45', countries: 'France, Norway, Sweden', game: "Biathlon Women's 4×6km Relay" },
  { when: 'Feb 18, 15:40', countries: 'Slovakia vs Germany', game: "Ice Hockey Men's Quarterfinals" },
  { when: 'Feb 18, 20:00', countries: 'Canada, Netherlands, Korea', game: "Short Track Women's 3000m Relay Final" }
];

// Milano Cortina 2026 medal data (source: Olympics.com)
const medalTable = [
  { noc: 'NOR', name: 'Norway', gold: 14, silver: 8, bronze: 9 },
  { noc: 'ITA', name: 'Italy', gold: 9, silver: 4, bronze: 11 },
  { noc: 'USA', name: 'United States of America', gold: 6, silver: 10, bronze: 5 },
  { noc: 'NED', name: 'Netherlands', gold: 6, silver: 6, bronze: 1 },
  { noc: 'AUT', name: 'Austria', gold: 5, silver: 8, bronze: 4 },
  { noc: 'FRA', name: 'France', gold: 5, silver: 7, bronze: 4 },
  { noc: 'SWE', name: 'Sweden', gold: 5, silver: 5, bronze: 2 },
  { noc: 'SUI', name: 'Switzerland', gold: 5, silver: 2, bronze: 3 },
  { noc: 'GER', name: 'Germany', gold: 4, silver: 7, bronze: 6 },
  { noc: 'JPN', name: 'Japan', gold: 4, silver: 5, bronze: 10 },
  { noc: 'CAN', name: 'Canada', gold: 3, silver: 4, bronze: 5 },
  { noc: 'AUS', name: 'Australia', gold: 3, silver: 1, bronze: 1 },
  { noc: 'GBR', name: 'Great Britain', gold: 3, silver: 0, bronze: 0 },
  { noc: 'CZE', name: 'Czechia', gold: 2, silver: 2, bronze: 0 },
  { noc: 'SLO', name: 'Slovenia', gold: 2, silver: 1, bronze: 1 },
  { noc: 'KOR', name: 'Republic of Korea', gold: 1, silver: 2, bronze: 3 },
  { noc: 'BRA', name: 'Brazil', gold: 1, silver: 0, bronze: 0 },
  { noc: 'KAZ', name: 'Kazakhstan', gold: 1, silver: 0, bronze: 0 },
  { noc: 'CHN', name: "People's Republic of China", gold: 0, silver: 3, bronze: 3 }
];

// Medals by sport per country (derived from schedule/results)
const medalsBySport = {
  NOR: [
    { sport: 'Alpine Skiing', gold: 1, silver: 0, bronze: 1 },
    { sport: 'Biathlon', gold: 4, silver: 3, bronze: 2 },
    { sport: 'Cross-Country Skiing', gold: 5, silver: 2, bronze: 4 },
    { sport: 'Nordic Combined', gold: 2, silver: 2, bronze: 1 },
    { sport: 'Ski Jumping', gold: 2, silver: 1, bronze: 1 }
  ],
  ITA: [
    { sport: 'Speed Skating', gold: 2, silver: 2, bronze: 2 },
    { sport: 'Alpine Skiing', gold: 3, silver: 1, bronze: 3 },
    { sport: 'Short Track', gold: 0, silver: 0, bronze: 2 },
    { sport: 'Curling', gold: 1, silver: 0, bronze: 1 },
    { sport: 'Luge', gold: 1, silver: 1, bronze: 1 }
  ],
  USA: [
    { sport: 'Freestyle Skiing', gold: 2, silver: 3, bronze: 1 },
    { sport: 'Bobsleigh', gold: 1, silver: 2, bronze: 0 },
    { sport: 'Figure Skating', gold: 0, silver: 1, bronze: 1 },
    { sport: 'Speed Skating', gold: 1, silver: 2, bronze: 1 }
  ],
  NED: [
    { sport: 'Short Track', gold: 1, silver: 0, bronze: 0 },
    { sport: 'Speed Skating', gold: 5, silver: 5, bronze: 1 }
  ],
  AUT: [
    { sport: 'Alpine Skiing', gold: 2, silver: 4, bronze: 2 },
    { sport: 'Ski Jumping', gold: 2, silver: 2, bronze: 0 },
    { sport: 'Nordic Combined', gold: 1, silver: 2, bronze: 2 }
  ],
  FRA: [
    { sport: 'Biathlon', gold: 3, silver: 2, bronze: 2 },
    { sport: 'Alpine Skiing', gold: 1, silver: 2, bronze: 0 },
    { sport: 'Freestyle Skiing', gold: 1, silver: 2, bronze: 1 }
  ],
  SWE: [
    { sport: 'Biathlon', gold: 0, silver: 0, bronze: 1 },
    { sport: 'Ice Hockey', gold: 0, silver: 1, bronze: 0 },
    { sport: 'Cross-Country Skiing', gold: 3, silver: 2, bronze: 0 }
  ],
  SUI: [
    { sport: 'Alpine Skiing', gold: 2, silver: 2, bronze: 1 },
    { sport: 'Short Track', gold: 0, silver: 0, bronze: 2 }
  ],
  GER: [
    { sport: 'Bobsleigh', gold: 2, silver: 2, bronze: 2 },
    { sport: 'Luge', gold: 1, silver: 2, bronze: 2 }
  ],
  JPN: [
    { sport: 'Figure Skating', gold: 1, silver: 0, bronze: 1 },
    { sport: 'Speed Skating', gold: 1, silver: 3, bronze: 5 }
  ],
  CAN: [
    { sport: 'Short Track', gold: 1, silver: 2, bronze: 2 },
    { sport: 'Speed Skating', gold: 1, silver: 0, bronze: 1 },
    { sport: 'Curling', gold: 0, silver: 1, bronze: 1 }
  ],
  AUS: [
    { sport: 'Freestyle Skiing', gold: 2, silver: 1, bronze: 0 },
    { sport: 'Snowboard', gold: 1, silver: 0, bronze: 1 }
  ],
  GBR: [
    { sport: 'Skeleton', gold: 2, silver: 0, bronze: 0 },
    { sport: 'Curling', gold: 1, silver: 0, bronze: 0 }
  ],
  CZE: [
    { sport: 'Ice Hockey', gold: 0, silver: 1, bronze: 0 },
    { sport: 'Biathlon', gold: 1, silver: 0, bronze: 0 }
  ],
  SLO: [
    { sport: 'Ski Jumping', gold: 1, silver: 1, bronze: 0 }
  ],
  KOR: [
    { sport: 'Short Track', gold: 0, silver: 1, bronze: 2 }
  ],
  BRA: [
    { sport: 'Snowboard', gold: 1, silver: 0, bronze: 0 }
  ],
  KAZ: [
    { sport: 'Freestyle Skiing', gold: 1, silver: 0, bronze: 0 }
  ],
  CHN: [
    { sport: 'Speed Skating', gold: 0, silver: 1, bronze: 1 }
  ]
};

// Ensure all countries have at least placeholder sports data
function getMedalsBySport(noc) {
  const sports = medalsBySport[noc];
  if (sports) return sports;
  const country = medalTable.find(c => c.noc === noc);
  if (!country) return [];
  return [{
    sport: 'Various events',
    gold: country.gold,
    silver: country.silver,
    bronze: country.bronze
  }];
}

function renderGamesHtml(noc) {
  const games = getMedalsBySport(noc);
  return games.map(g => `
    <li class="game-item">
      <span class="game-sport">${g.sport}</span>
      <div class="game-medals">
        ${g.gold ? `<span class="game-medal gold">🥇 ${g.gold}</span>` : ''}
        ${g.silver ? `<span class="game-medal silver">🥈 ${g.silver}</span>` : ''}
        ${g.bronze ? `<span class="game-medal bronze">🥉 ${g.bronze}</span>` : ''}
      </div>
    </li>
  `).join('');
}

function renderMedalTable() {
  const tbody = document.getElementById('medalTableBody');
  tbody.innerHTML = medalTable.map((country, i) => {
    const gamesHtml = renderGamesHtml(country.noc);
    return `
    <tr class="country-row" tabindex="0" data-noc="${country.noc}" aria-expanded="false">
      <td>${i + 1}</td>
      <td>
        <span class="expand-icon" aria-hidden="true"></span>
        <img src="${getFlagUrl(country.noc)}" alt="" class="country-flag" width="28" height="21" loading="lazy">
        ${country.name}
      </td>
      <td class="medal-gold">${country.gold}</td>
      <td class="medal-silver">${country.silver}</td>
      <td class="medal-bronze">${country.bronze}</td>
      <td>${country.gold + country.silver + country.bronze}</td>
    </tr>
    <tr class="expandable-row" data-noc="${country.noc}" hidden>
      <td colspan="6">
        <div class="expandable-content">
          <h3 class="expandable-title">Medals by Sport</h3>
          <ul class="games-list">${gamesHtml}</ul>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function toggleExpand(noc) {
  const row = document.querySelector(`.country-row[data-noc="${noc}"]`);
  const expandRow = document.querySelector(`.expandable-row[data-noc="${noc}"]`);

  if (!row || !expandRow) return;

  const isExpanded = !expandRow.hidden;

  document.querySelectorAll('.expandable-row').forEach(r => {
    r.hidden = true;
  });
  document.querySelectorAll('.country-row').forEach(r => {
    r.setAttribute('aria-expanded', 'false');
    r.classList.remove('expanded');
  });

  if (!isExpanded) {
    expandRow.hidden = false;
    row.setAttribute('aria-expanded', 'true');
    row.classList.add('expanded');
  }
}

function renderUpcomingEvents() {
  const list = document.getElementById('eventsList');
  list.innerHTML = upcomingEvents.map(e => `
    <li class="event-card">
      <div class="event-time">${e.when}</div>
      <div class="event-countries">${e.countries}</div>
      <div class="event-game">${e.game}</div>
    </li>
  `).join('');
}

function init() {
  renderMedalTable();
  renderUpcomingEvents();

  document.getElementById('medalTableBody').addEventListener('click', (e) => {
    const row = e.target.closest('.country-row');
    if (row) toggleExpand(row.dataset.noc);
  });

  document.getElementById('medalTableBody').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const row = e.target.closest('.country-row');
    if (row) {
      e.preventDefault();
      toggleExpand(row.dataset.noc);
    }
  });
}

init();
