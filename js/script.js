let canvas,canvasShadow, canvasContextShadow, ctx, width, height;

let char1;
let mousepos = { x: 0, y: 0 };
let inputStates = {};
let painting = false, previousMousePos;
let raf;
let Points = []; //The points are stored in a object array {x,y}

window.onload = init;

function init() {
    
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    canvasShadow = canvas.cloneNode();
    canvasContextShadow = canvasShadow.getContext("2d");
    width = canvas.width;
    height = canvas.height;
  
    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    char1 = new Char(100, 100, 0, 1, 100);

    painting = false;

    canvas.addEventListener("click", clicked);

  Redraw();
  

    

    
}

function anime() {
  
    // 1) On efface l'ecran
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // 2) On dessine et on déplace le char 1
     char1.draw(ctx);
     char1.move(mousepos);
     
    
    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(handleMouseMove);
    
}




