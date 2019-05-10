const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //select tool
  socket.on(constants.MSG.NAME_UPDATE, name => {
    state[spriteHash].users[socketId].name = name;
    namespacedIo.emit(constants.MSG.NAME_UPDATE, state[spriteHash]);
  });
};
