'use strict';

const API = "https://raw.githubusercontent.com/montanamimimi/JS-second/main/JSON/";



// Класс для одного товара. Классы же надо оставлять, они же полезные? Их тут оставлять или можно как-то в Vue запихнуть? =)

class ProductItem {
    constructor(id, title = "No name", price, picture = 'https://via.placeholder.com/150/444444', show = 0) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.picture = picture;
        this.show = 1;
    }
}

// Класс для товара в корзине 

class ProductInBasket extends ProductItem {
    constructor(id, title, price, picture, quantity = 0) {
        super(id, title, price, picture);
        this.quantity = quantity;
    }
}


// Приложение на Vue 

const app = new Vue({
    el: '#app',

    data: {
        catalogUrl: 'products.json',
        products: [],
        header: 'Header',
        inBasket: [],
        search: '',
        applySeacrh: false,
    },

    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                  console.log(error);
                })
        },

        addToCart(prod) {
            let item = this.inBasket.find(x => x.id === prod.id);
            if (item) {
                item.quantity++;
            } else {
                let basketProd = new ProductInBasket(prod.id, prod.title, prod.price, prod.picture, 1);
                this.inBasket.push(basketProd);
            }                              
        },

        remove(prod) {
            let item = this.inBasket.find(x => x.id === prod.id);
            item.quantity--;
        },

        filterGoods() {
            let regExp = new RegExp(this.search, "i");                        
            this.products.forEach(prod => {
                if (!regExp.test(prod.title)) {
                    prod.show = 0;
                } else {
                    prod.show = 1;
                }
            });

            // Кривовато отображает, потом поправлю =) 

            if (this.search) {
                this.applySearch = true;
            } else {
                this.applySearch = false;
            }

        }
    },

    computed: {
        countBasket() {
            let total = 0;
            this.inBasket.forEach(item => {
                total += item.quantity * item.price;
            })
            return total;
        }
    },

    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {        
              data.forEach(product => {
                  let prod = new ProductItem(product.id, product.title, product.price, product.picture);
                  this.products.push(prod);
              });            
            });
        
      },
    
})





// // Для 1 части ДЗ - тренировка на промисах. 

// let getRequest = (url) => {
//     return new Promise((res, rej) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     rej("Error!");
//                 }
//                 else {
//                     res(xhr.responseText);
//                 }
//             }
//         }
//         xhr.send();
//     })
// }



// // Класс для списка товаров 

// class ProductList {
//     constructor(container = '.products') {
//         this.container = container;
//         this._goods = [];
//         this.allProducts = [];

//         this._fetchGoods();

//     }

//     // Получение списка товаров на промисах 

//     _fetchGoods() {
//         getRequest(`${API}products.json`)
//             .then((data) => {
//                 return JSON.parse(data);
//             })
//             .then((data) => {
//                 this._goods = data;
//                 this._render();
//             })
//             .catch((text) => {
//                 console.log(`The errror is ${text}`);
//             });
         
//     }

//     _render() {
//         const block = document.querySelector(this.container);

//         for (const product of this._goods) {
//             const productObject = new ProductItem(product.id, product.title, product.price, product.picture);
//             this.allProducts.push(productObject);
//             block.insertAdjacentHTML('beforeend', productObject.render());
//         }
//     }


//     // Это больше не работает
//     getTotalPrice() {
//         let summ = 0;
//         for (const product of this.allProducts) {
//             summ += product.price;
//         }
//         console.log(summ);
//     }
// }


// // Класс для корзины 

// class Basket {
//     constructor() {
//         this.productsInBasket = [];
//     }

//     showBasket() {}

//     closeBasket(){}

//     // Без реального функционала, не успеваю, слооооожно =))) 

//     addProduct(prod) {
//         fetch(`${API}addToBasket.json`)
//         .then(response => response.json())
//         .then((data) => {
//             if (data.result == 1) {
//                 console.log(`Product ${prod} add`);
//             }
//             else {
//                 console.log("Something wrong");
//             }
//         })
//         .catch(() => {
//             console.log("Error");
//         });
//     }

//     removeProduct(prod) {
//         fetch(`${API}deleteFromBasket.json`)
//         .then(response => response.json())
//         .then((data) => {
//             if (data.result == 1) {
//                 console.log(`Product ${prod} removed`);
//             }
//             else {
//                 console.log("Something wrong");
//             }
//         })
//         .catch(() => {
//             console.log("Error");
//         });
//     }

//     // С асинхроном это тоже больше не будет работать 

//     // getTotalPrice() {
//     //     let summ = 0;
//     //     for (const product of this.productsInBasket) {
//     //         summ += product.price*product.quantity;
//     //     }
//     //     return summ;
//     // }

//     // Данные в файле надо будет переделать, ну и функционала тут тоже пока нет. Только запросы. 

//     getTotalPrice() {
//         fetch(`${API}getBasket.json`)
//             .then(response => response.json())
//             .then((data) => {
//                 console.log(data.amount);
//             })
//             .catch(() => {
//                 console.log("Error");
//             });
//     }

//     getBasketList() {
//         fetch(`${API}getBasket.json`)
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data.contents);
//         })
//         .catch(() => {
//             console.log("Error");
//         });
//     }
// }


// let newList = new ProductList();
// let newBasket = new Basket();




