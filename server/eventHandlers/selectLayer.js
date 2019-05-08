const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //select layer
  socket.on(constants.MSG.SELECT_LAYER, selectedLayer => {
    state[spriteHash].users[socketId].selectedLayer = selectedLayer;
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
