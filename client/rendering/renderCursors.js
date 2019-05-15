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

      if (coords.x !== false) {
        //Create white border on pointer
        ctx.fillStyle = `hsl(0, 0%, 100%, 1.0)`;
        // const half = Math.floor(constants.CURSOR_SIZE / 2);
        // ctx.fillRect(
        //   coords.x - half,
        //   coords.y - half,
        //   constants.CURSOR_SIZE + 2,
        //   constants.CURSOR_SIZE + 2
        // );

        ctx.font = '15px Courier';
        ctx.fillText(currentSpriteName, coords.x + 6, coords.y + 2);

        // create an image to use for the cursor
        let offsetX;
        let offsetY;
        let selectedTool = sprite.users[id].selectedTool;
        const img = document.createElement('img');
        if (selectedTool === constants.TOOLS.PAINT_CAN) {
          img.src = '/fill-color.png';
          [offsetX, offsetY] = [-10, -10];
        } else if (selectedTool === constants.TOOLS.PEN) {
          img.src = '/pencil-tip.png';
          [offsetX, offsetY] = [-13, -8];
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
          [offsetX, offsetY] = [-8, -10];
        }
        ctx.drawImage(img, coords.x + offsetX, coords.y + offsetY);

        // set color to selected color
        let s = sprite.users[id].selectedColor;
        ctx.fillStyle = `hsl(${s.h}, ${s.s}%, ${s.l}%, 1.0)`;
        ctx.fillText(currentSpriteName, coords.x + 5, coords.y);
      }
    }
  }
};

export default renderCursors;
