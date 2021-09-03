Vue.component('filter-el', {
    data() {
        return {
            userSearch: '',
        }
    },

    template: `  
                <form action="#" @submit.prevent="$parent.$refs.products.filterProd(userSearch)" class="header_search">
                    <input type="text" class="search_text" v-model="userSearch">
                    <button type="submit" class="search_button"><i class="fa fa-search" aria-hidden="true"></i></button>
                </form>
              `

});

