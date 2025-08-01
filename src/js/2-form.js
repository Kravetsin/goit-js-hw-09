const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

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
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
