class NavbarComponent {
  constructor() {
    this.isExpanded = false;
    this.init();
  }

  async init() {
    //await this.loadNavbar();
    this.cacheElements();
    this.setupEventListeners();
    this.setActiveLink();
  }

  //  Load navbar partial
//   async loadNavbar() {
//     try {
//       const response = await fetch("./navbars.html");
//       const html = await response.text();
//       console.log("Navbar target:", document.getElementById("navbar"));
// console.log("Fetched HTML:", html);

//       document.getElementById("navbar").innerHTML = html;
//     } catch (error) {
//       console.error("Error loading navbar:", error);
//     }
//   }

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
    

    // Smooth scroll + active state for internal links
    this.navLinks.forEach((anchor) => {
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("#")) {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
            history.replaceState(null, "", href); // update hash without jumping
            this.setActive(anchor);
          }
        });
      }
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
      this.navExtended.style.zIndex = "60";
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
      this.navExtended.style.zIndex = "0";
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

  // ...existing code...
  setActiveLink() {
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    const currentHash = window.location.hash || "";
    const routeSegment = (currentPath.split("/")[1] || "").toLowerCase();

    // Special-case routes that should activate the "Sermons" nav item for sermons and sermon-details page
    if (routeSegment === "sermon-details" || routeSegment === "sermon_details") {
      document.querySelectorAll("#nav-sermons").forEach((l) => l.classList.add("active"));
      // still continue to ensure other nav items are cleared
      document.querySelectorAll(".nav-link, .nav-item-mobile").forEach((link) => {
        if (!link.matches("#nav-sermons")) link.classList.remove("active");
      });
      return;
    }

    document.querySelectorAll(".nav-link, .nav-item-mobile").forEach((link) => {
      const href = (link.getAttribute("href") || "").trim();
      if (!href) return;

      // hash links
      if (href.startsWith("#")) {
        if (href === currentHash) link.classList.add("active");
        else link.classList.remove("active");
        return;
      }

      // normalize link path
      let linkPath;
      try {
        const url = new URL(href, window.location.origin + window.location.pathname);
        linkPath = url.pathname.replace(/\/$/, "");
      } catch {
        linkPath = href.replace(/\/$/, "");
      }

      // compare last segment (remove .html)
      const currentLast = currentPath.split("/").pop().replace(/\.html$/, "");
      const linkLast = linkPath.split("/").pop().replace(/\.html$/, "");

      if (linkPath === currentPath || linkLast === currentLast) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
// ...existing code...

  highlightOnScroll() {
    const scrollPos = window.scrollY + 120; // adjusted offset
    this.navLinks.forEach((link) => {
      const href = (link.getAttribute("href") || "").trim();
      if (!href || !href.startsWith("#")) return;
      const section = document.querySelector('nav-links');
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
  const navbar = new NavbarComponent();
});
