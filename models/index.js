const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.restaurants = require('./restaurant.model.js')(sequelize, Sequelize);
db.menus = require('./menu.model.js')(sequelize, Sequelize);
db.menuitems = require('./menuitem.model.js')(sequelize, Sequelize);

db.restaurants.hasMany(db.menus, {
    foreignKey: 'restaurant_id',
    sourceKey: 'id'
});

db.menus.belongsTo(db.restaurants, {
    foreignKey: 'restaurant_id',
    sourceKey: 'id'
});

db.menus.hasMany(db.menuitems, {
    foreignKey: 'menu_id',
    sourceKey: 'id'
});

db.menuitems.belongsTo(db.menus, {
    foreignKey: 'menu_id',
    sourceKey: 'id'
})

module.exports = db;
