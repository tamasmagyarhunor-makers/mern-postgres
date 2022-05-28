module.exports = app => {
    const menus = require('../controllers/menu.controller.js');
    var router = require('express').Router();

    // Create a new Menu
    router.post('/', menus.create);

    // Get all Menus
    router.get('/', menus.findAll);

    // Get all Menus that are active
    router.get('/active', menus.findAllActive);

    // Get a single Menu by id
    router.get('/', menus.findOne);

    // Update a single Menu by id
    router.put('/:id', menus.update);

    // Get a single Menu by id with it's Restaurant
    router.get('/:id/restaurant', menus.findOneWithItsRestaurant);

    // Delete a Menu by id
    router.delete('/:id', menus.delete);

    app.use('/api/menus', router);
}
