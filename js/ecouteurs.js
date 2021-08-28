class Ecouteurs {

    constructor(joueur){
        this.joueur = joueur;
        this.inputStates = {}; // =True tant que la barre Espace est appuyé
        this.initEcouteurs();
    }

    initEcouteurs() {

        let canvas = document.getElementById("myCanvas");
        
        canvas.addEventListener("click", clicked);
        canvas.addEventListener('mousemove', handleMouseMove);

        //On crée l'écouteur de la touche enfoncée pour modifier la trajectoire du joueur
        document.addEventListener("keydown", (evt) =>{
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
            if (evt.code === "Space") {
                this.inputStates.SPACE = true;
            }
            
        });
        
        //On arrête le joueur si on relève la touche
        document.addEventListener("keyup", (evt) => {
            
            if (evt.code === "Space") {
                this.inputStates.SPACE = false;
            }
            this.joueur.vx = 0;
            this.joueur.vy = 0;
        });
    }
}