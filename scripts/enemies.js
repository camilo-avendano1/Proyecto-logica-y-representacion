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
    
    }
    update(){
        this.x -= this.movement;

    }
    draw(){
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText(Math.floor(this.health),this.x,this.y); 
    }
    
}