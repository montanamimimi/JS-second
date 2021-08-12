Vue.component('products', {
    data() {
        return {
            catalogUrl: 'products.json',
            products: [],
            filtered: [],
        }
    },

    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let prod of data){
                    this.products.push(prod);
                    this.filtered.push(prod);
                }
            });
    },
    

});