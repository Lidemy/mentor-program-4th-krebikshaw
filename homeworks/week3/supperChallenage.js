/* eslint-disable no-plusplus, no-use-before-define, no-shadow, object-shorthand */

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
  const N = lines[0].split(' ')[0];
  const W = lines[0].split(' ')[1];
  const arr = [];
  for (let i = 1; i <= N; i++) {
    const w = Number(lines[i].split(' ')[0]);
    const p = Number(lines[i].split(' ')[1]);
    arr.push({ w: w, p: p });
  }
  const valueOfEachWeight = [];

  for (let i = 0; i <= W; i++) {
    valueOfEachWeight[i] = 0;
  }

  for (let i = 0; i < N; i++) {
    for (let j = W - arr[i].w; j >= 0; j--) {
      if (valueOfEachWeight[j] + arr[i].p > valueOfEachWeight[j + arr[i].w]) {
        valueOfEachWeight[j + arr[i].w] = valueOfEachWeight[j] + arr[i].p;
      }
    }
  }
  let maxValue = 0;
  for (let i = 0; i < valueOfEachWeight.length; i++) {
    if (valueOfEachWeight[i] > maxValue) {
      maxValue = valueOfEachWeight[i];
    }
  }
  console.log(maxValue);
}
