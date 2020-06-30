/* eslint-disable no-plusplus, no-use-before-define, no-shadow, no-continue, prefer-destructuring */

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
  const mapH = Number(lines[0].split(' ')[0]) - 1;
  const mapW = Number(lines[0].split(' ')[1]) - 1;
  const map = [];
  for (let i = 1; i <= mapH + 1; i++) {
    map.push(lines[i].split(''));
  }

  const step = [];
  for (let i = 0; i < mapH + 1; i++) {
    step.push([]);
  }
  step[0][0] = 0;

  const nextPoint = [{ x: 0, y: 0 }];
  const direction = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ];

  while (nextPoint.length) {
    const point = nextPoint.shift();
    const x = point.x;
    const y = point.y;
    for (let i = 0; i < direction.length; i++) {
      const newX = x + direction[i].x;
      const newY = y + direction[i].y;

      if (newX < 0 || newY < 0 || newX > mapH || newY > mapW || map[x][y] !== '.') continue;
      if (step[newX][newY] <= step[x][y] + 1 || step[newX][newY] !== undefined) continue;

      step[newX][newY] = step[x][y] + 1;
      nextPoint.push({ x: newX, y: newY });
    }
  }
  console.log(step[mapH][mapW]);
}

/* 第二種解法，深度優先：
function solve(lines) {
  const mapH = Number(lines[0].split(' ')[0]) - 1;
  const mapW = Number(lines[0].split(' ')[1]) - 1;
  const map = [];
  for (let i = 1; i<= mapH + 1; i++) {
    map.push(lines[i].split(''))
  }
  let step = 0;
  let bestStep = (mapH + 1) * (mapW + 1);
  function move(x, y) {
    if (x === mapH && y === mapW) {
      if (step < bestStep) {
        bestStep = step;
      }
      return;
    }
    if (x < 0 || y < 0 || x > mapH || y > mapW || map[x][y] == '#' || step == bestStep) {
      return;
    }
    //map[x][y] = step;
    step ++;
    move(x + 1, y);
    move(x - 1, y);
    move(x, y + 1);
    move(x, y - 1);
    //map[x][y] = '.';
    step--;
  }
  move(0, 0);
  console.log(bestStep)
}
*/
