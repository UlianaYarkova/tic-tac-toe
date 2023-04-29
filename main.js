const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player1score = document.getElementById("player1score");
const player2score = document.getElementById("player2score");
const currentPlayerName = document.getElementById("currentPlayerName");
const currentStep = document.getElementById("currentStep");

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetGame);

const newGameBtn = document.getElementById("newGameBtn");
newGameBtn.addEventListener("click", startNewGame);

let board = [[0,0,0],[0,0,0],[0,0,0]]; // игровое поле
let currentPlayerNum = 1; // текущий игрок
let player1wins = 0; // количество побед игрока 1
let player2wins = 0; // количество побед игрока 2
let gameEnded = false; // завершена ли игра
let winningPlayer; // номер победившего игрока

function drawBoard() {
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 300);
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 300);
  ctx.moveTo(0, 100);
  ctx.lineTo(300, 100);
  ctx.moveTo(0, 200);
  ctx.lineTo(300, 200);
  ctx.stroke();

  // нарисовать крестики и нолики
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 1) {
        drawX(i, j);
      } else if (board[i][j] === 2) {
        drawO(i, j);
      }
    }
  }
}

function drawX(row, col) {
  // нарисовать крестик в ячейке (row, col)
  ctx.beginPath();
  ctx.moveTo(col * 100 + 10, row * 100 + 10);
  ctx.lineTo(col * 100 + 90, row * 100 + 90);
  ctx.moveTo(col * 100 + 90, row * 100 + 10);
  ctx.lineTo(col * 100 + 10, row * 100 + 90);
  ctx.stroke();
}

function drawO(row, col) {
  // нарисовать нолик в ячейке (row, col)
  ctx.beginPath();
  ctx.arc(col * 100 + 50, row * 100 + 50, 40, 0, Math.PI * 2);
  ctx.stroke();
}

function checkForWin() {
  // Проверка на выигрышную комбинацию
  for (let i = 0; i < 3; i++) {
    // комбинация в строке
    if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
    // комбинация в столбце
    if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  // Комбинация на главной диагонали
  if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  // Комбинация на побочной диагонали
  if (board[2][0] !== 0 && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
    return board[2][0];
  }

  // Если комбинаций не найдено
  return 0;
}

function newGame() {
  currentStep.innerHTML = 0
  board = [[0,0,0],[0,0,0],[0,0,0]];
  currentPlayerNum = 1;
  gameEnded = false;
  winningPlayer = undefined;
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBoard();
  currentStep.innerHTML = ++currentStep.innerHTML
  currentPlayerName.innerHTML = `Игрок ${currentPlayerNum}`;
}

function resetGame() {
  // сбросить игру
  newGame()
  player1wins = 0
  player1score.innerHTML = 0
  player2wins = 0
  player2score.innerHTML = 0
}

function startNewGame() {
  // начать новую игру
  newGame();
}

function handleClick(event) {
// обработать клик по ячейке игрового поля
  if (gameEnded) {
    return;
  }
  const row = Math.floor(event.offsetY / 100);
  const col = Math.floor(event.offsetX / 100);
  if (board[row][col] !== 0) {
    return;
  }
  board[row][col] = currentPlayerNum;
  if (currentPlayerNum === 1) {
    currentPlayerNum = 2;
  } else {
    currentPlayerNum = 1;
  }
  drawBoard();
  const winner = checkForWin();
  currentStep.innerHTML = ++currentStep.innerHTML

  if (winner !== 0) {
    gameEnded = true;
    winningPlayer = winner;
    if (winningPlayer === 1) {
      player1wins++;
      player1score.innerHTML = player1wins
    } else {
      player2wins++;
      player2score.innerHTML = player2wins
    }
  } else {
    currentPlayerName.innerHTML = `Игрок ${currentPlayerNum}`;
  }
}

// обработчики кликов по ячейкам
canvas.addEventListener("click", handleClick);

// начальное игровое поле
drawBoard();