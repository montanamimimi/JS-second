Vue.component('products', {
    data() {
        return {
            catalogUrl: 'productsList.json',
            productName: 'My Product Name',
            products: [],
            filtered: [],
            productOn: false,
            singleProd: false,
        }
    },

    methods: {
        filterProd(searchLine) {
            let regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        },

        showProduct(prod) {
            this.productOn = true;   
            this.singleProd = prod;              
        },
    },

    mounted() {
        this.$parent.getJson(`/catalogData`)
            .then( data => {
                for (let item of data) {
                    this.products.push(item);
                };
                this.filtered = this.products;
                
            });
    },

    template: `<div class="catalog-list" id="products">

                <div v-if="productOn" id="myModal" class="modal">

                <div class="modal-content">
                <span class="close" @click="productOn=false">&times;</span>
                        <img class="singleProd-image" :src="singleProd.picture">
                        <p class="singleProd-title">{{ singleProd.title }}</p>
                        <p class="singleProd-title">$ {{ singleProd.price }} </p>
                       
                   

                    <a href="#" class="btn checkout_button" @click="$root.$refs.basket.addProduct(singleProd)">Add to Cart </a>
                </div>

                </div>

                <product v-for="prod of filtered" 
                :key="prod.id" 
                :product="prod" 
                :productOn="productOn"
                @showProduct="showProduct"></product>

              </div>`,
});


Vue.component('product', {
    props: ['product'],

    methods: {
        test(prod) {
            console.log(this.$root);
        },

    },


    template: `<div class="products_item">    


    <a href="#" class="products_link" @click="$emit('showProduct', product)"> 
            
    <img class="product_image" :src="product.picture">


    <p class="products_title"> {{ product.title }} </p>



    <p class="products_price"> $ {{ product.price }} </p>

    </a>


    <a href="#" class="products_add_link" @click="$root.$refs.basket.addProduct(product)">Add to cart</a>
    </div>`

});
