const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //handle color update on user
  socket.on(constants.MSG.UPDATE_SELECTED_COLOR, selectedColor => {
    state[spriteHash].users[socketId].selectedColor = selectedColor;

    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
