class Canvas {

    constructor(ctrl) {
        this.width = 0;
        this.height = 0;
        this.ecouteurs = null;
        this.ctrl = ctrl;
        this.ctrl.setCanvas(this);
        this.strokes = this.ctrl.getTableauDessins();
        this.alien = this.ctrl.alien;
        this.ImageAlien;
        this.ImageJoueur;
        this.joueur = this.ctrl.getJoueur();
        this.ctx = null;
        this.animation = null;
        this.percent = 0;
        this.IDanimation;
        this.init();
    }

    
    // initiatlisation du canvas, on récupète les dimensions et on définit le contexte, puis on dessine le joueur et les premiers rectangles
    init() {
        let canvas = document.querySelector("#myCanvas");
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.ImageAlien = document.createElement("img");
        this.ImageAlien.src = "/images/alien0.png";
        this.ImageJoueur = document.createElement("img");
        this.ImageJoueur.src = "/images/ship.png";

        this.ecouteurs = new Ecouteurs(this.joueur);

        this.draw();
        this.animation = requestAnimationFrame(this.boucleAnimation.bind(this));
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getCanvas() {
        return this.canvas;
    }


    // la boucle principale du jeu, celle qui va mettre à jour les positions des éléments du canvas et s'arrêter si le joueur touche quelquechose
    boucleAnimation() {
        //this.ctx.clearRect(0, 0, this.width, this.height);
        this.update();
        this.drawPlayer(this.joueur);
        if (this.ctrl.checkCollisionsJoueur()) {
            cancelAnimationFrame(this.animation);
        } else {
            this.IDanimation = requestAnimationFrame(this.boucleAnimation.bind(this));
        }
    }

    drawPlayer(joueur) {
        this.ctx.save();
        this.ctx.drawImage(this.ImageJoueur, joueur.x, joueur.y , 40, 40);
        this.ctx.restore();
    }

    drawAlien(point) {
        this.ctrl.alien.x = point.x;
        this.ctrl.alien.y = point.y;
        ctx.save();
        ctx.drawImage(this.ImageAlien, point.x - this.alien.width/2, point.y - this.alien.height/2, this.alien.width, this.alien.height);
        ctx.restore();
      }
    

    //appel de méthodes , on dessine les rectangles du tableau de rectangles et le joueur
    draw() {
        this.ctrl.checkCollisionsJoueur();

    }

    // on récupère les nouvelles coordonnées du crl et on dessine les formes
    update() {

        this.ctrl.checkCollisionsJoueur();
        this.joueur.move();

        DessinePoints();

        this.percent += 0.5;

        if (this.percent > 100) {
            this.percent = 0;
        };

        draw(this.percent);



    }
}