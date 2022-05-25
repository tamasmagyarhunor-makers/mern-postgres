const { Sequelize } = require('sequelize');
const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define('restaurant', {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        owner: {
            type: Sequelize.STRING
        },
        opendate: {
            type: Sequelize.DATE
        },
        open: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: true
    })
}