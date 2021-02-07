const sqlite3 = require('sqlite3');
const path = require('path');
const generalTools = require('../tools/general');

var db = new sqlite3.Database(path.resolve(__dirname, './weapon_shop.sqlite3'));

function InsertCart(data) {
    return new Promise ((resolve, reject) => {
        if (!data.CartId){
            var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['UserId', 'TotalPrice', 'Discount']));
            db.run('Insert Into cart (UserId, TotalPrice, Discount) VALUES(?,?,?)', params, function(err) {
                if (err) {
                    reject(err.message);
                }
                data.CartId = this.lastID;
                LinkCartPackages(data).then(result => {
                    UpdatePrice(data.CartId);
                    resolve(data.CartId);
                })
            });
        }
        else {
            LinkCartPackages(data).then(result => {
                UpdatePrice(data.CartId);
                resolve(data.CartId);
            })
        }
    });
}

function LinkCartPackages(data){
    return new Promise ((resolve, reject) => {
        var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['CartId', 'PackageId']));
        db.run('Insert Into cart_packages (CartId, PackageId) VALUES(?,?)', params, function(err) {
            if (err) {
                reject(err.message);
            }
            resolve('ok');
        });
    });
}

function UpdatePrice(cartId){
    return new Promise ((resolve, reject) => {
        db.run(`UPDATE cart
                set TotalPrice = (SELECT sum(p.Price)
                                 from cart_packages cp
                                 INNER join package p 
                                 on cp.PackageId = p.id
                                 WHERE cp.CartId = ?)
                WHERE id = ?`, 
                [cartId, cartId], function(err) {
            if (err) {
                reject(err.message);
            }
            resolve('ok');
        });
    });
}

function RemoveCart(data){
    return new Promise ((resolve, reject) => {
        var params = generalTools.CleanQuotes(generalTools.ObjectToArray(data, ['CartId', 'PackageId']));
        db.run(`Delete from cart_packages 
                Where CartId = ? and PackageId = ?`, params, function(err) {
            if (err) {
              reject(err.message);
            }
            UpdatePrice(data.CartId);
            resolve(data.CartId);
        });
      });
}

function FetchCart(id){
    return new Promise ((resolve, reject) => {
        db.all(`SELECT *
                from cart_packages cp
                INNER JOIN package p
                on cp.PackageId = p.id
                WHERE cp.CartId = ?`, [id], function(err, rows) {
            if (err) {
                reject(err.message);
            }
            resolve(rows);
        });
    });
}


function FetchCartCount(id){
    return new Promise ((resolve, reject) => {
        db.all(`SELECT count(1) as count
                from cart_packages cp
                WHERE cp.CartId = ?`, [id], function(err, rows) {
            if (err) {
                reject(err.message);
            }
            resolve(rows);
        });
    });
}

function FetchCartInformation(id){
    return new Promise ((resolve, reject) => {
        db.all(`SELECT *
                from cart c
                WHERE c.id = ?`, [id], function(err, rows) {
            if (err) {
                reject(err.message);
            }
            resolve(rows);
        });
    });
}

exports.InsertCart = InsertCart;
exports.RemoveCart = RemoveCart;
exports.FetchCart = FetchCart;
exports.FetchCartCount = FetchCartCount;
exports.FetchCartInformation = FetchCartInformation;
