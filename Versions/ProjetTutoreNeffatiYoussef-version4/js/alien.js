class Alien {
  constructor() {
    this.x;
    this.y;
    this.width = 40;
    this.height = 40;
    this.l = 20;
  }

  draw(point) {
    this.x = point.x;
    this.y = point.y;
    ctx.save();
    ctx.drawImage(alien, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    ctx.restore();
  }

}