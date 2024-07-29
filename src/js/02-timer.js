import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.querySelector('input#datetime-picker');
const start = document.querySelector('button[data-start]');
let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');

start.addEventListener('click', handleStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      start.disabled = false;
    } else {
      start.disabled = true;
      Notiflix.Notify.info('Please choose a date in the future!');
    }
  },
};

const picker = flatpickr(date, options);
start.disabled = true;

function addZero(number) {
  return number.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function handleStart() {
  start.disabled = true;
  let interval = setInterval(() => {
    let count = new Date(date.value) - new Date();
    const ms = convertMs(count);

    days.textContent = addZero(ms.days);
    hours.textContent = addZero(ms.hours);
    minutes.textContent = addZero(ms.minutes);
    seconds.textContent = addZero(ms.seconds);

    if (count < 1000) {
      clearInterval(interval);
    }
  }, 1000);
}
