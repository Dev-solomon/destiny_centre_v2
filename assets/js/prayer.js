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


// Form submission or prayer request
document.getElementById("prayerRequestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const textarea = document.getElementById("message").value.trim();

  // Regex patterns
  const namePattern = /^[A-Za-z]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate firstname
  if (!firstname) {
    document.getElementById('firstnameError').innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> First name is required.`;
    isValid = false;
  } else if (!namePattern.test(firstname)) {
    document.getElementById('firstnameError').innerHTML = `<i class="bi bi-x-circle-fill"></i> First name must contain only letters.`;

    isValid = false;
  }

  // Validate lastname
  if (!lastname) {
    document.getElementById('lastnameError').innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Last name is required.`;
    isValid = false;
  } else if (!namePattern.test(lastname)) {
    document.getElementById('lastnameError').innerHTML = `<i class="bi bi-x-circle-fill"></i> Last name must contain only letters.`;
    isValid = false;
  }

  
  // Validate email
  if (!email) {
    document.getElementById('emailError').innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Email is required.`;
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById('emailError').innerHTML = `<i class="bi bi-x-circle-fill"></i> Please enter a valid email address.`;
    isValid = false;
  }

  if(!textarea) {
    document.getElementById("messageError").innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> Please write a word to us.`;
    isValid = false 
  }

  // ✅ Only run this if all fields are valid
  if (isValid) {
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  sendMessageBtn.style.backgroundColor = "green";
  sendMessageBtn.style.color = "white";
  sendMessageBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i>  Form submitted`; // ✅ bootstrap icon

  showSuccessMessage();


  // Reset form
  e.target.reset();

  // Reset button after 3 seconds
  setTimeout(() => {
    sendMessageBtn.style.backgroundColor = "";
    sendMessageBtn.innerHTML = "Send Message";
  }, 3000);
}

});

// Show success message
function showSuccessMessage() {
    document.getElementById("success-header").textContent = "Well Done!";
    document.getElementById("success-para").textContent = "Form Submitted Successfully.";

  const message = document.getElementById("uploadSuccessMessage");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

