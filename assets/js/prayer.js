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











// Form submission for all forms
// === Date & Time Inputs === //
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const dateDropdown = document.getElementById("dateDropdown");
const timeDropdown = document.getElementById("timeDropdown");

// Handle date selection using event delegation on the parent dropdown
if (dateDropdown && dateInput) {
  dateDropdown.addEventListener("click", function (e) {
    console.log("Clicked inside date dropdown", e.target);

    // Find the clicked day element (check multiple possible selectors)
    let dayElement = e.target;

    // If clicked element isn't the day, check if parent is
    if (!dayElement.classList.contains("day") && !dayElement.dataset.date) {
      dayElement = e.target.closest(".day");
    }

    if (dayElement && dayElement.dataset && dayElement.dataset.date) {
      // console.log("✅ Date selected:", dayElement.dataset.date);

      // Convert ISO string to user-friendly format
      const rawDate = dayElement.dataset.date.split("T")[0]; // e.g., "2025-10-08"
      const date = new Date(rawDate);

      // With day name: "Wednesday, October 8, 2025"
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      dateInput.value = formattedDate; // e.g., "October 8, 2025"
      console.log("Formatted date:", formattedDate);

      // Clear error
      const errorEl = document.querySelector('[data-error-for="date"]');
      if (errorEl) errorEl.textContent = "";

      // Close dropdown
      // dateDropdown.style.display = "none";
    } else {
      console.log("❌ No date found on clicked element");
    }
  });
}

// Handle time selection using event delegation on the parent dropdown
if (timeDropdown && timeInput) {
  timeDropdown.addEventListener("click", function (e) {
    console.log("Clicked inside time dropdown", e.target);

    // Find the clicked time element (check multiple possible selectors)
    let timeElement = e.target;

    // If clicked element isn't the time-option, check if parent is
    if (
      !timeElement.classList.contains("time-option") &&
      !timeElement.dataset.time
    ) {
      timeElement = e.target.closest(".time-option");
    }

    if (timeElement && timeElement.dataset && timeElement.dataset.time) {
      console.log("✅ Time selected:", timeElement.dataset.time);
      timeInput.value = timeElement.dataset.time;

      // Clear error
      const errorEl = document.querySelector('[data-error-for="time"]');
      if (errorEl) errorEl.textContent = "";

      // Close dropdown
      timeDropdown.style.display = "none";
    } else {
      console.log("❌ No time found on clicked element");
    }
  });
}

// Form submission for all forms
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("=== FORM SUBMISSION STARTED ===");

    let isValid = true;
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear old errors
    form
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    // Validate each input
    form.querySelectorAll("input, textarea").forEach((input) => {
      const value = input.value.trim();
      const errorEl = form.querySelector(`[data-error-for="${input.name}"]`);

      if (!errorEl) return; // Skip if no error span exists

      console.log(`Checking ${input.name}: "${value}"`);

      if (!value) {
        if (input.name === "date") {
          errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Please select a date.`;
          console.log("❌ Date is empty");
        } else if (input.name === "time") {
          errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Please select a preferred time.`;
          console.log("❌ Time is empty");
        } else {
          errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${input.name} is required.`;
          console.log(`❌ ${input.name} is empty`);
        }
        isValid = false;
      } else if (input.name === "firstname" && !namePattern.test(value)) {
        errorEl.innerHTML = `<i class="bi bi-x-circle-fill"></i> First name must contain only letters.`;
        isValid = false;
      } else if (input.name === "lastname" && !namePattern.test(value)) {
        errorEl.innerHTML = `<i class="bi bi-x-circle-fill"></i> Last name must contain only letters.`;
        isValid = false;
      } else if (input.name === "email" && !emailPattern.test(value)) {
        errorEl.innerHTML = `<i class="bi bi-x-circle-fill"></i> Invalid email address.`;
        isValid = false;
      } else {
        console.log(`✅ ${input.name} is valid`);
      }
    });

    console.log(
      "=== VALIDATION RESULT:",
      isValid ? "PASSED ✅" : "FAILED ❌",
      "==="
    );

    if (isValid) {
      showSuccessMessage(form.id);
      if (dateInput) {
        dateInput.value = "";
        dateInput.textContent = "";
        dateInput.classList.add("placeholder");
        const placeholder =
          dateInput.parentElement.querySelector(".placeholder-input");
        if (placeholder) {
          placeholder.style.display = "block"; // Show it again
          placeholder.textContent = "Select Date";
        }
      }

      if (timeInput) {
        timeInput.value = "";
        timeInput.textContent = "";
        timeInput.classList.add("placeholder");
        const placeholder =
          timeInput.parentElement.querySelector(".placeholder-input");
        if (placeholder) {
          placeholder.style.display = "block"; // Show it again
          placeholder.textContent = "Enter your preferred time...";
        }
      }
      form.reset();
    }
  });
});

// Show success message
function showSuccessMessage(formId) {
  const modal = document.getElementById("uploadSuccessMessage");
  const title = document.getElementById("success-header");
  const para = document.getElementById("success-para");

  if (formId === "prayerRequestForm") {
    title.textContent = "Prayer Request Sent!";
    para.textContent = "We'll be praying for you 🙏.";
  } else if (formId === "scheduleMeetingForm") {
    title.textContent = "Meeting Scheduled!";
    para.textContent = "We'll contact you soon with confirmation.";
  } else if (formId === "testimonyForm") {
    title.textContent = "Testimony Shared!";
    para.textContent = "Thanks for encouraging others with your story.";
  }

  modal.classList.add("show");
  setTimeout(() => modal.classList.remove("show"), 3000);
}

// Debug: Log when script loads
console.log("📝 Form validation script loaded");
console.log("Date input:", dateInput);
console.log("Time input:", timeInput);
console.log("Date dropdown:", dateDropdown);
console.log("Time dropdown:", timeDropdown);
