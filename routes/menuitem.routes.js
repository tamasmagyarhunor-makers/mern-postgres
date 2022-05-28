module.exports = app => {
    const menuItems = require('../controllers/menuitem.controller.js');
    var router = require('express').Router();

    // Create a new MenuItem
    router.post('/', menuItems.create);

    // Get all MenuItems
    router.get('/', menuItems.findAll);

    // Get all MenuItems that are active
    router.get('/active', menuItems.findAllActive);

    // Get a single MenuItem by id
    router.get('/', menuItems.findOne);

    // Update a single MenuItem by id
    router.put('/:id', menuItems.update);

    // Get a single MenuItems by id with it's Menu
    router.get('/:id/menu', menuItems.findOneWithItsMenu);

    // Delete a MenuItem by id
    router.delete('/:id', menuItems.delete);

    app.use('/api/menus', router);
}
