// Simple SPA interactions: nav highlighting, theme, carousel, form validation

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const links = document.querySelectorAll('.nav-link');
    const modules = document.querySelectorAll('.module');
    const themeToggle = document.getElementById('theme-toggle');
    const bodyRoot = document.documentElement;

    // Init theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') bodyRoot.classList.add('dark');

    themeToggle.addEventListener('click', () => {
        bodyRoot.classList.toggle('dark');
        localStorage.setItem('theme', bodyRoot.classList.contains('dark') ? 'dark' : 'light');
    });

    // Navigation: click handler -> activate module
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // important for SPA, prevents jump/scroll
            links.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const target = e.currentTarget.dataset.module;
            modules.forEach(m => {
                m.classList.toggle('active', m.dataset.module === target);
            });
        });
    });


    // Set first link active by default
    if (links[0]) links[0].classList.add('active');

    /* ---------- Carousel basic implementation ---------- */
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsWrap = document.querySelector('.carousel-dots');
    let index = 0;

    function updateCarousel() {
        const cardWidth = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        // dots
        dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === index));
    }

    // Create dots
    cards.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        btn.addEventListener('click', () => { index = i; updateCarousel(); });
        dotsWrap.appendChild(btn);
    });

    prevBtn?.addEventListener('click', () => { index = Math.max(0, index - 1); updateCarousel(); });
    nextBtn?.addEventListener('click', () => { index = Math.min(cards.length - 1, index + 1); updateCarousel(); });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    /* ---------- Contact form validation ---------- */
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const request = document.getElementById('request').value.trim();
        if (!name || !phone || !request) {
            alert('Please fill in all fields.');
            return;
        }
        alert('Form submitted successfully.');
        form.reset();
    });
});
