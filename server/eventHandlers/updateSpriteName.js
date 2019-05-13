const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash) => {
  //handle color update on user
  socket.on(constants.MSG.UPDATE_SPRITE_NAME, name => {
    state[spriteHash].name = name ;
    namespacedIo.emit(constants.MSG.SEND_SPRITE_NAME, {
      name
    });
  });
};

