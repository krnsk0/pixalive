const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.SHIFT_FRAME_RIGHT, frameToShift => {
    // only do stuff if the frame is not frame zero
    if (frameToShift < state[spriteHash].frames.length - 1) {
      // store deleted frame
      const deletedFrame = state[spriteHash].frames.splice(frameToShift, 1);

      // insert deleted frame
      state[spriteHash].frames.splice(frameToShift + 1, 0, deletedFrame[0]);

      // increment selected layer if it was the same as the frame we shifted
      const selectedFrame = state[spriteHash].users[socketId].selectedFrame;
      if (selectedFrame === frameToShift) {
        state[spriteHash].users[socketId].selectedFrame = selectedFrame + 1;
      } else if (selectedFrame === frameToShift + 1) {
        state[spriteHash].users[socketId].selectedFrame = selectedFrame - 1;
      }

      // re-index frames
      state[spriteHash].frames.forEach((frame, index) => {
        frame.frameOrder = index;
        return frame;
      });

      //send updated sprite
      namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
    }
  });
};
