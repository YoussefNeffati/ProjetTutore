let canvas,canvasShadow, canvasContextShadow, ctx, width, height;

let char1;
let mousepos = { x: 0, y: 0 };
let previousMousePos;
let Points = []; //The points are stored in a object array {x,y}
let strokes = [];
let select;

let fps;
let percent;
let direction;
let anime = false;

window.onload = init;

function init() {
    
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    select = document.getElementById('selectDessin');
    percent = 0
    direction = 1;
   
    
    
    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    char1 = new Char(100, 100, 0, 1, 100);

    painting = false;

    canvas.addEventListener("click", clicked);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    
    //animate();
       
}

function animate() {

  // set the animation position (0-100)
  percent += direction;
  if (percent < 0) {
      percent = 0;
      direction = 1;
  };
  if (percent > 100) {
      percent = 0;
  };

  draw(percent);

  // request another frame
  requestAnimationFrame(animate);
    
}




