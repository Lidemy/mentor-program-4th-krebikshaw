/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, camelcase */

const list = document.querySelector('.list');
const keydown = document.querySelector('.keydown');
let num = 2; // 編號用
let count = 1; // 紀錄目前 todo 在版面上的數量

function creatTodo(value) {
  if (count > 7) {
    alert('🙅‍  累積太多事項囉，先把舊事項完成再新增吧！');
    return;
  }
  const element__li = document.createElement('li');
  element__li.setAttribute('data-value', `${num}`);
  element__li.innerHTML = `
    <input type="checkbox" id="cb__${num}">
    <label for="cb__${num}"><span></span>${value}
    <input type="button" class="btn__delete" data-value="${num}">
  `;
  list.appendChild(element__li);
  count++;
  num++;
}

/*
確認事項已勾選，將其刪除
事項未勾選，跳出警示
*/
function deleteTodo(value, checked) {
  if (checked) {
    const li = document.querySelector(`li[data-value="${value}"]`);
    list.removeChild(li);
    count--;
    return;
  }
  alert('🙅‍  請先完成事項再刪除唷！');
}

keydown.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 && e.target.value !== '') {
    const value = e.target.value;
    e.target.value = '';
    creatTodo(value);
  }
});

list.addEventListener('click', (e) => {
  const target = e.target.getAttribute('class');
  if (target === 'btn__delete') {
    const checked = e.path[1].control.checked;
    const value = e.target.getAttribute('data-value');
    deleteTodo(value, checked);
  }
});
