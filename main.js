'use strict';


class ProductItem {
    constructor(id, title = "No name", price, picture = 'https://picsum.photos/200/300') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.picture = picture;
    }

    render () {
        return  `<div class="product">
        <img class="product-image" src="${this.picture}" alt="product${this.id}">
        <h2 class="product-title">${this.title}</h2>
        <p>Price: $${this.price} </p>
        <a href="#" class="btn btn-buy">Add to cart</a>
        </div>`;
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this.allProducts = [];

        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: "Happyness", price: 10, picture: "https://picsum.photos/200/300?random=1"},
            {id: 2, title: "Clear sly", price: 350, picture: "https://picsum.photos/200/300?random=2"},
            {id: 3, title: "Green Forest", price: 29, picture: "https://picsum.photos/200/300?random=3"},
            {id: 4, title: "white water", price: 113, picture: "https://picsum.photos/200/300?random=4"},
            {id: 5, price: 50}
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const product of this._goods) {
            const productObject = new ProductItem(product.id, product.title, product.price, product.picture);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }


    // Для вида, чтобы убедиться, что работает. Так этот метод должен работать в корзине а не тут. 
    getTotalPrice() {
        let summ = 0;
        for (const product of this.allProducts) {
            summ += product.price;
        }
        console.log(summ);
    }
}

let newList = new ProductList();

newList.getTotalPrice();

class ProductInBasket extends ProductItem {
    constructor(id, title, price, picture, quantity = 0) {
        super(id, title, price, picture);
        this.quantity = quantity;
    }

    render() {}

    addOne() {}

    removeOne() {}

    removeAll() {}

 }

class Basket {
    constructor() {
        productsInBasket = [];
    }

    showBasket() {}

    closeBasket(){}

    addProduct() {}

    removeProduct() {}

    getTotalPrice() {
        let summ = 0;
        for (const product of this.productsInBasket) {
            summ += product.price*product.quantity;
        }
        return summ;
    }
}

