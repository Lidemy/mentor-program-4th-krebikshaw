/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring */
const request = require('request');

const userId = 't1i56f8yeobnh6vqwymu1jo3tkhtlp';
const baseUrl = 'https://api.twitch.tv/kraken/games/top';
const num = 10;

request({
  method: 'GET',
  url: `${baseUrl}?limit=${num}`,
  headers: {
    'Client-ID': userId,
    Authorization: 'Bearer cfabdegwdoklmawdzdo98xt2fo512y',
    Accept: 'application/vnd.twitchtv.v5+json',
  },
},
(error, response, body) => {
  if (error) {
    console.log(error);
  }

  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    console.log(e);
  }

  for (let i = 0; i < data.top.length; i++) {
    console.log(data.top[i].viewers, data.top[i].game.name);
  }
});
