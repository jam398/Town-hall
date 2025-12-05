// ================================================
// Bauhaus Neo-Modernism Website
// Main JavaScript
// ================================================

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  // initialize aria-expanded
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const isOpen = mainNav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = mainNav.classList.contains('open') 
      ? 'rotate(45deg) translateY(7px)' 
      : 'none';
    spans[1].style.opacity = mainNav.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = mainNav.classList.contains('open') 
      ? 'rotate(-45deg) translateY(-7px)' 
      : 'none';
  });
}

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Only handle anchor links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update URL without triggering page jump
        history.pushState(null, null, href);
      }
    }
  });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('.header');

function updateActiveNavOnScroll() {
  const scrollPosition = window.scrollY + 100;
  
  // Add scrolled class to header
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavOnScroll);

// Form Handling (basic validation)
const contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Success message (in production, this would send to a server)
    alert('Thank you for your message! We\'ll get back to you soon.');
    contactForm.reset();
  });
}

// ================================================
// SCROLL ANIMATIONS - Fade in on scroll
// ================================================

// Add fade-in animation class to elements
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Target elements to animate
  const animateOnScroll = document.querySelectorAll('.card, .poster-card, h2, .lead');

  animateOnScroll.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Observe element
    fadeInObserver.observe(element);
  });
}

// ================================================
// SUBTLE PARALLAX for large geometric shapes
// ================================================

if (!reduceMotion) {
  const parallaxShapes = document.querySelectorAll('section > div[style*="position: absolute"]');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxShapes.forEach((shape, index) => {
      const speed = 0.1 + (index * 0.05);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });
}

// Add loading animation on page load
if (!reduceMotion) {
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
  });
}


