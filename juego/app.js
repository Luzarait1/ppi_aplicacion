
//Game objects
const PLAYER = 1;
const TILE = 0;
const FOOD = -1;

//Game size
const ROWS = 8;
const COLS = 8;

//starting positions
const STARTINGROW = 7;
const STARTINGCOL = 0;

//number of food at the start
let remainingFood = 10;
let score = 0;
let moves = 40;

let playerPosRow = STARTINGROW;
let playerPosCol = STARTINGCOL;

//2d array
const gameArray = [];

const game = document.querySelector("#game");
const gameScore = document.querySelector("#score");
const gameMoves = document.querySelector("#moves");
const food = document.querySelector("#food");
const container = document.querySelector(".container");
const state = document.querySelector(".game-state");

const initialiseGame = () => {
    for(let row = 0; row < ROWS; row++) {
        let subArray = [];
        for (let col = 0; col < COLS; col++) {
            subArray.push(TILE)
        }
        gameArray.push(subArray);
    }

    //Place player
    gameArray[STARTINGROW][STARTINGCOL] = PLAYER;

    //Place food
    placeFood();

    renderGame();
};

const placeFood = () => {
    let counter = 0;
    while(counter < remainingFood) {
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);
        if(gameArray[row][col] === TILE) {
            gameArray[row][col] = FOOD;
            counter++;
        }
    }
}

const renderGame = () => {

    gameScore.textContent = score;
    gameMoves.textContent = moves;
    food.innerHTML = remainingFood;

    game.innerHTML = "";
    for(let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if(gameArray[row][col] === PLAYER) {
                game.innerHTML += "<div class='player'></div>";
            }
            if(gameArray[row][col] === TILE) {
                game.innerHTML += "<div class='tile'></div>";
            }
            if(gameArray[row][col] === FOOD) {
                game.innerHTML += "<div class='food'></div>";
            }
        }
        game.innerHTML += "<div class='break'></div>"
    }
};


document.addEventListener("keydown", e => {
    e.preventDefault();

    const oldPosRow = playerPosRow;
    const oldPosCol = playerPosCol;

    if(e.code === "ArrowUp") {
        if(playerPosRow - 1 < 0) return;
        playerPosRow--;
    }
    if(e.code === "ArrowDown") {
        if(playerPosRow + 1 >= ROWS) return;
        playerPosRow++;
    }
    if(e.code === "ArrowLeft") {
        if(playerPosCol - 1 < 0) return;
        playerPosCol--;
    }
    if(e.code === "ArrowRight") {
        if(playerPosCol + 1 >= COLS) return;
        playerPosCol++;
    }
    movePlayer(oldPosRow, oldPosCol, playerPosRow, playerPosCol);
});

const movePlayer = (oldRow, oldCol, newRow, newCol) => {
    moves--;
    score -= 5;
    if (gameArray[newRow][newCol] === FOOD) {
        remainingFood--;
        score += 50;
    }
    gameArray[newRow][newCol] = PLAYER;
    gameArray[oldRow][oldCol] = TILE;
    renderGame();
    checkGameState();
};

const checkGameState = () => {
    if(moves > 0 && gameArray[STARTINGROW][STARTINGCOL] === PLAYER && remainingFood === 0) {
        state.innerHTML = game.innerHTML = "";
        container.innerHTML += `<div class='results'>
            <h4>Has Ganado</h4>
            <p>Su puntaje es ${score} y los movimientos restantes son ${moves}</p>
            </div>`;
    }
    if(moves < 1 && remainingFood > 0) {
        state.innerHTML = game.innerHTML = "";
        container.innerHTML += `<div class='results'>
            <h4>Perdiendo</h4>
            <p>Su puntaje es ${score} y los movimientos restantes son ${moves}</p>
            </div>`;
    }
    if(moves < 1 && remainingFood > 0 && gameArray[STARTINGROW][STARTINGCOL] !== PLAYER) {
        state.innerHTML = game.innerHTML = "";
        container.innerHTML += `<div class='results'>
            <h4>Has Perdido</h4>
            <p>Su puntaje es ${score} y los movimientos restantes son ${moves}</p>
            </div>`;
    }

}

initialiseGame();



