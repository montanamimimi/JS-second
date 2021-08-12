'use strict';

const API = "https://raw.githubusercontent.com/montanamimimi/JS-second/main/JSON/";

const app = new Vue({
    el: '#app',

    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
    },    
})



