const { Sprites, Frames, Layers } = require('../db/models');
const chalk = require('chalk');

const saveData = async stateSprite => {
  console.log(stateSprite)
  const spriteHash = stateSprite.hash;
  try {
    let spriteToDelete = await Sprites.findOne({where: {hash: spriteHash}})
    if(spriteToDelete){
      let framesToDelete = await Frames.findAll({where: {spriteId: spriteToDelete.id}})
      let layersToDelete = framesToDelete.map(a => a.id)
      await Layers.destroy({where: {frameId: layersToDelete}})
      await Frames.destroy({where: {id: layersToDelete}})
      await Sprites.destroy({where: {hash: spriteHash}})
    }

    //Create a new sprite with the information from the sprite on state
    let newSprite = await Sprites.create({
      hash: spriteHash
    });
    
    //Map over the frames on the sprite on state and create frames in the database
    stateSprite.frames.map(async (frame, i) => {
      let newFrame = await Frames.create({
        frameOrder: i,
        spriteId: newSprite.id
      });
      //Map over the layers on each frame from state and create layers in the database
      frame.layers.map(async (layer, j) => {
        let newLayers = await Layers.create({
          frameId: newFrame.id,
          layerOrder: j,
          name: layer.name,
          pixels: JSON.stringify(layer.pixels)
        });
      });
    });
    console.log(
      chalk.red(`saveData.js -> SAVED TO DB -> spriteHash: ${spriteHash}`)
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = saveData;
