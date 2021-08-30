class Alien {
  constructor() {
    this.x;
    this.y;
    this.width = 40;
    this.height = 40;
  }

  draw(point) {
    ctx.save();
    ctx.drawImage(alien, point.x - this.width/2, point.y - this.height/2, this.width, this.height);
    ctx.restore();
  }

}