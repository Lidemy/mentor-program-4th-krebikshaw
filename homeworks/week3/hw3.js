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
  const N = Number(lines[0]);
  for (let i = 1; i <= N; i++) {
    if (isPrime(Number(lines[i]))) console.log('Prime');
    else console.log('Composite');
  }
}

function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
