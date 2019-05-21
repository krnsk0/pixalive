const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.DELETE_SELECTED_LAYER, () => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // don't allow deletes it's already just 1 long
    if (state[spriteHash].frames[selectedFrame].layers.length > 1) {
      // delete layer for all frames
      state[spriteHash].frames.forEach(frame => {
        // delete layer
        frame.layers.splice(selectedLayer, 1);
      });

      // if selected layer is bigger than 0 then decrement selected layer
      if (selectedLayer > 0) {
        state[spriteHash].users[socketId].selectedLayer = selectedLayer - 1;
      }

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
