const calculateWinner = (board, chess) => {
  const x = chess.index_x;
  const y = chess.index_y;
  const target = board[y][x];

  if (
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) return target;
}

function countTotal(board, y, x, directionX, directionY) {
  const now = board[y][x];
  let tempX = x;
  let tempY = y;
  let total = 0;

  while (total < 5) {
    tempX += directionX
    tempY += directionY
    if (tempX < 0 || tempX >= 19 || tempY < 0 || tempY >= 19 || board[tempY][tempX] !== now) break;
    total++;
  }
  return total;
}

export default calculateWinner;