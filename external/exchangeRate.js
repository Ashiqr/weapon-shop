const axios = require('axios');

function getExchangeRates(){
    return new Promise((resolve, reject) => {
        axios.get('https://api.exchangeratesapi.io/latest')
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.getExchangeRates = getExchangeRates;
