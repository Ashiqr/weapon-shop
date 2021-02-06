const sqlite3 = require('sqlite3');
const path = require('path');
const generalTools = require('../tools/general');  
const packageTools = require('../tools/package');

var db = new sqlite3.Database(path.resolve(__dirname, './weapon_shop.sqlite3'));

function InsertPackage(data) {
  return new Promise ((resolve, reject) => {
    var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['Name', 'Description', 'Price']));
    db.run('Insert Into package (Name, Description, Price) VALUES(?,?,?)', params, function(err) {
        if (err) {
          reject(err.message);
        }
        resolve(this.lastID);
    });
  });
}

function FetchPackage(Id) {
  return new Promise ((resolve, reject) => {
    db.get('Select * from package where id = ?', [Id], function(err, row) {
        if (err) {
          reject(err.message);
        }
        resolve(row);
    });
  });
}

function FetchPackageProducts(Id) {
    return new Promise ((resolve, reject) => {
      db.all('Select * from package_products where PackageId = ?', [Id], function(err, rows) {
          if (err) {
            reject(err.message);
          }
          resolve(rows);
      });
    });
  }

function UpdatePackage(data) {
  return new Promise ((resolve, reject) => {
    var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['Name', 'Description', 'Price', 'Id']));
    db.run(`Update package 
            Set Name = ?,  Description = ?, Price = ?
            Where id = ?`, params, function(err) {
        if (err) {
          reject(err.message);
        }
        resolve(data.Id);
    });
  });
}

function LinkPackageProducts(data, allProducts) {
  return new Promise ((resolve, reject) => {
    var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['Id']));
    db.run(`Delete from package_products
            Where PackageId = ?`, params, function(err) {
        if (err) {
          reject(err.message);
        }
        data = packageTools.MakePackageProductLink(data, allProducts);
        params = generalTools.CleanQuotes(generalTools.ObjectArrayToArray(data.Products, ['PackageId', 'ProductId', 'Price', 'Quantity']));
        var placeholders = data.Products.map((p) => '(?,?,?,?)').join(',');
        const sqlInsert = `Insert Into package_products (PackageId, ProductId, Price, Quantity)
                VALUES ${placeholders} `;
        db.run(sqlInsert, params, function(err) {
                  if (err){
                    reject(err.message);
                  }
                  resolve(data.Id);
                });
    });
  });
}

function SearchPackage(tags, includeAll) {
  return new Promise ((resolve, reject) => {
    if (tags) {
      try {
        tags = tags.split(',');
        var search = generalTools.MakeSearchTags(tags.length, includeAll ? 'AND' : 'OR');
        db.all('Select * from package where ' + search, tags, function(err, rows) {
            if (err) {
              reject(err.message);
            }
            resolve(rows);
        });
      }
      catch(ex){
        reject(ex.message);
      }
    }
    else{
      reject('No search Data');
    }
  });
}

exports.InsertPackage = InsertPackage;
exports.FetchPackage = FetchPackage;
exports.UpdatePackage = UpdatePackage;
exports.SearchPackage = SearchPackage;
exports.FetchPackageProducts = FetchPackageProducts;
exports.LinkPackageProducts = LinkPackageProducts;
