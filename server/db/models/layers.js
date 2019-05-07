const db = require('../db')
const Sequelize = require('sequelize')


const Layers = db.define('layers', {
    name: {
        type: Sequelize.TEXT
    },
    pixels: {
        type: Sequelize.JSON,
        allowNull: false
    },
    layerOrder: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


module.exports = Layers
