const bodyParser = require('body-parser');
const app = require('express')();
const external = require('../external/package');
const database = require('../database/package');
const packageTools = require('../tools/package');

app.use(bodyParser.json());

app.post('/', (req, res) => {
    database.InsertPackage(req.body).then((id) => {
      external.getProducts().then(allProducts => {
        let data = req.body;
        data.Id = id;
        database.LinkPackageProducts(data, allProducts).then((result) => {
          res.json({'Id': id});
        })
      })
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

app.patch('/', (req, res) => {
    database.UpdatePackage(req.body).then((id) => {
      external.getProducts().then(allProducts => {
        database.LinkPackageProducts(req.body, allProducts).then((result) => {
          res.json({'Id': result});
        })
      })
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

app.get('/full', (req, res) => {
  database.FetchPackage(req.query.id).then((result) => {
    database.FetchPackageProducts(result.id).then((products) => {
      result.Products = products;
      res.json(result);
    })
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


app.get('/search', (req, res) => {
  database.SearchPackage(req.query.name).then(result => {
      res.json(packageTools.GroupPackages(result, 3));
  })
  .catch(err => {
      res.status(500).json({'Error': err});
  });
});

app.get('/searchadmin', (req, res) => {
  database.SearchPackage(req.query.name).then(result => {
      res.json(result);
  })
  .catch(err => {
      res.status(500).json({'Error': err});
  });
});

module.exports = app;
