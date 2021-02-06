function ObjectToArray(data, sortOrder){
    var result = [];
    if (sortOrder){
        for(var i = 0, len = sortOrder.length; i < len; i++){
            if (typeof(data[sortOrder[i]]) === Array){
                result.push(JSON.stringify(data[sortOrder[i]]));
            }
            else{
                result.push(data[sortOrder[i]]);
            }
        }
    }
    else{
        for(var key in Object.keys(data)){
            if (typeof(data[key] === Array)){
                result.push(JSON.stringify(data[key]));
            }
            else{
                result.push(data[key]);
            }
        }
    }
    return result;
}

function ObjectArrayToArray(data, sortOrder) {
    var result = [];
    for(var i = 0, l = data.length; i < l; i++) {
        ObjectToArray(data[i], sortOrder).map(value => result.push(value));
    }
    return result;
}

function CleanQuotes(data){
    for(var i = 0, len = data.length; i < len; i++){
        if (typeof(data[i]) === 'string'){
            data[i] = data[i].replace(/["]+/g, '');
        }
    }
    return data;
}

function ConvertCurrency(fromCurrency, toCurrency, amount, exchangeRates) {
    try {
        const toBase = amount / exchangeRates.rates[fromCurrency.toUpper()];
        return (toBase * exchangeRates.rates[toCurrency.toUpper()]).toFixed(2);
    }
    catch {
        return 0;
    }
    
}

exports.ObjectToArray = ObjectToArray;
exports.ObjectArrayToArray = ObjectArrayToArray;
exports.CleanQuotes = CleanQuotes;
exports.ConvertCurrency = ConvertCurrency;
