const { Sequelize } = require('sequelize');
const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const MenuItems = sequelize.define('menuItems', {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        menu_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'menus',
                key: 'id',
                deferrable: Sequelize.Defferable.INITIALLY_IMMEDIATE
            }
        },
        active: {
            type: Sequelize.BOOELAN
        }
    },
    {
        timestamps: true
    });
};
