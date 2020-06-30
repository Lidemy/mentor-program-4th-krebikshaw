/* eslint-disable no-plusplus, no-use-before-define, no-shadow, no-else-return */

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
  const M = Number(lines[0]);
  for (let i = 1; i <= M; i++) {
    console.log(compare(lines[i]));
  }
}

function compare(str) {
  const arr1 = str.split(' ')[0].split('');
  const arr2 = str.split(' ')[1].split('');
  const K = str.split(' ')[2];
  if (K === '1') {
    if (arr1.length !== arr2.length) {
      return arr1.length > arr2.length ? 'A' : 'B';
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return arr1[i] > arr2[i] ? 'A' : 'B';
        }
      }
    }
  }
  if (K === '-1') {
    if (arr1.length !== arr2.length) {
      return arr1.length > arr2.length ? 'B' : 'A';
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return arr1[i] > arr2[i] ? 'B' : 'A';
        }
      }
    }
  }
  return 'DRAW';
}
