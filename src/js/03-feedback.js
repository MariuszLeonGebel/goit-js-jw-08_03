import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';

const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY))
console.log(storageData);
if (storageData !== null) {
  email.value = storageData.email;
  message.value = storageData.message;
}

const setFormData = (e) => {
  e.preventDefault();
  const {
    elements: {
      email,
      message
    },
  } = form;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      email: email.value,
      message: message.value,
    }),
  );
}

form.addEventListener('input', throttle(setFormData, 500));

const sendData = (e) => {
  e.preventDefault();
  console.log(`E-mail: ${email.value}, Message: ${message.value}`);
  email.value = "";
  message.value = "";
  email.focus();
}

form.addEventListener('submit', sendData);