Vue.component('basket', {
    data() {
        return {
            basketUrl: 'getBasket.json',
            inBasket: [],
            showBasket: true,
        }
    },

    methods: {
        addProduct(product) {

            let find = this.inBasket.find(x => x.id === product.id);            

            if (find) {
                this.$parent.putJson(`/cartData/${find.id}`, {quantity: 1})
                    .then( data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/cartData', prod)
                  .then(data => {
                      if (data.result === 1) {
                          this.inBasket.push(prod);
                      }
                  });
            }
        },

        removeProduct(product) {
            let find = this.inBasket.find(x => x.id === product.id);    
            if (find.quantity > 1) {
                this.$parent.putJson(`/cartData/${find.id}`, {quantity: -1})
                    .then( data => {
                        if (data.result === 1) {
                            find.quantity--;
                        }
                    })
            } else {                
                this.$parent.deleteJson(`/cartData`, product)
                  .then(data => {
                      if (data.result === 1) {
                          this.inBasket.splice(this.inBasket.indexOf(product), 1);
                      }
                  });
            }
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
        this.$parent.getJson(`/cartData`)
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