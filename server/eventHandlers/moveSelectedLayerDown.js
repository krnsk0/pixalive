const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.MOVE_SELECTED_LAYER_DOWN, () => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // is the selected layer smaller than the lenght of the layer list?
    // don't do anything if we've selected the last layer already
    if (
      selectedLayer <
      state[spriteHash].frames[selectedFrame].layers.length - 1
    ) {
      // store deleted layer
      const deletedLayer = state[spriteHash].frames[
        selectedFrame
      ].layers.splice(selectedLayer, 1);

      // insert deleted layer
      state[spriteHash].frames[selectedFrame].layers.splice(
        selectedLayer + 1,
        0,
        deletedLayer[0]
      );

      // increment selected layer
      state[spriteHash].users[socketId].selectedLayer = selectedLayer + 1;

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
