const { Sprites, Frames, Layers } = require('../db/models')

const saveData = async (stateSprite) => {
  const spriteHash = stateSprite.hash
  try {
    //Destroy the old sprite and all associated frames and layers
    await Sprites.destroy({
    where: { hash: spriteHash },
    include: [{
      model: Frames,
      include: [{
        model: Layers
      }]
    }]})
    //Create a new sprite with the information from the sprite on state
    let newSprite = await Sprites.create({
      hash: spriteHash
    })
    //Map over the frames on the sprite on state and create frames in the database
    stateSprite.frames.map(async (frame, i) => {
        let newFrame = await Frames.create({
        frameOrder: (i + 1),
        spriteId: newSprite.id
        })
      //Map over the layers on each frame from state and create layers in the database
      frame.layers.map(async (layer, j) => {
        await Layers.create({
          frameId: newFrame.id,
          layerOrder: (j + 1),
          name: layer.name,
          pixels: JSON.stringify(layer.pixels)
        })
      })
    })
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = saveData

