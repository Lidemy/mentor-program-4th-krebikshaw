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
  const n = Number(lines[0].split(' ')[0]);
  const m = Number(lines[0].split(' ')[1]);
  for (let i = n; i <= m; i++) {
    if (isNarcissisticNumber(i)) console.log(i);
  }
}

function isNarcissisticNumber(n) {
  const str = n.toString();
  const times = str.length;
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += Number(str[i]) ** times;
  }
  return sum === n;
}
