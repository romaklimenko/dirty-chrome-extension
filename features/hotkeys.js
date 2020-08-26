// горячие клавиши:
// - H - главная (подписки)
// - U - профиль пользователя
// - M - моё
// - I - инбокс
// - D - черновики
(() => {
  document.body.addEventListener('keydown', (event) => {

    if (event.target.tagName.toUpperCase() === 'TEXTAREA' || event.target.tagName.toUpperCase() === 'INPUT') {
      return;
    }

    if (event.target.attributes['contenteditable']) {
      return;
    }

    switch (event.code) {
      case 'KeyH':
        window.location.href = 'https://d3.ru/';
        break;
      case 'KeyI':
        window.location.href = 'https://d3.ru/my/inbox/';
        break;
      case 'KeyM':
        window.location.href = 'https://d3.ru/my/';
        break;
      case 'KeyD':
        window.location.href = 'https://d3.ru/drafts/';
        break;
      case 'KeyU':
        let username = localStorage['user_login'];

        if (!username) {
          const a = document.querySelector('a.s-menu__button-user-login');
          if (a) {
            username = a.innerText;
          }
        }

        if (username) {
          window.location.href = `https://d3.ru/user/${username}/`;
        }
        break;
      default:
        break;
    }
  });
})();
