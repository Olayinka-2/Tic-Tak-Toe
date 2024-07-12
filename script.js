const GAMEBOARD = (function() {
   const gameBoard = [["d", "d", "d"],
                     ["d", "d", "d"],
                     ["d", "d", "d"]];

   const player1 = "X";
   const player2 = "O";

   let currentPlayer = "X";
   let isCancelled = false;

      
      let startGame = function() {
         let isOver = false;
         while(!isOver) {
            if(gameOver() || isCancelled) {
               isOver = true;
               break;
            } else {
               if (currentPlayer === player1) {
                  firstPlayerMove();
               } else {
                  secondPlayerMove();
               }
            }
            if(isCancelled) {
               console.log("Game is cancelled");
               break;
            }
            console.log(gameBoard.map(row => row.join(' | ')).join('\n---------\n'));
            currentPlayer = currentPlayer === player1 ? player2 : player1;
         }
      }

      if(isCancelled) {
         console.log("Game is cancelled");
      }



   let isBoardFull = function() {
      if(gameBoard.flat().includes("d")) {
         return false;
      } 
      return true;
   }
   // console.log(isBoardFull());


   let checkWinner = function() {
      // Check rows for a winner
      for (let i = 0; i < gameBoard.length; i++) {
         if (gameBoard[i][0].trim() !== "d" && gameBoard[i][0].trim() === gameBoard[i][1].trim() && gameBoard[i][1].trim() === gameBoard[i][2].trim()) {
            return gameBoard[i][0].trim();
         }
      }
      
   
      // Check columns for a winner
      for (let col = 0; col < gameBoard[0].length; col++) {
         if (gameBoard[0][col].trim() !== "d" && gameBoard[0][col].trim() === gameBoard[1][col].trim() && gameBoard[1][col].trim() === gameBoard[2][col].trim()) {
            return gameBoard[0][col].trim();
         }
      }
   
      // Check diagonals for a winner
      if (gameBoard[0][0].trim() !== "d" && gameBoard[0][0].trim() === gameBoard[1][1].trim() && gameBoard[1][1].trim() === gameBoard[2][2].trim()) {
         return gameBoard[0][0].trim();
      }
      if (gameBoard[0][2].trim() !== "d" && gameBoard[0][2].trim() === gameBoard[1][1].trim() && gameBoard[1][1].trim() === gameBoard[2][0].trim()) {
         return gameBoard[0][2].trim();
      }
   
      // If no winner, return false
      return false;
   }

   let secondPlayerMove = function() {
      
      let chooseRow = Number(prompt("Enter your row number "));
      let chooseCol = Number(prompt("Enter your Column number "));

      if(chooseCol === -1 || chooseRow === -1 || chooseRow === null || chooseCol === null) {
         isCancelled = true;
         return;
      }
      if(isValidMove(chooseRow, chooseCol)) {
         gameBoard[chooseRow][chooseCol] = player2;
         return;
      } else {
         secondPlayerMove();
      }
      
   }

   let firstPlayerMove = function() {
      let chooseRow = Math.floor(Math.random() * 3);
      let chooseCol = Math.floor(Math.random() * 3);
      if(isValidMove(chooseRow, chooseCol)) {
         gameBoard[chooseRow][chooseCol] = player1;
         return;
      } else if(!isBoardFull()){
         firstPlayerMove();
      }
      
   }

   function isValidMove(row, col) {
      if((col > 2 || row > 2) || (col < 0 || row < 0) || Number.isNaN(row) || Number.isNaN(col)) {
         alert("Enter a valid box");
         return false;
      } 
      else if(gameBoard[row][col] == "d") {
         return true;
      }
   }

   let gameOver = function() {
      let winner = checkWinner();
      let boardFull = isBoardFull();

      if(winner) {
         winner = "X" ? "player1" : "player2";
         console.log(`Congratulations, ${winner} won the game `);
         console.log("Game over");
         return true;
      } else if(boardFull) {
         console.log("It's a tie");
         console.log("Game over");
         return true;
      }
      return false;
   }


   return {
      startGame,
   }
})();

GAMEBOARD.startGame();



