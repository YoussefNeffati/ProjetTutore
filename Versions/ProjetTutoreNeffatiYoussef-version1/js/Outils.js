function Redraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    Points.forEach((point, index, arr) => {
     // This is what adds the dots on the canvas
     
     ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);

          // Connects the current point to the next
          if(index == 0) 
             ctx.moveTo(point.x, point.y);

          if(index != arr.length -1) 
             ctx.lineTo(arr[index + 1].x, arr[index + 1].y);
          
          ctx.stroke();
     

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
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.beginPath();                        // clear path
    for(let i = 0, p; p = Points[i]; i++) { // draw points as fixed-size circles
      let x = p.x,                // normalized to absolute values
          y = p.y;
      
      ctx.moveTo(x, y);
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      
      if(i != Points.length -1)  
        ctx.lineTo(Points[i + 1].x, Points[i + 1].y);
        
    }
    ctx.closePath();
    ctx.stroke();
}

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function SaveDessin() {
    strokes.push([]);
    index = strokes.length - 1;

    for(let i = 0, p; p = Points[i]; i++) {
        strokes[index].push({x:Points[i].x, y:Points[i].y});
    }

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
  
