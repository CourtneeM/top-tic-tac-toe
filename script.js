const main = document.querySelector('main');

let gameBoard = {
  board: ["x","x","o","o","o","o","x","x","o"],
  createBoard: () => {
    for(let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.textContent = gameBoard.board[i];
      main.appendChild(div);
    }
  }
}

let player = (playerNumber, symbol) => {
  return { playerNumber, symbol };
}

gameBoard.createBoard();
console.log(player("one", "X"));