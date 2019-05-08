const constants = require('../../shared/constants');

// take screen coordinates and convert them to pixel coordinates
const convertScreenCoordsToPixelCoords = (screenCoords, sprite) => {
  const canvasWidth = constants.CANVAS_WIDTH;
  const canvasHeight = constants.CANVAS_HEIGHT;
  const pixelWidth = sprite.frames[0].layers[0].pixels[0].length;
  const pixelHeight = sprite.frames[0].layers[0].pixels.length;
  const mouseX = screenCoords.x;
  const mouseY = screenCoords.y;

  const mouseXpixels = Math.floor(mouseX / (canvasWidth / pixelWidth));
  const mouseYpixels = Math.floor(mouseY / (canvasHeight / pixelHeight));

  return { x: mouseXpixels, y: mouseYpixels };
};
export default convertScreenCoordsToPixelCoords;
