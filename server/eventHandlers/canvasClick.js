const constants = require('../../shared/constants');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
  // when a cursor moves...
  socket.on(constants.MSG.CANVAS_CLICK, coords => {
    console.log('got the event');
    // update their coords
    const selectedColor = state[spriteHash].users[socketId].selectedColor;
    const selectedTool = state[spriteHash].users[socketId].selectedTool;
    const selectedFrame = state[spriteHash].users[socketId].selectedFrame;
    const selectedLayer = state[spriteHash].users[socketId].selectedLayer;

    //generates the list of changes to the image on server state
    let changeList = [];

    if (selectedTool === constants.TOOLS.PEN) {
      changeList.push({
        x: coords.x,
        y: coords.y,
        frameIdx: selectedFrame,
        layerIdx: selectedLayer,
        color: selectedColor
      });
    }

    console.log('changeList: ', changeList);

    //takes list of changes, changes pixels
    changeList.forEach(c => {
      state[spriteHash].frames[c.frameIdx].layers[c.layerIdx].pixels[c.y][c.x] =
        c.color;
    });

    // send only the cursor update
    namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
  });
};
