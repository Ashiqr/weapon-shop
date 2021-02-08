const axios = require('axios');

function GetProducts(){
    return new Promise((resolve, reject) => {
        const auth = 'Basic ' + Buffer.from('user:pass').toString('base64');
        axios.get('https://product-service.herokuapp.com/api/v1/products', { headers : { 'Authorization' : auth }})
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

function GetProduct(id){
    return new Promise((resolve, reject) => {
        const auth = 'Basic ' + Buffer.from('user:pass').toString('base64');
        axios.get(`https://product-service.herokuapp.com/api/v1/products/${id}`, { headers : { 'Authorization' : auth }})
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.GetProducts = GetProducts;
exports.GetProduct = GetProduct;
