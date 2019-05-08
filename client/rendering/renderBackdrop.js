/* eslint-disable no-lonely-if */
const constants = require('../../shared/constants');

// renders a checkered background that shows through transparent or partly transparent squares
const renderBackdrop = ctx => {
  // determine # of rows and cols to render
  const colCount =
    Math.floor(constants.CANVAS_WIDTH / constants.BACKDROP_PIXEL_SIZE) + 1;
  const rowCount =
    Math.floor(constants.CANVAS_WIDTH / constants.BACKDROP_PIXEL_SIZE) + 1;

  for (let y = 0; y < rowCount; y += 1) {
    for (let x = 0; x < colCount; x += 1) {
      let color;

      let darkColor = `hsl(0, 0%, 80%, 1.0)`;
      let lightColor = `hsl(0, 0%, 0%, 0)`;

      if (y % 2) {
        if (x % 2) {
          color = darkColor;
        } else {
          color = lightColor;
        }
      } else {
        if (x % 2) {
          color = lightColor;
        } else {
          color = darkColor;
        }
      }
      ctx.fillStyle = color;
      ctx.fillRect(
        x * constants.BACKDROP_PIXEL_SIZE,
        y * constants.BACKDROP_PIXEL_SIZE,
        constants.BACKDROP_PIXEL_SIZE,
        constants.BACKDROP_PIXEL_SIZE
      );
    }
  }
};

export default renderBackdrop;
