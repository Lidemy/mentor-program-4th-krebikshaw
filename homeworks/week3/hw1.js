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
  const n = Number(lines[0]);
  for (let i = 1; i <= n; i++) {
    console.log(repeat(i));
  }
}

function repeat(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += '*';
  }
  return str;
}
