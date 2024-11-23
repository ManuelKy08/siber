document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        updateDarkModeIcon();
        updateParticlesColor(!body.classList.contains('light-mode'));
    });

    function updateDarkModeIcon() {
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    }

    // Custom cursor effect
    const customCursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        customCursor.style.transform = `scale(${1 + scrollPosition * 0.001})`;
    });


    // Background music
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.querySelector('i').setAttribute('data-lucide', 'volume-x');
        } else {
            backgroundMusic.play();
            musicToggle.querySelector('i').setAttribute('data-lucide', 'volume-2');
        }
        isMusicPlaying = !isMusicPlaying;
        lucide.createIcons();
    });

    // Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    function updateParticlesColor(isDarkMode) {
        const color = isDarkMode ? '#ffffff' : '#000000';
        pJSDom[0].pJS.particles.color.value = color;
        pJSDom[0].pJS.particles.line_linked.color = color;
        pJSDom[0].pJS.fn.particlesRefresh();
    }


    // Skill bar animation
    const skillLevels = document.querySelectorAll('.skill-level');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-level');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillLevels.forEach(skillLevel => {
        skillLevel.style.width = '0%';
        observer.observe(skillLevel);
    });

    // Animate elements on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    const elementsToObserve = document.querySelectorAll('.project-card, .skill-card, .about-content');
    elementsToObserve.forEach(el => {
        scrollObserver.observe(el);
    });

    // Initialize Lucide icons
    lucide.createIcons();

    // Add typing effect
    new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true
    });
});

