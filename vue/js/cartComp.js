Vue.component('cart', {
    data() {
        return {
            cartUrl: 'getBasket.json',
            inBasket: [],
            showBasket: true,  
        }
    },
    methods: {
        addProduct(prod) {
            this.$parent.getJson(`${API}addToBasket.json`)
                .then( data => {
                    if (data.result === 1) {
                        let item = this.inBasket.find(x => x.id === prod.id);
                        if (item) {
                            item.quantity++;
                        } else {
                            let basketProd = new ProductInBasket(prod.id, prod.title, prod.price, prod.picture, 1);
                            this.inBasket.push(basketProd);
                        }    
                    } else {
                        alert('Add to cart failed');
                    }                    
                })
        },

        removeProduct(prod) {
            this.$parent.getJson(`${API}deleteFromBasket.json`)
                .then( data => {
                    if (data.result === 1) {
                        if(prod.quantity > 1){
                            prod.quantity--;
                        } else {
                            this.inBasket.splice(this.inBasket.indexOf(prod), 1)
                        }
                    } else {
                        alert("Removing is failed");
                    }
                })
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

    template: `
    <div class="basket-block">
    <div class="basket" v-show="showBasket">
        <h2 v-if="countBasket == 0">В корзине пока пусто</h2>
        <h2 v-else>Ваша корзина:</h2>

        <div class="basket-products">

            <basket-product class="basket-product"
            v-for="item of inBasket"
            :key="item.id"
            :card-item="item"
            @remove="removeProduct">
            </basket-product>

        </div>

        <p v-if="countBasket > 0">Сумма заказа: {{ countBasket }}</p>

    </div>
    </div>`

});


Vue.component('basket-product', {
    props: ['cartItem', 'img'],
    template: `
        <div class="basket-product" v-for="item of inBasket" :key="item.id" v-if="item.quantity > 0">
            <img class="basket-image" :src="item.picture" :alt="item.title">

            <div class="basket-desc">
                <h2 class="basket-title">{{ item.title }}</h2>
                <p>Price: {{ item.price }} </p>
                <p>Quantity: {{ item.quantity }} </p>

            </div>

            <div class="basket-remove">
                <a href="#" class="btn btn-remove" :id="item.id" @click="remove(item)">Remove </a>
            </div>


        </div>
    `
});
