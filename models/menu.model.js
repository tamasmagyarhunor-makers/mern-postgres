const { Sequelize } = require('sequelize');
const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define('menu', {
        title: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        restaurant_id: {
            type: Sequelize.INTEGER,

            references: {
                model: 'restaurants',
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        content: {
            type: Sequelize.STRING
        },
        footer: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: true
    });
    return Menu;
};
