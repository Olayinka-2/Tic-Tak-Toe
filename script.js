const DomElements = (function() {
   const mainContainer = document.querySelector(".main-container");
   const resetGameButton = document.querySelector(".Reset");
   const modal = document.querySelector("dialog");
   const closeDialog = document.querySelector("#closeDialog");
   const winnerParagraph = document.querySelector("#winner");



   let Player = "X";
   

   function updateDom(target) {
      if (!target) return; // Ensure target element exists
      

      // Update the DOM based on the game state
      const imgSrc = Player === "X" ? "./img/close.svg" : "./img/circle.svg";
      target.querySelector("img").setAttribute("src", imgSrc);
   }

   function cellFunction(event) {
      let target = event.target.closest(".cell");

      if (!target) return; // If clicked outside .cell, exit

      let row = parseInt(target.dataset.row) - 1; // Adjust for zero-based index
      let col = parseInt(target.dataset.col) - 1; // Adjust for zero-based index

 
         if (!GAMEBOARD.isCancelled && !GAMEBOARD.gameOver()) {
            if(GAMEBOARD.secondPlayerMove(row, col)) {
               Player = "O";
               GAMEBOARD.secondPlayerMove(row, col);
               updateDom(target);
               Player = "X";

               if (!GAMEBOARD.gameOver()) {
                  setTimeout(() => {
                     GAMEBOARD.firstPlayerMove()}, "1000")
                  
               }
            }
            
         }
      
   }

   function resetGames() {
      if(GAMEBOARD.resetGame()) {
         // Clear all cells
         const cells = document.querySelectorAll('.cell img');
         cells.forEach(cell => cell.removeAttribute('src'));

         // Reset player display
         const playerParagaph = document.querySelector(".player");
         playerParagaph.textContent = '';
         playerParagaph.style.color = 'black';

         GAMEBOARD.startGame();
      }
   }

   resetGameButton.addEventListener('click', resetGames);
   closeDialog.addEventListener("click", () => {
      modal.close();
   })
 

   // Check if mainContainer exists before adding event listener
   if (mainContainer) {
      mainContainer.addEventListener("click", cellFunction);
   }

   return {
      updateDom,
      cellFunction,
      modal,
      winnerParagraph // Expose cellFunction for external use
   };
})();



const GAMEBOARD = (function() {
   let gameBoard = [["d", "d", "d"],
                     ["d", "d", "d"],
                     ["d", "d", "d"]];

   const player1 = "X";
   const player2 = "O";

   let currentPlayer = player1;
   let isCancelled = false;

   let playerParagaph = document.querySelector(".player");
   function startGame() {
      // console.log("Game Started");

      // Reset the game board
      gameBoard = [["d", "d", "d"],
                  ["d", "d", "d"],
                  ["d", "d", "d"]];
      isCancelled = false;
      currentPlayer = player1;
      
      // First player (computer) starts the game
      firstPlayerMove();
   }


   function isBoardFull() {
      return !gameBoard.flat().includes("d");
   }

   function checkWinner() {
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

   function secondPlayerMove(row, col) {
      if (isValidMove(row, col)) {
         gameBoard[row][col] = player2;
         currentPlayer = "X"; // Switch to player 1 (computer) after move
         playerParagaph.style.color = "gold";
         playerParagaph.textContent = "Second Player move";
         

         if (checkWinner()) {
            DomElements.winnerParagraph.textContent = "Player 2 wins!";
            DomElements.modal.showModal();
               // console.log("Player 2 wins!");
               isCancelled = true;
         } else if (isBoardFull()) {
            DomElements.winnerParagraph.textContent = "It's a tie!";
            DomElements.modal.showModal();
               // console.log("It's a tie!");
               isCancelled = true;
         } return true;
      } else {
         return false;
      }
   }

   function firstPlayerMove() {
      if (isCancelled) return;

      let chooseRow, chooseCol;
      do {
         chooseRow = Math.floor(Math.random() * 3);
         chooseCol = Math.floor(Math.random() * 3);
      } while (!isValidMove(chooseRow, chooseCol));

      gameBoard[chooseRow][chooseCol] = player1;
      currentPlayer = "O"; // Switch to player 2 after move
      playerParagaph.style.color = "white";
      playerParagaph.textContent = "First player moved";
      // console.log("First player moved");

      // Update the corresponding cell in the DOM
      let target = document.querySelector(`.cell[data-row="${chooseRow + 1}"][data-col="${chooseCol + 1}"]`);
      DomElements.updateDom(target);

      if (checkWinner()) {
         DomElements.winnerParagraph.textContent = "Player 1 wins"
         DomElements.modal.showModal();
         isCancelled = true;
      } else if (isBoardFull()) {
         DomElements.winnerParagraph.textContent = "Its a tie"
         DomElements.modal.showModal();
         console.log("It's a tie!");
         isCancelled = true;
      }
   }

   function isValidMove(row, col) {
      if ((col > 2 || row > 2) || (col < 0 || row < 0) || Number.isNaN(row) || Number.isNaN(col)) {
         alert("Enter a valid box");
         return false;
      }
      return gameBoard[row][col] === "d";
   }

   function gameOver() {
      return checkWinner() || isBoardFull();
   }

   function resetGame() {
      gameBoard = [["d", "d", "d"],
                  ["d", "d", "d"],
                  ["d", "d", "d"]];
      isCancelled = false;
      return true;
   }

   return {
      startGame,
      secondPlayerMove,
      firstPlayerMove,
      isCancelled,
      currentPlayer,
      gameOver,
      resetGame
   };
})();
// const startGameButton = document.querySelector(".start");
document.addEventListener("DOMContentLoaded", GAMEBOARD.startGame);
// startGameButton.addEventListener('click', GAMEBOARD.startGame);

