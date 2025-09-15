// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const sermonItems = document.querySelectorAll(".sermon-item");

  sermonItems.forEach((item) => {
    const title = item.querySelector(".sermon-title").textContent.toLowerCase();
    const pastor = item
      .querySelector(".sermon-pastor")
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || pastor.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Paginations
class CustomPagination {
    constructor() {
        this.currentPage = 1;
        this.maxPage = 1;
        this.totalPages = 10; // Set your total pages
        
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.pageNumbers = document.getElementById('pageNumbers');
        
        this.bindEvents();
        this.updateButtons();
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToPrevious();
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToNext();
        });
    }

    goToNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            
            // Add new page number if going beyond current max
            if (this.currentPage > this.maxPage) {
                this.maxPage = this.currentPage;
                this.addPageNumber(this.currentPage);
            }
            
            this.updateActiveState();
            this.updateButtons();
        }
    }

    goToPrevious() {
        if (this.currentPage > 1) {
            // Remove highest page number when going back
            if (this.currentPage === this.maxPage && this.maxPage > 1) {
                this.removePageNumber(this.maxPage);
                this.maxPage--;
            }
            
            this.currentPage--;
            this.updateActiveState();
            this.updateButtons();
        }
    }

    addPageNumber(pageNum) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.className = 'page-number';
        pageLink.setAttribute('data-page', pageNum);
        pageLink.textContent = pageNum;
        
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToPage(parseInt(pageNum));
        });
        
        this.pageNumbers.appendChild(pageLink);
    }

    removePageNumber(pageNum) {
        const pageLink = this.pageNumbers.querySelector(`[data-page="${pageNum}"]`);
        if (pageLink) {
            pageLink.remove();
        }
    }

    updateActiveState() {
        const allPageNumbers = this.pageNumbers.querySelectorAll('.page-number');
        allPageNumbers.forEach(link => link.classList.remove('active'));
        
        const currentPageLink = this.pageNumbers.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    }

    updateButtons() {
        this.prevBtn.classList.toggle('disabled', this.currentPage <= 1);
        this.nextBtn.classList.toggle('disabled', this.currentPage >= this.totalPages);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new CustomPagination();
});

// Reels Section

// Device detection and display
function updateDeviceInfo() {
  const width = window.innerWidth;

  if (width <= 575) {
    console.log(`Mobile: ${width}px (Horizontal Scroll)`);
  } else if (width <= 991) {
    console.log(`Tablet: ${width}px (Grid Layout)`);
  } else {
    console.log(`Desktop: ${width}px (Horizontal Scroll)`);
  }
}

// Intersection Observer for scroll-in animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 100px 0px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateDeviceInfo();

  // Observe all image containers
  const imageContainers = document.querySelectorAll(".image-container");
  imageContainers.forEach((container) => {
    observer.observe(container);
  });

  // Add smooth scrolling for mouse wheel on desktop
  const gallery = document.getElementById("imageGallery");
  gallery.addEventListener("wheel", (e) => {
    if (window.innerWidth >= 992 || window.innerWidth <= 575) {
      e.preventDefault();
      gallery.scrollLeft += e.deltaY;
    }
  });
});

// Update device info on resize
window.addEventListener("resize", updateDeviceInfo);

// Optional: Add touch/swipe navigation for better mobile experience
let isDown = false;
let startX;
let scrollLeft;

const gallery = document.getElementById("imageGallery");

gallery.addEventListener("mousedown", (e) => {
  if (window.innerWidth >= 992 || window.innerWidth <= 575) {
    isDown = true;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  }
});

gallery.addEventListener("mouseleave", () => {
  isDown = false;
});

gallery.addEventListener("mouseup", () => {
  isDown = false;
});

gallery.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 2;
  gallery.scrollLeft = scrollLeft - walk;
});
