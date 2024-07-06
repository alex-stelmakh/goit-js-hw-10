import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value =>
      iziToast.show({
        title: '✅',
        titleSize: '24px',
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: '#59a10d',
        position: 'topRight',
        timeout: 3000,
        message: value,
      })
    )
    .catch(error =>
      iziToast.show({
        title: '❌',
        titleSize: '24px',
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 3000,
        message: error,
      })
    );
  form.reset();
}