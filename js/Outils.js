
//Cette Fonction est utilisé lors ce que clicked et utilisé
//elle permet de redessiner tous les points qu'on a cliqué
function DessinePoints(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctrl.Points.forEach((point, index, arr) => {

     // Pour chaque points du tableau Points on les redessine sur le Canva
     ctx.beginPath();
     ctx.lineWidth = 2;
     ctx.fillStyle = "white";
     ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
     ctx.fill();
  });
}

function clicked(evt) {
    previousMousePos = getMousePos(canvas, evt);

    ctrl.Points.push({x:previousMousePos.x, y:previousMousePos.y});
  
    DessinePoints();
    
 }
 

function getMousePos(canvas, evt) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function handleMouseMove(evt) {
    mousepos = getMousePos(canvas, evt);
}




function Dessiner() {
    if(ctrl.strokes.length == 0){
        return null;
    }

    let arr = ctrl.strokes[select.selectedIndex];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    //ctx.beginPath();                        // clear path

     for(let i = 0, p; p = arr[i]; i++) { // draw points as fixed-size circles
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
      ctx.fill();
     }
     
     curve(arr, 1.2);
}


function SaveDessin() {
    if(ctrl.Points.length == 0){
        return null;
    }

    curve(ctrl.Points, 1.2)

    ctrl.strokes.push([]);
    index = ctrl.strokes.length - 1;

    for(let i = 0, p; p = ctrl.Points[i]; i++) {
      ctrl.strokes[index].push({x:ctrl.Points[i].x, y:ctrl.Points[i].y});
    }

    let opt = document.createElement('option');
    opt.value = ctrl.strokes[index];
    opt.innerHTML = "Dessin : " + (index+1);  
    select.appendChild(opt);

    select.selectedIndex = index;
    index = index + 1;
    
    ctrl.Points = [];

    
    
  }

  function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctrl.Points = [];
    cancelAnimationFrame(cvs.IDanimation);
    cvs.IDanimation=0;
      document.getElementById("toggle").innerHTML="Relancer l'animation";
}


  function curve(points, tension) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    var t = (tension != null) ? tension : 1;
    for (let i = 0; i < points.length - 1; i++) {
        let p0 = (i > 0) ? points[i - 1] : points[0];
        let p1 = points[i];
        let p2 = points[i + 1];
        let p3 = (i != points.length - 2) ? points[i + 2] : p2;

        let cp1x = p1.x + (p2.x - p0.x) / 6 * t;
        let cp1y = p1.y + (p2.y - p0.y) / 6 * t;

        let cp2x = p2.x - (p3.x - p1.x) / 6 * t;
        let cp2y = p2.y - (p3.y - p1.y) / 6 * t;
        ctx.strokeStyle = "white";
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
    ctx.stroke();
}

function toggleAnimation() {
  console.log(cvs.IDanimation)
  if (cvs.IDanimation==0) { // Animation stoppée : on la relance
      cvs.boucleAnimation();
      document.getElementById("toggle").innerHTML="Arrêter l'animation";
  } else {  // Arrêt de l'animation
      cancelAnimationFrame(cvs.IDanimation);
      cvs.IDanimation=0;
      document.getElementById("toggle").innerHTML="Relancer l'animation";
  }
}

function draw(sliderValue) {

    // redraw path
    if(ctrl.strokes.length == 0){
        return null;
    }
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    // draw the tracking rectangle
    let arr = ctrl.strokes[select.selectedIndex];
  
    curve(arr, 1.2);

    
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
        var percent = sliderValue / 24;
        
      xy = getCubicBezierXYatPercent({
        x: p1.x,
        y: p1.y
      }, {
        x: cp1x,
        y: cp1y
      }, {
        x: cp2x,
        y: cp2y
      }, {
        x: p2.x,
        y: p2.y
      }, percent);

    } 
    
    else if (sliderValue < 50) {
      var percent = (sliderValue - 25) / 24
      xy = getCubicBezierXYatPercent({
        x: p1.x,
        y: p1.y
      }, {
        x: cp1x,
        y: cp1y
      }, {
        x: cp2x,
        y: cp2y
      }, {
        x: p2.x,
        y: p2.y
      }, percent);
    } 
    
    else if (sliderValue < 75) {
      var percent = (sliderValue - 50) / 24
      xy = getCubicBezierXYatPercent({
        x: p1.x,
        y: p1.y
      }, {
        x: cp1x,
        y: cp1y
      }, {
        x: cp2x,
        y: cp2y
      }, {
        x: p2.x,
        y: p2.y
      }, percent);
    } 
    
    else {
        var percent=(sliderValue-75)/25
        xy = getCubicBezierXYatPercent({x: p1.x,y: p1.y},{x: cp1x, y: cp1y}, {x: cp2x, y: cp2y}, {x: p2.x, y: p2.y}, percent);
    }

    cvs.drawAlien(xy);
    //ctrl.getAlien().draw(xy);
    //drawDot(xy, "red");
    //alien.draw(xy);
    
  }
}
  
function preload() {
  this.imgs.push(loadImage('images/ship.png'));
  this.imgs.push(loadImage('images/alien0.png'));
  this.imgs.push(loadImage('images/alien1.png'));
  this.imgs.push(loadImage('images/alien2.png'));
}

function keyPressed() {
  if (keyIsPressed) {
    keys.push(key);
  }
}

function keyReleased() {
  for (var i = 0; i < keys.length; i++) {
    keys.splice(key[i], 1);
  }
}

function getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent) {
    var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
    var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
    return ({
      x: x,
      y: y
    });
  }

  function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
    var x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
    var y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
    return ({
      x: x,
      y: y
    });
  }

  function CubicN(pct, a, b, c, d) {
    var t2 = pct * pct;
    var t3 = t2 * pct;
    return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
  }