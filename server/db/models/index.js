const Sprites = require('./sprites')
const Frames = require('./frames')
const Layers = require('./layers')
const Sequelize = require('sequelize')


Layers.belongsTo(Frames)
Frames.hasMany(Layers)
Frames.belongsTo(Sprites)
Sprites.hasMany(Frames)

module.exports = { Sprites, Frames, Layers }
