// BrightNest — small helpers: mobile menu, today's hours,
// scroll animations, footer year, and the quote form thank-you note.

// 1) Mobile menu: the three-line button opens and closes the links.
var menuButton = document.getElementById('menu-button');
var mainNav = document.getElementById('main-nav');

menuButton.addEventListener('click', function () {
  var isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close the menu after a link is tapped (nicer on phones).
mainNav.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// 2) Today's hours: pick the right line for the real day of the week.
// getDay() gives 0 = Sunday, 1 = Monday, ... 6 = Saturday.
var hoursByDay = {
  0: 'Closed',              // Sunday
  1: '8:00 AM – 6:00 PM',   // Monday
  2: '8:00 AM – 6:00 PM',   // Tuesday
  3: '8:00 AM – 6:00 PM',   // Wednesday
  4: '8:00 AM – 6:00 PM',   // Thursday
  5: '8:00 AM – 6:00 PM',   // Friday
  6: '8:00 AM – 4:00 PM'    // Saturday
};

var today = new Date().getDay();
var todayHours = hoursByDay[today];

if (todayHours === 'Closed') {
  document.getElementById('today-line').innerHTML =
    'Closed today (Sunday) — <strong>quote requests still welcome</strong>';
} else {
  document.getElementById('today-hours').textContent = todayHours;
}

// Highlight today's row in the hours table and add a friendly note.
var rows = document.querySelectorAll('#hours-table tr');
rows.forEach(function (row) {
  var days = row.getAttribute('data-days').split(',');
  if (days.indexOf(String(today)) !== -1) {
    row.classList.add('today');
    document.getElementById('today-note').textContent =
      todayHours === 'Closed'
        ? 'That last row is today — we rest on Sundays, but the quote form below still reaches us.'
        : 'That highlighted row is today — we are cleaning until ' + todayHours.split('– ')[1] + '.';
  }
});

// 3) Reveal on scroll: the hidden state is added HERE, by JavaScript,
// never in the CSS — so with JavaScript off, everything stays visible.
var revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  revealItems.forEach(function (item) { item.classList.add('reveal-init'); });
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (item) { watcher.observe(item); });
}

// 4) Footer year: keeps the copyright line current on its own.
document.getElementById('year').textContent = new Date().getFullYear();

// 5) Quote form: there is no server behind this demo,
// so we thank the visitor on the page instead of sending anything.
var form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
  var name = document.getElementById('name').value.trim();
  document.getElementById('form-note').textContent =
    'Thank you' + (name ? ', ' + name : '') + '! Your request is in — we will reply with one flat price within one working day.';
  form.reset();
});
