const GAMEBOARD = (function() {
   const gameBoard = [[" ", " ", " "],
                     [" ", " ", " "],
                     [" ", " ", " "]];

   const Player1 = "X";
   const player2 = "O";

   // let currentPlayer = "X";

   let startGame = function() {
      if(gameOver) {
         console.log("game over")
         return;
      } else {
         firstPlayerMove();
         secondPlayerMove();
         console.log(gameBoard);
         startGame();
         
      }
      
   }

   let isBoardFull = function() {
      if(gameBoard.flat().includes(" ")) {
         return false;
      } 
      return true;
   }

   let checkWinner = function() {
      // Check rows for a winner
      for (let i = 0; i < gameBoard.length; i++) {
         if (gameBoard[i][0].trim() !== " " && gameBoard[i][0].trim() === gameBoard[i][1].trim() && gameBoard[i][1].trim() === gameBoard[i][2].trim()) {
            return gameBoard[i][0].trim();
         }
      }
   
      // Check columns for a winner
      for (let col = 0; col < gameBoard[0].length; col++) {
         if (gameBoard[0][col].trim() !== " " && gameBoard[0][col].trim() === gameBoard[1][col].trim() && gameBoard[1][col].trim() === gameBoard[2][col].trim()) {
            return gameBoard[0][col].trim();
         }
      }
   
      // Check diagonals for a winner
      if (gameBoard[0][0].trim() !== " " && gameBoard[0][0].trim() === gameBoard[1][1].trim() && gameBoard[1][1].trim() === gameBoard[2][2].trim()) {
         return gameBoard[0][0].trim();
      }
      if (gameBoard[0][2].trim() !== " " && gameBoard[0][2].trim() === gameBoard[1][1].trim() && gameBoard[1][1].trim() === gameBoard[2][0].trim()) {
         return gameBoard[0][2].trim();
      }
   
      // If no winner, return false
      return false;
   }

   let secondPlayerMove = function() {
      let chooseRow = Number(prompt("Enter your row number "));
      let chooseCol = Number(prompt("Enter your Column number "));
      if(isValidMove(chooseRow, chooseCol)) {
         gameBoard[chooseRow][chooseCol] = player2;
      } else {
         secondPlayerMove();
      }
   }

   let firstPlayerMove = function() {
      let chooseRow = Math.floor(Math.random * 3);
      let chooseCol = Math.floor(Math.random * 3);
      if(isValidMove(chooseRow, chooseCol)) {
         gameBoard[chooseRow][chooseCol] = Player1;
      } else {
         firstPlayerMove();
      }
   }

   function isValidMove(row, col) {
      if(isBoardFull() || checkWinner()) {
         alert("Game is over already");
         return false;
      } else if(col > 3 || row > 3 || col < 0 || row < 0 || Number.isNaN(row) || Number.isNaN(col)) {
         alert("Enter a valid box");
         return false;
      }else if(gameBoard[row][col] == " ") {
         return true;
      }
   }

   let gameOver = function() {
      if(isBoardFull() && !checkWinner()) {
         console.log("It's a tie");
         return true;
      } else if((isBoardFull && checkWinner()) || (!isBoardFull && checkWinner())) {
         console.log(`Congratulations, ${checkWinner()} won the game `);
         return true;
      } 
      return false;
   }


   return {
      isBoardFull,
      checkWinner,
      secondPlayerMove,
      startGame,
   }
})();

// console.log(GAMEBOARD.isBoardFull());
GAMEBOARD.startGame();
