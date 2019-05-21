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
        const deletedLayer = frame.layers.splice(selectedLayer, 1);
        frame.layers.splice(selectedLayer - 1, 0, deletedLayer[0]);
      });

      // decrement selected layer
      state[spriteHash].users[socketId].selectedLayer = selectedLayer - 1;

      // re-index layers for all frames
      state[spriteHash].frames.forEach(frame => {
        frame.layers.forEach((layer, index) => {
          layer.layerOrder = index;
          return layer;
        });
      });

      //send updated sprite
      namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
    }
  });
};
