// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions = {
    origin: "localhost:8081"
};

app.use(cors(corsOptions));

const db = require('./models');
db.sequelize.sync();

// parse requests of content-type - application-json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to our amazing application. " });
});

require('./routes/restaurant.routes')(app);
require('./routes/menu.routes')(app);
require('./routes/menuitem.routes')(app);
// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
