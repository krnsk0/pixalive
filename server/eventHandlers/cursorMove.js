const constants = require('../../shared/constants');
const os = require('os');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  // when a cursor moves...
  socket.on(constants.MSG.CURSOR_MOVE, coords => {
    console.log('os.freemem()', os.freemem());
    console.log('os.loadavg(): ', os.loadavg());

    // store an old coord to allow checking for truthiness
    const oldX = state[spriteHash].users[socketId].x;

    // if we got a truthy update, apply it and send it
    if (coords) {
      state[spriteHash].users[socketId].x = coords.x;
      state[spriteHash].users[socketId].y = coords.y;
    } else {
      state[spriteHash].users[socketId].x = false;
      state[spriteHash].users[socketId].y = false;
    }

    // always send coords when true
    if (coords) {
      namespacedIo.emit(constants.MSG.CURSOR_UPDATE, {
        x: coords.x,
        y: coords.y,
        socketId
      });
    }

    // send when coords switched from true to false
    if (!coords && oldX !== false) {
      namespacedIo.emit(constants.MSG.CURSOR_UPDATE, {
        x: coords.x,
        y: coords.y,
        socketId
      });
    }
  });
};
