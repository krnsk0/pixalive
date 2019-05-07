const { Sprites, Frames, Layers } = require('../db/models')
const { initializeEmptySprite } = require('../shared/factories');
const constants = require('../shared/constants');
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

  if (data) {
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
  return newState} catch (err) {
    console.error(err)
  }
}


module.exports = loadData
