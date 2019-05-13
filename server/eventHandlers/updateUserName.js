const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //update a user's user name
  socket.on(constants.MSG.UPDATE_USERNAME, updatedUserName => {
    state[spriteHash].users[socketId].name = updatedUserName;
    namespacedIo.emit(constants.MSG.SEND_USERNAME, {
      updatedUserName,
      socketId
    });
  });
};
