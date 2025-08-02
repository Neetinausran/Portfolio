// Performance-optimized animations and interactions

// ✨ Initialize particles animation
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
    });
}

// 🎨 Advanced scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// 🌟 Enhanced competency bar animations
function animateCompetencyBars() {
    const competencyBars = document.querySelectorAll('.competency-progress');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    competencyBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// 🎯 Counter animation for metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isNumber = /^\d+/.test(target);
                
                if (isNumber) {
                    const finalNumber = parseInt(target);
                    let currentNumber = 0;
                    const increment = finalNumber / 50;
                    
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(currentNumber) + target.replace(/^\d+/, '');
                        }
                    }, 30);
                }
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Intersection Observer for lazy loading and animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px -50px 0px'
};

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

// Animation observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Optimized scroll-based animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    // Use Intersection Observer instead of scroll events for better performance
    elements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize new animations
    initParticles();
    initScrollReveal();
    animateCompetencyBars();
    animateCounters();
    
    // Initialize lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Initialize animations
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // Start animation observer
    animateOnScroll();
    
    // Preload critical resources
    preloadCriticalResources();
});

// Preload critical resources
function preloadCriticalResources() {
    // Preload profile image
    const profileImg = document.querySelector('.profile-image');
    if (profileImg && profileImg.src) {
        const img = new Image();
        img.onload = () => {
            profileImg.style.opacity = '1';
        };
        img.src = profileImg.src;
    }
    
    // Preload critical fonts
    const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
    ];
    
    fontPreloads.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
    });
}

// Optimized navigation highlighting
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

// Throttled scroll handler for better performance
let scrollTimeout;
function handleScroll() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(handleScroll);
}, { passive: true });

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
}

// Optimized smooth scroll
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

// Optimized scroll effects
let ticking = false;
let lastScrollY = 0;

function updateScrollEffects() {
    const scrolled = window.scrollY;
    const header = document.querySelector('header');
    
    // Only update if scroll position changed significantly
    if (Math.abs(scrolled - lastScrollY) > 5) {
        // Header shadow effect
        if (scrolled > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        // Subtle parallax on hero (only if in viewport)
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        lastScrollY = scrolled;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}, { passive: true });

// Enhanced form submission with validation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Enhanced image loading with error handling
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        const img = new Image();
        img.onload = () => {
            profileImage.style.opacity = '1';
            profileImage.classList.add('loaded');
        };
        img.onerror = () => {
            console.warn('Profile image failed to load');
            profileImage.style.opacity = '0.5';
        };
        img.src = profileImage.src;
    }
    
    // Enhanced certification logo loading
    const certLogos = document.querySelectorAll('.cert-logo img');
    certLogos.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            console.warn('Certification logo failed to load:', img.src);
            // The onerror attribute in HTML will handle the fallback display
        });
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            
            // Log Core Web Vitals if available
            if ('web-vital' in window) {
                // This would integrate with web-vitals library if included
                console.log('Core Web Vitals monitoring enabled');
            }
        }, 0);
    });
}

// Service Worker registration for caching (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Enhanced profile image loading
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-image');
    const fallback = document.querySelector('.profile-fallback');
    
    // Try different image paths
    const imagePaths = [
        'WhatsApp Image 2025-05-01 at 13.34.27_7e81fe82.jpg',
        './WhatsApp Image 2025-05-01 at 13.34.27_7e81fe82.jpg',
        '/WhatsApp Image 2025-05-01 at 13.34.27_7e81fe82.jpg',
        './public/WhatsApp Image 2025-05-01 at 13.34.27_7e81fe82.jpg',
        'https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCQndKaFFFPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--bd27fe28fdde8e63081a70e3edfdcdbfcb155436//WhatsApp Image 2025-05-01 at 13.34.27_7e81fe82.jpg'
    ];
    
    let currentIndex = 0;
    
    function tryNextImage() {
        if (currentIndex < imagePaths.length) {
            const testImg = new Image();
            testImg.onload = function() {
                if (profileImg) {
                    profileImg.src = this.src;
                    profileImg.style.opacity = '1';
                    if (fallback) fallback.style.display = 'none';
                    console.log('Profile image loaded:', this.src);
                }
            };
            testImg.onerror = function() {
                currentIndex++;
                tryNextImage();
            };
            testImg.src = imagePaths[currentIndex];
        } else {
            // All images failed, show fallback
            if (profileImg) profileImg.style.display = 'none';
            if (fallback) {
                fallback.style.display = 'flex';
                console.log('Using fallback profile display');
            }
        }
    }
    
    // Start trying images
    setTimeout(tryNextImage, 100);
});

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', 'none');
}