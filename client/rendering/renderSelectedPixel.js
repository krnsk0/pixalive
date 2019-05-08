import { convertScreenCoordsToPixelCoords } from './';

const renderSelectedPixel = (ctx, screenCoords, sprite) => {
  const pixelCoords = convertScreenCoordsToPixelCoords(screenCoords, sprite);
};

export default renderSelectedPixel;
