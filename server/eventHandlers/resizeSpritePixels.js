const constants = require('../../shared/constants')
const { cloneDeep } = require('lodash');

module.exports = (socket, namespacedIo, state, spriteHash, socketId) => {
    //add new layer to all frames
    socket.on(constants.MSG.RESIZE_SPRITE, spriteSize => {
        //get sprite
        const sprite = state[spriteHash]
        let arrayOfFrames = sprite.frames
        
        const resizePixelGrids = (grid, spriteSize) => {
          let gridEnds = []
          let numToAdd = spriteSize - grid[0].length
          if (numToAdd > 0){
            for (let i = 0; i < numToAdd; i++){
                gridEnds.push(null)
              }
              grid = grid.map(row => row.concat(gridEnds))
              let nullRows = []
              for (let i = 0; i < spriteSize; i++){
                  nullRows.push(null)
              }
              for (let i = 0; i < numToAdd; i++){
                  grid.push(cloneDeep(nullRows))
              }
          } else if (numToAdd < 0){
              grid = grid.map(row => row.slice(0, numToAdd)).slice(0, numToAdd)
          }
          return grid
        }


    state[spriteHash].frames = sprite.frames.map(frame => (
        {...frame, 
        layers: frame.layers.map(layer => (
            {...layer, 
            pixels: resizePixelGrids(layer.pixels, spriteSize)}))}))


    //   send updated sprite
        namespacedIo.emit(constants.MSG.SEND_SPRITE, state[spriteHash]);
    });

};
  