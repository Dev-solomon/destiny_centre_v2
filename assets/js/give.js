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
            const message = document.getElementById('successMessage');
            message.classList.add('show');
            
            setTimeout(() => {
                message.classList.remove('show');
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
