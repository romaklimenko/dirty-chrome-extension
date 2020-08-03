(async () => {
  const profile = getCurrentProfile();
  const user = getCurrentUser();

  if (profile.toLowerCase() === user.toLowerCase()) {
    return;
  }

  const userNotes = (await getNotes(profile, user)).user_notes;
  let note = userNotes.length > 0 ? userNotes[0].body : '';

  renderNotes(note, await getKarmaVote(user, profile), profile);
})();

// получает заметки от одного пользователя к другому (другой должен быть залогинен)
async function getNotes(from, to) {
  const response = await fetch(`/api/user_notes/?user_login=${to}&author_login=${from}`, {
    method: 'GET',
    headers: {
      'X-Futuware-UID': getCookie('uid'),
      'X-Futuware-SID': getCookie('sid')
    }
  });

  if (!response.ok) {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText
    });
  }

  return await response.json();
}

// голосовал ли пользователь из профиля текущему пользователю в карму?
async function getKarmaVote(user, profile) {
  let page = 1;
  let page_count = 1;

  const params = {
    method: 'GET',
    headers: {
      'X-Futuware-UID': getCookie('uid'),
      'X-Futuware-SID': getCookie('sid')
    }
  };

  while (page <= page_count) {
    const response = await fetch(`https://d3.ru/api/users/${user}/votes/?page=${page}&per_page=210`, params);
    const result = await response.json();

    if (result === null) {
      return 0;
    }

    if (result.page_count) {
      page_count = result.page_count;
    }

    if (result.upvotes) {
      for (let i = 0; i < result.upvotes.length; i++) {
        const vote = result.upvotes[i];
        if (vote.user.login.toLowerCase() === profile.toLowerCase()) {
          return vote.vote;
        }
      }
    }

    if (result.downvotes) {
      for (let i = 0; i < result.downvotes.length; i++) {
        const vote = result.downvotes[i];
        if (vote.user.login.toLowerCase() === profile.toLowerCase()) {
          return vote.vote;
        }
      }
    }

    page++;
  }

  return 0;
}

// определяет пол пользователя
function getGender() {
  if (document.querySelector('.b-profile_stat').innerText.indexOf('Она с нами') > -1) {
    return 'F';
  }
  return 'M';
}

// отображает заметки
function renderNotes(note, karma, profile) {
  const gender = getGender();
  let noteText = '';
  if (note !== null && note.length > 0) {
    noteText = `«${note}»  — ${ gender === 'F' ? 'написала' : 'написал' } ${profile}`;
    if (karma !== 0) {
      noteText += ` и ${ gender === 'F' ? 'поставила' : 'поставил' } в карму ${karma}.`;
    }
    else {
      noteText += '.';
    }
  }
  else {
    if (karma !== 0) {
      noteText += `${ gender === 'F' ? 'Поставила' : 'Поставил' } в карму ${karma}.`;
    }
  }

  const html = `<em style="display: block; min-height: 20px; padding: 5px 2px; margin-top: 7px; max-height: 24px; font-family: Georgia,'Times New Roman',serif;font-size: 15px;">
    ${noteText}
  </em>`;

  const bUserData = document.querySelector('.b-user_name');

  insertAfter(htmlToElement(html), bUserData);
}