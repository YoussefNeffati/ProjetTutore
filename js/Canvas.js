class Canvas {

    constructor(ctrl) {
        this.canvas;
        this.width = 0;
        this.height = 0;
        this.ctx = null;
        this.ecouteurs = null;
        this.ctrl = ctrl;
        this.ctrl.setCanvas(this);
        this.TabDessins = this.ctrl.getTableauDessins();
        this.alien = this.ctrl.alien;
        this.joueur = this.ctrl.joueur;
        this.ImageAlien;
        this.ImageJoueur;
        this.animation = null;
        this.select;
        this.score = 0;
        this.percent = 0;
        this.bullets = [];
        this.IDanimation;
        this.init();
    }


    // initiatlisation du canvas, on récupète les dimensions et on définit le contexte, puis on dessine le joueur et les premiers rectangles
    init() {
        document.getElementById('shadow').style.visibility = 'hidden';
        document.getElementById('Jouer').style.visibility = 'hidden';
        this.canvas = document.querySelector("#myCanvas");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
        this.select = document.getElementById('selectDessin');
        this.ImageAlien = document.createElement("img");
        this.ImageAlien.src = "Assets/images/alien2.png";
        this.ImageJoueur = document.createElement("img");
        this.ImageJoueur.src = "Assets/images/ship.png";

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

    update() {

        this.ctrl.move(this.joueur);
        this.DessinePoints(); 
        this.percent += 0.5;

        if (this.percent > 100) {
            this.percent = 0;
        };

        this.draw(this.percent);
        this.drawPlayer(this.joueur);
        this.drawBullets();
        this.ctrl.checkCollisionsBullet();
        document.getElementById('score').innerHTML = "Score: " + this.score;

    }
    
    // la boucle principale du jeu, celle qui va mettre à jour les positions des éléments du canvas et s'arrêter si le joueur touche un alien
    boucleAnimation() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.update();
        
        if(this.ecouteurs.inputStates.SPACE) {
            this.ctrl.addBullet(Date.now());
        }
        
        if (this.ctrl.checkCollisionsJoueur()) {
            document.getElementById('shadow').style.visibility = 'visible';
            document.getElementById('Jouer').style.visibility = 'visible';
            cancelAnimationFrame(this.animation);
        } else {
            this.IDanimation = requestAnimationFrame(this.boucleAnimation.bind(this));
        }
    }

    DessinePoints() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctrl.TabPoints.forEach((point, index, arr) => {

            // Pour chaque points du tableau Points on les redessine sur le Canvas
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = "white";
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    drawPlayer(joueur) {
        this.ctx.save();
        this.ctx.drawImage(this.ImageJoueur, joueur.x - this.joueur.l, joueur.y - this.joueur.l, this.joueur.width, this.joueur.height);
        this.ctx.restore();
    }

    drawAlien(point) {
        this.ctrl.alien.x = Math.round(point.x);
        this.ctrl.alien.y = Math.round(point.y);
        this.ctx.save();
        this.ctx.drawImage(this.ImageAlien, point.x - this.alien.l, point.y - this.alien.l, this.alien.width, this.alien.height);
        this.ctx.restore();
    }

    drawBullets() {
        for(let i = 0; i < this.bullets.length; i++) {
          let b = this.bullets[i];
          b.draw(this.ctx);
          b.move();
          if ((b.x < 0) || (b.y < 0))
                this.removeBullet(b)
    
        }
      }

    removeBullet(bullet) {
        let position = this.bullets.indexOf(bullet);
        this.bullets.splice(position, 1);
    }

    //source : http://jsfiddle.net/m1erickson/LumMX/
    draw(sliderValue) {

        // si il n'y a pas de dessins enregistré, alors le bouton est inutile
        if (this.ctrl.TabDessins.length == 0) {
            return null;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        let arr = this.ctrl.TabDessins[this.select.selectedIndex];
        let xy;

        this.curve(arr, 1.2);

        for (let i = 0; i < arr.length - 1; i++) {
            let p0 = (i > 0) ? arr[i - 1] : arr[0];
            let p1 = arr[i];
            let p2 = arr[i + 1];
            let p3 = (i != arr.length - 2) ? arr[i + 2] : p2;

            let cp1x = p1.x + (p2.x - p0.x) / 6 * 1.2;
            let cp1y = p1.y + (p2.y - p0.y) / 6 * 1.2;

            let cp2x = p2.x - (p3.x - p1.x) / 6 * 1.2;
            let cp2y = p2.y - (p3.y - p1.y) / 6 * 1.2;

            if (sliderValue < 25) {
                let percent = sliderValue / 24;
                xy = getCubicBezierXYatPercent({ x: p1.x, y: p1.y }, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, { x: p2.x, y: p2.y }, percent);
            }

            else if (sliderValue < 50) {
                let percent = (sliderValue - 25) / 24
                xy = getCubicBezierXYatPercent({ x: p1.x, y: p1.y }, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, { x: p2.x, y: p2.y }, percent);
            }

            else if (sliderValue < 75) {
                let percent = (sliderValue - 50) / 24
                xy = getCubicBezierXYatPercent({ x: p1.x, y: p1.y }, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, { x: p2.x, y: p2.y }, percent);
            }

            else {
                let percent = (sliderValue - 75) / 25
                xy = getCubicBezierXYatPercent({ x: p1.x, y: p1.y }, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, { x: p2.x, y: p2.y }, percent);
            }

            this.drawAlien(xy);

        }
    }
    
    //source : https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas?noredirect=1&lq=1
    curve(points, tension) {
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        let t = (tension != null) ? tension : 1;
        for (let i = 0; i < points.length - 1; i++) {
            let p0 = (i > 0) ? points[i - 1] : points[0];
            let p1 = points[i];
            let p2 = points[i + 1];
            let p3 = (i != points.length - 2) ? points[i + 2] : p2;

            let cp1x = p1.x + (p2.x - p0.x) / 6 * t;
            let cp1y = p1.y + (p2.y - p0.y) / 6 * t;

            let cp2x = p2.x - (p3.x - p1.x) / 6 * t;
            let cp2y = p2.y - (p3.y - p1.y) / 6 * t;
            this.ctx.strokeStyle = "white";
            this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
        this.ctx.stroke();
    }

    

}