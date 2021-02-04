const bodyParser = require('body-parser');
const app = require('express')();
const external = require('../external/package');

app.use(bodyParser.json());

app.get('/allproducts', (req, res) => {
    external.getProducts().then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(500).json({'Error': err});
    });
});

module.exports = app;
