/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase */

const btn__lottery = document.querySelector('.btn__lottery');
const btn__reload = document.querySelector('.btn__reload');
const obj = {
  first: '恭喜你中頭獎了！日本東京來回雙人遊！',
  second: '二獎！90 吋電視一台！',
  third: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
  none: '銘謝惠顧',
};
let temp = null; // 用來紀錄目前的背景

function render(value) {
  const result = document.querySelector('.lottery__result');
  const begin = document.querySelector('.main__inner');

  if (value === 'reload') {
    result.classList.add('hide');
    result.classList.remove(`${temp}__prize`);
    begin.classList.remove('hide');
    return;
  }

  temp = value;
  result.classList.add(`${value}__prize`);
  result.classList.remove('hide');
  begin.classList.add('hide');
}

function sendRequest() {
  const request = new XMLHttpRequest();
  const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
  const errorMessage = '系統不穩定，請再試一次！';

  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.response);
      } catch (err) {
        alert(errorMessage);
        console.log(err);
        return;
      }

      if (!data.prize) {
        alert(errorMessage);
        return;
      }

      if (data.prize === 'FIRST') {
        render('first');
        document.querySelector('.lottery__result h2').innerText = obj.first;
      }
      if (data.prize === 'SECOND') {
        render('second');
        document.querySelector('.lottery__result h2').innerText = obj.second;
      }
      if (data.prize === 'THIRD') {
        render('third');
        document.querySelector('.lottery__result h2').innerText = obj.third;
      }
      if (data.prize === 'NONE') {
        render('none');
        document.querySelector('.lottery__result h2').innerText = obj.none;
      }
    } else alert(errorMessage);
  };

  request.onerror = () => {
    alert(errorMessage);
  };

  request.send();
}

btn__lottery.addEventListener('click', () => {
  sendRequest();
});

btn__reload.addEventListener('click', () => {
  render('reload');
});
