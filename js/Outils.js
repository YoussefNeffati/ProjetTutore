function Redraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Points.forEach((point, index, arr) => {

     // This is what adds the dots on the canvas
     ctx.beginPath();
     ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
     ctx.fill();

     if(arr.length > 1){
          // Connects the current point to the next
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(arr[index + 1].x, arr[index + 1].y);
          ctx.stroke();
     }
  });


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
    if (painting) {
        drawLineImmediate(previousMousePos.x, previousMousePos.y,
                mousepos.x, mousepos.y);

        previousMousePos = mousepos;
    }
}

function clicked(evt) {
    previousMousePos = getMousePos(canvas, evt);
    painting = true;

    Points.push({x:previousMousePos.x, y:previousMousePos.y});
  
    Redraw();
    
 }

function released(evt) {
    previousMousePos = getMousePos(canvas, evt);
    painting = false;
}

function SaveCanvas() {
    canvasContextShadow.clearRect(0, 0, canvasShadow.width, canvasShadow.height);
    canvasContextShadow.drawImage(canvas, 0, 0);
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
  
