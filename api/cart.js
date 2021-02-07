const bodyParser = require('body-parser');
const app = require('express')();
const database = require('../database/cart');
const packageTools = require('../tools/package');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    database.InsertCart(req.body).then((id) => {
        res.json({'Id': id});
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.delete('/', (req, res) => {
    database.RemoveCart(req.body).then((id) => {
        res.json({'Id': id});
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.get('/', (req, res) => {
    database.FetchCart(req.query.id).then((result) => {
      res.json(packageTools.GroupPackages(result, 3));
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.get('/count', (req, res) => {
    database.FetchCartCount(req.query.id).then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

module.exports = app;
