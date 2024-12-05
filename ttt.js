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



        // const gameDecider = function(){
        //   // let board = gameBoard.getBoard()

        //   const didPlayerWinHorizontal = function(){
        //     for (let i = 0; i <= 2; i++){
        //       if (board[i][0] != '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
        //         return movePlacer.player;
        //       } else {
        //         return false
        //       }
        //     }
        //   }

        //   const didPlayerWinVertical = function(){
        //     for (let i = 0; i <= 2; i++){
        //       if (board[0][i] != '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
        //         return board[0][i];
        //       } else {
        //         return false
        //       }
        //     }
        //   }

        //   const didPlayerWinDiagonal = function(){
        //     if (board[1][1] != '') {
        //       if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        //         return board[0][0];
        //       }
        //     }else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]){
        //         return board[2][0];
        //     }else {
        //       return false
        //     }
        //   }

        //   const tieCondition = function() {
        //     if (gameBoard.isFull){ //check if it comes down to the last spot, is it always a tie
        //       return 'draw';
        //     }
        //   }

        //   return {didPlayerWinDiagonal, didPlayerWinHorizontal, didPlayerWinVertical, tieCondition}
        // }


      //player assigner



    //need a button (or click on first slot to place X to initialize a new game)
    
    // const newBoard = gameBoard();
    

//2. create player objects
    //placing a move
    //when placing a move, run gameDecider
    //before running gameDecider, only run necessary functions based on placements

    // let playerX = (function() {
    //   const move = (row, column) => {
    //     if (gameController.enablePlayerX && gameBoard.getBoard()[row][column] === ''){
    //       gameBoard.placeMove(row,column);
    //       gameController.enablePlayerX = false;
          
    //     }else {
    //       console.log('can\'t place here/yet');
          
    //     }
    //   }
        

    //   return {move};
    // })();
  
    // let playerO = (function() {
    //   const move = (row, column) => {
    //     if (!gameController.enablePlayerX && gameBoard.getBoard()[row][column] === ''){
    //       gameBoard.placeMove(row,column);
    //       gameController.enablePlayerX = true;
          
    //     }else {
    //       console.log('can\'t place here/yet');
          
    //     }
    //   }
        

    //   return {move};
    // })();

  
//3. create an object to control the flow of the game
    //start the game with 'x'
    //alternate the o/x placement 


//need to update the code below to adjust for new board function
// let newBoard = gameBoard();

//     const gameController = (function(){
//       let enablePlayerX = true;
      
      
//       if (newBoard.getBoard().length === 0){
//         console.log('x please make a move');
//       }
//       const placeMove = (row, column) => newBoard.getBoard[row][column] = enablePlayerX ? 'x' : 'o';

//       return {enablePlayerX, placeMove}
//     })();



//4. include logic that checks for when the game is over
    //decide the outcome (win/lose/draw)
   

    // let gameDecider = function() {
      

    //   //check for 3 conditions, horizontal/vertical/diagonal 

    //   const didPlayerWinHorizontal = function(){
    //     for (let i = 0; i <= 2; i++) {
    //       if(gameBoard.boardArray[i][0] != '' && gameBoard.boardArray[i][0] === gameBoard.boardArray[i][1] && gameBoard.boardArray[i][1] === gameBoard.boardArray[i][2]){
    //         console.log(`${gameBoard.boardArray[i][0]} player wins`);
    //         gameBoard.boardArray = [['','',''],['','',''],['','','']];
    //         return
    //     }
    //     } 
    //   };
      
    //   const didPlayerWinVertical = function(){
    //     for (let i = 0; i <= 2; i++) {
    //       if(gameBoard.boardArray[0][i] === gameBoard.boardArray[1][i] && gameBoard.boardArray[1][i] === gameBoard.boardArray[2][i] && gameBoard.boardArray[0][i] != ''){
    //         console.log(`${gameBoard.boardArray[0][i]} player wins`);
    //         gameBoard.boardArray = [['','',''],['','',''],['','','']];
    //         return
    //       }
    //     }
    //   }

    //   const didPlayerWinDiagonal = function(){
    //     //[00, 01, 02] (row1 and position 0 => 00)
    //     //[10, 11, 12]
    //     //[20, 21, 22]

    //     //if position 11 != '' && 00 === 22 && 22 === 11
    //     // OR if position 11 != '' && 02 === 20 && 20 === 11

    //     if(gameBoard.boardArray[1][1] != '') {
    //       if (gameBoard.boardArray[0][0] === gameBoard.boardArray[2][2] && gameBoard.boardArray[2][2] === gameBoard.boardArray[1][1]){
    //         console.log(`${gameBoard.boardArray[1][1]} player wins`);
    //         gameBoard.boardArray = [['','',''],['','',''],['','','']];
    //         return
    //       } else if (gameBoard.boardArray[0][2] === gameBoard.boardArray[2][0] && gameBoard.boardArray[2][0] === gameBoard.boardArray[1][1]){
    //         console.log(`${gameBoard.boardArray[1][1]} player wins`);
    //         gameBoard.boardArray = [['','',''],['','',''],['','','']];
    //         return  
    //       }
    //     }
    //   }

    //   return {didPlayerWinDiagonal, didPlayerWinHorizontal, didPlayerWinVertical}

    // };

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