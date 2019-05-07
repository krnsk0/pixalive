const { Sprites, Frames, Layers } = require('../db/models')
const { initializeEmptySprite } = require('../../shared/factories');
const constants = require('../../shared/constants');
const chalk = require('chalk');

const loadData = async (spriteHash) => {
  try {
    const data = await Sprites.findOne({
    where: {hash: spriteHash},
    include: [{model: Frames,
      include: [{model: Layers,
        order: [['layerOrder', 'ASC']]}],
      order: [['frameOrder', 'ASC']]}],

  })

  let newState = {}

  //If we get data from the database, we must convert it so we can use it on state
  if (data) {
    //Parse layers from the database
    //Run through each frame
    for (let i = 0; i < data.frames.length; i++) {
      //Run through each layer on frame i
      for (let j = 0; j < data.frames[i].layers.length; j++) {
        //Set the pixels to parsed JSON data
        data.frames[i].layers[j].pixels = JSON.parse(data.frames[i].layers[j].pixels)
      }
    }
    newState = {
      hash: data.hash,
      users: {},
      frames: data.frames
    }
  } else {
    // does this namespace exist? if not, create it
      console.log(
        chalk.blue(`index.js -> NEW SPRITE -> spriteHash: ${spriteHash}`)
      );
      newState = initializeEmptySprite(
        spriteHash,
        constants.NEW_SPRITE_WIDTH,
        constants.NEW_SPRITE_HEIGHT
      );
  }

  return newState
} catch (err) {
    console.error(err)
  }
}


module.exports = loadData
