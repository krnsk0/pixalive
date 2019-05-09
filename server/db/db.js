const Sequelize = require('sequelize')
const pkg = require('../../package.json')


const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
console.log(`Opening database connection to ${dbName}`)

const db = new Sequelize(dbUrl, { logging: false, operatorsAliases: false })

module.exports = db
