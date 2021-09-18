const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

//variables globales
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];

//gameboard
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}
function createGrid(){               //bucle para dibujar casillas
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x,y));
        }
    }
}
createGrid();                           //dibujamos las casillas
function handleGameGrid (){
    for (let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}
handleGameGrid();
console.log(gameGrid)
//proyectiles
//defensa
//enemigos
//recursos
//utilidades

function animate(){
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0, controlsBar.width, controlsBar.height);
    requestAnimationFrame(animate);
}
animate();