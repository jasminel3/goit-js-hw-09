import Notiflix from "notiflix";

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position);
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(position);
      }, delay);
    });
  }
}
const form = document.querySelector(".form");
const firstDelay = document.querySelector(".form input");
const repeatedDelay = document.querySelector('.form input[name="step"]');
const numberOfNotifications = document.querySelector(
  '.form input[name="amount"]'
);
const submitForm = document.querySelector(".form button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let delayValue = parseInt(firstDelay.value);
  let repeatedDelayValue = parseInt(repeatedDelay.value);
  let contorValue = parseInt(numberOfNotifications.value);
  for (let i = 0; i < contorValue; i++) {
    let currentDelay = delayValue + repeatedDelayValue * i;
    createPromise(i, currentDelay)
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i + 1} in ${currentDelay} ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i + 1} in ${currentDelay} ms`
        );
      });
    currentDelay += repeatedDelayValue;
  }
});
