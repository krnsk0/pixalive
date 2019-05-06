const db = require('../db')
const Sequelize = require('sequelize')


const Frames = db.define('frames', {
    frameOrder: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


module.exports = Frames