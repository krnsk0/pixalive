const constants = require('../../shared/constants');

const renderCursors = (ctx, sprite) => {
  for (const [id, coords] of Object.entries(sprite.users)) {
    // set color to black
    ctx.fillStyle = `hsl(0, 0%, 0%, 1.0)`;

    // draw a cursor
    const half = Math.floor(constants.CURSOR_SIZE / 2);
    ctx.fillRect(
      coords.x - half,
      coords.y - half,
      constants.CURSOR_SIZE,
      constants.CURSOR_SIZE
    );

    // draw the cursor
    ctx.font = '15px Courier';

    ctx.fillText(id, coords.x + 5, coords.y);
  }
};

export default renderCursors;
