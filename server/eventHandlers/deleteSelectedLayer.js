const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.DELETE_SELECTED_LAYER, () => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // don't allow deletes it's alread just 1 long
    if (state[spriteHash].frames[selectedFrame].layers.length > 1) {
      // delete layer
      state[spriteHash].frames[selectedFrame].layers.splice(selectedLayer, 1);

      // decrement selected layer
      state[spriteHash].users[socketId].selectedLayer = selectedLayer - 1;

      // re-index layers
      state[spriteHash].frames[selectedFrame].layers.forEach((layer, index) => {
        layer.layerOrder = index;
        return layer;
      });

      //send updated sprite
      namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
    }
  });
};
