function ObjectToArray(data, sortOrder){
    let result = [];
    if (sortOrder){
        for(let i = 0, len = sortOrder.length; i < len; i++){
            if (typeof(data[sortOrder[i]]) === Array){
                result.push(JSON.stringify(data[sortOrder[i]]));
            }
            else{
                result.push(data[sortOrder[i]]);
            }
        }
    }
    else{
        for(let key in Object.keys(data)){
            if (typeof(data[key]) === Array){
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
    let result = [];
    for(let i = 0, l = data.length; i < l; i++) {
        ObjectToArray(data[i], sortOrder).map(value => result.push(value));
    }
    return result;
}

function CleanQuotes(data){
    for(let i = 0, len = data.length; i < len; i++){
        if (typeof(data[i]) === 'string'){
            data[i] = data[i].replace(/["]+/g, '');
        }
    }
    return data;
}

function ConvertCurrency(fromCurrency, toCurrency, amount, exchangeRates) {
    exchangeRates.rates[exchangeRates.base] = 1;
    try {
        const toBase = amount / exchangeRates.rates[fromCurrency.toUpper()];
        return (toBase * exchangeRates.rates[toCurrency.toUpper()]).toFixed(2);
    }
    catch {
        return 0;
    }
}

function CurrencyRate(fromCurrency, toCurrency, exchangeRates) {
    exchangeRates.rates[exchangeRates.base] = 1;
    try {
        return (exchangeRates.rates[toCurrency.toUpperCase()] / exchangeRates.rates[fromCurrency.toUpperCase()]).toFixed(2);
    }
    catch {
        return 0;
    }
}

function ValidateRequiredFields(data, fields) {
    let result = [];
    if (fields){
        for(let i = 0, len = fields.length; i < len; i++){
            if (typeof(data[fields[i]]) === Array && data[key].length === 0){
                result.push(fields[i]);
            }
            else if (!data[fields[i]]) {
                result.push(fields[i]);
            }
        }
    }
    else{
        for(let key in Object.keys(data)){
            if (typeof(data[key]) === Array && data[key].length === 0) {
                result.push(key);
            }
            else if (!data[key]){
                result.push(key);
            }
        }
    }
    return result;
}

exports.ObjectToArray = ObjectToArray;
exports.ObjectArrayToArray = ObjectArrayToArray;
exports.CleanQuotes = CleanQuotes;
exports.ConvertCurrency = ConvertCurrency;
exports.CurrencyRate = CurrencyRate;
exports.ValidateRequiredFields = ValidateRequiredFields;
