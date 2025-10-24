// Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const direction = entry.target.dataset.direction;
                    const delay = index * 150; // Stagger animation
                    
                    setTimeout(() => {
                        entry.target.classList.add(`animate-from-${direction}`);
                    }, delay);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all service boxes
        document.querySelectorAll('.service-box').forEach(box => {
            observer.observe(box);
        });