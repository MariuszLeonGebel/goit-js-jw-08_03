import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';

function projectStart() {
  if (localStorage.getItem(STORAGE_KEY) !== null) {
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY))
    email.value = storageData.email;
    message.value = storageData.message;
  }
}

projectStart();

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