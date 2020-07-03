/* eslint-disable no-plusplus, no-use-before-define, no-shadow */
const request = require('request');

const URL = 'https://lidemy-book-store.herokuapp.com/books?limit=10';

request.get(URL, (error, response, body) => {
  const content = JSON.parse(body);
  for (let i = 0; i < content.length; i++) {
    console.log(`${content[i].id} ${content[i].name}`);
  }
});
