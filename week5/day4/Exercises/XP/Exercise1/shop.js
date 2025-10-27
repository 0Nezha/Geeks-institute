const products = require('./products');

const shop = (name) => {
    return products.find(product => product.name === name);
}

console.log(shop("Laptop"));
console.log(shop("Tablet"));
console.log(shop("Smartphone"));