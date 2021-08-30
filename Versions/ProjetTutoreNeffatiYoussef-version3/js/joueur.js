class Joueur {
    constructor() {
      this.x = 70;
      this.y = 70;
      this.l = 20;
      this.width = 40;
      this.height = 40;
      this.vx = 0;
      this.vy = 0;
    }
  
    draw() {
        ctx.save();
        ctx.drawImage(alien, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        ctx.restore();
      }
  
    move() {
      this.x += this.vx;
      this.y += this.vy;    
    }
  
  }