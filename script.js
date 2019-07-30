const boardSection = document.querySelector('#board');
const header = document.querySelector('header');

const gameBoard = {
  board: ["","","","","","","","",""],
  createBoard: () => {
    for(let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.textContent = gameBoard.board[i];
      boardSection.appendChild(div);
    }
  }
}

const player = () => {
  let playerOne = {
    name: document.querySelector('#player-one').value,
    symbol: "X"
  }
  let playerTwo = { 
    name: document.querySelector('#player-two').value,
    symbol: "O"
  }
  return { playerOne, playerTwo };
};

const startGame = (() => {
  const startBtn = document.querySelector('#start-screen>button')
  const startScreen = document.querySelector('#start-screen');
  startBtn.addEventListener('click', function() {
    if(document.querySelector('#player-one').value === "") {
      return;
    }
    if (document.querySelector('#player-two').value === "") {
      return;
    }
    player();
    startScreen.style.display = 'none';
    header.style.display = 'block';
    gameBoard.createBoard();
    playGame();
  })
})();


const playGame = () => {
  const square = boardSection.querySelectorAll('div');
  let symbol = player().playerOne.symbol;

  for(let i = 0; i < square.length; i++) {
    square[i].addEventListener('click', function() {
      if(square[i].disabled === true) {
        return;
      } else if(gameBoard.board[i] === "") {
        gameBoard.board[i] = symbol;
        square[i].textContent = symbol;
        winGame();
        if(winGame().gameOver) {
          for(let j = 0; j < square.length; j++) {
            square[j].disabled = true;
          }
          winGame().displayWinner();
          return;
        }
        if(symbol === player().playerOne.symbol) {
          symbol = player().playerTwo.symbol;
        } else if(symbol === player().playerTwo.symbol) {
          symbol = player().playerOne.symbol;
        }
      }
    })
  }
};

const winGame = () => {
  const board = gameBoard.board;
  let gameOver = false;
  let winner = document.createElement('p');
  winner.setAttribute('id', 'winner');

  const winTopLineX = (board[0] === "X" && board[1] === "X" && board[2] === "X");
  const winTopLineO = (board[0] === "O" && board[1] === "O" && board[2] === "O");

  const winMiddleLineX = (board[3] === "X" && board[4] === "X" && board[5] === "X");
  const winMiddleLineO = (board[3] === "O" && board[4] === "O" && board[5] === "O");

  const winBottomLineX = (board[6] === "X" && board[7] === "X" && board[8] === "X")
  const winBottomLineO = (board[6] === "O" && board[7] === "O" && board[8] === "O");

  const winLeftLineX =  (board[0] === "X" && board[3] === "X" && board[6] === "X");
  const winLeftLineO = (board[0] === "O" && board[3] === "O" && board[6] === "O");

  const winCenterLineX =  (board[1] === "X" && board[4] === "X" && board[7] === "X");
  const winCenterLineO = (board[1] === "O" && board[4] === "O" && board[7] === "O");

  const winRightLineX = (board[2] === "X" && board[5] === "X" && board[8] === "X");
  const winRightLineO = (board[2] === "O" && board[5] === "O" && board[8] === "O");

  const winTopLeftDiagonalX = (board[0] === "X" && board[4] === "X" && board[8] === "X");
  const winTopLeftDiagonalO = (board[0] === "O" && board[4] === "O" && board[8] === "O");
  const winTopRightDiagonalX = (board[2] === "X" && board[4] === "X" && board[6] === "X");
  const winTopRightDiagonalO = (board[2] === "O" && board[4] === "O" && board[6] === "O");


  if(winTopLineX || winMiddleLineX || winBottomLineX || 
    winLeftLineX || winCenterLineX || winRightLineX || 
    winTopLeftDiagonalX || winTopRightDiagonalX) {
      gameOver = true;
      winner.textContent = `${player().playerOne.name} wins!`;
  } else if(winTopLineO || winMiddleLineO || winBottomLineO || 
    winLeftLineO || winCenterLineO || winRightLineO || 
    winTopLeftDiagonalO || winTopRightDiagonalO) {
      gameOver = true;
      winner.textContent = `${player().playerTwo.name} wins!`;
  } else if(!board.includes("")) {
    gameOver = true;
    winner.textContent = "It's a tie!";
  }

  let displayWinner = () => {
    header.appendChild(winner);
    resetGame();
  }

  return { gameOver, displayWinner };
};

const resetGame = () => {
  let resetBtn = document.createElement('button')
  resetBtn.setAttribute('id', 'reset-btn');
  resetBtn.textContent = "Reset Game";
  header.appendChild(resetBtn);

  let resetBoard = (() => {
    resetBtn.addEventListener('click', function(e) {
      console.log(e);
      while(boardSection.firstChild) {
        boardSection.removeChild(boardSection.firstChild);
      }
      let winner = document.getElementById('winner');
      winner.parentNode.removeChild(winner);
      resetBtn.parentNode.removeChild(resetBtn);
      gameBoard.board = ["","","","","","","","",""];
      gameBoard.createBoard();
      playGame();
    })
  })();
  return { resetBoard };
};