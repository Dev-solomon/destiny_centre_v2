const playButton = document.getElementById('playButton');
const audioOverlay = document.getElementById('audioOverlay');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const downloadBtn = document.getElementById('downloadBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const timeDisplay = document.getElementById('timeDisplay');
const speedSelector = document.getElementById('speedSelector');
const audioControls = document.getElementById('audioControls');
const sermonAudio = document.getElementById("sermonAudio");

let controlsTimeout;
let isDragging = false;

// Play button click
playButton.addEventListener('click', () => {
    audioOverlay.style.display = 'none';
    audioPlayer.style.display = 'block';
    sermonAudio.style.display = 'none'; // keep hidden
    sermonAudio.play();
});

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (sermonAudio.paused) {
        sermonAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        sermonAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Download functionality
downloadBtn.addEventListener('click', () => {
  const audioSrc = sermonAudio.querySelector('source').src || sermonAudio.src;
  
  if (!audioSrc) {
    alert("No audio available to download.");
    return;
  }

  // Extract file name from URL (fallback to 'sermon.mp3' if none)
  const fileName = audioSrc.split('/').pop().split('?')[0] || 'sermon.mp3';

  const link = document.createElement('a');
  link.href = audioSrc;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Progress bar functionality
sermonAudio.addEventListener('timeupdate', () => {
    const progress = (sermonAudio.currentTime / sermonAudio.duration) * 100;
    progressBar.style.width = progress + '%';
    
    // Update time display
    const currentHours  = Math.floor(sermonAudio.currentTime / 3600);
    const currentMinutes = Math.floor((sermonAudio.currentTime % 3600) / 60);
    const currentSeconds = Math.floor(sermonAudio.currentTime % 60);

    const durationHours = Math.floor(sermonAudio.duration / 3600);
    const durationMinutes = Math.floor((sermonAudio.duration % 3600) / 60);
    const durationSeconds = Math.floor(sermonAudio.duration % 60);
    
     // Format: HH:MM:SS or MM:SS if less than 1 hour
    const format = (h, m, s) => 
        (h > 0 ? `${h}:` : '') +
        `${m.toString().padStart(2, '0')}:` +
        `${s.toString().padStart(2, '0')}`;

    timeDisplay.textContent = `${format(currentHours, currentMinutes, currentSeconds)} / ${format(durationHours, durationMinutes, durationSeconds)}`;
});

// When audio ends, show overlay + reset play button
sermonAudio.addEventListener('ended', () => {
    audioOverlay.style.display = 'flex'; // show overlay again
    audioPlayer.style.display = 'none';
});

// Progress bar click
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    sermonAudio.currentTime = percentage * sermonAudio.duration;
});

// Start dragging
progressContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  updateProgressByDrag(e);
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateProgressByDrag(e);
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Touch support
progressContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  updateProgressByDrag(e.touches[0]);
});

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    updateProgressByDrag(e.touches[0]);
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

// Helper function
function updateProgressByDrag(e) {
  const rect = progressContainer.getBoundingClientRect();
  let posX = e.clientX - rect.left;
  posX = Math.max(0, Math.min(posX, rect.width)); // clamp within bar
  const percentage = posX / rect.width;
  progressBar.style.width = (percentage * 100) + "%";
  sermonAudio.currentTime = percentage * sermonAudio.duration;
}

// Speed selector
speedSelector.addEventListener('change', () => {
    sermonAudio.playbackRate = parseFloat(speedSelector.value);
});

// Auto-hide controls
function showControls() {
    audioControls.style.opacity = '1';
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
        if (!sermonAudio.paused) {
            audioControls.style.opacity = '0';
        }
    }, 3000);
}

audioPlayer.addEventListener('mousemove', showControls);
audioPlayer.addEventListener('click', showControls);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (audioPlayer.style.display === 'block') {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                playPauseBtn.click();
                break;
            case 'ArrowLeft':
                sermonAudio.currentTime -= 10;
                break;
            case 'ArrowRight':
                sermonAudio.currentTime += 10;
                break;
        }
    }
});

// Initialize controls opacity
audioControls.style.opacity = '1';
