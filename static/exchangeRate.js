function ConvertPrice(price) {
    return new Promise((resolve) => {
        var rate = sessionStorage.getItem('rate');
        if (rate) {
            resolve(CalculatePrice(price, rate));
        }
        else {
            function reqListener () {
                sessionStorage.setItem('rate', this.response.rate);
                resolve(CalculatePrice(price, this.response.rate));
            }
            
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('load', reqListener);
            xhr.responseType = "json";
            xhr.open('GET', `/api/exchangerate/rate?from=USD&to=${localStorage.getItem('currency')}`);
            xhr.send();
        }
    })
};

function CalculatePrice(price, rate){
    return (price * rate).toFixed(2);
}
