document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.getElementById("tooltip");

  document.querySelectorAll(".scripture-ref").forEach(el => {
    el.addEventListener("mouseenter", () => {
      const text = el.getAttribute("data-text");
      tooltip.textContent = text;
      tooltip.style.display = "block";

      // position tooltip directly above scripture
      // const rect = el.getBoundingClientRect();
      // tooltip.style.top = window.scrollY + rect.top - 8 + "px";
      // tooltip.style.left = window.scrollX + rect.left + rect.width / 2 + "px";
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
});
