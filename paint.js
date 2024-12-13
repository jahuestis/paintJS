var canvas;
var context;
var imageData;

var canvasWidth = 800;
var canvasHeight = 600;

var brushLabel = document.getElementById("brushLabel");
var sizeSlider = document.getElementById("sizeSlider");
var clearButton = document.getElementById("clear");

clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
});

var colors = document.getElementsByName("color");
var colorSelected;
colors.forEach(color => {
    if (color.checked) {
        colorSelected = color.value;
    }
    color.addEventListener('change', function() {
        colorSelected = this.value;
    });
});

var brushSize;

var mouseDown;
document.addEventListener('mousedown', function() {
    mouseDown = true;
});

document.addEventListener('mouseup', function() {
    mouseDown = false;
});

var brushX;
var brushY;
document.addEventListener('mousemove', function(event) {
    bounds = canvas.getBoundingClientRect();
    scaleX = canvas.width / bounds.width;
    scaleY = canvas.height / bounds.height;
    brushX = (event.clientX - bounds.left) * scaleX;
    brushY = (event.clientY - bounds.top) * scaleY;
});


window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.width= canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(update);
}

function update() {
    brushSize = sizeSlider.value;
    brushLabel.innerHTML = "Brush Size: " + brushSize;
    if (colorSelected == "black") {
        brushLabel.style.color = "gray";
    } else {
        brushLabel.style.color = colorSelected;
    }

    // draw on the canvas
    context.putImageData(imageData, 0, 0);
    if (brushX > 0 && brushY > 0 && brushX < canvas.width && brushY < canvas.height) {
        if (mouseDown) {
            paint(brushX, brushY, brushSize, colorSelected);
            imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        }
        paint(brushX, brushY, brushSize, colorSelected);
    }
    
    
    // update on next frame
    requestAnimationFrame(update);
}

function paint(x, y, brushSize, color) {
    context.imageSmoothingEnabled = false;
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, brushSize, 0, Math.PI * 2);  // x, y, radius, start angle, end angle
    context.fill();  // Fill the circle with the current fill style
}


