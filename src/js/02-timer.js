import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const datePicker = document.querySelector('input[type="text"]');
const startButton = document.querySelector("button[data-start]");
const dayDate = document.querySelector("span[data-days]");
const hourDate = document.querySelector("span[data-hours]");
const minuteDate = document.querySelector("span[data-minutes]");
const secondDate = document.querySelector("span[data-seconds]");

let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const date = new Date();
    if (selectedDate < date) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

startButton.addEventListener("click", () => {
  const timer = setInterval(() => {
    const timeDifference = selectedDate - new Date();
    if (timeDifference < 0) {
      clearInterval(timer);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      dayDate.textContent = addLeadingZero(days);
      hourDate.textContent = addLeadingZero(hours);
      minuteDate.textContent = addLeadingZero(minutes);
      secondDate.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});
