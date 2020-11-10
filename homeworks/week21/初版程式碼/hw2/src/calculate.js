const calculateWinner = (board, chess) => {
  const x = chess.index_x;
  const y = chess.index_y;
  const target = board[y][x]

  if (horizontalCount(board, target, y, x) >= 5) return target;
  if (verticalCount(board, target, y, x) >= 5) return target;
  if (slashCount(board, target, y, x) >= 5) return target;
  if (backSlashCount(board, target, y, x) >= 5) return target;
}

// 計算水平方向
function horizontalCount(board, target, y, x) {
  let count = 1;
  for (let i = ++x; i < x + 4; i++) {
    if (board[y][i] !== target || i >= 19) break;
    count++
  }

  for (let i = x-=2; i > x - 4; i--) {
    if (board[y][i] !== target || i < 0) break;
    count++;
  }
  return count;
}

// 計算垂直方向
function verticalCount(board, target, y, x) {
  let count = 1;
  for (let i = ++y; i < y + 4; i++) {
    if (i >= 19 || board[i][x] !== target) break;
    count++;
  }

  for (let i = y-=2; i > y - 4; i--) {
    if (i < 0 || board[i][x] !== target) break;
    count++;
  }
  return count;
}

// 計算斜線方向
function slashCount(board, target, y, x) {
  let temp_x = x;
  let count = 1;
  for (let i = ++y; i < y + 4; i++) {
    for (let j = ++x; j < x + 4; j++) {
      if (i >= 19 || j >= 19 || board[i][j] !== target) break;
      count++
      console.log('在正向這裡判斷 count++:',i, j)
    }
  }

  for (let i = y-=2; i > y - 4; i--) {
    for (let j = --temp_x; j > temp_x - 4; j--) {
      if (i < 0 || j < 0 || board[i][j] !== target) break;
      count++
    }
  }
  return count;
}

// 計算反斜線方向
function backSlashCount(board, target, y, x) {
  let temp_x = x;
  let count = 1;
  for (let i = ++y; i < y + 4; i++) {
    for (let j = --x; j > x - 4; j--) {
      if (i >= 19 || j < 0 || board[i][j] !== target) break;
      count++
    }
  }

  for (let i = y-=2; i > y - 4; i--) {
    for (let j = ++temp_x; j < temp_x + 4; j++) {
      if (i < 0 || j >= 19 || board[i][j] !== target) break;
      count++
    }
  }
  return count;
}

export default calculateWinner;