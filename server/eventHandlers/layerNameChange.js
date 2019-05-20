const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.EDIT_SELECTED_LAYER_NAME, newName => {
    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // edit name in all frames
    state[spriteHash].frames.forEach(frame => {
      frame.layers[selectedLayer].name = newName;
    });

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
