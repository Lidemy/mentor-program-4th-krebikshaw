/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase */
let channelLimit = 20; // 設定顯示的直播數量
const gameLimit = 5; // 設定顯示的遊戲數量
let currentGame; // 紀錄當前顯示的遊戲名稱
const games = [];

function setGames(data) {
  for (let i = 0; i < data.top.length; i++) {
    games.push(data.top[i].game.name);
  }
  for (let i = 0; i < games.length; i++) {
    document.querySelector(`.channel__list input[data-value="${i}"]`).setAttribute('value', `${games[i]}`);
  }
  getLiveStream(games[0], channelLimit);
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

/* 取得排名前 n 個最受歡迎的遊戲名稱 */
function getTopGames(n) {
  const topGamesUrl = `https://api.twitch.tv/kraken/games/top?limit=${n}`;
  sendRequest(topGamesUrl);
}

/* 取得某遊戲排名前 n 名的直播頻道 */
function getLiveStream(name, n, language) {
  currentGame = name;
  let liveStreamUrl;
  if (language) {
    liveStreamUrl = `https://api.twitch.tv/kraken/streams?game=${name}&limit=${n}&language=${language}`;
  } else {
    liveStreamUrl = `https://api.twitch.tv/kraken/streams?game=${name}&limit=${n}`;
  }
  sendRequest(liveStreamUrl);
}

function sendRequest(url) {
  const request = new XMLHttpRequest();
  const clientId = 't1i56f8yeobnh6vqwymu1jo3tkhtlp';

  request.open('GET', url);

  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', clientId);


  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.response);
      } catch (err) {
        console.log(err);
      }
      if (data.top) setGames(data);
      if (data.streams) setStreams(data);
    } else {
      alert('There was a problem with the request.');
    }
  };

  request.onerror = () => {
    console.log('** An error occurred during the transaction');
  };

  request.send();
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

document.querySelector('.main__inner').addEventListener('click', (e) => {
  if (e.target.getAttribute('class') === 'btn__chinese') {
    channelLimit = 20;
    getLiveStream(currentGame, channelLimit, 'zh');
  }
});

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.getAttribute('class') === 'reload') {
    window.location.reload();
  }
});

/*
request 遊戲名稱 response 直播頻道
實況頻道名稱：streams[0].channel.name
實況頻道頭貼：streams[0].channel.logo
實況頻道背景：streams[0].channel.profile_banner
實況主名稱：streams[0].channel.display_name
觀看人數：streams[0].viewers
直播畫面背景：streams[0].preview.medium
直播連結：streams[0].channel.url
*/
