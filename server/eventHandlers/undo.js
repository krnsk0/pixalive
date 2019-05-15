const constants = require('../../shared/constants');
const undoFunc = require('./undoFunc')

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.UNDO, () => {
    // get selected frame index
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer index
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // get selsected layer
    let change
    let pixels
    if (state[spriteHash].users[socketId].history.length){
      pixels = state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels;
      change = state[spriteHash].users[socketId].history.shift()
      state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels = undoFunc(pixels, change)
      namespacedIo.emit(constants.MSG.SEND_CHANGE_LIST, change)
    }
    // console.log(change)

    // const newLayer = undoFunc(pixels, change)
    // state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels = newLayer

    //send updated sprite
    // if (newLayer){
    //   ;
    // }
  });
};
