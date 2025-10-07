// Select all badge elements
const badges = document.querySelectorAll('.get-involved-badge');

badges.forEach(badge => {
  // Get the SVG path elements directly
  const upperPaths = badge.querySelector('.get-involved-badge-upper').querySelectorAll('path');
  const lowerPaths = badge.querySelector('.get-involved-badge-lower').querySelectorAll('path');
  
  // Store original colors
  const upperOriginalColor = 'white';
  const lowerOriginalColor = '#1B1C1E';
  
  // Function to update badge colors based on rotation
  function updateBadgeColors() {
    // Get the current rotation from the animation
    const computedStyle = getComputedStyle(badge);
    const transform = computedStyle.transform;
    
    if (transform && transform !== 'none') {
      // Extract rotation angle from matrix
      const values = transform.split('(')[1].split(')')[0].split(',');
      const a = parseFloat(values[0]);
      const b = parseFloat(values[1]);
      const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      
      // Normalize angle to 0-360 range
      const normalizedAngle = ((angle % 360) + 360) % 360;
      
      // Check if rotation is between 90-270 degrees (flipped state)
      const isFlipped = normalizedAngle > 90 && normalizedAngle < 270;
      
      if (isFlipped) {
        // When flipped, switch colors
        // Upper badge (white) becomes black
        upperPaths.forEach(path => path.setAttribute('fill', '#1B1C1E'));
        // Lower badge (black) becomes white
        lowerPaths.forEach(path => path.setAttribute('fill', 'white'));
      } else {
        // When not flipped, use original colors
        upperPaths.forEach(path => path.setAttribute('fill', upperOriginalColor));
        lowerPaths.forEach(path => path.setAttribute('fill', lowerOriginalColor));
      }
    }
    
    requestAnimationFrame(updateBadgeColors);
  }
  
  // Start the color update loop
  updateBadgeColors();
});