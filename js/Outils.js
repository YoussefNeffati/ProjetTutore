function Redraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    Points.forEach((point, index, arr) => {
     // This is what adds the dots on the canvas
     ctx.beginPath();
     ctx.lineWidth = 2;
     ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
     ctx.fill();
          // Connects the current point to the next
        //   if(index == 0) 
        //      ctx.moveTo(point.x, point.y);

        //   if(index != arr.length -1) 
        //      ctx.lineTo(arr[index + 1].x, arr[index + 1].y);
          
         
     
  });
}

function clicked(evt) {
    previousMousePos = getMousePos(canvas, evt);
    painting = true;

    Points.push({x:previousMousePos.x, y:previousMousePos.y});
  
    Redraw();
    
 }

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


function getMousePos(canvas, evt) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function drawLineImmediate(x1, y1, x2, y2) {
    // a line is a path with a single draw order
    // we need to do that in this example otherwise
    // at each mouse event we would draw the whole path
    // since the beginning. Remember that lines
    // normally are only usable in path mode
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
}

function handleMouseMove(evt) {
    mousepos = getMousePos(canvas, evt);

    // Let's draw some lines that follow the mouse pos
    // if (painting) {
    //     drawLineImmediate(previousMousePos.x, previousMousePos.y,
    //             mousepos.x, mousepos.y);

    //     previousMousePos = mousepos;
    // }

}



function released(evt) {
    previousMousePos = getMousePos(canvas, evt);
    painting = false;
}

function Dessiner() {
    if(strokes.length == 0){
        return null;
    }

    let arr = strokes[select.selectedIndex];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    //ctx.beginPath();                        // clear path

     for(let i = 0, p; p = arr[i]; i++) { // draw points as fixed-size circles
       let x = p.x,                // normalized to absolute values
           y = p.y;
      
     ctx.beginPath();
     ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
     ctx.fill();

    //   if(i != arr.length -1)  
    //     ctx.lineTo(arr[i + 1].x, arr[i + 1].y);
     }

    // ctx.closePath();
    // ctx.stroke();

    curve(arr, 1.2);
}

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function SaveDessin() {
    if(Points.length == 0){
        return null;
    }

    curve(Points, 1.2)

    strokes.push([]);
    index = strokes.length - 1;

    for(let i = 0, p; p = Points[i]; i++) {
        strokes[index].push({x:Points[i].x, y:Points[i].y});
    }

    let opt = document.createElement('option');
    opt.value = strokes[index];
    opt.innerHTML = "Dessin : " + (index+1);  
    select.appendChild(opt);

    index = index + 1;
    
    Points = [];
    
  }
  
  function ResetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasShadow, 0, 0);
  }

  function setPosition(e) {
    var rect = canvas.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
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

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
    ctx.stroke();
}

function draw(sliderValue) {

    // redraw path
    if(strokes.length == 0){
        return null;
    }
  
    // draw the tracking rectangle
    
    let arr = strokes[select.selectedIndex];
  
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

    
    drawDot(xy, "red");
}
  }
  
  
  // draw tracking rect at xy
  function drawRect(point, color) {
    ctx.fillStyle = "cyan";
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(point.x - 13, point.y - 8, 25, 15);
    ctx.fill();
    ctx.stroke();
  }
  
  // draw tracking dot at xy
  function drawDot(point, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
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