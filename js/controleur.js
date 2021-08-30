class controleur {

    constructor() {
        this.joueur = new Joueur();
        this.alien = new Alien();
        this.canvas = null;
        this.TabPoints = []; //Tableau des points sur le canvas
        this.TabDessins = []; //Tableau Multidimensionnel contenant les points des courbes à chaque index. 
        this.previousMousePos;
    }

    getTableauDessins() {
        return this.TabDessins;
    }

    getJoueur() {
        return this.joueur;
    }

    getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    move(obj) {
        obj.x += obj.vx;
        obj.y += obj.vy;
    }

    // check si le joueur touche un alien 
    checkCollisionsJoueur() {
        let collisions = false;
        //On check d'abord les collisions avec les alien
        if (this.joueur.x - this.joueur.l < this.alien.x + this.alien.l && this.joueur.x + this.joueur.l > this.alien.x &&
            this.joueur.y - this.joueur.l < this.alien.y + this.alien.l && this.joueur.y + this.joueur.l > this.alien.y) {
            // si les objets se touchent
            collisions = true;

        }

        //On check les collisions avec les bords du canvas
        if (this.joueur.x + this.joueur.l > this.canvas.getWidth()) {
            // on se remet au point de contact
            this.joueur.x = this.canvas.getWidth() - this.joueur.l;
        }
        if (this.joueur.y + this.joueur.l > this.canvas.getHeight()) {
            this.joueur.y = this.canvas.getHeight() - this.joueur.l;
        }
        if (this.joueur.x < 20) {
            this.joueur.x = 20
        }
        if (this.joueur.y < 20) {
            this.joueur.y = 20
        }
        return collisions;
    }


    checkCollisionsBullet() {
        let collisions = false;
        //On check d'abord les collisions avec les alien
        this.canvas.bullets.forEach((bullet) => {
            if (this.alien.x - this.alien.l < bullet.x + bullet.l && this.alien.x + this.alien.l > bullet.x &&
                this.alien.y - this.alien.l < bullet.y + bullet.h && this.alien.y + this.alien.l > bullet.y) {
                // si les objets se touchent
                this.canvas.score += 1;
                collisions = true;
            }
        });

        return collisions;
    }

    //source: https://jsbin.com/fuwagakunu/edit?js,output
    addBullet(time) {
        // si le temps écoulé depuis le dernier tir est > temps max alors on tire
        //pour donner une cadence de tir
        let tempEcoule = 0;

        if (this.lastBulletTime !== undefined) {
            tempEcoule = time - this.lastBulletTime;
        }

        // ici 100 represente 100 ms de cadence de tir
        if ((this.lastBulletTime === undefined) || (tempEcoule > 100)) {
            this.canvas.bullets.push(new Bullet(this.joueur));
            // on mémorise le dernier temps.
            this.lastBulletTime = time;
        }
    }

}




