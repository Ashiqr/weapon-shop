const bodyParser = require('body-parser');
const app = require('express')();
const external = require('../external/exchangeRate');
var generalTools = require('../tools/general');  

app.use(bodyParser.json());

app.get('/', (req, res) => {
    if (!req.query.from || !req.query.to || !req.query.amount) {
        return res.json({'Error': 'Invalid parameters'});
    }
    external.getExchangeRates().then((result) => {
      res.json( {result :  generalTools.ConvertCurrency(req.query.from, req.query.to, req.query.amount, result)});
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.get('/rate', (req, res) => {
  if (!req.query.from || !req.query.to) {
      return res.json({'Error': 'Invalid parameters'});
  }
  external.getExchangeRates().then((result) => {
    res.json( {rate :  generalTools.CurrencyRate(req.query.from, req.query.to, result)});
  })
  .catch((err) => {
    res.json({'Error': err});
  });
});

module.exports = app;
