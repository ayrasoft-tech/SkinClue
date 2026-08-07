document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-value');
    
    if(counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 16ms per frame (approx 60fps)
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + '+';
                if(target === 98) counter.innerText = target + '%'; // Exception for percentage
            }
        };
        
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Only animate once
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
