document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hero Carousel ---
    const initHeroCarousel = () => {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;
        
        const slides = carousel.querySelectorAll('.hero-slide');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 6000;

        if (slides.length === 0) return;

        // Clear any existing indicators first
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = '';
        }

        // Create indicators
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.classList.add('indicator');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.setAttribute('aria-selected', 'false');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopSlide();
                startSlide();
            });
            if (indicatorsContainer) indicatorsContainer.appendChild(dot);
        });
        
        const indicators = carousel.querySelectorAll('.indicator');

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.remove('active');
                indicators[currentSlide].setAttribute('aria-selected', 'false');
            }
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
                indicators[currentSlide].setAttribute('aria-selected', 'true');
            }
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            goToSlide(currentSlide - 1);
        };

        // Auto play
        const startSlide = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        };

        const stopSlide = () => {
            clearInterval(slideInterval);
        };

        const nextBtn = carousel.querySelector('.carousel-control.next');
        const prevBtn = carousel.querySelector('.carousel-control.prev');

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlide(); startSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlide(); startSlide(); });

        carousel.addEventListener('mouseenter', stopSlide);
        carousel.addEventListener('mouseleave', startSlide);

        // Touch Swipe (Mobile Optimized)
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
            touchstartY = e.changedTouches[0].screenY;
        }, { passive: true });

        carousel.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const diffX = touchendX - touchstartX;
            const diffY = touchendY - touchstartY;
            // Ensure horizontal gesture dominates vertical scroll
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                if (diffX < 0) {
                    nextSlide();
                    stopSlide();
                    startSlide();
                } else {
                    prevSlide();
                    stopSlide();
                    startSlide();
                }
            }
        };

        // Initialize first slide
        slides[0].classList.add('active');
        startSlide();
    };


    // --- Before/After Slider (Touch & Pointer Event Optimized) ---
    const initBeforeAfter = () => {
        const sliders = document.querySelectorAll('.ba-slider');
        sliders.forEach(slider => {
            const handle = slider.querySelector('.ba-handle');
            const topImage = slider.querySelector('.ba-top-image');
            
            if (!handle || !topImage) return;
            
            let isDragging = false;
            
            const move = (e) => {
                if (!isDragging) return;
                
                if (e.cancelable && e.type.includes('touch')) {
                    e.preventDefault();
                }

                const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                const rect = slider.getBoundingClientRect();
                let x = clientX - rect.left;
                
                // Boundaries
                if (x < 0) x = 0;
                if (x > rect.width) x = rect.width;
                
                const percentage = (x / rect.width) * 100;
                
                handle.style.left = `${percentage}%`;
                topImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            };

            const startDrag = (e) => {
                isDragging = true;
                slider.classList.add('dragging');
            };

            const stopDrag = () => {
                isDragging = false;
                slider.classList.remove('dragging');
            };

            // Mouse Events
            handle.addEventListener('mousedown', startDrag);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('mousemove', move);

            // Touch Events (passive: false on move to allow preventDefault during horizontal drag)
            handle.addEventListener('touchstart', startDrag, { passive: true });
            window.addEventListener('touchend', stopDrag, { passive: true });
            window.addEventListener('touchcancel', stopDrag, { passive: true });
            window.addEventListener('touchmove', move, { passive: false });
            
            // Set initial position
            handle.style.left = '50%';
            topImage.style.clipPath = 'inset(0 50% 0 0)';
        });
    };

    initHeroCarousel();
    initBeforeAfter();
});
