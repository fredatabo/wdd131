// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// Function to open menu
function openMenu() {
  navMenu.classList.add('active');
  hamburger.innerHTML = '<i class="fas fa-times"></i>';
  hamburger.setAttribute('aria-label', 'Close menu');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
}

// Function to close menu
function closeMenu() {
  navMenu.classList.remove('active');
  hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  hamburger.setAttribute('aria-label', 'Open menu');
  overlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Toggle menu on hamburger click
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  if (navMenu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu when clicking on overlay
overlay.addEventListener('click', closeMenu);

// Close menu when a navigation link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Remove active class from all links
    navLinks.forEach(l => l.classList.remove('active'));
    // Add active class to clicked link
    link.classList.add('active');
    
    // Close menu on mobile (if menu is open)
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});

// Close menu on escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    closeMenu();
  }
});

// Handle responsive behavior on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // On desktop, ensure menu is always visible and overlay is hidden
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  }
});

// Footer: Copyright Year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Footer: Last Modified Date
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Updated: ${lastModified}`;

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(26,26,46,0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    header.style.backdropFilter = 'none';
  }
});

// Image loading animation
const images = document.querySelectorAll('figure img');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.animation = 'fadeIn 0.5s forwards';
      imageObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

images.forEach(img => {
  img.style.opacity = '0';
  imageObserver.observe(img);
});

// Add CSS animation for images
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);