/* eslint-disable no-plusplus, no-use-before-define, no-shadow */

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});

function solve(lines) {
  const str = lines[0];
  let strRe = '';
  for (let i = str.length - 1; i >= 0; i--) {
    strRe += str[i];
  }
  if (str === strRe) console.log('True');
  else console.log('False');
}
