// ===== NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// ===== STATISTICS COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumbers = () => {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current >= target) {
        stat.textContent = target;
        return;
      }
      stat.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
};

// Intersection Observer for stats
if (statNumbers.length) {
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }
}

// ===== TESTIMONIAL SLIDER =====
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

if (track && prevBtn && nextBtn) {
  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let currentIndex = 0;

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  });

  // Auto-slide
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  }, 5000);

  // Pause on hover
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
      }, 5000);
    });
  }
}

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FILTERABLE PORTFOLIO =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length && portfolioItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ===== QUOTE FORM =====
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your request! We will contact you within 24 hours.');
    quoteForm.reset();
  });
}

// ===== MODAL =====
const modal = document.getElementById('inquiryModal');
const modalClose = document.getElementById('modalClose');

// Open modal from anywhere (you can trigger it via a button)
// For demo, we'll open it on a button click if needed

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

window.addEventListener('click', (e) => {
  if (modal && e.target === modal) {
    modal.classList.remove('active');
  }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

console.log('Inropa Fumigants & Company Ltd - Website Loaded Successfully!');