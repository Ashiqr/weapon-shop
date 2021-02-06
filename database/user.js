const sqlite3 = require('sqlite3');
const path = require('path');
var generalTools = require('../tools/general');  

var db = new sqlite3.Database(path.resolve(__dirname, './weapon_shop.sqlite3'));


function InsertUser(data) {
    return new Promise ((resolve, reject) => {
      var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['Username', 'Currency']));
      db.run('INSERT INTO users (Username, Currency) VALUES(?,?)', params, function(err) {
          if (err) {
            reject(err.message);
          }
          resolve(this.lastID);
      });
    });
}

function DeleteUser(data) {
  return new Promise ((resolve, reject) => {
    var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['Username']));
    db.run('Delete from users where Username = ?', params, function(err) {
        if (err) {
          reject(err.message);
        }
        resolve('ok');
    });
  });
}

exports.InsertUser = InsertUser;
exports.DeleteUser = DeleteUser;