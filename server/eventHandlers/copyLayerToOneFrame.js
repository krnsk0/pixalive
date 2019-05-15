const constants = require('../../shared/constants');
const { cloneDeep } = require('lodash');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.COPY_LAYER_TO_ONE_FRAME, dir => {
    // get selected frame index
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer index
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // get selsected layer's pixels
    const pixels =
      state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels;

    // if less than max
    if (selectedFrame < state[spriteHash].frames.length - 1) {
      // copy to next frames
      state[spriteHash].frames[selectedFrame + 1].layers[
        selectedLayer
      ].pixels = cloneDeep(pixels);

      // increment selected frame
      state[spriteHash].users[socketId].selectedFrame += 1;
    } else if (selectedFrame === state[spriteHash].frames.length - 1) {
      // copy to first frame
      state[spriteHash].frames[0].layers[selectedLayer].pixels = cloneDeep(
        pixels
      );

      // set first frame to zero
      state[spriteHash].users[socketId].selectedFrame = 0;
    }

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
