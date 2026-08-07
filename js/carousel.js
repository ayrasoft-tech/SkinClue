document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hero Carousel ---
    const initHeroCarousel = () => {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;
        
        const slides = carousel.querySelectorAll('.hero-slide');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 5000;

        if(slides.length === 0) return;

        // Create indicators
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            if(indicatorsContainer) indicatorsContainer.appendChild(dot);
        });
        
        const indicators = document.querySelectorAll('.indicator');

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            if(indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if(indicators[currentSlide]) indicators[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            goToSlide(currentSlide - 1);
        };

        // Auto play
        const startSlide = () => {
            slideInterval = setInterval(nextSlide, intervalTime);
        };

        const stopSlide = () => {
            clearInterval(slideInterval);
        };

        const nextBtn = carousel.querySelector('.carousel-control.next');
        const prevBtn = carousel.querySelector('.carousel-control.prev');

        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlide(); startSlide(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlide(); startSlide(); });

        carousel.addEventListener('mouseenter', stopSlide);
        carousel.addEventListener('mouseleave', startSlide);

        // Touch Swipe
        let touchstartX = 0;
        let touchendX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carousel.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        const handleSwipe = () => {
            if (touchendX < touchstartX - 50) { nextSlide(); stopSlide(); startSlide(); }
            if (touchendX > touchstartX + 50) { prevSlide(); stopSlide(); startSlide(); }
        }

        // Initialize first slide
        slides[0].classList.add('active');
        startSlide();
    };


    // --- Before/After Slider ---
    const initBeforeAfter = () => {
        const sliders = document.querySelectorAll('.ba-slider');
        sliders.forEach(slider => {
            const handle = slider.querySelector('.ba-handle');
            const topImage = slider.querySelector('.ba-top-image');
            
            if(!handle || !topImage) return;
            
            let isDragging = false;
            
            const move = (e) => {
                if (!isDragging) return;
                
                let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                const rect = slider.getBoundingClientRect();
                let x = clientX - rect.left;
                
                // Boundaries
                if (x < 0) x = 0;
                if (x > rect.width) x = rect.width;
                
                let percentage = (x / rect.width) * 100;
                
                handle.style.left = `${percentage}%`;
                topImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            };

            // Mouse Events
            handle.addEventListener('mousedown', () => isDragging = true);
            window.addEventListener('mouseup', () => isDragging = false);
            window.addEventListener('mousemove', move);

            // Touch Events
            handle.addEventListener('touchstart', () => isDragging = true, {passive: true});
            window.addEventListener('touchend', () => isDragging = false);
            window.addEventListener('touchmove', move, {passive: false});
            
            // Set initial position
            handle.style.left = '50%';
            topImage.style.clipPath = 'inset(0 50% 0 0)';
        });
    };

    initHeroCarousel();
    initBeforeAfter();
});
