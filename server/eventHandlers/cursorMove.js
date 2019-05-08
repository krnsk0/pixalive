const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  // when a cursor moves...
  socket.on(constants.MSG.CURSOR_MOVE, coords => {
    // update their coords
    state[spriteHash].users[socketId].x = coords.x;
    state[spriteHash].users[socketId].y = coords.y;

    // send only the cursor update
    namespacedIo.emit(constants.MSG.CURSOR_UPDATE, {
      x: coords.x,
      y: coords.y,
      socketId
    });
  });
};
