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
        // bonne pratique = sauver et restaurer le contexte graphique
        // quand on modifie des propriétés globales comme la couleur
        // le repère global, etc.

        ctx.save();

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

}