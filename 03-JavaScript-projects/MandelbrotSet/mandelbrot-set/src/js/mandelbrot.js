function drawMandelbrot(ctx, width, height, zoom, offsetX, offsetY) {
    const maxIterations = 100;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx = 0;
            let zy = 0;
            let i = 0;

            const cx = (x - width / 2) / (0.5 * zoom * width) + offsetX;
            const cy = (y - height / 2) / (0.5 * zoom * height) + offsetY;

            while (zx * zx + zy * zy < 4 && i < maxIterations) {
                const tmp = zx * zx - zy * zy + cx;
                zy = 2.0 * zx * zy + cy;
                zx = tmp;
                i++;
            }

            const pixelIndex = (x + y * width) * 4;
            const color = (i === maxIterations) ? 0 : (i / maxIterations) * 255;

            data[pixelIndex] = color;     // Red
            data[pixelIndex + 1] = color; // Green
            data[pixelIndex + 2] = color; // Blue
            data[pixelIndex + 3] = 255;   // Alpha
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function renderMandelbrot(canvas, zoom, offsetX, offsetY) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    drawMandelbrot(ctx, width, height, zoom, offsetX, offsetY);
}

export { renderMandelbrot };