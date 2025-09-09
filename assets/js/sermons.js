 // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const sermonItems = document.querySelectorAll('.sermon-item');
            
            sermonItems.forEach(item => {
                const title = item.querySelector('.sermon-title').textContent.toLowerCase();
                const pastor = item.querySelector('.sermon-pastor').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || pastor.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
