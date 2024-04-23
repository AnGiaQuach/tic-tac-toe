"use strict";

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

const gameBoard = (function () {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  let numberOfMark = 0;
  const numberOfCell = 9;
  let currentPlayer = 1;
  let gameOver = false;

  const addMark = function (cell, row, column) {
    if (board[row][column] !== " " || gameOver) {
      return;
    }
    numberOfMark++;
    let mark = " ";
    currentPlayer === 1 ? (mark = "X") : (mark = "O");
    board[row][column] = mark;
    cell.textContent = mark;
    currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
  };
  const printBoard = function () {
    for (let i = 0; i < 3; i++) {
      let s = "";
      for (let j = 0; j < 3; j++) {
        s += board[i][j];
      }
      console.log(s);
    }
  };
  const check = function () {
    let winner = "Tie";
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][2] !== " "
      ) {
        gameOver = true;
        return board[i][0];
      }
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[2][i] !== " "
      ) {
        gameOver = true;
        return board[0][i];
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[2][2] !== " "
    ) {
      gameOver = true;
      return board[0][0];
    } else if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[2][0] !== " "
    ) {
      gameOver = true;
      return board[0][2];
    }
    /* if no diagonal or row ,column of X/O and its the last mark it will be tie*/
    if (numberOfMark === numberOfCell) {
      gameOver = true;
      return winner;
    }
  };

  const restart = function () {
    board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    numberOfMark = 0;
    gameOver = false;
    currentPlayer = 1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const element = document.getElementById(`c${i}${j}`);
        element.textContent = " ";
      }
    }
  };
  return {
    addMark,
    printBoard,
    check,
    restart,
  };
})();

// gameBoard.addMark("O", 0, 0);
// gameBoard.addMark("O", 1, 1);
// gameBoard.addMark("O", 2, 2);
// console.log(gameBoard.check());

function makePlayer(name, mark) {
  return {
    name,
    mark,
  };
}

const player1 = makePlayer("Alice", "X");
const player2 = makePlayer("Bob", "O");
name1.addEventListener("change", function (event) {
  player1.name = event.target.value;
  console.log(player1.name);
});
name2.addEventListener("change", function (event) {
  player2.name = event.target.value;
  console.log(player2.name);
});

const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", gameBoard.restart);

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.getElementById(`c${i}${j}`);
    cell.addEventListener("click", function () {
      gameBoard.addMark(cell, i, j);
      if (gameBoard.check() === "X") {
        console.log(`${player1.name} won!`);
      } else if (gameBoard.check() === "O") {
        console.log(`${player2.name} won!`);
      } else if (gameBoard.check() === "Tie") {
        console.log(`No one won!`);
      }
    });
  }
}
