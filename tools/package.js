function MakePackageProductLink(data, allProducts) {
    let products = [];
    data.Products.map(productId => {
        products.push({PackageId: data.Id, 
            ProductId: productId, 
            Price: allProducts.find(ap => ap.id === productId).usdPrice, 
            Quantity: 1});
    })
    data.Products = products;
    return data;
}

function GroupPackages(packages, groupByCount){
    let result = [];
    let count = 0;
    let groupCount = 1;
    let len = packages.length;
    while (count < len) {
        let group = {groupId : groupCount++, items: []};
        for(let i = 0; i < groupByCount; i++) {
            if (count >= len){
                continue;
            }
            group.items.push(packages[count++])
        }
        result.push(group);
    }
    return result;
}

exports.MakePackageProductLink = MakePackageProductLink;
exports.GroupPackages = GroupPackages;
