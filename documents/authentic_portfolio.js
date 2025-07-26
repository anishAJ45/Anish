document.addEventListener('DOMContentLoaded', function () {
    // === LOADING SCREEN ===
    const loader = document.getElementById('loader');
    const glitchText = document.getElementById('glitch-text'); // NEW
    const mainContent = document.getElementById('main-content');

    const glitchFinal = "Loading your world...";
    const glitchChars = '!@#$%^&*()-_=+[]{}|;:,.<>?/~';

    function glitchEffect(text, element, duration = 2000, interval = 60) {
        let frame = 0;
        const totalFrames = Math.floor(duration / interval);
        const originalText = text.split('');
        const textArray = new Array(originalText.length).fill('');

        const glitchInterval = setInterval(() => {
            for (let i = 0; i < textArray.length; i++) {
                if (frame / totalFrames > i / textArray.length) {
                    textArray[i] = originalText[i];
                } else {
                    textArray[i] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
            }
            element.textContent = textArray.join('');
            frame++;

            if (frame >= totalFrames) {
                clearInterval(glitchInterval);
                element.textContent = text;
            }
        }, interval);
    }

    glitchEffect(glitchFinal, glitchText);

    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.style.display = 'block'; // Show portfolio after loader
        }, 600);
    }, 2600); // Loader stays a bit longer to finish glitch

    // === MOBILE MENU ===
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === FADE-IN PROJECT CARDS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // === TYPING EFFECT FOR HERO TITLE WITH GLITCH ===
    const heroTitle = document.querySelector('.hero h1');
    const finalText = "Welcome to my portfolio";

    if (heroTitle) {
        heroTitle.textContent = '';

        let i = 0;
        function typeWithGlitch() {
            if (i < finalText.length) {
                const char = finalText.charAt(i);
                const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                heroTitle.textContent += glitchChar;

                setTimeout(() => {
                    heroTitle.textContent = heroTitle.textContent.slice(0, -1) + char;
                    i++;
                    setTimeout(typeWithGlitch, 80);
                }, 100);
            }
        }

        setTimeout(typeWithGlitch, 500);
    }
});
