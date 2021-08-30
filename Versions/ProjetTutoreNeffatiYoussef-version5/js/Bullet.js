class Bullet {
  constructor(player) {
      this.x = player.x;
      this.y = player.y - player.l;
      this.l = 2;
      this.h = 10;
  }

  draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, this.l, this.h);
      ctx.restore();
  }

  move() {
      this.y -= 5;
  }
}