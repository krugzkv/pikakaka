// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyMO9iTXFmwFBhk-4XyvWjT8sAnkCchvA",
  authDomain: "pikakaka-2f3a9.firebaseapp.com",
  databaseURL: "https://pikakaka-2f3a9.firebaseio.com",
  projectId: "pikakaka-2f3a9",
  storageBucket: "pikakaka-2f3a9.appspot.com",
  messagingSenderId: "581249099527",
  appId: "1:581249099527:web:a2245484a04797724ec7a2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
const addPostElem = document.querySelector('.modal-addpost');
const loginForget = document.querySelector('.login-forget');
const DEFAULT_PHOTO = userAvatar.src;

function validEmail(str) {
  const regEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
  return regEmail.test(str);
}
function validPassword(str) {
  const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/
  return regPassword.test(str);
}
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // форматирование
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'прямо сейчас';
  } else if (diffMin < 1) {
    return `${diffSec} сек. назад`
  } else if (diffHour < 1) {
    return `${diffMin} мин. назад`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
function toggleModal() {
  modalNewPost.classList.toggle('visible');
  if (modalNewPost.classList.contains('visible')) {
    disabledScroll();
  }
  else {
    modalNewPost.style.display = ('');
    enabledScroll();
  };
  modalNewPost.addEventListener('click', function (event) {
    if (event.target.classList.contains('visible')) {
      toggleModal();
    };
  });
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    menuNav.style.display = '';
    buttonNewPost.classList.add('visible');
    userNameElem.textContent = user.displayName;
    userAvatar.src = user.photoURL || DEFAULT_PHOTO;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    menuNav.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
  }
}
const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) {
        handler();
      };
    })
  },
  logIn(email, password, handler) {
    if (!email) {
      alert('Проверте логин');
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then()
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/wrong-password') {
          console.log(errMessage)
          alert('Неверный пароль')
        } else if (errCode === 'auth/user-not-found') {
          console.log(errMessage)
          alert('Пользователь не найден')
        } else {
          alert(errMessage)
        }
        console.log(err);
      });
    handler();
  },
  logOut() {
    firebase.auth().signOut()
      .then()
      .catch();
  },
  signUp(email, password, handler) {
    if (!validEmail(email) && !validPassword(password)) {
      alert('Проверте логин и пароль');
    }
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.editUser(email.substring(0, email.indexOf('@')), null, handler);
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/weak-password') {
          console.log(errMessage)
          alert('Слабый пароль')
        } else if (errCode === 'auth/email-already-in-use') {
          console.log(errMessage)
          alert('Этот email уже использоваться')
        } else {
          alert(errMessage)
        }
        console.log(err);
      });
  },
  editUser(displayName, photoURL, handler) {
    const user = firebase.auth().currentUser;
    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },
  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Письмо отправлено')
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/user-not-found') {
          console.log(errMessage)
          alert('Пользователь не найден')
        } else {
          alert(errMessage)
        }
        console.log(err);
      })
  }
};
const setPosts = {
  allPosts: [],
  addPost(title, text, tags, handler) {
    const user = firebase.auth().currentUser;
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      date: formatDate(new Date),
      like: 0,
      comments: 0,
    })
    firebase.database().ref('post').set(this.allPosts)
      .then(() => this.getPosts(handler))
  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
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
            ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}
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
      <a href="user" class="author-username">${author.displayName}</a>
      <span class="post-time">${date}</span>
    </div>
    <a href="#" class="author-link"><img src="${author.photo}" alt="avatar" class="author-avatar"></a>
    </div>
  </div>
</section >
  `;
  })
  postWrapper.innerHTML = postsHTML;
};
const init = () => {
  loginForget.addEventListener('click', event => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
  })
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
    addPostElem.reset();
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
  });
  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }
    if (text.value.length < 50) {
      alert('Слишком короткий текст');
      return;
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    toggleModal();
    menu.classList.toggle('visible');
    addPostElem.reset();
  });
}
document.addEventListener('DOMContentLoaded', init)


