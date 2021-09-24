class Enemy{
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.spritewidth = 142;
        this.spriteHeigth = 157;
    }
    update(){
        this.x -= this.movement;
        if (frame % 20 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }


    }
    draw(){
    ctx.drawImage(this.enemyType, this.frameX * this.spritewidth, 0, this.spritewidth, this.spriteHeigth, this.x, this.y, this.width, this.height);
    }
    
}