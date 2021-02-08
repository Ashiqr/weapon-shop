const each = require('jest-each').default;
const packageTools = require('./package');

describe('Test Make Package Product Link', () => {
    each([
        [
            {Id: 1, Products: ['abc']},
            [{id: 'abc', usdPrice: 200}],
            {Id: 1, Products: [{ProductId: 'abc', Price: 200, PackageId: 1, Quantity: 1}]}
        ],
    ]).test('When data is %s result is %s', (data, allProducts, expected) => {
        expect(packageTools.MakePackageProductLink(data, allProducts)).toStrictEqual(expected);
    });
})


describe('Test Group Packages', () => {
    each([
        [
            [1, 2, 3, 4, 5, 6, 7],
            2,
            [   
                {groupId: 1, items: [1, 2]},
                {groupId: 2, items: [3, 4]},
                {groupId: 3, items: [5, 6]},
                {groupId: 4, items: [7]}
            ]
        ],
    ]).test('When data is %s result is %s', (packages, groupByCount, expected) => {
        expect(packageTools.GroupPackages(packages, groupByCount)).toStrictEqual(expected);
    });
})