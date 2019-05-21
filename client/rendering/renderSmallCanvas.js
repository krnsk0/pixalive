const renderSmallCanvas = (ctx, pixels, canvasWidth, canvasHeight) => {
  // calculate pixel dims
  const pixelWidth = canvasWidth / pixels[0].length;
  const pixelHeight = canvasHeight / pixels.length;

  // iterate rows / cols
  for (let [y, row] of pixels.entries()) {
    for (let [x, pixel] of row.entries()) {
      if (pixel) {
        // set color
        ctx.fillStyle = `hsl(${pixel.h}, ${pixel.s}%, ${pixel.l}%, 1.0)`;
      } else {
        ctx.fillStyle = `hsl(0, 0%, 0%, 0.0)`;
      }

      // fill it in
      ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
    }
  }
};

export default renderSmallCanvas;
