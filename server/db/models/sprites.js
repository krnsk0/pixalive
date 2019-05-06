const db = require('../db')
const Sequelize = require('sequelize')


const Sprites = db.define('sprites', {
    hash: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Sprites