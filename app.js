const CITY_DATA = {
  İstanbul: ['Fatih', 'Kadıköy', 'Üsküdar', 'Beşiktaş'],
  Ankara: ['Çankaya', 'Keçiören', 'Yenimahalle'],
  İzmir: ['Konak', 'Karşıyaka', 'Bornova'],
  Kocaeli: ['İzmit', 'Gebze', 'Darıca']
};

const PRAYER_TIMES = [
  { name: 'İmsak', time: '05:12', icon: '🌙' },
  { name: 'Güneş', time: '06:36', icon: '🌅' },
  { name: 'Öğle', time: '13:08', icon: '☀️' },
  { name: 'İkindi', time: '16:39', icon: '🌤️' },
  { name: 'Akşam', time: '19:29', icon: '🌇' },
  { name: 'Yatsı', time: '20:47', icon: '🌌' }
];

const state = {
  city: localStorage.getItem('city') || 'İstanbul',
  district: localStorage.getItem('district') || 'Fatih',
  dark: localStorage.getItem('dark') === '1',
  date: new Date(),
  search: ''
};

const $ = (id) => document.getElementById(id);

function setupTheme() {
  document.body.classList.toggle('dark', state.dark);
  $('themeToggle').textContent = state.dark ? '☀️' : '🌙';
  localStorage.setItem('dark', state.dark ? '1' : '0');
}

function formatTime(d) {
  return d.toLocaleTimeString('tr-TR', { hour12: false });
}

function tickClock() {
  $('clock').textContent = formatTime(new Date());
}

function getPrayerDateTime(time) {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function findCurrentAndNext() {
  const now = new Date();
  let next = PRAYER_TIMES.find((p) => getPrayerDateTime(p.time) > now);
  if (!next) next = PRAYER_TIMES[0];
  const nextIndex = PRAYER_TIMES.findIndex((x) => x.name === next.name);
  const current = nextIndex > 0 ? PRAYER_TIMES[nextIndex - 1] : PRAYER_TIMES[PRAYER_TIMES.length - 1];
  return { current, next };
}

function renderCountdown() {
  const { next } = findCurrentAndNext();
  let target = getPrayerDateTime(next.time);
  if (target < new Date()) target.setDate(target.getDate() + 1);

  const diff = Math.max(0, Math.floor((target - new Date()) / 1000));
  const h = String(Math.floor(diff / 3600)).padStart(2, '0');
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const s = String(diff % 60).padStart(2, '0');

  $('h').textContent = h;
  $('m').textContent = m;
  $('s').textContent = s;
  $('nextPrayerLabel').textContent = `${next.name} — ${next.time}`;
}

function renderPrayerRows() {
  const { current } = findCurrentAndNext();
  $('prayerRows').innerHTML = PRAYER_TIMES.map((p) => `
    <div class="prayer-row ${current.name === p.name ? 'active' : ''}">
      <div class="prayer-left"><small>${p.icon}</small><span>${p.name}</span></div>
      <div class="prayer-time">${p.time}</div>
    </div>
  `).join('');
}

function toHijri(date) {
  return new Intl.DateTimeFormat('tr-TR-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function renderDate() {
  $('gregorianDate').textContent = state.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  const hijri = toHijri(state.date);
  $('hijriDate').textContent = hijri;

  const today = new Date();
  const isToday = today.toDateString() === state.date.toDateString();
  $('todayBadge').classList.toggle('show', isToday);
  $('ramadanBadge').classList.toggle('show', hijri.toLowerCase().includes('ramazan'));
}

function renderLocation() {
  $('currentCityText').textContent = state.city;
  $('footerText').textContent = `${state.city} / ${state.district} • İmsakiye 2026`;
}

function renderCities() {
  const search = state.search.toLowerCase();
  const cities = Object.keys(CITY_DATA).filter((c) => c.toLowerCase().includes(search));
  $('cityList').innerHTML = cities.map((city) => `<button class="city-btn ${city === state.city ? 'active' : ''}" data-city="${city}">${city}</button>`).join('');

  $('districtList').innerHTML = (CITY_DATA[state.city] || []).map((d) => `
    <button class="district-btn ${d === state.district ? 'active' : ''}" data-district="${d}">${d}</button>
  `).join('');

  document.querySelectorAll('[data-city]').forEach((el) => el.addEventListener('click', () => {
    state.city = el.dataset.city;
    state.district = CITY_DATA[state.city][0];
    localStorage.setItem('city', state.city);
    localStorage.setItem('district', state.district);
    renderCities();
    renderLocation();
  }));

  document.querySelectorAll('[data-district]').forEach((el) => el.addEventListener('click', () => {
    state.district = el.dataset.district;
    localStorage.setItem('district', state.district);
    renderCities();
    renderLocation();
    $('cityModal').classList.add('hidden');
  }));
}

function bindEvents() {
  $('themeToggle').addEventListener('click', () => {
    state.dark = !state.dark;
    setupTheme();
  });

  $('openCity').addEventListener('click', () => {
    $('cityModal').classList.remove('hidden');
    renderCities();
  });

  $('closeCity').addEventListener('click', () => $('cityModal').classList.add('hidden'));
  $('citySearch').addEventListener('input', (e) => {
    state.search = e.target.value;
    renderCities();
  });

  $('prevDay').addEventListener('click', () => {
    state.date.setDate(state.date.getDate() - 1);
    state.date = new Date(state.date);
    renderDate();
  });

  $('nextDay').addEventListener('click', () => {
    state.date.setDate(state.date.getDate() + 1);
    state.date = new Date(state.date);
    renderDate();
  });

  $('todayBtn').addEventListener('click', () => {
    state.date = new Date();
    renderDate();
  });
}

function init() {
  setupTheme();
  tickClock();
  renderDate();
  renderLocation();
  renderPrayerRows();
  renderCountdown();
  bindEvents();

  setInterval(tickClock, 1000);
  setInterval(() => {
    renderPrayerRows();
    renderCountdown();
  }, 1000);
}

init();
