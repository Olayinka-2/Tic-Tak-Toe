const GAMEBOARD = (function() {
   const gameBoard = [[" ", " ", " "],
                     [" ", " ", " "],
                     [" ", " ", " "]];

   const Player1 = "X";
   const player2 = "O";

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


   return {
      isBoardFull,
      checkWinner
   }
})();

// console.log(GAMEBOARD.isBoardFull());
console.log(GAMEBOARD.checkWinner());
