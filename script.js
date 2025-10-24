let lastScrollTop = 0;
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector(".hero");

// ================================
// LOADING SCREEN FUNCTIONALITY
// ================================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.body.classList.add('loaded');
    }, 500);
  }, 3000);
});

// ================================
// PARTICLE SYSTEM
// ================================
function createParticleSystem() {
  const container = document.getElementById('particles-container');
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(particle);
  }
}

// ================================
// CURSOR TRAIL EFFECT
// ================================
function initCursorTrail() {
  const cursorTrail = document.getElementById('cursor-trail');
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create trailing particle
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = mouseX + 'px';
    particle.style.top = mouseY + 'px';
    cursorTrail.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);
  });
}

// ================================
// PARALLAX SCROLLING
// ================================
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Apply parallax to hero background
    const heroBackground = document.querySelector('.hero');
    if (heroBackground) {
      heroBackground.style.backgroundPosition = `center ${rate}px`;
    }

    // Apply different parallax rates to different elements
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach((el, index) => {
      const speed = 0.2 + (index * 0.1);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ================================
// PROGRESS INDICATOR
// ================================
function initProgressIndicator() {
  const progressBar = document.querySelector('.progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = scrollProgress + '%';
  });
}

// ================================
// BREADCRUMB NAVIGATION
// ================================
function initBreadcrumbNav() {
  const breadcrumbNav = document.querySelector('.breadcrumb-nav');
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
  
  // Show breadcrumb on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      breadcrumbNav.classList.add('visible');
    } else {
      breadcrumbNav.classList.remove('visible');
    }
  });

  // Update active breadcrumb based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    breadcrumbItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });
}

// ================================
// SPACE CALCULATOR
// ================================
function initSpaceCalculator() {
  const planetDistances = {
    mercury: 57.9, venus: 108.2, earth: 149.6, mars: 227.9,
    jupiter: 778.5, saturn: 1432, uranus: 2867, neptune: 4515
  };

  const calculateBtn = document.getElementById('calculate-btn');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const planet1 = document.getElementById('planet1').value;
      const planet2 = document.getElementById('planet2').value;
      
      const distance = Math.abs(planetDistances[planet1] - planetDistances[planet2]);
      const lightTime = (distance * 1000000) / 299792458; // seconds
      const rocketTime = distance / (11 * 365.25 * 24); // assuming 11 km/s average speed
      
      document.getElementById('distance-value').textContent = distance.toFixed(1) + ' million km';
      document.getElementById('light-time').textContent = formatTime(lightTime);
      document.getElementById('rocket-time').textContent = formatRocketTime(rocketTime);
      
      // Add animation to results
      const resultDisplay = document.getElementById('distance-result');
      resultDisplay.style.transform = 'scale(0.9)';
      resultDisplay.style.opacity = '0';
      
      setTimeout(() => {
        resultDisplay.style.transform = 'scale(1)';
        resultDisplay.style.opacity = '1';
        resultDisplay.style.transition = 'all 0.3s ease';
      }, 100);
    });
  }
}

function formatTime(seconds) {
  if (seconds < 60) return seconds.toFixed(1) + ' seconds';
  if (seconds < 3600) return (seconds / 60).toFixed(1) + ' minutes';
  if (seconds < 86400) return (seconds / 3600).toFixed(1) + ' hours';
  return (seconds / 86400).toFixed(1) + ' days';
}

function formatRocketTime(days) {
  if (days < 30) return days.toFixed(1) + ' days';
  if (days < 365) return (days / 30).toFixed(1) + ' months';
  return (days / 365).toFixed(1) + ' years';
}

// ================================
// CONSTELLATION MAP
// ================================
function initConstellationMap() {
  const constellationBtns = document.querySelectorAll('.constellation-btn');
  const constellations = document.querySelectorAll('.constellation');
  const constellationInfo = document.getElementById('constellation-info');
  
  const constellationData = {
    'ursa-major': {
      name: 'Ursa Major (The Great Bear)',
      info: 'The third-largest constellation, visible year-round in the northern hemisphere. Contains the famous Big Dipper asterism and is home to the double star Mizar and Alcor.',
      stars: 7,
      brightness: 'Magnitude: 1.8 - 3.3',
      mythology: 'In Greek mythology, represents Callisto, transformed into a bear by Zeus\'s jealous wife Hera.'
    },
    'orion': {
      name: 'Orion (The Hunter)',
      info: 'One of the most recognizable constellations, visible worldwide. Features the famous Orion\'s Belt, Betelgeuse (red supergiant), and Rigel (blue supergiant).',
      stars: 10,
      brightness: 'Magnitude: 0.1 - 2.2',
      mythology: 'The great hunter in Greek mythology, killed by a scorpion sent by the Earth goddess Gaia.'
    },
    'cassiopeia': {
      name: 'Cassiopeia (The Queen)',
      info: 'Distinctive "W" or "M" shaped constellation, circumpolar in the northern hemisphere. Contains several notable star clusters and nebulae.',
      stars: 5,
      brightness: 'Magnitude: 2.2 - 3.4',
      mythology: 'The vain queen in Greek mythology who boasted that she was more beautiful than the sea nymphs.'
    },
    'big-dipper': {
      name: 'Big Dipper (The Plough)',
      info: 'The most recognizable asterism in Ursa Major. Six of its seven stars are part of the Ursa Major Moving Group, sharing common proper motion.',
      stars: 7,
      brightness: 'Magnitude: 1.8 - 3.3',
      mythology: 'Known by many names worldwide - the Plough (UK), the Wagon (Germanic), the Great Cart (Nordic).'
    }
  };

  // Animate constellation lines when switching
  function animateConstellationLines(constellation) {
    const lines = constellation.querySelector('.constellation-lines path');
    if (lines) {
      lines.style.strokeDasharray = '0, 1000';
      setTimeout(() => {
        lines.style.transition = 'stroke-dasharray 2s ease-in-out';
        lines.style.strokeDasharray = '5, 5';
      }, 100);
    }
  }

  // Add star click interactions
  function initStarInteractions() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'star-click-ripple 0.6s ease-out';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.pointerEvents = 'none';
        
        star.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  constellationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetConstellation = btn.dataset.constellation;
      
      // Add loading effect
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
      
      // Update active button with animation
      constellationBtns.forEach(b => {
        b.classList.remove('active');
        b.style.transform = 'scale(1)';
      });
      btn.classList.add('active');
      
      // Update active constellation with fade effect
      constellations.forEach(c => {
        c.classList.remove('active');
        c.style.opacity = '0';
      });
      
      setTimeout(() => {
        const targetEl = document.querySelector(`.constellation.${targetConstellation}`);
        if (targetEl) {
          targetEl.classList.add('active');
          targetEl.style.opacity = '1';
          animateConstellationLines(targetEl);
        }
      }, 200);
      
      // Update info with enhanced details
      const data = constellationData[targetConstellation];
      if (data && constellationInfo) {
        constellationInfo.style.opacity = '0';
        setTimeout(() => {
          constellationInfo.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.info}</p>
            <div class="constellation-details">
              <div class="detail-item">
                <span class="detail-label">⭐ Main Stars:</span>
                <span class="detail-value">${data.stars}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">🌟 Brightness:</span>
                <span class="detail-value">${data.brightness}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">📜 Mythology:</span>
                <span class="detail-value">${data.mythology}</span>
              </div>
            </div>
          `;
          constellationInfo.style.opacity = '1';
          constellationInfo.style.transition = 'opacity 0.3s ease';
        }, 150);
      }
    });
  });

  // Initialize star interactions
  initStarInteractions();
  
  // Add CSS for ripple effect
  if (!document.querySelector('#star-ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'star-ripple-styles';
    style.textContent = `
      @keyframes star-click-ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      .constellation-details {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(168, 85, 247, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(168, 85, 247, 0.3);
      }
      .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
      .detail-label {
        color: var(--lightgray);
        font-weight: bold;
      }
      .detail-value {
        color: var(--white);
        text-align: right;
        flex: 1;
        margin-left: 1rem;
      }
    `;
    document.head.appendChild(style);
  }
}

// ================================
// ENHANCED SCROLL HANDLER
// ================================
let ticking = false;

function updateOnScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const heroSectionOffsetTop = heroSection ? heroSection.offsetTop : 0;

  // Show/hide back to top button
  if (toTop) {
    if (scrollTop > heroSectionOffsetTop) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  }

  // Hide/show header on scroll
  if (header) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
  }

  lastScrollTop = scrollTop;
  ticking = false;
}

// ================================
// ENHANCED NAVBAR FUNCTIONALITY
// ================================
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Close mobile menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Update active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Enhanced navbar background on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav-menu');
    if (navbar && window.pageYOffset > 100) {
      navbar.style.background = 'rgba(0, 0, 0, 0.9)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else if (navbar) {
      navbar.style.background = 'rgba(0, 0, 0, 0.7)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  });
}

// ================================
// SMOOTH SCROLLING
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ================================
// ENHANCED READ MORE FUNCTIONALITY
// ================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const info = this.parentElement.querySelector('.info');
      const isVisible = info.style.display === 'block';
      
      if (!isVisible) {
        info.style.display = 'block';
        info.style.opacity = '0';
        info.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          info.style.transition = 'all 0.3s ease';
          info.style.opacity = '1';
          info.style.transform = 'translateY(0)';
        }, 10);
      } else {
        info.style.opacity = '0';
        info.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          info.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// ================================
// ERROR HANDLING FOR IMAGES
// ================================
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.opacity = '0.5';
    this.alt = 'Image not available';
  });
});

// ================================
// INITIALIZATION
// ================================
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavbar();
  createParticleSystem();
  initCursorTrail();
  initParallax();
  initProgressIndicator();
  initBreadcrumbNav();
  initSpaceCalculator();
  initConstellationMap();
  
  // Observe elements for animations
  document.querySelectorAll('.mission, .fact, .card, .tech-category').forEach(el => {
    observer.observe(el);
  });
  
  // Enhanced hover effects for destination items
  document.querySelectorAll('.destination .items').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // 3D planet rotation enhancement
  const earthElement = document.querySelector('.status .planet .earth');
  if (earthElement) {
    earthElement.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      this.style.transform = 'scale(1.1) rotateY(20deg)';
    });
    
    earthElement.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      this.style.transform = 'scale(1) rotateY(0deg)';
    });
  }
});