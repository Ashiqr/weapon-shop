const bodyParser = require('body-parser');
const app = require('express')();
const database = require('../database/user');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    database.InsertUser(req.body).then((result) => {
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


module.exports = app;