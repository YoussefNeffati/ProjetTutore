class Ecouteurs {

    constructor(joueur) {
        this.joueur = joueur;
        this.inputStates = {}; // =True tant que la barre Espace est appuyé
        this.isDragging = false;
        this.isDragOk = false;
        this.startX = 0;
        this.startY = 0;
        this.initEcouteurs();
    }

    initEcouteurs() {

        let canvas = document.getElementById("myCanvas");

        canvas.addEventListener("click", clicked);

        canvas.addEventListener("mousemove", (e) => {
            if (ctrl.TabDessins.length == 0) {
                return null;
            }

            if (this.isDragOk) {
                cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
                // recuperer la position de la souris
                let mousepos = ctrl.getMousePos(cvs.canvas, e);
               
                let mx = mousepos.x;
                let my = mousepos.y;

                let arr = ctrl.TabDessins[cvs.select.selectedIndex];

                for (let i = 0; i < arr.length - 1; i++) {

                    // calcule la distance que la souris à parcouru
                    // since the last mousemove
                    let dx = mx - this.startX;
                    let dy = my - this.startY;
                    // déplace le joueur à la position de la souris
                    arr[i].x += dx;
                    arr[i].y += dy;
                   
                    // reset la position de la souris pour le prochain déplacement
                    this.startX = mx;
                    this.startY = my;

                    
                }
                cvs.curve(arr, 1.2);
            }
        });

        canvas.addEventListener("mousedown", (e) => {

            if (ctrl.TabDessins.length == 0) {
                return null;
            }

            let mousepos = ctrl.getMousePos(cvs.canvas, e);
            // recuperer la position de la souris
            let mx = mousepos.x;
            let my = mousepos.y;
            this.isDragOk = false;

            let arr = ctrl.TabDessins[cvs.select.selectedIndex];
            for (let i = 0; i < arr.length - 1; i++) {
            if (mx > arr[i].x - 10 && mx < arr[i].x + 10 && my > arr[i].y - 10 && my < arr[i].y + 10) {
                // si la souris est sur le joueur isDragging=true
                this.isDragOk = true;
                this.isDragging = true;
            }
        }
            // enregistre la position de la souris
            this.startX = mx;
            this.startY = my;

        });

        canvas.addEventListener("mouseup", (e) => {
            // tell the browser we're handling this mouse event
            e.preventDefault();
            e.stopPropagation();
            // reset des flags
            this.isDragOk = false;
            this.isDragging = false;
            
        })

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