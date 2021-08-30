let canvas, shipCanvas, canvasShadow, canvasContextShadow, ctx, width, height;

let char1;
let mousepos = { x: 0, y: 0 };
let previousMousePos;
let Points = []; //The points are stored in a object array {x,y}
let strokes = [];
let select;
var numImages = 5;
var numLoaded = 0;
let fps;
let percent;
let direction;
var keys = [];
var bullets = [];
var settings;
let xy;

window.onload = init;

function init() {

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    select = document.getElementById('selectDessin');
    
    alien = document.createElement("img");
    alien.src = "/images/alien0.png";
    vaisseau = document.createElement("img2");
    vaisseau.src = "/images/alien1.png";
    
    percent = 0;
    
    alien1 = new Alien();
    joueur1 = new Joueur();

    let ecouteurs = new Ecouteurs(joueur1);
    
    joueur1.draw();
    animate();

}

function animate() {

    let anime;
    // set the animation position (0-100)
    percent += 0.5;
    
    if (percent > 100) {
        percent = 0;
    };
    
    draw(percent);
    
    joueur1.move();
    
    IDanimation = requestAnimationFrame(animate);
    
}




