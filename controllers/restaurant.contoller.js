const db = require('../models');
const Restaurant = db.restaurants;
const Op = db.sequelize.Op;

// Create and Save a new Restaurant
exports.create = (req, res) => {
    // Validate request - ideally we don't do this here
    if (!req.body.name) {
        res.status(400).send({
            message: "Restaurant name can't be empty!"
        });
        return;
    }

    // Create a Restaurant
    Restaurant.create(req.body)
        .then(restaurant => {
            res.send({ 
                success: true,
                restaurant: restaurant 
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Restaurant."
            });
        });

        // some people do a constant assigning the payload parameters to the 
        // models different fields and then pass in that constant into the
        // create function, I feel for our purpose, it's a waste of space
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
    
};

// Find a single Restaurant with an id
exports.findOne = (req, res) => {

};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {

};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {

};

// Find all open Restaurants
exports.findAllOpen = (req, res) => {

};