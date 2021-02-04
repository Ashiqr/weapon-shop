const axios = require('axios');

function getProducts(){
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

function getProduct(id){
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

exports.getProducts = getProducts;
exports.getProduct = getProduct;
