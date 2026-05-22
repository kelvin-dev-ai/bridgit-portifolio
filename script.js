document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Typed text
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = ['IT Student', 'Web Developer', 'Problem Solver', 'Content Creator'];
        let textIndex = 0, charIndex = 0;
        function type() {
            if (charIndex < textArray[textIndex].length) {
                typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                textIndex = (textIndex + 1) % textArray.length;
                setTimeout(type, 300);
            }
        }
        type();
    }

    // Stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    function animateStats() {
        if (statsAnimated || statNumbers.length === 0) return;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) return;
            let current = 0;
            const increment = target / 50;
            function updateCounter() {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }
            updateCounter();
        });
        statsAnimated = true;
    }
    const aboutSection = document.querySelector('#about');
    function checkStats() {
        if (aboutSection && !statsAnimated && window.scrollY + window.innerHeight > aboutSection.offsetTop + 100) {
            animateStats();
        }
    }
    window.addEventListener('scroll', checkStats);
    checkStats();

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    if (filterBtns.length && projects.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                projects.forEach(proj => {
                    if (filter === 'all' || proj.getAttribute('data-category') === filter) {
                        proj.style.display = 'block';
                    } else {
                        proj.style.display = 'none';
                    }
                });
            });
        });
    }

    // Back to top
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) backBtn.classList.add('show');
            else backBtn.classList.remove('show');
        });
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact form
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMessage');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            if (name && email && message) {
                if (formMsg) formMsg.innerHTML = '<p style="color:#4ecdc4;">✅ Message sent! I\'ll reply soon.</p>';
                form.reset();
                setTimeout(() => { if (formMsg) formMsg.innerHTML = ''; }, 4000);
            } else {
                if (formMsg) formMsg.innerHTML = '<p style="color:#ff6b6b;">❌ Please fill all required fields.</p>';
                setTimeout(() => { if (formMsg) formMsg.innerHTML = ''; }, 3000);
            }
        });
    }

    // Active nav on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
});