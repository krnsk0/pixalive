import { convertCanvasToPixelCoords } from './';
const constants = require('../../shared/constants');



const renderSelectedPixel = (ctx, canvasCoords, sprite) => {
  const pixelCoords = convertCanvasToPixelCoords(canvasCoords, sprite);

  const pixelWidth = Math.floor(
    constants.CANVAS_WIDTH / sprite.frames[0].layers[0].pixels[0].length
  );
  const pixelHeight = Math.floor(
    constants.CANVAS_HEIGHT / sprite.frames[0].layers[0].pixels.length
  );

  if (canvasCoords.x !== false && canvasCoords.y !== false) {
    ctx.fillStyle = constants.PIXEL_HIGHLIGHT_COLOR;
    //
    ctx.fillRect(
      pixelCoords.x * pixelWidth,
      pixelCoords.y * pixelHeight,
      pixelWidth,
      pixelHeight
    );
  }
};

export default renderSelectedPixel;
