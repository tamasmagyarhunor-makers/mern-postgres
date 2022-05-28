const db = require('../models');
const MenuItem = db.menuitems;
const Op = db.sequelize.Op;

// Create and Save a new MenuItem
exports.create = (req, res) => {
    // Validate request - ideally we don't do this here
    if (!req.body.name) {
        res.status(400).send({
            success: false,
            message: "MenuItem name can't be empty!"
        });
        return;
    }

    // Create a MenuItem
    MenuItem.create(req.body)
        .then(menuItem => {
            res.send({ 
                success: true,
                menuItem: menuItem 
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occured while creating the MenuItem."
            });
        });

        // some developers do a constant assigning the payload parameters to the 
        // models different fields and then pass in that constant into the
        // create function, I feel for our purpose, it's a waste of space
};

// Retrieve all MenuItems from the database.
exports.findAll = (req, res) => {
    MenuItem.findAll()
    .then(menuItems => {
        res.send({
            success: true,
            menuItems: menuItems
        });
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occured while retrieving MenuItems."
        })
    });
};

// Find a single MenuItem with an id
exports.findOne = (req, res) => {
    MenuItem.findByPk(req.params.id)
        .then(menuItem => {
            if (menuItem) {
                res.send({
                    success: true,
                    menuItem: menuItem
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: `Cannot find MenuItem with id=${req.params.id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Error retrieving MenuItem with id=" + req.params.id
            });
        });
};

// Update a MenuItem by the id in the request
exports.update = (req, res) => {
    MenuItem.update(req.body, {
        where: { id: req.params.id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    success: true,
                    message: `MenuItem with id=${req.params.id} has been updated successfully!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || `Error updateing MenuItem with id=${req.params.id} !`
            });
        });
};

// Delete a MenuItem with the specified id in the request
exports.delete = (req, res) => {
    MenuItem.destroy({
        where: { id: req.params.id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    success: true,
                    message: `MenuItem with id=${req.params.id} has been deleted successfully!`
                });
            } else {
                res.send({
                    success: false,
                    message: `Cannot delete MenuItem with id=${req.params.id}, maybe not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || `Coult not delete MenuItem with id=${req.params.id}!`
            });
        });
};

// Find all active MenuItems
exports.findAllActive = (req, res) => {
    MenuItem.findAll({ where: { active: true } })
        .then(menuItems => {
            res.send({
                success: true,
                menuItems: menuItems
            })
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occured retrieving MenuItems!"
            });
        });
};

// Find one MenuItem by id with its Menu
exports.findOneWithItsMenu = (req, res) => {
    MenuItem.findByPk(req.params.id, {
        include: [{
            model: db.menus,
            as: 'menu'
        }]
    })
    .then(menuItem => {
        if (menuItem) {
            res.send({
                success: true,
                menuItem: menuItem
            });
        } else {
            res.status(404).send({
                success: false,
                message: `Cannot find MenuItem with id=${req.params.id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Error retrieving MenuItem with id=" + req.params.id
        });
    });
}
