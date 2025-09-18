document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".prayer-request-card");
  const forms = document.querySelectorAll(".prayer-request-form");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      cards.forEach((c) => c.classList.remove("active"));

      // Hide all forms
      forms.forEach((f) => (f.style.display = "none"));

      // Mark clicked card as active
      card.classList.add("active");

      // Show the respective form
      const targetId = card.getAttribute("href"); // e.g. #prayer-request
      const targetForm = document.querySelector(targetId);
      if (targetForm) {
        targetForm.style.display = "block";
      }
    });
  });

  // Optional: show only the first form on page load
  forms.forEach((f, index) => {
    f.style.display = index === 0 ? "block" : "none";
  });
});
