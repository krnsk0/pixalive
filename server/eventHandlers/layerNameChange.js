const constants = require('../../shared/constants');
const { layerFactory } = require('../../shared/factories');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.EDIT_SELECTED_LAYER_NAME, newName => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // edit name
    state[spriteHash].frames[selectedFrame].layers[
      selectedLayer
    ].name = newName;

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
