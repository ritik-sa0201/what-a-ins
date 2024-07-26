let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;

window.onload = function() {
    setGame();
}

function setGame() { 
    // Clear the board
    let board = document.getElementById("board");
    board.innerHTML = "";

    // Create the board tiles
    for (let i = 0; i < 9; i++) {
        let pot = document.createElement('div');
        pot.id = i.toString();
        pot.addEventListener("click", selectTile);
        board.appendChild(pot);
    }

    // Start intervals for moles and plants
    moleInterval = setInterval(setMole, 2000); 
    plantInterval = setInterval(setPlant, 1000); 
}

function getRandomTile() {
    // Math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "bf.png.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "f.png";
    plant.setAttribute("data-clicked", "false"); // Initialize plant as not clicked

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currPlantTile && currPlantTile.firstChild.getAttribute("data-clicked") === "false") {
        score += 10;
        currPlantTile.firstChild.setAttribute("data-clicked", "true"); // Mark plant as clicked
        document.getElementById("score").innerText = `SCORE: ${score.toString()}`; // Update score HTML
    }
    else if (this == currMoleTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // Update score HTML
        gameOver = true;
        clearInterval(moleInterval);
        clearInterval(plantInterval);
    }
}

function resetGame() {
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;
    document.getElementById("score").innerText = `SCORE: ${score}`;
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    setGame();
}

document.getElementById("btn1").addEventListener("click", setGame);
document.getElementById("btn2").addEventListener("click", resetGame);
