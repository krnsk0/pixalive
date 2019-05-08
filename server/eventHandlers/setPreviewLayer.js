const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //set preview to true or false
  socket.on(constants.MSG.SET_PREVIEW_LAYER, toggle => {
    state[spriteHash].users[socketId].preview = toggle;

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
