const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

//variables globales
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
let numberOfResources = 300;


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
function handleDefefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].draw();
    }
}
//enemigos
//recursos
//utilidades
function handleGameStatus(){
    ctx.fillStyle = "Gold";
    ctx.font = "30 px Arial";
    ctx.fillText("resources: " + numberOfResources, 20,55);
}


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleDefefenders();
    handleGameStatus();
    requestAnimationFrame(animate);
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
