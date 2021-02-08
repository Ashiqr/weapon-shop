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

app.delete('/', (req, res) => {
  database.DeleteUser(req.body).then((result) => {
     res.end();
  })
  .catch((err) => {
    res.json({'Error': err});
  });
});

module.exports = app;
