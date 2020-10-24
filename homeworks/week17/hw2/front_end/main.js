/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase */

const btn__lottery = document.querySelector('.btn__lottery');
const btn__reload = document.querySelector('.btn__reload');

function render(value) {
  const result = document.querySelector('.lottery__result');
  const title = document.querySelector('.lottery__result h2');
  const begin = document.querySelector('.main__inner');

  if (value === 'reload') {
    result.classList.add('hide');
    begin.classList.remove('hide');
    return;
  }

  result.style.background = `url(${value.imageURL}) center/cover no-repeat`;
  title.innerText = `${value.description}`;
  result.classList.remove('hide');
  begin.classList.add('hide');
}

function sendRequest() {
  const request = new XMLHttpRequest();
  const url = 'http://localhost:3001/getPrize';
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

      render(data);
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
