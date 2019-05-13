const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.UPLOAD_PIXELS, json => {
    // replace the pixels for this
    state[spriteHash].frames = json;

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
