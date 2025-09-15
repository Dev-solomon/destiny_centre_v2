        // Video Player Functionality
        const playButton = document.getElementById('playButton');
        const videoOverlay = document.getElementById('videoOverlay');
        const videoPlayer = document.getElementById('videoPlayer');
        const sermonVideo = document.getElementById('sermonVideo');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const timeDisplay = document.getElementById('timeDisplay');
        const speedSelector = document.getElementById('speedSelector');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const videoControls = document.getElementById('videoControls');

        let controlsTimeout;

        // Play button click
        playButton.addEventListener('click', () => {
            videoOverlay.style.display = 'none';
            videoPlayer.style.display = 'block';
            sermonVideo.play();
        });

        // Play/Pause functionality
        playPauseBtn.addEventListener('click', () => {
            if (sermonVideo.paused) {
                sermonVideo.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                sermonVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Video click to play/pause
        sermonVideo.addEventListener('click', () => {
            if (sermonVideo.paused) {
                sermonVideo.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                sermonVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Download functionality
        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = sermonVideo.src;
            link.download = 'The_Power_to_Change_Your_Mind.mp4';
            link.click();
        });

        // Progress bar functionality
        sermonVideo.addEventListener('timeupdate', () => {
            const progress = (sermonVideo.currentTime / sermonVideo.duration) * 100;
            progressBar.style.width = progress + '%';
            
            // Update time display
            const currentMinutes = Math.floor(sermonVideo.currentTime / 60);
            const currentSeconds = Math.floor(sermonVideo.currentTime % 60);
            const durationMinutes = Math.floor(sermonVideo.duration / 60);
            const durationSeconds = Math.floor(sermonVideo.duration % 60);
            
            timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
        });

        // Progress bar click
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            sermonVideo.currentTime = percentage * sermonVideo.duration;
        });

        // Speed selector
        speedSelector.addEventListener('change', () => {
            sermonVideo.playbackRate = parseFloat(speedSelector.value);
        });

        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            } else {
                videoPlayer.requestFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            }
        });

        // Auto-hide controls
        function showControls() {
            videoControls.style.opacity = '1';
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                if (!sermonVideo.paused) {
                    videoControls.style.opacity = '0';
                }
            }, 3000);
        }

        videoPlayer.addEventListener('mousemove', showControls);
        videoPlayer.addEventListener('click', showControls);

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (videoPlayer.style.display === 'block') {
                switch(e.code) {
                    case 'Space':
                        e.preventDefault();
                        playPauseBtn.click();
                        break;
                    case 'ArrowLeft':
                        sermonVideo.currentTime -= 10;
                        break;
                    case 'ArrowRight':
                        sermonVideo.currentTime += 10;
                        break;
                    case 'KeyF':
                        fullscreenBtn.click();
                        break;
                }
            }
        });

        // Initialize controls opacity
        videoControls.style.opacity = '1';
