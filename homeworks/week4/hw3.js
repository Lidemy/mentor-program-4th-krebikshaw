/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring */
const request = require('request');

const argv = process.argv;
const keyWord = argv[2];

request.get(`https://restcountries.eu/rest/v2/name/${keyWord}`,
  (error, response, body) => {
    if (response.statusCode === 404) {
      console.log('找不到國家資訊');
      return;
    }
    if (error) {
      console.log('查詢失敗');
      return;
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      console.log('查詢失敗');
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const country = data[i].name;
      const capital = data[i].capital;
      const currency = data[i].currencies[0].code;
      const code = data[i].callingCodes[0];
      console.log('============');
      console.log(`國家：${country}`);
      console.log(`首都：${capital}`);
      console.log(`貨幣：${currency}`);
      console.log(`國碼：${code}`);
    }
  }
);
