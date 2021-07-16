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

function changeCadenceTir(value) {
  char1.delayMinBetweenBullets = value;
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
}

function released(evt) {
    painting = false;
}