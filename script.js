// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Logo glow pulse
const logo = document.querySelector('.logo');
setInterval(() => {
  logo.style.filter = 'drop-shadow(0 0 10px #ff3c00)';
  setTimeout(() => logo.style.filter = 'none', 500);
}, 2000);
