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
  let playerOne = () => {
    let name = document.querySelector('#player-one').value;
    let symbol = "X";
    return { name, symbol };
  }
  let playerTwo = () => { 
    let name = document.querySelector('#player-two').value;
    let symbol = "O";
    return { name, symbol };
  }
  return { playerOne, playerTwo };
  // let winner = document.createElement('p');
  // winner.setAttribute('id', 'winner');
  // if(winGame().symbol === "X") {
  //   winner.textContent = `${playerOne().name} wins!`;
  //   header.appendChild(winner);
  // } else if(winGame().symbol === "O") {
  //   winner.textContent = `${playerTwo().name} wins!`;
  //   header.appendChild(winner);
  // }
};

const startGame = (() => {
  const startBtn = document.querySelector('#start-screen>button')
  const startScreen = document.querySelector('#start-screen');
  startBtn.addEventListener('click', function() {
    player();
    startScreen.style.display = 'none';
    header.style.display = 'block';
    gameBoard.createBoard();
    playGame();
  })
})();


const playGame = () => {
  const buttons = document.querySelectorAll('button');
  const square = boardSection.querySelectorAll('div');
  // let activeBtn = document.querySelector('.active');
  let symbol = "X";
  
  // for(let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener('click', function(e) {
  //     if(buttons[i].textContent === "X") {
  //       buttons[1].classList.remove('active');
  //       buttons[0].classList.add('active');
  //     } else if(buttons[i].textContent === "O") {
  //       buttons[0].classList.remove('active');
  //       buttons[1].classList.add('active');
  //     }
  //     activeBtn = document.querySelector('.active');
  //     symbol = activeBtn.textContent;
  //     return symbol;
  //   });
  // }
  
  for(let i = 0; i < square.length; i++) {
    square[i].addEventListener('click', function() {
      debugger;
      if(square[i].disabled === true) {
        return;
      } else if(winGame().gameOver) {
        square[i].disabled = true;
        resetGame();
      } else if(gameBoard.board[i] === "") {
        gameBoard.board[i] = symbol;
        square[i].textContent = symbol;
      }
      
      console.log(gameBoard.board);
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
      winner.textContent = `${player().playerOne().name} wins!`;
      header.appendChild(winner);
  } else if(winTopLineO || winMiddleLineO || winBottomLineO || 
    winLeftLineO || winCenterLineO || winRightLineO || 
    winTopLeftDiagonalO || winTopRightDiagonalO) {
      gameOver = true;
      winner.textContent = `${player().playerTwo().name} wins!`;
      header.appendChild(winner);
  } else if(!board.includes("")) {
    console.log("It's a tie!")
    gameOver = true;
  }
  return { gameOver };
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