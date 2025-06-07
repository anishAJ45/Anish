// Portfolio Scroll-Based Navigation
class PortfolioScroller {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.totalSections = this.sections.length;
        this.isScrolling = false;
        this.scrollTimeout = null;

        this.init();
    }

    init() {
        this.setupScrollNavigation();
        this.setupEventListeners();
        this.startTypingAnimation();
        this.setupIntersectionObserver();
        this.preloadImages();
        this.updateActiveSection();
    }

    setupScrollNavigation() {
        // Enable smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Set up sections for scroll snapping
        this.sections.forEach((section, index) => {
            section.style.minHeight = '100vh';
            section.style.display = 'flex';
            section.style.alignItems = 'center';
            section.style.justifyContent = 'center';
            section.id = section.id || `section-${index}`;
        });

        // Mouse wheel event for smooth section scrolling
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            e.preventDefault();

            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    // Scrolling down
                    this.scrollToNextSection();
                } else {
                    // Scrolling up
                    this.scrollToPrevSection();
                }
            }, 50);
        }, { passive: false });

        // Regular scroll event to update active section
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
        });
    }

    setupEventListeners() {
        // Navigation links
        this.navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection(index);
            });
        });

        // Slide indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.scrollToSection(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.scrollToNextSection();
            }
            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.scrollToPrevSection();
            }
            if (e.key >= '1' && e.key <= '5') {
                this.scrollToSection(parseInt(e.key) - 1);
            }
        });

        // Touch/swipe support
        this.setupTouchEvents();

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Form submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    setupTouchEvents() {
        let startY = 0;
        let endY = 0;

        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            endY = e.changedTouches[0].clientY;
            const deltaY = endY - startY;

            // Only trigger if vertical swipe is significant
            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) {
                    this.scrollToPrevSection();
                } else {
                    this.scrollToNextSection();
                }
            }
        });
    }

    scrollToSection(sectionIndex) {
        if (sectionIndex < 0 || sectionIndex >= this.totalSections) {
            return;
        }

        this.currentSection = sectionIndex;
        const targetSection = this.sections[sectionIndex];

        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        this.updateActiveStates(sectionIndex);
    }

    scrollToNextSection() {
        const nextIndex = Math.min(this.currentSection + 1, this.totalSections - 1);
        if (nextIndex !== this.currentSection) {
            this.scrollToSection(nextIndex);
        }
    }

    scrollToPrevSection() {
        const prevIndex = Math.max(this.currentSection - 1, 0);
        if (prevIndex !== this.currentSection) {
            this.scrollToSection(prevIndex);
        }
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                if (this.currentSection !== index) {
                    this.currentSection = index;
                    this.updateActiveStates(index);
                    this.triggerSectionAnimations(index);
                }
            }
        });
    }

    updateActiveStates(sectionIndex) {
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === sectionIndex);
        });

        // Update navigation
        this.navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === sectionIndex);
        });
    }

    triggerSectionAnimations(sectionIndex) {
        const section = this.sections[sectionIndex];
        const animatedElements = section.querySelectorAll('.skill-item, .project-card, .contact-item, .education-card');

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';

            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }

    startTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const text = "Hello, I'm Jaianish";
        const speed = 100;
        let i = 0;

        typingText.textContent = '';

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        setTimeout(typeWriter, 1000);
    }



    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.skill-item, .project-card, .contact-item, .education-card').forEach(el => {
            observer.observe(el);
        });
    }

    preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const imageUrl = img.src;
            const image = new Image();
            image.src = imageUrl;
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');

        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            form.reset();

            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#4ecdc4';

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    }
}

// Global functions for button clicks
function nextSlide() {
    if (window.portfolioScroller) {
        window.portfolioScroller.scrollToNextSection();
    }
}

function prevSlide() {
    if (window.portfolioScroller) {
        window.portfolioScroller.scrollToPrevSection();
    }
}

function goToSlide(index) {
    if (window.portfolioScroller) {
        window.portfolioScroller.scrollToSection(index);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loading);

    // Initialize portfolio scroller
    window.portfolioScroller = new PortfolioScroller();

    // Hide loading screen after initialization
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1500);

    // Add smooth scrolling for any remaining anchor links
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




});
