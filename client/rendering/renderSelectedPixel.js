import { convertCanvasToPixelCoords } from './';
const constants = require('../../shared/constants');

const renderSelectedPixel = (ctx, screenCoords, sprite) => {
  const pixelCoords = convertCanvasToPixelCoords(screenCoords, sprite);

  const pixelWidth = Math.floor(
    constants.CANVAS_WIDTH / sprite.frames[0].layers[0].pixels[0].length
  );
  const pixelHeight = Math.floor(
    constants.CANVAS_HEIGHT / sprite.frames[0].layers[0].pixels.length
  );

  if (screenCoords.x !== false && screenCoords.y !== false) {
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
