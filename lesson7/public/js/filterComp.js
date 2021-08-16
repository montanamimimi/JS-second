Vue.component('filter-el', {
    data() {
        return {
            userSearch: '',
        }
    },

    template: `<div class="search">   
                <form action="#" @submit.prevent="$parent.$refs.products.filterProd(userSearch)">
                    <input type="text" class="text" v-model="userSearch">
                    <button type="submit">Find</button>
                </form>
              </div>`

});