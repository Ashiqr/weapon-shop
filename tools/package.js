function MakePackageProductLink(data, allProducts) {
    var products = [];
    data.Products.map(productId => {
        allProducts.find(ap => ap.id === productId).Price;
        products.push({PackageId: data.Id, 
            ProductId: productId, 
            Price: allProducts.find(ap => ap.id === productId).usdPrice, 
            Quantity: 1});
    })
    data.Products = products;
    return data;
}

exports.MakePackageProductLink = MakePackageProductLink;
