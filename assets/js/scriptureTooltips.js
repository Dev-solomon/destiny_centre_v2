document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.scripture-ref[data-tooltip]').forEach(ref => {
        // Remove any existing tooltip
        let oldTooltip = ref.querySelector('.scripture-tooltip');
        if (oldTooltip) oldTooltip.remove();

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'scripture-tooltip';
        tooltip.textContent = ref.getAttribute('data-tooltip');
        ref.appendChild(tooltip);

        // Optional: Keyboard accessibility
        ref.setAttribute('tabindex', '0');
        ref.addEventListener('focus', () => tooltip.style.opacity = 1);
        ref.addEventListener('blur', () => tooltip.style.opacity = 0);
    });
});