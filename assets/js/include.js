
// navbarComponents.js
class NavbarComponent {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadNavbar();
        this.setupEventListeners();
        this.setActiveLink();
    }

    async loadNavbar() {
        try {
            const response = await fetch('/partials/navbar.html');
            const navbarHTML = await response.text();
            
            // Insert navbar at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    setupEventListeners() {
        // Mobile nav toggle functionality
        const navToggle = document.getElementById('navToggle');
        const navExtended = document.getElementById('navExtended');
        
        if (navToggle && navExtended) {
            navToggle.addEventListener('click', () => {
                navExtended.classList.toggle('show');
                const isExpanded = navExtended.classList.contains('show');
                navToggle.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link, .nav-item-mobile')) {
                this.handleNavigation(e);
            }
        });
    }

    handleNavigation(e) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link, .nav-item-mobile').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        e.target.classList.add('active');
        
        // Close mobile menu if open
        const navExtended = document.getElementById('navExtended');
        if (navExtended) {
            navExtended.classList.remove('show');
        }
    }

    setActiveLink() {
        // Set active link based on current page or hash
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash;
        
        document.querySelectorAll('.nav-link, .nav-item-mobile').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentHash || href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavbarComponent();
});