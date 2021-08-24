

class controleur {


   

    getTableauRectangles(){
        return strokes;
    }



    move(obj){
        obj.x += obj.vx;
        obj.y += obj.vy;
    }


    // check si le joueur touche un alien ou les bords
    checkCollisionsJoueur() {
        let collisions = false;
        //On check d'abord les collisions avec les rectangles
        this.tableauRectangles.forEach((r) => {
            if (this.joueur.x < r.x + r.l && this.joueur.x + this.joueur.width > r.x && this.joueur.y < r.y + r.h && this.joueur.y + this.joueur.height > r.y) {
                // si les objets se touchent
                collisions = true;
            }
        });
        //On check les collisions avec les bords
        if (this.joueur.x + this.joueur.width > this.canvas.getWidth() - 45) {
            // on se remet au point de contact
            //player.x = WIDTH - player.width;
            collisions = true;
        }
        if (this.joueur.y + this.joueur.height > this.canvas.getHeight() - 45) {
            collisions = true;
        }
        if (this.joueur.x < 45) {
            collisions = true;
        }
        if (this.joueur.y < 45) {
            collisions = true;
        }
        return collisions;
    }

    startTimer(){
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.augmentationVitesseRectangles();
        }, 1000);
    }

    getScore(){
        return this.timer;
    }

    stopTimer(){
        clearInterval(this.timerInterval);
    }
    //On augmente la vitesse des rectangles au fils du temps
    augmentationVitesseRectangles(){
        if(this.timer === 5){
            this.tableauRectangles.forEach((r) => {
               r.augmenterVitesse();
            });
        } else if(this.timer === 10){
            this.creerLesRectangles();
        } else if(this.timer === 15){
            this.tableauRectangles.forEach((r) => {
                r.augmenterVitesse();
            });
        } else if(this.timer === 20){
            this.creerLesRectangles();
        }
    }
    // en cas de fin de partie, on arrête le timer et les rectangles et on affiche la popup
    finDePartie(){
        this.stopTimer();
        this.EndGameModal.displayModal();
        this.tableauRectangles.forEach((r)=>{
            r.vx = 0;
            r.vy = 0;
        })
    }
}




