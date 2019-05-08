const { Sprites, Frames, Layers } = require('../db/models');
const { initializeEmptySprite } = require('../../shared/factories');
const constants = require('../../shared/constants');
const chalk = require('chalk');

let loadData = async (spriteHash) => {
  try {
    let loadedSprite = await Sprites.findOne({
      where: { hash: spriteHash },
      raw: true
    });

    let loadedFrames = await Frames.findAll({
      where: {spriteId: loadedSprite.id},
      order: [['frameOrder', 'ASC']],
      raw: true

    })
    let framesArray = []
    for (let i = 0; i < loadedFrames.length; i++){
      let currentFrame = loadedFrames[i]
      let loadedLayers = await Layers.findAll({
        where: {frameId: currentFrame.id},
        order: [['layerOrder', 'ASC']],
        raw: true
      })
      for (let j = 0; j < loadedLayers.length; j++) {
        loadedLayers[j].pixels = JSON.parse(loadedLayers[j].pixels)
      }
      console.log(loadedLayers)
      currentFrame.layers = loadedLayers
      framesArray.push(currentFrame)
      }


    //loadedSprite = JSON.stringify(loadedSprite, false, 2)

    //Taking away Sequelize's extra information
    //loadedFrames = JSON.stringify(loadedFrames, false, 2)


    //, order: [[{Layers}, 'layerOrder', 'ASC']]
    //, order: [[{Frames}, 'frameOrder', 'ASC']]
    let newState = {};

    //If we get data from the database, we must convert it so we can use it on state
    if (loadedSprite && loadedFrames) {
      //Parse layers from the database
      //Run through each frame

      // for (let i = 0; i < loadedFrames; i++) {
      //   //loadedFrames[i].layers.sort((a, b) => a.layerOrder - b.layerOrder)

      //   //Run through each layer on frame i
      //   for (let j = 0; j < loadedFrames[i].layers.length; j++) {
      //     //Set the pixels to parsed JSON data
      //     loadedFrames[i].layers[j].pixels = JSON.parse(
      //       loadedFrames[i].layers[j].pixels
      //     )
      //   }
      // }
      //console.log("LOADED FRAMES", loadedFrames)
      newState = {
        hash: loadedSprite.hash,
        users: {},
        frames: loadedFrames
      };
      console.log('New State', newState.frames[0].layers)


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
