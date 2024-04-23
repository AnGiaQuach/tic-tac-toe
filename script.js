"use strict";

const name1 = document.getElementById("name1");
name1.addEventListener("change", function (event) {
  console.log(event.target.value);
});

const gameBoard = (function () {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  let numberOfMark = 0;

  const addMark = function (mark, row, column) {
    numberOfMark++;
    board[row][column] = mark;
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
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        winner = `Player with ${board[0][i]} won!`;
        return winner;
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        winner = `Player with ${board[0][i]} won!`;
        return winner;
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] == board[2][2]) {
      winner = `Player with ${board[0][0]} won!`;
      return winner;
    } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
      winner = `Player with ${board[0][0]} won!`;
      return winner;
    }
    /* if no diagonal or row ,column of X/O and its the last mark it will be tie*/
  };

  const restart = function () {
    board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    numberOfMark = 0;
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
  const { addMark } = gameBoard;
  return {
    name,
    mark,
    addMark,
  };
}

const player1 = makePlayer("Alice", "X");
const player2 = makePlayer("Bob", "O");
