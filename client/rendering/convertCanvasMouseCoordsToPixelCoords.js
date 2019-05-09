const constants = require('../../shared/constants');

// take screen coordinates and convert them to pixel coordinates
const convertCanvasMouseCoordsToPixelCoords = (canvasMouseCoords, sprite) => {
  const canvasWidth = constants.CANVAS_WIDTH;
  const canvasHeight = constants.CANVAS_HEIGHT;
  const pixelWidth = sprite.frames[0].layers[0].pixels[0].length;
  const pixelHeight = sprite.frames[0].layers[0].pixels.length;
  const mouseX = canvasMouseCoords.x;
  const mouseY = canvasMouseCoords.y;

  const mouseXpixels = Math.floor(mouseX / (canvasWidth / pixelWidth));
  const mouseYpixels = Math.floor(mouseY / (canvasHeight / pixelHeight));

  return { x: mouseXpixels, y: mouseYpixels };
};
export default convertCanvasMouseCoordsToPixelCoords;
