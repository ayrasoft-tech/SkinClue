document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-value');
    
    if(counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2200;
        const startTime = performance.now();
        
        // Easing function for smooth deceleration
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const current = Math.ceil(easedProgress * target);
            
            if (progress < 1) {
                counter.innerText = current + '+';
                requestAnimationFrame(updateCounter);
            } else {
                // Final display
                if (target === 98) {
                    counter.innerText = target + '%';
                } else {
                    counter.innerText = target + '+';
                }
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
