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
        // set color to white
        ctx.fillStyle = `hsl(0, 0%, 100%, 1.0)`;

        //Create white border on pointer
        const half = Math.floor(constants.CURSOR_SIZE / 2);
        ctx.fillRect(
          coords.x - half,
          coords.y - half,
          constants.CURSOR_SIZE + 2,
          constants.CURSOR_SIZE + 2
        );

        ctx.fillRect(
          coords.x - half,
          coords.y - half,
          constants.CURSOR_SIZE - 4,
          constants.CURSOR_SIZE - 4
        );

        ctx.font = '15px Courier';
        ctx.fillText(currentSpriteName, coords.x + 6, coords.y + 2);

        // set color to selected color
        let s = sprite.users[id].selectedColor;
        s = { h: 100, s: 50, l: 50 };
        ctx.fillStyle = `hsl(${s.h}, ${s.s}%, ${s.l}%, 1.0)`;

        // draw a cursor
        ctx.fillRect(
          coords.x - half - 4,
          coords.y - half - 4,
          constants.CURSOR_SIZE + 4,
          constants.CURSOR_SIZE + 4
        );

        // draw the text
        ctx.fillStyle = `hsl(0, 0%, 0%, 1.0)`;
        ctx.fillText(currentSpriteName, coords.x + 5, coords.y);
      }
    }
  }
};

export default renderCursors;
