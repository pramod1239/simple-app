window.addEventListener('load', initialize, false);

function initialize() {
    canvas = document.getElementById("paint-canvas");
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    document.getElementById("clear").addEventListener('mousedown', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    canvas.addEventListener('dblclick', event => {
        deleteTriangle(event);
    });
}

var canvas,
    ctx,
    dragging = false,
    dragStartPoint,
    imgData;

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}

function copy() {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function paste() {
    ctx.putImageData(imgData, 0, 0);
}

function drawTriangle(position) {
    var coordinates = [],
        angle = 100,
        sides = 3,

        radius = Math.sqrt(Math.pow((dragStartPoint.x - position.x), 2) + Math.pow((dragStartPoint.x - position.x), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({
            x: dragStartPoint.x + radius * Math.cos(angle),
            y: dragStartPoint.y - radius * Math.sin(angle)
        });
        angle += (2 * Math.PI) / sides;
    }

    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        ctx.lineTo(coordinates[index].x, coordinates[index].y);
    }
    ctx.closePath();
    ctx.fill();
}

function draw(position) {
    drawTriangle(position);
}

function randomColor() {
    var r = Math.round(Math.random() * 256);
    var g = Math.round(Math.random() * 256);
    var b = Math.round(Math.random() * 256);

    return 'rgb( ' + r + ',' + g + ',' + b + ')';
}

function dragStart(event) {
    dragging = true;
    dragStartPoint = getCanvasCoordinates(event);
    copy();
}

function drag(event) {
    var position;
    if (dragging === true) {
        paste();
        position = getCanvasCoordinates(event);
        ctx.fillStyle = randomColor();
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    paste();
    ctx.fillStyle = randomColor();
    var position = getCanvasCoordinates(event);
    draw(position);
}
function deleteTriangle(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}