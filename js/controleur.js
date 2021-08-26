class controleur {

    constructor(){
        this.joueur = new Joueur();
        this.alien = new Alien();
        this.canvas = null;
        this.Points = []; //The points are stored in a object array {x,y}
        this.strokes = [];
        this.mousepos = { x: 0, y: 0 };
        this.previousMousePos;
    }



    getTableauDessins(){
        return this.strokes;
    }

    getJoueur(){
        return this.joueur;
    }

    getAlien(){
        return this.alien;
    }

    setCanvas(canvas){
        this.canvas = canvas;
    }


    move(obj){
        obj.x += obj.vx;
        obj.y += obj.vy;
    }


    // check si le joueur touche un alien 
    checkCollisionsJoueur() {
        let collisions = false;
        //On check d'abord les collisions avec les rectangles
            if (this.joueur.x < this.alien.x + this.alien.l && this.joueur.x + this.joueur.width > this.alien.x && this.joueur.y < this.alien.y + this.alien.l && this.joueur.y + this.joueur.height > this.alien.y) {
                // si les objets se touchent
                cancelAnimationFrame(cvs.IDanimation)
                cvs.IDanimation=0;
            }
        
        //On check les collisions avec les bords
        if (this.joueur.x + this.joueur.width > this.canvas.getWidth() - 5) {
            // on se remet au point de contact
            this.joueur.x = this.canvas.getWidth() - this.joueur.width - 5;
        }
        if (this.joueur.y + this.joueur.height > this.canvas.getHeight() - 5) {
            this.joueur.y = this.canvas.getHeight() - this.joueur.height - 5;
        }
        if (this.joueur.x < 2) {
            this.joueur.x = 2
        }
        if (this.joueur.y < 2) {
            this.joueur.y = 2
        }
       
    }


    
}




