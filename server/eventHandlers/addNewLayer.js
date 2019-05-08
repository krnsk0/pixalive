const constants = require('../../shared/constants');
const { layerFactory } = require('../../shared/factories');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  //add new layer to all frames
  socket.on(constants.MSG.ADD_NEW_LAYER, () => {
    // get new frameOrder value, one higher than max
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;
    const arrayOfLayerKeys = state[spriteHash].frames[selectedFrame].layers.map(
      layer => layer.layerOrder
    );
    const currentMax = Math.max(...arrayOfLayerKeys);
    const newLayerOrder = currentMax + 1;

    // make a new layer and add to frames
    const w =
      state[spriteHash].frames[selectedFrame].layers[0].pixels[0].length;
    const h = state[spriteHash].frames[selectedFrame].layers[0].pixels.length;

    // add new layer to all frames
    state[spriteHash].frames.forEach(frame => {
      const newLayer = layerFactory(w, h, newLayerOrder);
      frame.layers.push(newLayer);
    });

    //send updated sprite
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
