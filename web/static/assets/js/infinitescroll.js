const bannerTrack = document.getElementById("scrollingTextContainer");

// Duplicate content for seamless loop
bannerTrack.innerHTML += bannerTrack.innerHTML;

let position = 0;
const speed = 2; // pixels per frame

function animateBanner() {
  position -= speed;

  // Reset after half width (since we duplicated)
  if (Math.abs(position) >= bannerTrack.scrollWidth / 2) {
    position = 0;
  }

  bannerTrack.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animateBanner);
}

animateBanner();


// Pause on hover
const banner = document.querySelector(".scrolling-banner");
banner.addEventListener("mouseenter", () => {
  isPaused = true;
});
banner.addEventListener("mouseleave", () => {
  isPaused = false;
});
