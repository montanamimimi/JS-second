'use strict';

const products = [
    {id: 1, title: "Happyness", price: 10, picture: "https://picsum.photos/200/300?random=1"},
    {id: 2, title: "Clear sly", price: 350, picture: "https://picsum.photos/200/300?random=2"},
    {id: 3, title: "Green Forest", price: 29, picture: "https://picsum.photos/200/300?random=3"},
    {id: 4, title: "white water", price: 113, picture: "https://picsum.photos/200/300?random=4"},
    {id: 5}
];

const renderProduct = (id, title = 'Product', price = '100', picture = 'https://picsum.photos/200/300') => 
    `<div class="product">
    <img class="product-image" src="${picture}" alt="product${id}">
    <h2 class="product-title">${title}</h2>
    <p>Price: $${price} </p>
    <a href="#" class="btn btn-buy">Add to cart</a>
    </div>`;


const renderProducts = (list) => {
    let productList = '';

    list.forEach(item => {
        productList += renderProduct(item.id, item.title, item.price, item.picture);
    });
    
    document.getElementById('products').innerHTML = productList;

}

renderProducts(products);