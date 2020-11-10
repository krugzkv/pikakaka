let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
  emailInput.classList.remove('error');
  passwordInput.classList.remove('error');
})
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const menuNav = document.querySelector('.menu-nav')

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-login');

const exit = document.querySelector('.iconpower');

function validName(str) {
  const regName = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
  return regName.test(str);
}
function validPassword(str) {
  const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/
  return regPassword.test(str);
}

const listUsers = [
  {
    id: '01',
    email: 'eliza@mail.ru',
    password: '12345qaZ',
    displayName: 'Liza'
  },
  {
    id: '02',
    email: 'shadow@inbox.ru',
    password: '123456qaZ',
    displayName: 'Krugz'
  }
];
const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (validName(emailInput.value), validPassword(passwordInput.value)) {
      const user = this.getUser(email);
      if (user && user.password === password) {
        this.autorizedUser(user)
        handler();
        emailInput.length = 0;
      } else {
        alert('Пользователь с такими данными не найден')
        emailInput.value = '';
        passwordInput.value = '';
        emailInput.classList.add('error');
        passwordInput.classList.add('error');
      }
    } else {
      alert('Проверте логин и пароль');
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
      emailInput.value = '';
      passwordInput.value = '';
    }
  },
  logOut() {

  },
  signUp(email, password, handler) {
    if (validName(emailInput.value), validPassword(passwordInput.value)) {
      if (!this.getUser(email)) {
        const user = { email, password, displayName: email.substring(0, email.indexOf('@')) };
        listUsers.push(user);
        this.autorizedUser(user);
        handler();
      }
      else {
        alert('Пользователь с таким email уже зарегестрирован')
        emailInput.value = '';
        passwordInput.value = '';
        emailInput.classList.add('error');
        passwordInput.classList.add('error');
      }
    } else {
      alert('Проверте логин и пароль');
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
      emailInput.value = '';
      passwordInput.value = '';
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  autorizedUser(user) {
    this.user = user;

  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    menuNav.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    menuNav.style.display = 'none';
  }

}

exit.addEventListener('click', event => {
  event.preventDefault();
  loginElem.style.display = '';
  userElem.style.display = 'none';
  menuNav.style.display = 'none';
  emailInput.value = '';
  passwordInput.value = '';
  emailInput.classList.remove('error');
  passwordInput.classList.remove('error');
});
loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);

});

loginSignup.addEventListener('click', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);

});
toggleAuthDom();