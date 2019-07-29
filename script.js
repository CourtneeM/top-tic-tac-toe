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
  let playerOne = document.querySelector('#player-one').value;
  let playerTwo = document.querySelector('#player-two').value;
  console.log(playerOne, playerTwo);
  // return { playerOne, playerTwo };
};

const startGame = (() => {
  const startBtn = document.querySelector('#start-screen>button')
  const startScreen = document.querySelector('#start-screen');
  startBtn.addEventListener('click', function() {
    player();
    startScreen.style.display = 'none';
    header.style.display = 'block';
    gameBoard.createBoard();
    playerMove();
  })
})();


const playerMove = () => {
  const buttons = document.querySelectorAll('button');
  const square = boardSection.querySelectorAll('div');
  let activeBtn = document.querySelector('.active');
  let symbol = activeBtn.textContent;
  
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
      if(buttons[i].textContent === "X") {
        buttons[1].classList.remove('active');
        buttons[0].classList.add('active');
      } else if(buttons[i].textContent === "O") {
        buttons[0].classList.remove('active');
        buttons[1].classList.add('active');
      }
      activeBtn = document.querySelector('.active');
      symbol = activeBtn.textContent;
      return symbol;
    });
  }
  
  for(let i = 0; i < square.length; i++) {
    square[i].addEventListener('click', function() {
      if(winGame().gameWon) {
        square[i].disabled = true;
      } else if(gameBoard.board[i] === "") {
        gameBoard.board[i] = symbol;
        square[i].textContent = symbol;
      }
      console.log(gameBoard.board);
      winGame();
    })
  }
};

const winGame = () => {
  let gameWon = false;
  const board = gameBoard.board;
  const winTopLine = (board[0] === "X" && board[1] === "X" && board[2] === "X") || 
  (board[0] === "O" && board[1] === "O" && board[2] === "O");
  const winMiddleLine = (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
  (board[3] === "O" && board[4] === "O" && board[5] === "O");
  const winBottomLine = (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
  (board[6] === "O" && board[7] === "O" && board[8] === "O");

  const winLeftLine =  (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
  (board[0] === "O" && board[3] === "O" && board[6] === "O");
  const winCenterLine =  (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
  (board[1] === "O" && board[4] === "O" && board[7] === "O");
  const winRightLine = (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
  (board[2] === "O" && board[5] === "O" && board[8] === "O");

  const winTopLeftDiagonal = (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
  (board[0] === "O" && board[4] === "O" && board[8] === "O");
  const winTopRightDiagonal = (board[2] === "X" && board[4] === "X" && board[6] === "X") ||
  (board[2] === "O" && board[4] === "O" && board[6] === "O");


  if(winTopLine || winMiddleLine || winBottomLine || 
    winLeftLine || winCenterLine || winRightLine || 
    winTopLeftDiagonal || winTopRightDiagonal) {
    console.log("You win!");
    gameWon = true;
  }
  return { gameWon };
}