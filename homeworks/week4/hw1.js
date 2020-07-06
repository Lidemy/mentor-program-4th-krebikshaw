/* eslint-disable no-plusplus, no-use-before-define, no-shadow */
const request = require('request');

const URL = 'https://lidemy-book-store.herokuapp.com/books?_limit=10';

request.get(URL, (error, response, body) => {
  if (error) {
    console.log(error);
    return;
  }

  let content;
  try {
    content = JSON.parse(body);
  } catch (e) {
    console.log(e);
  }

  for (let i = 0; i < content.length; i++) {
    console.log(content[i].id, content[i].name);
  }
});
