class Defender{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }//dibujar defensor
    draw(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "gold";
        ctx.font = "20px Stick No Bills";
        ctx.fillText(Math.floor(this.health),this.x + 15,this.y + 30); 
    }
    update(){
         this.timer++;
         if (this.timer % 100 === 0){
             projectiles.push(new Projectile(this.x, this.y))
         }
    }
}