/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue */

function answerSwitch(number) {
  const answer = document.querySelector(`p[id="${number}"]`);
  answer.classList.toggle('hide');
}

/* click 監聽器 */
document.querySelector('.list').addEventListener('click', (e) => {
  const value = e.target.getAttribute('data-value');
  answerSwitch(value);
});
