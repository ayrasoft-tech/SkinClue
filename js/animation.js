document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    if(revealElements.length === 0) return;

    const revealOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Create subtle gold particles in hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = Math.random() * 30 + '%';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            hero.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 10000);
        };

        // Create particles periodically
        for (let i = 0; i < 8; i++) {
            setTimeout(createParticle, i * 600);
        }
        setInterval(() => {
            createParticle();
        }, 2000);
    }
});
