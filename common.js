// имя пользователя, в профиле которого мы находимся
function getCurrentProfile() {
  const el = document.querySelector('.b-user_name-link');
  if (!el) {
    return null;
  }
  return el.innerText;
}

// имя пользователя, который сейчас залогинен
function getCurrentUser() {
  return document.querySelectorAll('.l-header .c_user')[0].innerText;
}

// создает HTMLElemen из строки HTML
function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

// вставляет элемент после указанного
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// получает cookie по имени https://www.w3schools.com/js/js_cookies.asp
function getCookie(cookieName) {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');
  for(let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}