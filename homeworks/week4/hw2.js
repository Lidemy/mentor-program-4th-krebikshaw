/* eslint-disable no-plusplus, no-use-before-define, no-shadow, object-shorthand,
camelcase, prefer-destructuring, function-paren-newline, comma-dangle */
const request = require('request');
const requestPromise = require('request-promise');

const argv = process.argv;
const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';
const num = 20;
const method = argv[2];
const firstKey = argv[3];
const secondKey = argv[4];

function getData(body) {
  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    console.log(e);
  }
  if (data.length > 1) {
    data.map(element => console.log(element.id, element.name));
  } else {
    console.log(data.id, data.name);
  }
}

if (method === 'list') {
  requestPromise(`${baseUrl}?_limit=${num}`)
    .then(htmlString => getData(htmlString))
    .catch(error => console.log(error));
}

if (method === 'read') {
  if (!firstKey) console.log('請輸入書本 id');
  requestPromise(`${baseUrl}/${firstKey}`)
    .then(htmlString => getData(htmlString))
    .catch(error => console.log(error));
}

if (method === 'delete') {
  if (!firstKey) console.log('請輸入書本 id');
  request.delete(`${baseUrl}/${firstKey}`);
  console.log(`你已將 id = ${firstKey} 的書本成功刪除囉！`);
}

if (method === 'create') {
  if (!firstKey) console.log('請輸入書名');
  request.post(`${baseUrl}`).form({ name: firstKey });
  console.log(`已成功新增 ${firstKey}！`);
}

if (method === 'update') {
  if (!firstKey) console.log('請輸入書本 id');
  if (!secondKey) console.log('請輸入要更改的書名');
  request.patch(`${baseUrl}/${firstKey}`).form({ name: secondKey });
  console.log(`你已將 id = ${firstKey} 的書名更改成 ${secondKey}！`);
}
