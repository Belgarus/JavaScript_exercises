// This file handles the canvas setup and drawing operations for the Mandelbrot fractal visualization.

const canvas = document.getElementById('mandelbrotCanvas');
const ctx = canvas.getContext('2d');

let zoom = 1;
let offsetX = 0;
let offsetY = 0;

function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawMandelbrot();
}

function drawMandelbrot() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const real = (x - canvas.width / 2) / (200 * zoom) + offsetX;
            const imaginary = (y - canvas.height / 2) / (200 * zoom) + offsetY;
            const value = mandelbrot(real, imaginary);
            const color = getColor(value);
            const pixelIndex = (x + y * canvas.width) * 4;

            data[pixelIndex] = color.r;
            data[pixelIndex + 1] = color.g;
            data[pixelIndex + 2] = color.b;
            data[pixelIndex + 3] = 255; // Alpha
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function getColor(value) {
    const color = { r: 0, g: 0, b: 0 };
    if (value === 255) {
        return color; // Black for points in the Mandelbrot set
    }
    const hue = value % 256;
    color.r = hue;
    color.g = (hue * 2) % 256;
    color.b = (hue * 3) % 256;
    return color;
}

canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomFactor = 1.1;
    if (event.deltaY < 0) {
        zoom /= zoomFactor;
    } else {
        zoom *= zoomFactor;
    }
    drawMandelbrot();
});

canvas.addEventListener('mousemove', (event) => {
    if (event.buttons === 1) { // Left mouse button
        offsetX += (event.movementX / (200 * zoom));
        offsetY += (event.movementY / (200 * zoom));
        drawMandelbrot();
    }
});

window.addEventListener('resize', initializeCanvas);

initializeCanvas();