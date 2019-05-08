const constants = require('../../shared/constants');

const renderPixels = (ctx, sprite) => {
  // select frame
  const frame = sprite.frames[0]; // todo

  // render each layer
  frame.layers.forEach(layer => {
    const pixels = layer.pixels;

    // calculate pixel dims
    const pixelWidth = Math.floor(constants.CANVAS_WIDTH / pixels[0].length);
    const pixelHeight = Math.floor(constants.CANVAS_HEIGHT / pixels.length);

    // iterate rows / cols
    for (let [y, row] of pixels.entries()) {
      console.log("y, row", y, row)
      for (let [x, pixel] of row.entries()) {
        console.log("x, pixel", x, pixel)
        // if pixel is null, should be transparent
        if (pixel) {
          ctx.fillStyle = `hsl(${pixel.h}, ${pixel.s}%, ${pixel.l}%, ${
            pixel.o
          }`;
        } else {
          ctx.fillStyle = `hsl(0, 0%, 0%, 0)`;
        }

        // fill it in
        ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
      }
    }
  });
};

export default renderPixels;
