let isExpanded = false;
const navToggle = document.getElementById('navToggle');
const navExtended = document.getElementById('navExtended');
const toggleIcon = document.getElementById('toggleIcon');
const toggleText = document.getElementById('toggleText');

// Toggle More menu

navToggle.addEventListener('click', function() {
  isExpanded = !isExpanded;
  navExtended.classList.toggle('show', isExpanded);
  navToggle.setAttribute('aria-expanded', isExpanded);
  toggleIcon.className = isExpanded ? 'fas fa-times' : 'fas fa-ellipsis-h';
  toggleText.textContent = isExpanded ? 'Close' : 'More';

  if (isExpanded) {
    // expand to content height
    navExtended.style.maxHeight = navExtended.scrollHeight + "px";
  } else {
    // collapse smoothly
    navExtended.style.maxHeight = "0";
  }

  // ✅ Push nav-container up/down
//   const navContainer = document.getElementById('navContainer');
//   navContainer.style.transform = isExpanded ? 'translateY(-0px)' : 'translateY(0)';

});

// Close extended nav when clicking an item
document.querySelectorAll('.nav-extended .nav-item-mobile').forEach(item => {
  item.addEventListener('click', () => {
    isExpanded = false;
    navExtended.style.maxHeight = "0"
    // navExtended.classList.remove('show');
    // navToggle.setAttribute('aria-expanded', false);
    toggleIcon.className = 'fas fa-ellipsis-h';
    toggleText.textContent = 'More';
  });
});

// Close extended nav when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.bottom-nav') && isExpanded) {
    isExpanded = false;
    navExtended.style.maxHeight = "0";
    toggleIcon.className = 'fas fa-ellipsis-h';
    toggleText.textContent = 'More';
  }
});

// Smooth scroll + active state update
const navLinks = document.querySelectorAll('a[href^="#"]');
function setActive(link) {
  navLinks.forEach(l => l.classList.remove('active'));
  link.classList.add('active');
}
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActive(this);
    }
  });
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      setActive(link);
    }
  });
});

