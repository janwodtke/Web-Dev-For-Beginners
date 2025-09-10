// Initializing variables
// Boolean that specifies if it's the turn of player X
let xTurn = true;
// tp => twoplayer, c1 => Com Level 1
let mode = 'tp'
// Boxes:
const boxes = document.getElementsByClassName('box');
let field = [['','',''],['','',''],['','','']];

// Clicking a box:
for(let box of boxes) {
    box.addEventListener('click', function() {
        const img = this.querySelector('img');
        const name = box.id;
        const number = parseInt(name[3])-1;
        const row = Math.floor(number/3);
        const col = number%3
        if(!gameOver() && field[row][col] == ''){
            if(xTurn){
                img.src = './images/cross.png';
                field[row][col] = 'x';
            }
            else{
                img.src = './images/circle.png';
                field[row][col] = 'o';
            }
            xTurn = !xTurn;
            if(mode == 'c1' && !gameOver()){
                const moves = possibleMoves();
                const move = moves[Math.floor(Math.random()*moves.length)]
                const id = "box" + ((move[0]*3) + move[1] +1);
                const elem = document.getElementById(id);
                const img2 = elem.querySelector('img');
                img2.src = './images/circle.png';
                field[move[0]][move[1]] = 'o';
                xTurn = !xTurn;
            }
        }
        if(gameOver()){
            if(xTurn) document.getElementById('winner').innerHTML = "The winner is Player 2";
            else document.getElementById('winner').innerHTML = "The winner is Player 1";
        }

    })
}

// Checks if the game is over.
// returns True if game is over, otherwise returns false
function gameOver(){
    if(
        field[0][0] != '' && field[0][0] == field[0][1] && field[0][1] == field[0][2] || // Checks first row for win condition
        field[1][0] != '' && field[1][0] == field[1][1] && field[1][1] == field[1][2] || // Checks second row for win conditio
        field[2][0] != '' && field[2][0] == field[2][1] && field[2][1] == field[2][2] || // Checks third row for win condition
        field[0][0] != '' && field[0][0] == field[1][0] && field[0][0] == field[2][0] || // Checks first column for win con
        field[0][1] != '' && field[0][1] == field[1][1] && field[0][1] == field[2][1] || // Checks second column for win con
        field[0][2] != '' && field[0][2] == field[1][2] && field[0][2] == field[2][2] || // Checks third column for win con
        field[0][0] != '' && field[0][0] == field[1][1] && field[0][0] == field[2][2] || // Checks first diagonal for win con
        field[2][0] != '' && field[2][0] == field[1][1] && field[2][0] == field[0][2] // Checks second diag for win con 
    ) return true;
    else return false;
}

function score(){
    if(gameOver()){
        // Player won
        if(xTurn) return 1;
        // Com won
        else return -1;
    }
    // No winner
    return 0;
}

function possibleMoves(){
    let moves = [];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(field[i][j] == '') moves.push([i,j]);
        }
    }
    return moves;
}

const dialog = document.getElementById('myDialog');
    dialog.addEventListener('close', () => {
      if (dialog.returnValue == "Singleplayer Easy") {
        mode = 'c1';
      }
    });