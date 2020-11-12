let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const addTitle = document.querySelector('.add-title');
const addText = document.querySelector('.add-text');
const cancelButton = document.querySelector('.cancel-button')
const modalNewPost = document.querySelector('.modal-newpost')
const close = document.querySelector(".close");
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const menuNav = document.querySelector('.menu-nav');
const buttonNewPost = document.querySelector('.button-new-post');
const userAvatar = document.querySelector('.user-avatar');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-login');
const postWrapper = document.querySelector('.posts')
const exit = document.querySelector('.iconpower');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoUrl = document.querySelector('.edit-photo');

function validEmail(str) {
  const regEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
  return regEmail.test(str);
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
    if (validEmail(email) && validPassword(password)) {
      const user = this.getUser(email);
      if (user && user.password === password) {
        this.autorizedUser(user)
        handler();
      } else {
        alert('Пользователь с такими данными не найден')

        emailInput.classList.add('error');
        passwordInput.classList.add('error');
      }
    } else {
      alert('Проверте логин и пароль');
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (validEmail(email) && validPassword(password)) {
      if (!this.getUser(email) && email.trim() && password.trim()) {
        const user = { email, password, displayName: email.substring(0, email.indexOf('@')) };
        listUsers.push(user);
        this.autorizedUser(user);
        handler();
      }
      else {
        alert('Пользователь с таким email уже зарегестрирован')

        emailInput.classList.add('error');
        passwordInput.classList.add('error');
      }
    } else {
      alert('Проверте логин и пароль');
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
    }
  },
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
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
    buttonNewPost.style.display = ''
    userNameElem.textContent = user.displayName;
    userAvatar.src = user.photo ? user.photo : userAvatar.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    menuNav.style.display = 'none';
    buttonNewPost.style.display = 'none'
  }
}

const setPosts = {
  allPosts: [
    {
      title: 'Как написать бред за 5 минут',
      text: 'Бред преследования может выражаться в форме бреда отравления, притеснения, но наиболее частая его разновидность у пожилых — это так называемый бред ущерба, проявляющий обычно идеями воровства. Чаще всего бред ущерба возникает после 60–65 лет, хотя встречается и у более молодых (в 45–55 лет).Есть мнение, что некоторые категории людей, страдающих медленно прогрессирующими хроническими психическими заболеваниями, также склонны к развитию маломасштабного бреда. Вступая в зрелый или пожилой возраст, они легко могут формировать бред ущерба, воровства или иного преследования, который отличается относительной сложностью и необычностью: например, для них ущерб — это не просто пропажа вещей, а скорее их подмена или порча.Почему стареющая психика охотнее строит маломасштабные бредовые конструкции, до сих пор не очень ясно. Есть гипотеза, что в ней, как и во всем организме, происходят приспособительные изменения и она, отдаляясь от беспокойной внешней среды, компенсаторно сосредотачивается на том, что ближе, конкретнее, понятнее. Мы видим, что пожилой ограничивает свои контакты и становится менее активным.Все, что у него остается, — это он сам, его окружение, его ближайшая среда.И бред, формирующийся в этих условиях, приобретает малый размах.',
      tags: ['свежее', 'подписка', 'сумашедший', 'поравпсихушку'],
      author: 'eliza@mail.ru',
      date: '11.11.2020, 20:54:00',
      like: '15',
      comments: '9',
    },
    {
      title: 'Тут может быть ваша реклама',
      text: 'Таким образом укрепление и развитие структуры требуют от нас анализа форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же консультация с широким активом способствует подготовки и реализации новых   предложений. Равным образом новая модель организационной деятельности позволяет оценить значение модели развития.Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке существенных финансовых и административных условий.Таким образом рамки и место обучения кадров в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.Повседневная практика показывает, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки форм развития.Товарищи! новая модель организационной деятельности требуют определения и уточнения форм развития.Задача организации, в особенности же постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач.Повседневная практика показывает, что дальнейшее развитие различных форм деятельности требуют определения и уточнения соответствующий условий активизации.',
      tags: ['свежее', 'ёмоё', 'Hot', 'news', 'новое'],
      author: 'shadow@inbox.ru',
      date: '01.11.2020, 10:54:00',
      like: '55',
      comments: '19',
    },
  ]
}

const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPosts.forEach(({ title, text, date, like, comments, tags, author }) => {

    postsHTML += `
    <section class=post>
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
              <p class="post-text">${text}</p>
    <div class="tags">
      ${tags.map(tags => `<a href="#" class="tag">#${tags}</a>`).join(' ')}
    </div >
  </div >
  <div class="post-footer">
    <div class="post-buttons">
      <button class="post-button likes">
        <svg width="19" height="20" class="icon icon-like">
          <use xlink:href="img/icons.svg#like"></use>
        </svg>
        <span class="likes-counter">${like}</span>
      </button>
      <button class="post-button comments">
        <svg width="21" height="21" class="icon icon-comment">
          <use xlink:href="img/icons.svg#comment"></use>
        </svg>
        <span class="comments-counter">${comments}</span>
      </button>
      <button class="post-button save">
        <svg width="19" height="19" class="icon icon-save">
          <use xlink:href="img/icons.svg#save"></use>
        </svg>
      </button >
  <button class="post-button share">
    <svg width="17" height="19" class="icon icon-share">
      <use xlink:href="img/icons.svg#share"></use>
        </svg>
      </button >
    </div >
  <div class="post-author">
    <div class="author-about">
      <a href="user" class="author-username">${author}</a>
      <span class="post-time">${date}</span>
    </div>
    <a href="#" class="author-link"><img src="img/avatar.jpg" alt="avatar" class="author-avatar"></a>
    </div>
  </div>
</section >
  `;
  })

  postWrapper.innerHTML = postsHTML;
};

function toggleModal() {
  modalNewPost.classList.toggle('visible');
  modalNewPost.style.display = ('flex');
  if (modalNewPost.classList.contains('visible')) {
    disabledScroll();
  }
  else {
    modalNewPost.style.display = ('');
    enabledScroll();
  };
};


const init = () => {

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    toggleModal();
  });
  close.addEventListener('click', event => {
    event.preventDefault();
    toggleModal();
  });
  cancelButton.addEventListener('click', event => {
    event.preventDefault();
    toggleModal();
  })


  exit.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);

  });
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener('click', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoUrl.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });
  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
  });
  showAllPosts();
  toggleAuthDom();
}


document.addEventListener('DOMContentLoaded', init)


