document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle with Backdrop Overlay & Scroll Lock
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    const openMenu = () => {
        if (!hamburger || !navMenu) return;
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('nav-open');
    };

    const closeMenu = () => {
        if (!hamburger || !navMenu) return;
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    };

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu && navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link, .nav-btn').forEach(n => {
        n.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // 2. Sticky Navbar Effect on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (navbar) {
            if (currentScrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, { passive: true });

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
        const scrollY = window.scrollY + navHeight + 60;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // 4. FAQ Accordion Logic (Touch optimized)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current item
            const answer = item.querySelector('.faq-answer');
            if (!isOpen) {
                item.classList.add('active');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                if (answer) answer.style.maxHeight = null;
            }
        });
    });

    // 5. Smooth scroll for anchor links with dynamic header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Publications toggle function (global scope)
function togglePublications() {
    const expanded = document.getElementById('pubExpanded');
    const toggle = document.getElementById('pubToggle');
    if (!expanded || !toggle) return;

    if (expanded.classList.contains('active')) {
        expanded.classList.remove('active');
        toggle.innerHTML = 'View All Publications <i class="ph ph-caret-down" aria-hidden="true"></i>';
    } else {
        expanded.classList.add('active');
        toggle.innerHTML = 'Show Less <i class="ph ph-caret-up" aria-hidden="true"></i>';
    }
}
