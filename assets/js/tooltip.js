const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.scripture').forEach(el => {
  el.addEventListener('mouseenter', (e) => {
    tooltip.textContent = el.dataset.passage;
    tooltip.style.display = 'block';
    
    // Position tooltip
    const rect = el.getBoundingClientRect();
    tooltip.style.left = rect.left + window.scrollX + 'px';
    tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight - 8 + 'px';
  });

  el.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});
