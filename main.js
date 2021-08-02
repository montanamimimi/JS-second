'use strict';

const API = "https://raw.githubusercontent.com/montanamimimi/JS-second/main/JSON/";


// Для 1 части ДЗ - тренировка на промисах. 

let getRequest = (url) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    rej("Error!");
                }
                else {
                    res(xhr.responseText);
                }
            }
        }
        xhr.send();
    })
}


// Класс для одного товара 

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

// Класс для списка товаров 

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this.allProducts = [];

        this._fetchGoods();

    }

    // Получение списка товаров на промисах 

    _fetchGoods() {
        getRequest(`${API}products.json`)
            .then((data) => {
                return JSON.parse(data);
            })
            .then((data) => {
                this._goods = data;
                this._render();
            })
            .catch((text) => {
                console.log(`The errror is ${text}`);
            });
         
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const product of this._goods) {
            const productObject = new ProductItem(product.id, product.title, product.price, product.picture);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }


    // Это больше не работает
    getTotalPrice() {
        let summ = 0;
        for (const product of this.allProducts) {
            summ += product.price;
        }
        console.log(summ);
    }
}

// Класс для товара в корзине 

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

// Класс для корзины 

class Basket {
    constructor() {
        this.productsInBasket = [];
    }

    showBasket() {}

    closeBasket(){}

    // Без реального функционала, не успеваю, слооооожно =))) 

    addProduct(prod) {
        fetch(`${API}addToBasket.json`)
        .then(response => response.json())
        .then((data) => {
            if (data.result == 1) {
                console.log(`Product ${prod} add`);
            }
            else {
                console.log("Something wrong");
            }
        })
        .catch(() => {
            console.log("Error");
        });
    }

    removeProduct(prod) {
        fetch(`${API}deleteFromBasket.json`)
        .then(response => response.json())
        .then((data) => {
            if (data.result == 1) {
                console.log(`Product ${prod} removed`);
            }
            else {
                console.log("Something wrong");
            }
        })
        .catch(() => {
            console.log("Error");
        });
    }

    // С асинхроном это тоже больше не будет работать 

    // getTotalPrice() {
    //     let summ = 0;
    //     for (const product of this.productsInBasket) {
    //         summ += product.price*product.quantity;
    //     }
    //     return summ;
    // }

    // Данные в файле надо будет переделать, ну и функционала тут тоже пока нет. Только запросы. 

    getTotalPrice() {
        fetch(`${API}getBasket.json`)
            .then(response => response.json())
            .then((data) => {
                console.log(data.amount);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    getBasketList() {
        fetch(`${API}getBasket.json`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.contents);
        })
        .catch(() => {
            console.log("Error");
        });
    }
}


let newList = new ProductList();
let newBasket = new Basket();

newBasket.getTotalPrice();
newBasket.addProduct(2);
newBasket.removeProduct(3);
newBasket.getBasketList();