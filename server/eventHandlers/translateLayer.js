const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.TRANSLATE_SELECTED_LAYER, dir => {
    // get selected frame index
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;

    // get selected layer index
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    // get selsected layer
    const pixels =
      state[spriteHash].frames[selectedFrame].layers[selectedLayer].pixels;

    if (dir === 'up') {
      const temp = pixels.shift();
      pixels.push(temp);
    } else if (dir === 'down') {
      const temp = pixels.pop();
      pixels.unshift(temp);
    } else if (dir === 'left') {
      pixels.forEach(row => {
        const temp = row.shift();
        row.push(temp);
      });
    } else if (dir === 'right') {
      pixels.forEach(row => {
        const temp = row.pop();
        row.unshift(temp);
      });
    }

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
