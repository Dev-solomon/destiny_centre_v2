// Copy to clipboard
document.querySelectorAll(".give-card-details-copy button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const accountNumber = btn
      .closest(".give-card-bank-info")
      .querySelector("h2").innerText;
    navigator.clipboard.writeText(accountNumber).then(() => {
      // alert(`Copied: ${accountNumber}`);
      showSuccessMessage();
    });
  });
});

// Show success message
function showSuccessMessage() {
  const message = document.getElementById("successMessage");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

// Tab switching
const tabs = document.querySelectorAll(".give-tabs-header button");
const tabContents = document.querySelectorAll(".give-cards");

// hide all except first
tabContents.forEach((content, index) => {
  if (index !== 0) content.classList.add("hidden");
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // remove "active" from all tabs
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // hide all contents
    tabContents.forEach((content) => content.classList.add("hidden"));
    // show matching one
    tabContents[index].classList.remove("hidden");
  });
});



// Form submission
document.getElementById("sendMessageForm").addEventListener("submit", (e) => {
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
  sendMessageBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i>  Form has been submitted`; // ✅ bootstrap icon



  // Reset form
  e.target.reset();

  // Reset button after 3 seconds
  setTimeout(() => {
    sendMessageBtn.style.backgroundColor = "";
    sendMessageBtn.innerHTML = "Send Message";
  }, 3000);
}

});
