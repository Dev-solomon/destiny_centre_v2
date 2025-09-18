 // Sample gallery data
        const galleryData = [
            {
                src: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800',
                title: 'Sunday Worship',
                description: 'Community gathering in praise',
                date: '15 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image2.png',
                title: 'Youth Conference',
                description: 'Young hearts seeking God',
                date: '08 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image3.png',
                title: 'Baptism Service',
                description: 'New life in Christ',
                date: '12 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image4.png',
                title: 'Community Outreach',
                description: 'Serving our neighborhood',
                date: '15 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image5.png',
                title: 'Praise & Worship',
                description: 'Hearts lifted in song',
                date: '12 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image6.png',
                title: 'Prayer Meeting',
                description: 'United in prayer',
                date: '12 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image7.png',
                title: 'Bible Study',
                description: 'Growing in the Word',
                date: '13 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image8.png',
                title: 'Fellowship Dinner',
                description: 'Breaking bread together',
                date: '14 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image9.png',
                title: 'Mission Trip',
                description: 'Spreading love globally',
                date: '10 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image10.png',
                title: 'Community Outreach',
                description: 'Spreading love globally',
                date: '10 June 2025'
            },
            {
                src: '/images/gallery-images/gallery-image11.png',
                title: 'Mission Trip',
                description: 'Spreading love globally',
                date: '10 June 2025'
            }
        ];

        // DOM Elements
        const galleryGrid = document.getElementById('galleryGrid');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        
        
        // Populate gallery
        function populateGallery() {
            galleryGrid.innerHTML = '';
            galleryData.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="gallery-date">${item.date}</div>
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;
                galleryItem.addEventListener('click', () => openLightbox(item.src, item.title));
                galleryGrid.appendChild(galleryItem);
            });
        }

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

        // File upload functionality
        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        // Here you would typically upload to your server
                        console.log('File ready for upload:', file.name);
                        // For demo, we'll add it to the gallery
                        const newItem = {
                            src: e.target.result,
                            title: 'User Upload',
                            description: file.name,
                            date: new Date().toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })
                        };
                        galleryData.unshift(newItem);
                        populateGallery();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Form submission
        document.getElementById('shareForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for sharing! Your photos will be reviewed and added to our gallery.');
            e.target.reset();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Initialize gallery
        populateGallery();

        // Lazy loading intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        img.style.opacity = '1';
                        img.style.transform = 'translateY(0)';
                    }, 100);
                    imageObserver.unobserve(img);
                }
            });
        }, observerOptions);

        // Observe all gallery images for lazy loading animation
        setTimeout(() => {
            document.querySelectorAll('.gallery-item img').forEach(img => {
                imageObserver.observe(img);
            });
        }, 100);