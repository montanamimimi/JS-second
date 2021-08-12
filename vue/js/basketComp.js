Vue.component('basket', {
    data() {
        return {
            basketUrl: 'getBasket.json',
            inBasket: [],
            showBasket: false,
        }
    },

    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}addToBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        let find = this.inBasket.find(x => x.id === product.id);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.inBasket.push(prod);
                        }                         
                    } else {
                        alert("Error in adding product")
                    }
                })
        },

        removeProduct(product) {
            this.$parent.getJson(`${API}deleteFromBasket.json`) 
                .then(data => {
                    if(data.result === 1) {
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.inBasket.splice(this.inBasket.indexOf(product), 1)
                        }
                    } else {
                        alert("Error in deleting product")
                    }
                })
        },

    },

    computed: {
        getTotal() {
            let total = 0;
            for (let item of this.inBasket) {
                total += item.price*item.quantity;
            }
            return total;
        }
    },

    mounted() {
        this.$parent.getJson(`${API + this.basketUrl}`)
            .then( data => {
                for (let item of data) {
                    this.inBasket.push(item);
                }
            });
    },

    template: `<div class="basket-item" >
                    <a class="header-link basket-link" href="#" @click="showBasket = !showBasket">Basket</a>
                    <div class="basket" v-show="showBasket">
                        <h4 v-if="getTotal <= 0 ">The basket is empty </h4>
                        <h4 v-if="getTotal > 0"> Total amount: $ {{ getTotal }}</h4>
                        <div class="basket-products"> 
                            <basket-item 
                            v-for="item of inBasket" 
                            :key="item.id" 
                            :basketItem="item"
                            @removeProduct="removeProduct">
                            </basket-item> 
                    </div>
                </div>
               </div>
`
});

Vue.component('basket-item', {
    props: ['basketItem'],

    template: `<div class="basket-product">
    <img class="basket-image" :src="basketItem.picture">
    <div class="basket-desc">
        <h2 class="basket-title">{{ basketItem.title }} </h2>
        <p>Price: $ {{ basketItem.price }} </p>
        <p>Quantity: {{ basketItem.quantity }} </p>
       
    </div>
    <div class="basket-button"> 
        <a href="#" class="btn btn-remove" @click="$emit('removeProduct', basketItem)">Remove</a>
    </div>
    </div>`
});