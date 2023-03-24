import fs from 'fs'
import { Sequelize } from 'sequelize'
import { defineUser } from './model.user.js' 
import { defineProduct } from './model.product.js'
import { defineOperation } from './model.operation.js'

const database = JSON.parse(fs.readFileSync('./config/config.json')).db


const sequelize = new Sequelize(database.database, database.user, database.password, {
    logging: false,
    host: database.host,
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
        max: 5, //количество подключений
        min: 0,
        acquire: 30000, // try connnect 
        idle: 10000 // after idle time we disconnect 
    }
})

const user = sequelize.define("User", defineUser(Sequelize), {timestamps: false})
const product = sequelize.define("Product", defineProduct(Sequelize), {timestamps: false})
const operations = sequelize.define("Operations", defineOperation(Sequelize))


export const db = {
    Sequelize, 
    sequelize,
    user, 
    product,
    operations
}

db.user.belongsToMany(db.product, {
    through: 'users_products', 
    foreignKey: 'productId',
    otherKey: 'userId',
    timestamps: false
})
db.product.belongsToMany(db.user, {
    through: 'users_products', 
    foreignKey: 'userId',
    otherKey: 'productId',
    timestamps: false
})
