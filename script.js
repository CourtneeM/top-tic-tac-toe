const boardSection = document.querySelector('#board');
const header = document.querySelector('header');
var activeBtn = document.querySelector('.active');
const buttons = document.querySelectorAll('button');

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

const startGame = () => {
  let startScreen = document.querySelector('#start-screen');
  let startButton = document.querySelector('#start-screen>button')
  startButton.addEventListener('click', function() {
    startScreen.style.display = "none";
  })
}

startGame();

gameBoard.createBoard();



const player = (() => {
  
})();



const playerMove = (() => {
  const square = boardSection.querySelectorAll('div');
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
      if(gameBoard.board[i] === "") {
        gameBoard.board[i] = symbol;
        square[i].textContent = symbol;
      }
      console.log(gameBoard.board);
    })
  }
})();