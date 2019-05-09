const renderSingleLayer = (layer, ctx, canvasWidth, canvasHeight) => {
  const pixels = layer.pixels;

  // calculate pixel dims
  const pixelWidth = Math.floor(canvasWidth / pixels[0].length);
  const pixelHeight = Math.floor(canvasHeight / pixels.length);

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

const renderSmallCanvas = (ctx, layers, canvasWidth, canvasHeight) => {
  layers.forEach(layer => {
    renderSingleLayer(layer, ctx, canvasWidth, canvasHeight);
  });
};

export default renderSmallCanvas;
