const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

//variables globales
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
const enemies = [];
let numberOfResources = 300;
const enemyPositions = [];
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
const projectiles = [];


// escuchador de mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener("mouseleave", function(){
    mouse.x = undefined;
    mouse.y = undefined;
})
//gameboard
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

//bucle para crearcasillas
function createGrid(){
    for (let y = cellSize; y < canvas.height; y += cellSize){
        for (let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();                           //dibujamos las casillas
function handleGameGrid(){
    for (let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}


//proyectiles

function handleProjectiles(){
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();
        
        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
        console.log ("proyectiles ", projectiles.length)
    }
}

//defensa
canvas.addEventListener("click", function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);
    if (gridPositionY < cellSize) return;
    for (let i = 0; i < defenders.length; i++){ // no dejamos defensores en el mismo punto
        if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
    }
    let defendersCost = 100;
    if (numberOfResources >= defendersCost) {
        defenders.push(new Defender(gridPositionX, gridPositionY));
        numberOfResources -= defendersCost;
    }
});
function handleDefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].draw();
        defenders[i].update();
        for (let j = 0; j < enemies.length; j++) {
            if (collision(defenders[i], enemies[j])){
                enemies[j].movement = 0;
                defenders[i].health -= 1;
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}
//enemigos
//generador  de enemigos
function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i].x < 0){
            gameOver = true;
        }
    }
    if (frame % enemiesInterval === 0) {//intervalos que se gnera el enemigo
        let verticalPosition = Math.floor(Math.random()* 5 + 1 )* cellSize;
        enemies.push(new Enemy(verticalPosition));
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 25;
    }
}
//recursos
//utilidades
function handleGameStatus(){
    ctx.fillStyle = "Gold";
    ctx.font = "30px Stick No Bills";
    ctx.fillText("resources: " + numberOfResources, 20,55);
    if (gameOver){
        ctx.fillStyle = "black";
        ctx.font = "90px Stick No Bills";
        ctx.fillText("GAME OVER", 153, 330);
    }
}


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleDefenders();
    handleProjectiles();
    handleEnemies();
    handleGameStatus();

    ctx.fillText("resources: " + numberOfResources, 20,55);
    frame++;
    console.log(frame);
     if (!gameOver) requestAnimationFrame(animate);
}
animate();

function collision(first, second){
    if (    !(  first.x > second.x + second.width ||
                first.x + first.width < second.x ||
                first.y > second.y + second.height ||
                first.y + first.height < second.y)
    ) {
        return true;
    };
};