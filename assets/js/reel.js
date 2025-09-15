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
