const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show Error Message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  formControl.classList.add('error');

  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show Success Outline
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';

  formControl.classList.add('success');
};

//  Get Field Name
const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check Require Fields
const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check Input Length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check Email
const checkEmail = input => {
  const isValid = String(input.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!isValid) {
    showError(input, 'Email is not Valid');
  } else {
    showSuccess(input);
  }
};

// Check Passwords Match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

// Event Listeners
const handleSubmit = e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);

  checkEmail(email);

  checkPasswordsMatch(password, password2);
};

form.addEventListener('submit', handleSubmit);
