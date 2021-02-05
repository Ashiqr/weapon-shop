const bodyParser = require('body-parser');
const app = require('express')();
const external = require('../external/package');
const database = require('../database/database');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    database.InsertPackage(req.body).then((result) => {
       res.json({'Id': result});
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.patch('/', (req, res) => {
    database.UpdatePackage(req.body).then((result) => {
       res.json({'Id': result});
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});
  
app.get('/', (req, res) => {
    database.FetchPackage(req.query.id).then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.get('/allproducts', (req, res) => {
    external.getProducts().then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(500).json({'Error': err});
    });
});

module.exports = app;
