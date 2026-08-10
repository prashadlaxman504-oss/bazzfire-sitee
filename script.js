// Smooth scroll effect for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Title pulse effect
const title = document.querySelector('.main-title');
setInterval(() => {
  title.style.transform = 'scale(1.05)';
  setTimeout(() => title.style.transform = 'scale(1)', 500);
}, 2000);
