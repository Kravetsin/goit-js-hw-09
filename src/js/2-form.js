const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback__input');
const textarea = document.querySelector('.feedback__textarea');
const submit = document.querySelector('.feedback__button');

const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', event => {
  localStorage.setItem(STORAGE_KEY, event.target.value);
});

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
      const parsed = JSON.parse(saved);
      
    Object.entries(parsed).forEach(([key, value]) => {
      formData[key] = value;
      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });
  }
});

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value;
    saveToLocalStorage();
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get('email');
  localStorage.setItem('email', email);
  console.log('Email:', email);

  const message = formData.get('message');
  console.log('Message:', message);
  localStorage.setItem('message', message);

  localStorage.removeItem(STORAGE_KEY);

  form.reset();
});


