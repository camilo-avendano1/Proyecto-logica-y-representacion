const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

  

//variables globales
const amounts = [20,30,40];
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
let score = 0;
let recursos = [];
const winningScore = 100;

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
        
        for (let j = 0;j < enemies.length; j++){
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j] )){
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}

//defensa

const doctorTypes = []
const doctor = new Image();
doctor.src = "../sprites/doctor.png";
doctorTypes.push(doctor);


canvas.addEventListener("click", function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize) +cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) +cellGap;
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
        // if (enemyPositions.indexOf(defenders[i].y) !== -1){
        //     defenders[i].shooting = true;
        //     return true;
        // } else {
        //     defenders[i].shooting = false;
        // }
        for (let j = 0; j < enemies.length; j++){
            if (defenders[i] && collision(defenders[i], enemies[j])){
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
const enemyTypes = []
const virus = new Image();
virus.src = "../sprites/virus.png";
enemyTypes.push(virus);

function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

        if (enemies[i].x < 0){
            gameOver = true;
        }
        if (enemies[i].health <= 0){
            let ganarRecursos = enemies[i].maxHealth/10;
            numberOfResources = numberOfResources + ganarRecursos;
            score += ganarRecursos;
            const index = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(index, 1);
            enemies.splice(i,1);
            i--;
            console.log(enemyPositions);
        }
    }
    if (frame % enemiesInterval === 0) {//intervalos que se gnera el enemigo
        let verticalPosition = Math.floor(Math.random()* 5 + 1 )* cellSize;
        enemies.push(new Enemy(verticalPosition));
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 25;
        console.log(enemyPositions);
    }
}
//recursos

const coinTypes = []
const coin = new Image();
coin.src = "../sprites/coin.png";
coinTypes.push(coin);


function handleRecursos(){
    if (frame % 400 === 0 ){
        
        recursos.push(new Monedas());
    }
    for (let i = 0; i < recursos.length; i++){
        recursos[i].draw();
        if (recursos[i] && mouse.x && mouse.y && collision(recursos[i], mouse)){
            numberOfResources += recursos[i].amount;
            recursos.splice(i, 1);
            i--;
        }
    }
}

//utilidades
function handleGameStatus(){
    ctx.fillStyle = "Gold";
    ctx.font = "30px Stick No Bills";
    ctx.fillText("puntuacion: " + score, 400,55);
    ctx.fillText("Recursos: " + numberOfResources, 20,55);
    if (gameOver){
        ctx.fillStyle = "black";
        ctx.font = "90px Stick No Bills";
        ctx.fillText("GAME OVER", 153, 330);
    }
    if (score >= winningScore ){
        ctx.fillStyle = 'black';
        ctx.font = '60px Stick no Bilss';
        ctx.fillText('Salvaste la humanidad', 130, 300);
        ctx.font = '30px Stick no Bilss';
        ctx.fillText('Derrotaste todas las variables del covid ' , 134, 340);
    }
}


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleDefenders();
    handleProjectiles();
    handleRecursos();
    handleEnemies();
    handleGameStatus();
    frame++;

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


window.addEventListener("resize", function(){
    canvasPosition = canvas.getBoundingClientRect();
})