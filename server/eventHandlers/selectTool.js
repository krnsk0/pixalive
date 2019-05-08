const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //select tool
  socket.on(constants.MSG.SELECT_TOOL, selectedTool => {
    state[spriteHash].users[socketId].selectedTool = selectedTool;
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};