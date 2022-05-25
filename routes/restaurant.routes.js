module.exports = app => {
    const restaurants = require('../controllers/restaurant.contoller.js');
    var router = require('express').Router();

    // Create a new Restaurant 
    router.post('/', restaurants.create);

    // Get all Restaurants
    router.get('/', restaurants.findAll);

    // Get a single Restaurant by id
    router.get('/:id', restaurants.findOne);

    app.use('/api/restaurants', router);
}