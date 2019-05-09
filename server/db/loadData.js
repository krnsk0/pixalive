const { Sprites, Frames, Layers } = require('../db/models');
const { initializeEmptySprite } = require('../../shared/factories');
const constants = require('../../shared/constants');
const chalk = require('chalk');

let loadData = async spriteHash => {
  try {
    let loadedSprite = await Sprites.findOne({
      where: { hash: spriteHash },
      raw: true
    });

    let newState = {};

    //If we get data from the database, we must convert it so we can use it on state
    if (loadedSprite) {
      let loadedFrames = await Frames.findAll({
        where: { spriteId: loadedSprite.id },
        order: [['frameOrder', 'ASC']],
        raw: true
      });
      let framesArray = [];
      for (let i = 0; i < loadedFrames.length; i++) {
        let currentFrame = loadedFrames[i];
        let loadedLayers = await Layers.findAll({
          where: { frameId: currentFrame.id },
          order: [['layerOrder', 'ASC']],
          raw: true
        });
        for (let j = 0; j < loadedLayers.length; j++) {
          let newLayer = loadedLayers[j];

          newLayer.pixels = JSON.parse(newLayer.pixels);
        }
        currentFrame.layers = loadedLayers;
        framesArray.push(currentFrame);
      }
      newState = {
        hash: loadedSprite.hash,
        users: {},
        frames: loadedFrames
      };
      console.log(
        chalk.blue(
          `loadData.js -> LOADED NEW SPRITE -> spriteHash: ${spriteHash}`
        )
      );
    } else {
      // does this namespace exist? if not, create it
      newState = initializeEmptySprite(
        spriteHash,
        constants.NEW_SPRITE_WIDTH,
        constants.NEW_SPRITE_HEIGHT
      );
      console.log(
        chalk.blue(
          `loadData.js -> GENERATED NEW SPRITE -> spriteHash: ${spriteHash}`
        )
      );
    }

    return newState;
  } catch (err) {
    console.error(err);
  }
};

module.exports = loadData;
