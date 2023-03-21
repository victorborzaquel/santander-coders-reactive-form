const form = new Form($('#name'), $('#email'), $('#password'), $('#password2'));
const formValues = new Form();

const $submit = $('button[type=submit]');
const $reset = $('button[type=reset]');
const $formControls = $$('.form-control');

const validate = {
  validator(type, message, validator) {
    formValues[type] = form[type].value;

    const span = $(`span[for=${type}]`);
  
    if (!validator()) {
      span.innerHTML = message;
      return false;
    }
  
    span.innerHTML = "";
    return true;
  },
  all: () => {
    return validate.name() 
      && validate.email() 
      && validate.password() 
      && validate.password2();
  },
  name: () => validate.validator(
    'name',
    'Name requires 4-30 characters',
    () => /^[a-zA-Z ]{4,30}$/.test(form.name.value)
  ),
  email: () => validate.validator(
    'email',
    'Email requires a valid email address',
    () => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)
  ),
  password: () => validate.validator(
    'password',
    'Password requires 6-20 characters, at least one uppercase letter, one lowercase letter and one number',
    () => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(form.password.value)
  ),
  password2: () => validate.validator(
    'password2',
    'Passwords do not match',
    () => form.password.value === form.password2.value
  )
}

$formControls.forEach(control => {
  const input = control.querySelector('input');
  const label = control.querySelector('label');

  $on(input, 'focus', () => {
    label.classList.add('focused');
  });

  $on(input, 'blur', () => {
    if (input.value === '') {
      label.classList.remove('focused');
    }
  });

  $on(input, 'input', () => {
    $submit.removeAttribute('disabled');

    switch (input.id) {
      case 'name':
        validate.name();
        break;
      case 'email':
        validate.email();
        break;
      case 'password':
        validate.password();
      case 'password2':
        validate.password2();
        break;
    }

    console.clear();
    console.log(formValues);
  });
});

$on($reset, 'click', (e) => {
  e.preventDefault();

  clearFormData();
});


$on($submit, 'click', (e) => {
  e.preventDefault();

  let isValid = true;

  $formControls.forEach(control => {
    const input = control.querySelector('input');
    const span = control.querySelector('span');

    if (input.value === '') {
      span.innerHTML = 'This field is required';
      isValid = false;
    }
  });

  if (!isValid || !validate.all()) {
    $submit.setAttribute('disabled', true);
    return;
  }

    const user = new User(
      form.name.value, 
      form.email.value, 
      form.password.value
    );

    console.clear();
    console.log('User created:');
    console.log(user);

    clearFormData();
});

function clearFormData() {
  $submit.removeAttribute('disabled');
  
  $formControls.forEach(control => {
    control.querySelector('input').value = '';
    control.querySelector('span').innerHTML = '';
    control.querySelector('label.focused')?.classList.remove('focused');
  });
}
