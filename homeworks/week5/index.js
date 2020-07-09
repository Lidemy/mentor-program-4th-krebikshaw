/* eslint-disable no-plusplus, no-shadow, no-use-before-define, prefer-destructuring,
import/no-extraneous-dependencies */

/*
適用縣市：台北市,新北市,基隆市,桃園市,新竹市,
        新竹縣,台中市,彰化縣,台南市,高雄市,
        宜蘭縣,花蓮縣,澎湖,金門縣
*/

const request = require('request');

const argv = process.argv;
const inputCountry = argv[2];
const url = 'https://udn.com/news/story/7934/4668445';
let html; // 原始的 html
const dataBase = [];

request(url, (error, response) => {
  if (error) {
    console.log(error);
    return;
  }
  try {
    html = response.body;
  } catch (error) {
    console.log(error);
  }
  getData(html);
});

function getData(html) {
  let countryLeft = 0;
  let countryRight;
  let country; // 城市名稱
  let contentLeft;
  let contentRight;
  let content; // 優惠內容

  while (countryLeft >= 0) {
    // 取出城市名稱
    countryLeft = html.indexOf('<h2 class="content_title_2">', countryLeft + 1);
    if (countryLeft === -1) break;
    countryRight = html.indexOf('</h2>', countryLeft);
    country = html.slice(countryLeft + 28, countryRight);

    // 取出優惠內容
    contentRight = html.indexOf('</p><!--', countryRight);
    contentLeft = html.lastIndexOf('>', contentRight);
    content = html.slice(contentLeft + 1, contentRight);

    dataBase.push({
      country,
      content,
    });
  }
  printData(inputCountry, dataBase);
}

function printData(inputCountry, dataBase) {
  for (let i = 0; i < dataBase.length; i++) {
    if (dataBase[i].country === inputCountry) {
      console.log(`${inputCountry} 的活動資訊： ${dataBase[i].content}`);
    }
  }
}
