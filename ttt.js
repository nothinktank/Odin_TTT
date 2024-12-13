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
        const isFull = () => (boardArray.flat(2).join('').length === 9) 
        
          return {getBoard, setBoard, resetBoard, checkBoard, isFull, boardArray}
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
        //object to control game flow
      
      const movePlacer = function(row, column){
        if (!gameBoard.checkBoard(row, column)){
          let player = turnCounter.getTurn();
          gameBoard.setBoard(row, column, player);
          let verticalCheck = didPlayerWinVertical();
          let horizontalCheck = didPlayerWinHorizontal();
          let diagonalCheck = didPlayerWinDiagonal();
          let boardIsFull = gameBoard.isFull();

          let titleBlock = document.querySelector('.title');
          let resultLabel = document.createElement('div');
          resultLabel.className = 'result';
          

          if(boardIsFull){
            gameBoard.resetBoard();
            turnCounter.setTurn('x');
            resultLabel.textContent = 'game is tied';
            titleBlock.appendChild(resultLabel);
            // alert('');
            
          }else{
            if(!verticalCheck && !horizontalCheck && !diagonalCheck){
              player = turnCounter.getTurn() === 'x' ? 'o' : 'x';
              turnCounter.setTurn(player);
            } else {
  
              if (!!verticalCheck) {
                resultLabel.textContent = `${verticalCheck}`;
                titleBlock.appendChild(resultLabel);
                console.log(verticalCheck);
                // alert(verticalCheck);
              }else if (!!diagonalCheck) {
                resultLabel.textContent = `${diagonalCheck}`;
                titleBlock.appendChild(resultLabel);
                console.log(diagonalCheck);
                // alert(diagonalCheck);
              }else {
                resultLabel.textContent = `${horizontalCheck}`;
                titleBlock.appendChild(resultLabel);
                console.log(horizontalCheck);
                // alert(horizontalCheck);
              }
            
              gameBoard.resetBoard();
              turnCounter.setTurn('x');
            }
          }
        }else {
          console.log('cant place here')
          return
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
              return `winner is ${board[i][0]}`;
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
    
//5. after the game is functioning in the console, create an object
//   to handle the display/DOM logic
      // const displayHandler = (function(){
      //   //grid references
      //   let box00 = document.querySelector('.box00');
      //         row00 = Number(box00.getAttribute('row'));
      //         column00 = Number(box00.getAttribute('column'));
      //   let box01 = document.querySelector('.box01');
      //         row01 = Number(box01.getAttribute('row'));
      //         column01 = Number(box01.getAttribute('column'));
      //   let box02 = document.querySelector('.box02');
      //         row02 = Number(box02.getAttribute('row'));
      //         column02 = Number(box02.getAttribute('column'));
      //   let box10 = document.querySelector('.box10');
      //         row10 = Number(box10.getAttribute('row'));
      //         column10 = Number(box10.getAttribute('column'));
      //   let box11 = document.querySelector('.box11');
      //         row11 = Number(box11.getAttribute('row'));
      //         column11 = Number(box11.getAttribute('column'));
      //   let box12 = document.querySelector('.box12');
      //         row12 = Number(box12.getAttribute('row'));
      //         column12 = Number(box12.getAttribute('column'));
      //   let box20 = document.querySelector('.box20');
      //         row20 = Number(box20.getAttribute('row'));
      //         column20 = Number(box20.getAttribute('column'));
      //   let box21 = document.querySelector('.box21');
      //         row21 = Number(box21.getAttribute('row'));
      //         column21 = Number(box21.getAttribute('column'));
      //   let box22 = document.querySelector('.box22');
      //         row22 = Number(box22.getAttribute('row'));
      //         column22 = Number(box22.getAttribute('column'));

      //   box00.addEventListener('click',() => {
      //     // console.log(row00);
      //     // console.log(column00);
      //     if (!gameBoard.checkBoard(row00, column00)){
      //       box00.textContent = turnCounter.getTurn();
      //     movePlacer(row00,column00);
      //     }
          
      //   })
      //   box01.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row01, column01)){
      //       box01.textContent = turnCounter.getTurn();
      //     movePlacer(row01,column01);
      //     }
      //   })
      //   box02.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row02, column02)){
      //       box02.textContent = turnCounter.getTurn();
      //     movePlacer(row02,column02);
      //     }
      //   })
      //   box10.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row10, column10)){
      //       box10.textContent = turnCounter.getTurn();
      //     movePlacer(row10,column10);
      //     }
          
      //   })
      //   box11.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row11, column11)){
      //       box11.textContent = turnCounter.getTurn();
      //     movePlacer(row11,column11);
      //     }
          
      //   })
      //   box12.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row12, column12)){
      //       box12.textContent = turnCounter.getTurn();
      //     movePlacer(row12,column12);
      //     }
          
      //   })
      //   box20.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row20, column20)){
      //       box20.textContent = turnCounter.getTurn();
      //     movePlacer(row20,column20);
      //     }
          
      //   })
      //   box21.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row21, column21)){
      //       box21.textContent = turnCounter.getTurn();
      //     movePlacer(row21,column21);
      //     }
          
      //   })
      //   box22.addEventListener('click',() => {
      //     if (!gameBoard.checkBoard(row22, column22)){
      //       box22.textContent = turnCounter.getTurn();
      //     movePlacer(row22,column22);
      //     }
          
      //   })


      //   const clearUI = function(){
        
      //   box00.textContent = '';
      //   box01.textContent = '';
      //   box02.textContent = '';
      //   box10.textContent = '';
      //   box11.textContent = '';
      //   box12.textContent = '';
      //   box20.textContent = '';
      //   box21.textContent = '';
      //   box22.textContent = '';
      // }

      // return {clearUI}

      // })();

      //create double array of boxes for the UI that matches the board

      const UIHandler = (function(){
        let chessGrid = document.querySelector('.chessGrid');
        let rowArray = [];
        let columnArray = [];
        let clearButton = document.querySelector('.clearButton');
        // let wipe = wipeBoard(); 
        clearButton.addEventListener('click', () => wipeBoard());
        //create div elements for displaying the player's move
        
        for(let i = 0; i <= 2; i++){

          let columnBox = document.createElement('div');
          if (i < 2){
            //styling the game board's horizontal lines
            columnBox.style.borderBottom = '5px solid black';
          }
          columnBox.className = 'column';
          columnBox.setAttribute('column', `${i}`);
          for (let k = 0; k <= 2; k++){
            let rowBox = document.createElement('div');
            if (k < 2){
              //styling the game board's vertical lines
              rowBox.style.borderRight = '5px solid black';
            }
            rowBox.className = 'rowBoxes';
            
            rowBox.setAttribute('row',`${k}`);
            rowBox.addEventListener('click', () => {
              if (!gameBoard.checkBoard(i,k)){
                rowBox.textContent = turnCounter.getTurn();
                movePlacer(i,k);
              }
            })

            // rowBox.style.border = 'solid 2px aqua'
            
            columnBox.appendChild(rowBox);
            // rowArray[k] = rowBox;
          }
          chessGrid.appendChild(columnBox);
          // columnArray[i] = columnBox;
          
        }
        
        const wipeBoard = function(){
          const rowBoxes = document.querySelectorAll('.rowBoxes');
          const resultLabel = document.querySelectorAll('.result');
          resultLabel.forEach(label => {
            label.textContent = '';
          });
          
          rowBoxes.forEach(rowBox => {
            rowBox.textContent = '';
          });
          resultLabel.textContent = 'x goes first!';
          gameBoard.resetBoard();
        }
        // return {rowArray, columnArray}
      })();

      //create board function, used to wipe the board after a outcome has been reached

      