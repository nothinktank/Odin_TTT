//the main goal here is to have as little global code as possible
//utilize factories

//1. store the gameboard as an array inside of a Gameboard object
  //set up 3 arrays
    //row1, row2, row3 arrays 
    //[00, 01, 02] (row1 and position 0 => 00)
    //[10, 11, 12]
    //[20, 21, 22]

    //IIFE immediately invoked function expression (module pattern)
    let gameBoard = (function (){
      let boardArray = [[],[],[]];
      return {boardArray}
    })();

    // use gameboard.boardArray[0][0] to place a move
    // use gameBoard.boardArray to see the board (to update the UI)

    
//2. create player objects
    //placing a move
    //when placing a move, run gameDecider
    

    let playerX = (function() {
      let move = (row, column) => gameBoard.boardArray[row][column] = 'x';

      return {move};
    })();
  
    
    let playerO = {};

//3. create an object to control the flow of the game
    //alternate the o/x placement 



//4. include logic that checks for when the game is over
    //decide the outcome (win/lose/draw)
    let gameDecider = function() {
      let board = gameBoard.boardArray;
      
      switch (true) {
        case board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x':
          console.log('x wins');
          break;
        default: 
          console.log('default test');
      }
      
    };

        //win conditions
          // 00, 01, 02 => all X or O
          // 10, 11, 12 => all X or O
          // 20, 21, 22 => all X or O
          // 00, 10, 20 => all X or O
          // 01, 11, 21 => all X or O
          // 02, 12, 22 => all X or O
          // 01, 11, 22 => all X or O
          // 20, 11, 02 => all X or O

    //if any of the above satisfy for X before O satisfy any of those
    //X wins, 
    //if any of the above satisfy for O before X satisfy any of those
    //O wins, 
    //when all array lengths (max length = 3) are 3, and no win conditions
    //are triggered, the game returns DRAW

//5. after the game is functioning in the console, create an object
//   to handle the display/DOM logic