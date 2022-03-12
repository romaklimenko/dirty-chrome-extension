(() => {
  const sorrowUrl = 'https://storage.googleapis.com/dirty-public/logo_main_retina_black.png';
  const jsLogo = document.getElementById('js-logo');
  if (jsLogo) {
    jsLogo.style.backgroundImage = `url(${sorrowUrl})`;
  }

  const domainLogo = document.getElementsByClassName('s-header__domain-logo');

  if (domainLogo.length > 0) {
    domainLogo[0].style.backgroundImage = `url(${sorrowUrl})`;
  }
})();
