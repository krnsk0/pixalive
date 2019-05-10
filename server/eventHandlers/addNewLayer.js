const constants = require('../../shared/constants');
const { layerFactory } = require('../../shared/factories');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.ADD_NEW_LAYER, () => {
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;
    const newLayerOrder = state[spriteHash].frames[selectedFrame].layers.length;

    // make a new layer and add to frames
    const w =
      state[spriteHash].frames[selectedFrame].layers[0].pixels[0].length;
    const h = state[spriteHash].frames[selectedFrame].layers[0].pixels.length;

    // add new layer to all frames
    state[spriteHash].frames.forEach(frame => {
      const newLayer = layerFactory(w, h, newLayerOrder);
      frame.layers.push(newLayer);
    });

    // increment selected frame
    state[spriteHash].users[socketId].selectedLayer += 1;

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
