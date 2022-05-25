module.exports = app => {
    const restaurants = require('../controllers/restaurant.contoller.js');
    var router = require('express').Router();

    // Create a new Restaurant 
    router.post('/', restaurants.create);

    app.use('/api/restaurants', router);
}