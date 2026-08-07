document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    if(revealElements.length === 0) return;

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
