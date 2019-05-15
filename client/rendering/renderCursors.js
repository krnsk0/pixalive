/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable guard-for-in */
const constants = require('../../shared/constants');

const renderCursors = (ctx, sprite, socket) => {
  // get current socketId
  let socketId;
  if (socket) {
    socketId = socket.id.slice(socket.nsp.length + 1);
  }

  for (const [id, coords] of Object.entries(sprite.users)) {
    // skip if the user's own mouse
    if (id !== socketId) {
      let currentSpriteName = sprite.users[id].name;
      let s = sprite.users[id].selectedColor;

      if (coords.x !== false) {
        // draw box around text
        let textWidth;
        if (currentSpriteName.length > 0) {
          textWidth = 4 + currentSpriteName.length * 9.2;
        } else {
          textWidth = 0;
        }
        if (s.l > 60) {
          ctx.fillStyle = `hsl(0, 0%, 0%, 1.0)`; //black
        } else {
          ctx.fillStyle = `hsl(0, 0%, 100%, 1.0)`; // white
        }
        ctx.fillRect(coords.x + 6, coords.y - 12, textWidth, 15);

        // set color to selected color and draw the text
        ctx.font = '15px Courier';
        ctx.fillStyle = `hsl(${s.h}, ${s.s}%, ${s.l}%, 1.0)`;
        ctx.fillText(currentSpriteName, coords.x + 8, coords.y);

        // create an image to use for the cursor
        let offsetX;
        let offsetY;
        let selectedTool = sprite.users[id].selectedTool;
        const img = document.createElement('img');
        if (selectedTool === constants.TOOLS.PAINT_CAN) {
          img.src = '/fill-color.png';
          [offsetX, offsetY] = [-15, -8];
        } else if (selectedTool === constants.TOOLS.PEN) {
          img.src = '/pencil-tip.png';
          [offsetX, offsetY] = [-7, -6];
        } else if (selectedTool === constants.TOOLS.ERASER) {
          img.src = '/eraser.png';
          [offsetX, offsetY] = [-6, -5];
        } else if (selectedTool === constants.TOOLS.EYE_DROPPER) {
          img.src = '/map-pin.png';
          [offsetX, offsetY] = [-10, -15];
        } else if (
          [
            constants.TOOLS.BRUSH_16,
            constants.TOOLS.BRUSH_32,
            constants.TOOLS.BRUSH_48,
            constants.TOOLS.BRUSH_64
          ].includes(selectedTool)
        ) {
          img.src = '/paint.png';
          [offsetX, offsetY] = [-7, -9];
        }
        ctx.drawImage(img, coords.x + offsetX, coords.y + offsetY);
      }
    }
  }
};

export default renderCursors;
