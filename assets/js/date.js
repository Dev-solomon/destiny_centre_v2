
// Date and Time
class CustomDateTimeInput {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = null;
    this.selectedTime = null;
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    this.init();
  }

  init() {
    this.setupDateInput();
    this.setupTimeInput();
    this.generateTimeOptions();
    this.renderCalendar();
    this.setupEventListeners();
  }

  setupDateInput() {
    const dateInput = document.getElementById("dateInput");
    const dateDropdown = document.getElementById("dateDropdown");

    dateInput.addEventListener("click", () => {
      this.toggleDropdown(dateInput, dateDropdown);
    });
  }

  setupTimeInput() {
    const timeInput = document.getElementById("timeInput");
    const timeDropdown = document.getElementById("timeDropdown");

    timeInput.addEventListener("click", () => {
      this.toggleDropdown(timeInput, timeDropdown);
    });
  }

  generateTimeOptions() {
    const timeDropdown = document.getElementById("timeDropdown");
    const times = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = this.formatTime(hour, minute);
        times.push(timeString);
      }
    }

    timeDropdown.innerHTML = times
      .map(
        (time) =>
          `<div class="dropdown-option" data-time="${time}">${time}</div>`
      )
      .join("");

    timeDropdown.addEventListener("click", (e) => {
      if (e.target.classList.contains("dropdown-option")) {
        this.selectTime(e.target.dataset.time);
      }
    });
  }

  formatTime(hour, minute) {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const dateGrid = document.getElementById("dateGrid");

    monthYear.textContent = `${
      this.months[this.currentDate.getMonth()]
    } ${this.currentDate.getFullYear()}`;

    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    let html = this.days
      .map((day) => `<div class="date-header">${day}</div>`)
      .join("");

    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);

      const isCurrentMonth =
        cellDate.getMonth() === this.currentDate.getMonth();
      const isSelected =
        this.selectedDate &&
        cellDate.toDateString() === this.selectedDate.toDateString();

      const classes = ["date-cell"];
      if (!isCurrentMonth) classes.push("other-month");
      if (isSelected) classes.push("selected");

      html += `<div class="${classes.join(
        " "
      )}" data-date="${cellDate.toISOString()}">${cellDate.getDate()}</div>`;
    }

    dateGrid.innerHTML = html;
  }

  setupEventListeners() {
    document.getElementById("prevMonth").addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });

    document.getElementById("dateGrid").addEventListener("click", (e) => {
      if (e.target.classList.contains("date-cell")) {
        this.selectDate(new Date(e.target.dataset.date));
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".input-group")) {
        this.closeAllDropdowns();
      }
    });
  }

  // ...existing code...
  selectDate(date) {
    this.selectedDate = date;
    const dateInput = document.getElementById("dateInput");
    dateInput.textContent = date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
   
    dateInput.classList.remove("placeholder");
    // Update placeholder-input text
    const placeholder =
      dateInput.parentElement.querySelector(".placeholder-input");
    if (placeholder) {
      placeholder.textContent = ` ${dateInput.textContent}`;
    }
    this.closeDropdown(dateInput, document.getElementById("dateDropdown"));
    this.renderCalendar();
  }

  selectTime(time) {
    this.selectedTime = time;
    const timeInput = document.getElementById("timeInput");
    timeInput.textContent = time;
    timeInput.classList.remove("placeholder");
    // Update placeholder-input text
    const placeholder =
      timeInput.parentElement.querySelector(".placeholder-input");
    if (placeholder) {
      placeholder.textContent = `${time}`;
    }
    this.closeDropdown(timeInput, document.getElementById("timeDropdown"));
  }
  // ...existing code...
  toggleDropdown(input, dropdown) {
    const isOpen = dropdown.classList.contains("show");
    this.closeAllDropdowns();

    if (!isOpen) {
      input.classList.add("active");
      dropdown.classList.add("show");
    }
  }

  closeDropdown(input, dropdown) {
    input.classList.remove("active");
    dropdown.classList.remove("show");
  }

  closeAllDropdowns() {
    document.querySelectorAll(".custom-input").forEach((input) => {
      input.classList.remove("active");
    });
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  }
}

// Initialize the custom date time input
document.addEventListener("DOMContentLoaded", () => {
  new CustomDateTimeInput();
});
