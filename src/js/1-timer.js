import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMinutes: document.querySelector('span[data-minutes]'),
  timerSeconds: document.querySelector('span[data-seconds]'),
};

let userSelectedDate;

elements.startBtn.disabled = true;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] - currentDate > 0) {
      elements.startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      elements.startBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        // close: false,
        // progressBar: false,
        // overlay: true,
        // overlayClose: true,
        // overlayColor: 'rgba(0, 0, 0, 0.3)',
      });
    }
  },
};

const fp = flatpickr(elements.input, flatpickrOptions);

elements.startBtn.addEventListener('click', startTimer);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startTimer() {
  elements.input.disabled = true;
  elements.startBtn.disabled = true;
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = userSelectedDate - currentTime;
    if (elapsedTime <= 0) {
      clearInterval(timerId);
      elements.input.disabled = false;
      elements.startBtn.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(elapsedTime);
    elements.timerDays.textContent = `${addLeadingZero(days)}`;
    elements.timerHours.textContent = `${addLeadingZero(hours)}`;
    elements.timerMinutes.textContent = `${addLeadingZero(minutes)}`;
    elements.timerSeconds.textContent = `${addLeadingZero(seconds)}`;
  }, 1000);
}