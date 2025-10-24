// Sample sermons data
const sermonsData = [
  { id:1, title: "While You Were Waiting", pastor: "Pastor Victor Flemming", image: "sermons-image2.png", audio: 1, },
  { id:2, title: "The Weapons Are In The House", pastor: "Pastor Robert Madu", image: "sermons-image3.png", audio: 2, },
  { id:3, title: "The Power to Change Your Mind", pastor: "Bishop T.D Jakes", image: "sermons-image1.png", audio: 1, },
  { id:4, title: "This is My Bible", pastor: "Bishop Champion Timothy", image: "sermons-image5.png", audio: 3, },
  { id:5, title: "This Might be My God Moment", pastor: "Pastor Steven Furtick ", image: "sermons-image6.png", audio: 1, },
  { id:6, title: "All Those Times You Didn't See", pastor: "Pastor Steven Furtick", image: "sermons-image4.png", audio: 2, },
  { id:7, title: "Love never fails", pastor: "Pastor Grace", image: "sermons-image2.png", audio: 1, },
  { id:8, title: "The power of prayer", pastor: "Bishop T.D Jakes", image: "sermons-image1.png", audio: 2, },
  { id:9, title: "Hope in Christ", pastor: "Pastor Michael", image: "sermons-image1.png", audio: 1, },
  { id:10, title: "Renewed strength", pastor: "Pastor Jennifer", image: "sermons-image2.png", audio: 3, },
];

const ITEMS_PER_PAGE = 6;

class CustomPagination {
    constructor() {
        this.currentPage = 1;
        this.totalPages = Math.ceil(sermonsData.length / ITEMS_PER_PAGE);

        // DOM elements
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.pageNumbers = document.getElementById('pageNumbers');
        this.contentArea = document.getElementById('contentArea');

        // Check if all elements exist
        if (!this.prevBtn || !this.nextBtn || !this.pageNumbers || !this.contentArea) {
            console.error('Required pagination elements not found');
            return;
        }

        this.init();
    }

    init() {
        this.renderPageNumbers();
        this.bindEvents();
        this.updateContent();
        this.updateButtons();
    }

    bindEvents() {
        // Previous button
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToPrevious();
        });

        // Next button
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToNext();
        });

        // Page number clicks (event delegation)
        this.pageNumbers.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-number')) {
                e.preventDefault();
                const pageNum = parseInt(e.target.dataset.page);
                this.goToPage(pageNum);
            }
        });
    }

    renderPageNumbers() {
        this.pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= this.totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = 'page-number';
            pageLink.setAttribute('data-page', i);
            pageLink.textContent = i;
           
            
             if (i === this.currentPage) {
                pageLink.classList.add('active');
            }
              this.pageNumbers.appendChild(pageLink);
            

        }
    }

    goToNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateAll();
        }
    }

    goToPrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateAll();
        }
    }

    goToPage(pageNum) {
        if (pageNum >= 1 && pageNum <= this.totalPages && pageNum !== this.currentPage) {
            this.currentPage = pageNum;
            this.updateAll();
        }
    }

    updateAll() {
        this.updateActiveState();
        this.updateButtons();
        this.updateContent();
        this.scrollToTop();
    }

    updateActiveState() {
        const allPageNumbers = this.pageNumbers.querySelectorAll('.page-number');
        allPageNumbers.forEach(link => {
            const pageNum = parseInt(link.dataset.page);
            link.classList.toggle('active', pageNum === this.currentPage);
        });
    }

    updateButtons() {
        this.prevBtn.classList.toggle('disabled', this.currentPage <= 1);
        this.nextBtn.classList.toggle('disabled', this.currentPage >= this.totalPages);
        
        // Disable buttons
        this.prevBtn.disabled = this.currentPage <= 1;
        this.nextBtn.disabled = this.currentPage >= this.totalPages;
         
    }

    updateContent() {
        const content = this.getContentForPage(this.currentPage);
        
        // Add fade out effect
        this.contentArea.style.opacity = '0';
        this.contentArea.style.transform = ""
        
        setTimeout(() => {
            this.contentArea.innerHTML = content || '<div class="no-content">No sermons found</div>';
            this.attachDetailHandlers();
            // Fade in
            this.contentArea.style.opacity = '1';
        }, 200);
    }

    getContentForPage(pageNum) {
        const startIdx = (pageNum - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        const pageItems = sermonsData.slice(startIdx, endIdx);
        
        if (pageItems.length === 0) {
            return '<div class="no-content">No sermons available</div>';
        }

        // Generate HTML for all items on this page
        const sermonsHTML = pageItems.map(sermon => {
            const detailUrl = `/sermon-details/${sermon.id}`; // correct Flask route
            return `
            <div class="sermon-card fade-in" data-sermon-id="${sermon.id}">
                <div class="sermon">
                    <div class="sermon-image">
                        <a href="${detailUrl}">
                            <img src="../static/images/${sermon.image}" alt="${sermon.title}">
                        </a>
                    </div>
                    <div class="audio-hours">${sermon.audio}hr 16min</div>
                </div>
                <div class="sermon-content">
                    <h5>${sermon.title}</h5>
                    <p>${sermon.pastor}</p>
                    <button class="button about-button" data-sermon-id="${sermon.id}">
                        Listen Now
                    </button>
                </div>
            </div>
        `}).join('');

        return `
            <div class="sermons-cards-spacing">
                <div class="sermons-cards">
                    ${sermonsHTML}
                </div>
            </div>
        `;
    }
    // new helper: attach click handlers for detail navigation
    attachDetailHandlers() {
        // buttons
        this.contentArea.querySelectorAll('.about-button').forEach(btn => {
            btn.removeEventListener('click', btn._navHandler);
            const id = btn.getAttribute('data-sermon-id');
            const handler = () => { window.location.href = `/sermon-details/${id}`; };
            btn._navHandler = handler;
            btn.addEventListener('click', handler);
        });

        // images/links already have correct hrefs; no extra handling needed
    }
    scrollToTop() {
        // Smooth scroll to content area
        if (this.contentArea) {
            this.contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Public method to refresh pagination (useful if data changes)
    refresh() {
        this.totalPages = Math.ceil(sermonsData.length / ITEMS_PER_PAGE);
        this.currentPage = 1;
        this.renderPageNumbers();
        this.updateContent();
        this.updateButtons();
    }

    // Public method to get current page info
    getPageInfo() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            itemsPerPage: ITEMS_PER_PAGE,
            totalItems: sermonsData.length
        };
    }
}

// Initialize pagination when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Store instance globally if you need to access it later
    window.paginationInstance = new CustomPagination();
});
