var canvas, ctx, width, height;
var char1;
var mousepos = { x: 0, y: 0 };
var inputStates = {};
var painting = false, previousMousePos;
var raf;

window.onload = init;

function init() {
    
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
  
    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    char1 = new Char(100, 100, 0, 1, 100);

    painting = false;

    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('mousedown', clicked);
    canvas.addEventListener('mouseup', released);

    window.addEventListener('click', function (evt) {
        // on passe le temps en parametres, en millisecondes
        char1.addBullet(Date.now()); 
      
        // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
        // ici, mais juste l'évébement click au lieu de mousedown
        // tu ne pourras pas tirer plus vite, il te faudra
        // marteler le bouton.
        // compare en gardant space appuyé avec la cadence de
        // tir à zero.
    });
  
  window.addEventListener('keydown', function(evt) {
    inputStates.SPACE = true;
  });
  
  window.addEventListener('keyup', function(evt) {
    
    inputStates.SPACE = false;
  });

    anime();
    
}

function anime() {
  
    // 1) On efface l'ecran
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // 2) On dessine et on déplace le char 1
     char1.draw(ctx);
     char1.move(mousepos);
  
    if(inputStates.SPACE) {
      char1.addBullet(Date.now()); 
    }
  
    
    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime);
  
}




