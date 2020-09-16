/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase */
let channelLimit = 20; // 設定顯示的直播數量
const gameLimit = 5; // 設定顯示的遊戲數量
let currentGame; // 紀錄當前顯示的遊戲名稱
const games = [];

function setGames(data) {
  return new Promise((resolve) => {
    for (let i = 0; i < data.top.length; i++) {
      games.push(data.top[i].game.name);
    }
    for (let i = 0; i < games.length; i++) {
      document.querySelector(`.channel__list input[data-value="${i}"]`).setAttribute('value', `${games[i]}`);
    }
    resolve(games[0]);
  });
}

function setStreams(data) {
  document.querySelector('.main__inner').innerHTML = `
    <h2 class="main__inner__title">熱門直播精選</h2><input type="button" class="btn__chinese" value="中文直播頻道">
  `;
  let i = 0; // 紀錄目前的直播編號
  for (let j = 0; j < (i / 3 + 1); j++) {
    const element__column = document.createElement('div');
    element__column.classList.add(`column${j}`);
    document.querySelector('.main__inner').appendChild(element__column);
    for (let k = 1; k <= 3; k++) {
      if (i >= data.streams.length) break;
      const element__row = document.createElement('div');
      element__row.classList.add(`row${i}`);
      element__row.innerHTML = `
        <a href="${data.streams[i].channel.url}" target="_blank">
          <img class="banner" src="${data.streams[i].preview.medium}">
          <p><img src="./photo/eye.svg">${data.streams[i].viewers}</p>
          <div class="avatar">
            <img src="${data.streams[i].channel.logo}">
            <div>
              <h4>${data.streams[i].channel.status}</h4>
              <p>${data.streams[i].channel.display_name}</p> 
            </div>
          </div></a>
      `;
      document.querySelector(`.column${j}`).appendChild(element__row);
      i++;
    }
  }
}

function getTopGames(n) {
  const topGamesUrl = `https://api.twitch.tv/kraken/games/top?limit=${n}`;
  fetch(topGamesUrl, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 't1i56f8yeobnh6vqwymu1jo3tkhtlp',
    })
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => setGames(response))
    .then(name => getLiveStream(name, channelLimit));
}

function getLiveStream(name, n) {
  currentGame = name;
  const liveStreamUrl = `https://api.twitch.tv/kraken/streams?game=${name}&limit=${n}`;
  fetch(liveStreamUrl, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 't1i56f8yeobnh6vqwymu1jo3tkhtlp',
    })
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => setStreams(response));
}

getTopGames(gameLimit);

document.querySelector('.channel__list').addEventListener('click', (e) => {
  channelLimit = 20;
  const num = e.target.getAttribute('data-value');
  getLiveStream(games[num], channelLimit);
});

document.querySelector('.btn__more').addEventListener('click', () => {
  channelLimit += 20;
  getLiveStream(currentGame, channelLimit);
});

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.getAttribute('class') === 'reload') {
    window.location.reload();
  }
});
