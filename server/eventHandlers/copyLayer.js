const constants = require('../../shared/constants');
const { cloneDeep } = require('lodash');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.COPY_LAYER, dir => {
    // get selected frame index
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer index
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // get selsected layer's pixels
    const pixels =
      state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels;

    // copy to all frames
    state[spriteHash].frames.forEach(frame => {
      frame.layers[selectedLayer].pixels = cloneDeep(pixels);
    });

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
