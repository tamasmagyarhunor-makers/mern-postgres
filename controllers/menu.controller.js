const db = require('../models');
const Menu = db.menus;
const Op = db.sequelize.Op;

// Create and Save a new Menu
exports.create = (req, res) => {
    // Validate request - ideally we don't do this here
    if (!req.body.title) {
        res.status(400).send({
            success: false,
            message: "Menu title can't be empty!"
        });
        return;
    }

    // Create a Menu
    Menu.create(req.body)
        .then(menu => {
            res.send({ 
                success: true,
                menu: menu 
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occured while creating the Menu."
            });
        });

        // some developers do a constant assigning the payload parameters to the 
        // models different fields and then pass in that constant into the
        // create function, I feel for our purpose, it's a waste of space
};

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
    Menu.findAll()
    .then(menus => {
        res.send({
            success: true,
            menus: menus
        });
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occured while retrieving Menus."
        })
    });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
    Menu.findByPk(req.params.id)
        .then(menu => {
            if (menu) {
                res.send({
                    success: true,
                    menu: menu
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: `Cannot find Menu with id=${req.params.id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Error retrieving Menu with id=" + req.params.id
            });
        });
};

// Update a Menu by the id in the request
exports.update = (req, res) => {
    Menu.update(req.body, {
        where: { id: req.params.id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    success: true,
                    message: `Menu with ${req.params.id} has been updated successfully!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || `Error updateing Menu with id=${req.params.id} !`
            });
        });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
    Menu.destroy({
        where: { id: req.params.id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    success: true,
                    message: `Menu with id=${req.params.id} has been deleted successfully!`
                });
            } else {
                res.send({
                    success: false,
                    message: `Cannot delete Menu with id=${req.params.id}, maybe not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || `Coult not delete Menu with id=${req.params.id}!`
            });
        });
};

// Find all active Menus
exports.findAllActive = (req, res) => {
    Menu.findAll({ where: { active: true } })
        .then(menus => {
            res.send({
                success: true,
                menus: menus
            })
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occured retrieving Menus!"
            });
        });
};

// Find one Menu by id with its Restaurant
exports.findOneWithItsRestaurant = (req, res) => {
    Menu.findByPk(req.params.id, {
        include: [{
            model: db.restaurants,
            as: 'restaurant'
        }]
    })
    .then(menu => {
        if (menu) {
            res.send({
                success: true,
                menu: menu
            });
        } else {
            res.status(404).send({
                success: false,
                message: `Cannot find Menu with id=${req.params.id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Error retrieving Menu with id=" + req.params.id
        });
    });
}
