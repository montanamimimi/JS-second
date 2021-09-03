Vue.component('basket', {
    data() {
        return {
            basketUrl: 'getBasket.json',
            inBasket: [],
            showBasket: true,
            checkoutOn: false,
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

        moreProduct(product) {
            let find = this.inBasket.find(x => x.id === product.id);    
            this.$parent.putJson(`/cartData/${find.id}`, {quantity: 1})
            .then( data => {
                if (data.result === 1) {
                    find.quantity++;
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
        },

        getTotalCount() {
            let total = 0;

            for (let item of this.inBasket) {
                total += item.quantity;
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
    <div v-if="getTotalCount > 0"class="number-of-products">
                        {{ getTotalCount }}
    </div>

                    <a class="basket-link" href="#"><img src="images/basket.svg" alt="Basket" class="basket_img"></a>

                    <div v-if="!checkoutOn" class="megamenu megamenu_left basket-megamenu">
                        <div class="basket">
                            <p v-if="getTotal <= 0 ">The basket is empty </p>
                            <p v-if="getTotal > 0"> Total amount: $ {{ getTotal }}</p>
                            <div class="basket-mega-products"> 
                                <basket-item 
                                v-for="item of inBasket" 
                                :key="item.id" 
                                :basketItem="item"                              
                                @removeProduct="removeProduct"
                                @moreProduct="moreProduct">
                                </basket-item> 
                                
                            </div>
                            <a href="#" class="btn checkout_button"  @click="checkoutOn = true">Checkout</a>
                        </div>
                    </div>


                    <div v-if="checkoutOn" id="myModal" class="modal">

                        <div class="modal-content">
                        <span class="close" @click="checkoutOn = false">&times;</span>
                            
                            <div class="basket">

                            <div class="basket-mega-products"> 
                                <basket-item 
                                v-for="item of inBasket" 
                                :key="item.id" 
                                :basketItem="item"
                                @removeProduct="removeProduct"
                                @moreProduct="moreProduct">
                                </basket-item> 
                                
                            </div>

                            <p v-if="getTotal <= 0 ">The basket is empty </p>
                            <p v-if="getTotal > 0"> Total amount: $ {{ getTotal }}</p>
                            <a href="#" class="btn checkout_button">Pay now </a>
                            </div>

                        </div>
                    
                    </div>
               </div>
`
});

Vue.component('basket-item', {
    props: ['basketItem'],

    template: `<a href="#" class="basket-product-link">
    <div class="basket-product basket-pruduct-first">
        <div class="basket-product-img">
            <img :src="basketItem.picture" alt="Rebox" class="basket-product-img-img">
        </div>
        <div class="basket-product-desc">
            <p class="basket-product-name">
            {{ basketItem.title }}
            </p>
            <div class="basket-product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <p class="basket-product-price">
            {{ basketItem.quantity }}  x   $ {{ basketItem.price }} = $ {{ basketItem.quantity*basketItem.price }}
            </p>
        </div>
        <div class="basket-product-del">
            <i class="fas fa-minus-square" @click="$emit('removeProduct', basketItem)"></i>
            <i class="fas fa-plus-square" @click="$emit('moreProduct', basketItem)"></i>
        </div>
    </div>
</a>`

});

