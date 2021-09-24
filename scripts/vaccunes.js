class Defender{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
        this.doctorType = doctorTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 4;
        this.spritewidth = 149;
        this.spriteHeigth = 100;
    }//dibujar defensor
    draw(){


        ctx.fillStyle = "gold";
        ctx.font = "20px Stick No Bills";

        ctx.drawImage(this.doctorType, this.frameX * this.spritewidth, 0, this.spritewidth, this.spriteHeigth, this.x, this.y, this.width, this.height);
    }
    update(){

        if (frame % 25 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
  
            this.timer++;
            if (this.timer % 100 === 0){
                projectiles.push(new Projectile(this.x + 70, this.y + 50));
            }
        
    }
    // update(){
    //     if (this.shooting){
    //         console.log("se supone dispara ");
    //         this.timer++;
    //         if (this.timer % 100 === 0){
    //             projectiles.push(new Projectile(this.x + 70, this.y + 50));
                
    //         }
    //     } else {
    //         this.timer = 0;
    //     }
    // }
}