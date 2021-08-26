window.onload = init;

function init() {

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    select = document.getElementById('selectDessin');
    
    
    vaisseau = document.createElement("vaisseau");
    vaisseau.src = "/images/alien1.png";
    
    //percent = 0;
    
    ctrl = new controleur();
    cvs = new Canvas(ctrl);
    //let ecouteurs = new Ecouteurs(ctrl.joueur);
    
    //animate();

}

function animate() {

    // set the animation position (0-100)
    percent += 0.5;
    
    if (percent > 100) {
        percent = 0;
    };
    
    draw(percent);
    
    
    
    //IDanimation = requestAnimationFrame(animate);
    
}




