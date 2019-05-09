const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.DELETE_SELECTED_LAYER, newName => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // delete layer
    state[spriteHash].frames[selectedFrame].layers.splice(selectedLayer, 1);

    // re-index layers
    state[spriteHash].frames[selectedFrame].layers.forEach((layer, index) => {
      layer.layerOrder = index;
      return layer;
    });

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
