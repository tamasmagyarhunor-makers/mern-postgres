module.exports = app => {
    const restaurants = require('../controllers/restaurant.contoller.js');
    var router = require('express').Router();

    // Create a new Restaurant 
    router.post('/', restaurants.create);

    // Get all Restaurants
    router.get('/', restaurants.findAll);

    // Find all Restaurants that are open
    // a very silly bug here, if we put the '/open' after the
    // '/:d' it will pass in open as an id and the request
    // will fail
    router.get('/open', restaurants.findAllOpen);

    // Get a single Restaurant by id
    router.get('/:id', restaurants.findOne);

    // Get a single Restaurant by id and all Menus related to it
    router.get('/:id/menus', restaurants.findOneWithMenus);

    // Update a single Restaurant by id
    router.put('/:id', restaurants.update);

    // Delete a Restaurant by id
    router.delete('/:id', restaurants.delete);

    app.use('/api/restaurants', router);
}
