const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.DELETE_FRAME, frameToDelete => {
    // disallow deleting last frame
    if (state[spriteHash].frames.length > 1) {
      // get selected frame
      const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

      // if selected is max then decrement
      if (selectedFrame === state[spriteHash].frames.length - 1) {
        state[spriteHash].users[socketId].selectedFrame = selectedFrame - 1;
      }

      // if selecetd is less than selected
      else if (frameToDelete < selectedFrame) {
        state[spriteHash].users[socketId].selectedFrame = selectedFrame - 1;
      }
      // delete frame
      state[spriteHash].frames.splice(frameToDelete, 1);
      //

      // re-index layers
      state[spriteHash].frames.forEach((frame, index) => {
        frame.frameOrder = index;
        return frame;
      });

      //send updated sprite
      namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
    }
  });
};
