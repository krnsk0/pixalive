const constants = require('../../shared/constants');
const { cloneDeep } = require('lodash');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new frame
  socket.on(constants.MSG.DUPLICATE_SELECTED_FRAME, () => {
    // get selected frame
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // grab the frame
    const frameCopy = cloneDeep(state[spriteHash].frames[selectedFrame]);

    // splice it in
    state[spriteHash].frames.splice(selectedFrame, 0, frameCopy);

    // reindex frames
    state[spriteHash].frames.forEach((frame, index) => {
      frame.frameOrder = index;
    });

    // increment selected
    state[spriteHash].users[socketId].selectedFrame += 1;

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
