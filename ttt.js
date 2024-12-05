//the main goal here is to have as little global code as possible
//utilize factories

//1. store the gameboard as an array inside of a Gameboard object
  //set up 3 arrays
    //row1, row2, row3 arrays 
    //[00, 01, 02] (row1 and position 0 => 00)
    //[10, 11, 12]
    //[20, 21, 22]

    //IIFE immediately invoked function expression (module pattern)
    const gameBoard = (function (){ 
      let boardArray = [['','',''],['','',''],['','','']];
        const getBoard = () => boardArray;
        const setBoard = (row, column, player) => boardArray[row][column] = player;
        const resetBoard = () => boardArray = [['','',''],['','',''],['','','']];
        //check board function, if something is there, return true
        const checkBoard = (row, column) => !!boardArray[row][column];
        const isFull = () => (boardArray.flat(2).join('').length() === 9) 
        
          return {getBoard, setBoard, resetBoard, checkBoard, isFull}
      })();

      //turn counter
        //whos turn is it now? x/o
        //set the turn of the next 

      const turnCounter = (function(){
        let turn = 'x';
        const getTurn = () => turn;
        const setTurn = (player) => turn = player;
        return {getTurn, setTurn}
      })();

      //move placer (eventually be replaced by eventlistener)
        //takes 2 coordinates
      
      const movePlacer = function(row, column){
        if (!gameBoard.checkBoard(row, column)){
          let player = turnCounter.getTurn();
          gameBoard.setBoard(row, column, player);
          let verticalCheck = didPlayerWinVertical();
          let horizontalCheck = didPlayerWinHorizontal();
          let diagonalCheck = didPlayerWinDiagonal();
          if(!verticalCheck && !horizontalCheck && !diagonalCheck){
            player = turnCounter.getTurn() === 'x' ? 'o' : 'x';
            turnCounter.setTurn(player);
          } else {
            switch (true){
              case (!!diagonalCheck): console.log(diagonalCheck);
              break;

              case (!!horizontalCheck): console.log(horizontalCheck);
              break;

              case (!!verticalCheck): console.log(verticalCheck);
              break;
            }
            gameBoard.resetBoard();
            turnCounter.setTurn('x');
          }
          
        }
      }

      const didPlayerWinVertical = function(){
        let board = gameBoard.getBoard();
        for (let i = 0; i <= 2; i++){
          if (board[0][i] != ''){
            if (board[0][i] === board[1][i] && board[0][i] === board[2][i]){
              return `winner is ${board[0][i]}`;
              }
          }
        } 
      };

      const didPlayerWinHorizontal = function(){
        let board = gameBoard.getBoard();
        for (let i = 0; i <= 2; i++){
          if (board[i][0] != ''){
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]){
              return `winner is ${board[0][i]}`;
            }
          }
        }
      };

      const didPlayerWinDiagonal = function(){
        let board = gameBoard.getBoard();
        if (board[1][1] != ''){
          if ( (board[0][0] === board[1][1] && board[1][1] === board[2][2]) || (board[2][0] === board[1][1] && board[1][1] === board[0][2]) ){
            return `winner is ${board[1][1]}`;
        }
      };
    };

      //game decider
        //return check win (return true/false)
        //return check tie(dont initiate unless the board is full)(if the board is full, check, if not keep going)





    //need a button (or click on first slot to place X to initialize a new game)
    
    // const newBoard = gameBoard();
    




//5. after the game is functioning in the console, create an object
//   to handle the display/DOM logic