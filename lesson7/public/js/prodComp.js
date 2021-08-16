Vue.component('products', {
    data() {
        return {
            catalogUrl: 'productsList.json',
            productName: 'My Product Name',
            products: [],
            filtered: [],
        }
    },

    methods: {
        filterProd(searchLine) {
            let regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        }
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

    template: `<div class="products" id="products">

                <product v-for="prod of filtered" :key="prod.id" :product="prod"></product>

              </div>`,
});


Vue.component('product', {
    props: ['product'],
    data() {
        return {
            myName: 'Just a product',
        }
    },

    methods: {
        test(prod) {
            console.log(this.$root);
        }
    },


    template: `<div class="product">                
    <img class="product-image" :src="product.picture">
    <h2 class="product-title"> {{ product.title }} </h2>
    <p>Price: $ {{ product.price }} </p>
    <a href="#" class="btn btn-buy" @click="$root.$refs.basket.addProduct(product)">Add to cart</a>
    </div>`

});