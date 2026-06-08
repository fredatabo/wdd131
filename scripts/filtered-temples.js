// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Create overlay element (if not already in HTML)
let overlay = document.getElementById('overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
}

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

// ============================================
// TEMPLE ARRAY (original + 3 additional temples)
// ============================================
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ===== THREE ADDITIONAL TEMPLE OBJECTS =====
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3544.jpg"
  },
  {
    templeName: "Rio de Janeiro Brazil",
    location: "Rio de Janeiro, Brazil",
    dedicated: "2022, May, 8",
    area: 29500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rio-de-janeiro-brazil-temple/rio-de-janeiro-brazil-temple-49.jpg"
  },
  {
    templeName: "Bangkok Thailand",
    location: "Bangkok, Thailand",
    dedicated: "2023, October, 22",
    area: 48200,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bangkok-thailand-temple/bangkok-thailand-temple-40055.jpg"
  }
];

// Helper function to format dedication date
function formatDedicationDate(dateStr) {
  // Expecting format: "YYYY, Month, Day"
  const parts = dateStr.split(',').map(part => part.trim());
  if (parts.length === 3) {
    return `${parts[1]} ${parts[2]}, ${parts[0]}`;
  }
  return dateStr;
}

// Helper function to format area with commas
function formatArea(area) {
  return area.toLocaleString() + " sq ft";
}

// Function to generate temple cards dynamically
function generateTempleCards() {
  const galleryContainer = document.getElementById('dynamic-gallery');
  if (!galleryContainer) return;
  
  let html = '';
  
  // Loop through the temples array and create HTML for each temple
  temples.forEach(temple => {
    const formattedDate = formatDedicationDate(temple.dedicated);
    const formattedArea = formatArea(temple.area);
    
    html += `
      <figure>
        <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
        <figcaption>
          <h3>${temple.templeName}</h3>
          <p><i class="fas fa-map-marker-alt"></i> ${temple.location}</p>
          <div class="temple-dedication"><i class="fas fa-calendar-alt"></i> Dedicated: ${formattedDate}</div>
          <div class="temple-area"><i class="fas fa-arrows-alt"></i> Area: ${formattedArea}</div>
        </figcaption>
      </figure>
    `;
  });
  
  galleryContainer.innerHTML = html;
}

// Call the function to generate temple cards when page loads
document.addEventListener('DOMContentLoaded', () => {
  generateTempleCards();
});

// Image loading animation for dynamically added images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.animation = 'fadeIn 0.5s forwards';
      imageObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '50px' });

// Function to observe images after they are added to DOM
function observeDynamicImages() {
  const images = document.querySelectorAll('#dynamic-gallery img');
  images.forEach(img => {
    img.style.opacity = '0';
    imageObserver.observe(img);
  });
}

// Set up a mutation observer to watch for when images are added
const observer = new MutationObserver(() => {
  observeDynamicImages();
});

// Start observing the gallery container for changes
const galleryContainer = document.getElementById('dynamic-gallery');
if (galleryContainer) {
  observer.observe(galleryContainer, { childList: true, subtree: true });
}

// Initial observation in case images are already there
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(observeDynamicImages, 100);
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