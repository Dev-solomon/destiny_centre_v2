  const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        const leadershipImage = document.getElementById('leadership-image');

  // Reuse existing lightbox
document.querySelectorAll('.leadership-image img').forEach(img => {
    img.addEventListener('click', () => {
        openLightbox(img.src, img.alt || 'Leadership Image');
        lightboxImage.classList.add('leadership-size')
    });
});


        // Lightbox functionality
        function openLightbox(src, alt) {
            lightboxImage.src = src;
            lightboxImage.alt = alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

// leadershipImage.addEventListener('click', () => openLightbox(item.src, item.title));