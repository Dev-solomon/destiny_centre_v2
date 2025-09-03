function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  
  elements.forEach(el => {
    const file = el.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error("Failed to fetch " + file);
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute("data-include"); // cleanup
          includeHTML(); // recursive in case of nested includes
        })
        .catch(err => console.error(err));
    }
  });
}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", includeHTML);
