class Ecouteurs {

    constructor(joueur){
        this.joueur = joueur;
        this.initEcouteurs();
    }

    initEcouteurs() {

        canvas.addEventListener("click", clicked);
        canvas.addEventListener('mousemove', handleMouseMove);

        //On crée l'écouteur de la touche enfoncée pour modifier la trajectoire du joueur
        document.addEventListener("keydown", (evt) => {
            switch (evt.key) {
                case "ArrowRight":
                    this.joueur.vx = 5;
                    break;
                case "ArrowLeft":
                    this.joueur.vx = -5;
                    break;
                case "ArrowDown":
                    this.joueur.vy = 5;
                    break;
                case "ArrowUp":
                    this.joueur.vy = -5;
                    break;
            }
        });
        document.addEventListener("keydown", (evt) => {
            let keyCode = evt.key;
            if (keyCode >= 37 && keyCode <= 40) {
                return false;
            }
        });
        //On arrête le joueur si on relève la touche
        document.addEventListener("keyup", () => {
            this.joueur.vx = 0;
            this.joueur.vy = 0;
        });
    }
}