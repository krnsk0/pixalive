const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.MOVE_SELECTED_LAYER_UP, () => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // is the selected layer larger than zero?
    // don't do anything if we've selected the first layer already
    if (selectedLayer > 0) {
      // move layer for each frame
      state[spriteHash].frames.forEach(frame => {
        // store deleted layer
        const deletedLayer = frame.layers.splice(selectedLayer, 1);

        // insert deleted layer
        frame.layers.splice(selectedLayer - 1, 0, deletedLayer[0]);
      });

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
