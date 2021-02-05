const sqlite3 = require('sqlite3');
const path = require('path');
var generalTools = require('../tools/general');  

var db = new sqlite3.Database(path.resolve(__dirname, './weapon_shop.sqlite3'));

function InsertPackage(data) {
  return new Promise ((resolve, reject) => {
    var params = generalTools.CleanQuotes(basicTools.ObjectToArray(data, ['Make', 'Model', 'Derivative', 'Year_From', 'Year_To', 'Tags']));
    db.run('INSERT INTO package (Make, Model, Derivative, Year_From, Year_To, Tags) VALUES(?,?,?,?,?,?)', params, function(err) {
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
      db.get('Select * from package_products where PackageId = ?', [Id], function(err, row) {
          if (err) {
            reject(err.message);
          }
          resolve(row);
      });
    });
  }

function UpdatePackage(data) {
  return new Promise ((resolve, reject) => {
    var params = generalTools.CleanQuotes(basicTools.ObjectToArray(data, ['Make', 'Model', 'Derivative', 'Year_From', 'Year_To', 'Tags', 'Id']));
    db.run(`Update package 
            Set Make = ?,  Model = ?, Derivative = ?, Year_From = ?, Year_To = ?, Tags = ? 
            Where id = ?`, params, function(err) {
        if (err) {
          reject(err.message);
        }
        resolve(data.Id);
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
