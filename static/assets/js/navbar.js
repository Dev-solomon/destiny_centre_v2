class NavbarComponent {
  constructor() {
    this.isExpanded = false;
    this.init();
  }

  async init() {
    await this.loadNavbar();
    this.cacheElements();
    this.setupEventListeners();
    this.setActiveLink();
  }

  // Load navbar partial
  async loadNavbar() {
    try {
      const response = await fetch("partials/navbar.xml");
      const html = await response.text();
      document.getElementById("navbar").innerHTML = html;
    } catch (error) {
      console.error("Error loading navbar:", error);
    }
  }

  // Cache elements after navbar loads
  cacheElements() {
    this.navToggle = document.getElementById("navToggle");
    this.navExtended = document.getElementById("navExtended");
    this.toggleIcon = document.getElementById("toggleIcon");
    this.toggleText = document.getElementById("toggleText");
    this.navLinks = document.querySelectorAll(
      'a[href^="#"], .nav-link, .nav-item-mobile'
    );
  }

  setupEventListeners() {
    if (this.navToggle && this.navExtended) {
      this.navToggle.addEventListener("click", () => this.toggleMenu());
    }

    // Close extended nav when clicking a mobile item
    document
      .querySelectorAll(".nav-extended .nav-item-mobile")
      .forEach((item) => {
        item.addEventListener("click", () => this.closeMenu());
      });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".bottom-nav") && this.isExpanded) {
        this.closeMenu();
      }
    });

    // highlight "Sermons" link for both sermons.html & sermondetails.html
    const path = window.location.pathname;

    if (path.includes("sermons.html") || path.includes("sermonDetails.html")) {
    document.querySelectorAll("#nav-sermons").forEach(link => link.classList.add("active"));
}


    // Smooth scroll + active state for internal links
    this.navLinks.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        if (anchor.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute(".nav-link"));
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
            this.setActive(anchor);
          }
        }
      });
    });
  
    // Highlight active section on scroll
    window.addEventListener("scroll", () => this.highlightOnScroll());
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    this.navExtended.classList.toggle("show", this.isExpanded);
    this.navToggle.setAttribute("aria-expanded", this.isExpanded);

    if (this.isExpanded) {
      // Inline SVG for close
      this.toggleIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
<path d="M23.0256 12C23.0256 5.9111 18.0895 0.975037 12.0006 0.975037C5.91165 0.975037 0.975586 5.9111 0.975586 12C0.975586 18.089 5.91165 23.025 12.0006 23.025C18.0895 23.025 23.0256 18.089 23.0256 12Z"
 stroke="currentColor" stroke-opacity="0.5" stroke-width="1.8" stroke-miterlimit="10"/>
<path d="M8.25 8.25L15.75 15.75" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.8" stroke-linecap="round"/>
<path d="M15.75 8.25L8.25 15.75" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.8" stroke-linecap="round"/>
</svg>
      `;
      this.toggleText.textContent = "Close";
      this.navExtended.style.maxHeight = this.navExtended.scrollHeight + "px";
    } else {
      // Inline SVG for more
      this.toggleIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9965 12H16.0054" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9955 12H12.0045" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99451 12H8.00349" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      `;
      this.toggleText.textContent = "More";
      this.navExtended.style.maxHeight = "0";
    }
  }

  closeMenu() {
    this.isExpanded = false;
    this.navExtended.classList.remove("show");
    this.navToggle.setAttribute("aria-expanded", false);
    this.navExtended.style.maxHeight = "0";

    // Reset to "More"
    this.toggleIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9965 12H16.0054" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9955 12H12.0045" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99451 12H8.00349" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;
    this.toggleText.textContent = "More";
  }

  setActive(link) {
    this.navLinks.forEach((l) => l.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  setActiveLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const currentHash = window.location.hash;

    document.querySelectorAll(".nav-link, .nav-item-mobile").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentHash || href.includes(currentPage)) {
        link.classList.add("active");
      }
    });
  }

  highlightOnScroll() {
    const scrollPos = window.scrollY + 100;
    this.navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute(".nav-link"));
      if (
        section &&
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        this.setActive(link);
      }
    });
  }
}

// Initialize navbar
document.addEventListener("DOMContentLoaded", () => {
  new NavbarComponent();
});
