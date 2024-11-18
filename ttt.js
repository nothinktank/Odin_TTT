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
      let boardArray = [['','',''],['','',''],['','','']];
      return {boardArray}
    })();

    // use gameboard.boardArray[0][0] to place a move
    // use gameBoard.boardArray to see the board (to update the UI)

    
//2. create player objects
    //placing a move
    //when placing a move, run gameDecider
    

    let playerX = (function() {
      const move = (row, column) => {
        if (gameBoard.boardArray[row][column] === ''){
          gameBoard.boardArray[row][column] = 'x';
        }else {
          console.log('can\'t place here');
          return
        }
      }
        

      return {move};
    })();
  
    
    let playerO = (function() {
      const move = (row, column) => {
        if (gameBoard.boardArray[row][column] === ''){
          gameBoard.boardArray[row][column] = 'o';
        }else {
          console.log('can\'t place here');
          return
        }
      }
        

      return {move};
    })();

//3. create an object to control the flow of the game
    //alternate the o/x placement 



//4. include logic that checks for when the game is over
    //decide the outcome (win/lose/draw)

    

    let gameDecider = (function() {
      

      //check for 3 conditions, horizontal/vertical/diagonal 

      const didPlayerWinHorizontal = function(){
        for (let i = 0; i <= 2; i++) {
          if (gameBoard.boardArray[i][0] != '' && gameBoard.boardArray[i][0] === gameBoard.boardArray[i][1] && gameBoard.boardArray[i][1] === gameBoard.boardArray[i][2]){
            console.log(`${gameBoard.boardArray[i][0]} player wins`)
            gameBoard.boardArray = [['','',''],['','',''],['','','']];
            return
        }
        } 
      };
      
      const didPlayerWinVertical = function(){

      }
      const didPlayerWinDiagonal = function(){

      }

      return {didPlayerWinDiagonal, didPlayerWinHorizontal, didPlayerWinVertical}

    })();

        //win conditions
          // horizontal 00, 01, 02 => all X or O sum = 3
          // horizontal 10, 11, 12 => all X or O sum = 33
          // horizontal 20, 21, 22 => all X or O sum = 63
          // vertical 00, 10, 20 => all X or O sum = 30
          // vertical 01, 11, 21 => all X or O sum = 34
          // vertical 02, 12, 22 => all X or O sum = 36
          // diagonal 00, 11, 22 => all X or O sum = 33
          // diagonal 20, 11, 02 => all X or O sum = 33

    //if any of the above satisfy for X before O satisfy any of those
    //X wins, 
    //if any of the above satisfy for O before X satisfy any of those
    //O wins, 
    //when all array lengths (max length = 3) are 3, and no win conditions
    //are triggered, the game returns DRAW

//5. after the game is functioning in the console, create an object
//   to handle the display/DOM logic