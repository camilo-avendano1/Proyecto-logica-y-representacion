class Monedas {
    constructor(){
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1 ) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random()) * amounts.length];
        this.coinType = coinTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 4;
        this.spritewidth = 160;
        this.spriteHeigth = 130;
    }
    draw(){
    ctx.drawImage(this.coinType, this.frameX * this.spritewidth, 0, this.spritewidth, this.spriteHeigth, this.x, this.y, this.width, this.height);
    }
}