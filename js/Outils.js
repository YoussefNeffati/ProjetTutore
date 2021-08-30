function clicked(evt) {
  
  previousMousePos = ctrl.getMousePos(cvs.canvas, evt);

  ctrl.TabPoints.push({ x: previousMousePos.x, y: previousMousePos.y });

  cvs.DessinePoints();
  
}



function ReDessiner() {
  if (ctrl.TabDessins.length == 0) {
    return null;
  }

  let arr = ctrl.TabDessins[cvs.select.selectedIndex];

  cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);

  for (let i = 0; i < arr.length; i++) { 
    cvs.ctx.beginPath();
    cvs.ctx.arc(arr[i].x, arr[i].y, 4, 0, 2 * Math.PI);
    cvs.ctx.fill();
  }

  cvs.curve(arr, 1.2);
  document.getElementById("toggle").disabled = false;

}


function SaveDessin() {
  if (ctrl.TabPoints.length == 0) {
    return null;
  }

  cvs.curve(ctrl.TabPoints, 1.2)

  ctrl.TabDessins.push([]);
  index = ctrl.TabDessins.length - 1;

  for (let i = 0, p; p = ctrl.TabPoints[i]; i++) {
    ctrl.TabDessins[index].push({ x: ctrl.TabPoints[i].x, y: ctrl.TabPoints[i].y });
  }

  let opt = document.createElement('option');
  opt.value = ctrl.TabDessins[index];
  opt.innerHTML = "Dessin : " + (index + 1);
  cvs.select.appendChild(opt);

  cvs.select.selectedIndex = index;
  index = index + 1;

  ctrl.TabPoints = [];

  document.getElementById("toggle").disabled = false;

}

function Clear() {
  cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctrl.TabPoints = [];
  cancelAnimationFrame(cvs.animation);
  cvs.animation = 0;
  document.getElementById("toggle").disabled = true;
  document.getElementById("toggle").innerHTML = "Reprendre le jeu";
}

//source : https://www.toutjavascript.com/reference/ref-window.requestanimationframe.php
function toggleAnimation() {
  if (cvs.animation == 0) { // Animation stoppée : on la relance
    cvs.boucleAnimation();
    document.getElementById("toggle").innerHTML = "Mode Editeur";
  } else {  // Arrêt de l'animation
    cancelAnimationFrame(cvs.animation);
    cvs.animation = 0;
    Clear();
    document.getElementById("toggle").innerHTML = "Reprendre le jeu";
  }
}
//source : http://jsfiddle.net/m1erickson/LumMX/
function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
  let x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  let y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return ({
    x: x,
    y: y
  });
}
//source : http://jsfiddle.net/m1erickson/LumMX/
function CubicN(pct, a, b, c, d) {
  let t2 = pct * pct;
  let t3 = t2 * pct;
  return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
}