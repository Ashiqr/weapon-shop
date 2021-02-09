const each = require('jest-each').default;
const generalTools = require('./general');

describe('Test Clean Quotes', () => {
    each([
        [
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7],
        ],
        [
            [1, 'two', 'three"', 'fo"ur', {'num' : 5}, 6, 7],
            [1, 'two', 'three', 'four', {num : 5}, 6, 7],
        ],
    ]).test('When data is %s result is %s', (data, expected) => {
        expect(generalTools.CleanQuotes(data)).toStrictEqual(expected);
    });
})


describe('Test Convert Currency', () => {
    each([
        [
            'abc',
            'xyz',
            10,
            {rates : {ABC: 3, XYZ: 5}, base: 'aaa'},
            '16.67'
        ]
    ]).test('When data is %s result is %s', (fromCurrency, toCurrency, amount, exchangeRates, expected) => {
        expect(generalTools.ConvertCurrency(fromCurrency, toCurrency, amount, exchangeRates)).toBe(expected);
    });
})

describe('Test Convert Rate', () => {
    each([
        [
            'abc',
            'xyz',
            {rates : {ABC: 3, XYZ: 5}, base: 'aaa'},
            '1.67'
        ],
        [
            'ac',
            'xyz',
            {rates : {ABC: 3, XYZ: 5}, base: 'aaa'},
            0
        ],
        [
            'abc',
            'xy',
            {rates : {ABC: 3, XYZ: 5}, base: 'aaa'},
            0
        ]
    ]).test('When data is %s result is %s', (fromCurrency, toCurrency, exchangeRates, expected) => {
        expect(generalTools.CurrencyRate(fromCurrency, toCurrency, exchangeRates)).toBe(expected);
    });
})

describe('Test Validate Fields', () => {
    each([
        [
            {one :1,  two: 2, three: null},
            ['one', 'three'],
            ['three'],
        ],
        [
            {one :1,  two: null, three: null},
            ['one', 'three'],
            ['three'],
        ]
    ]).test('When data is %s result is %s', (data, fields, expected) => {
        expect(generalTools.ValidateRequiredFields(data, fields)).toStrictEqual(expected);
    });
})


describe('Test Object to Array', () => {
    each([
        [
            {one :1,  two: 2, three: null},
            ['one', 'three', 'two'],
            [1, null, 2],
        ],
        [
            {one : 1,  two: 2, three: null},
            null,
            [1, 2, null],
        ]
    ]).test('When data is %s result is %s', (data, fields, expected) => {
        expect(generalTools.ObjectToArray(data, fields)).toStrictEqual(expected);
    });
})

describe('Test Object Array to Array', () => {
    each([
        [
            [{one :1,  two: 2, three: null}],
            ['one', 'three', 'two'],
            [1, null, 2],
        ],
        [
            [{one : 1,  two: 2, three: null}],
            null,
            [1, 2, null],
        ]
    ]).test('When data is %s result is %s', (data, fields, expected) => {
        expect(generalTools.ObjectArrayToArray(data, fields)).toStrictEqual(expected);
    });
})