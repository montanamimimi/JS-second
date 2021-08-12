const API = "https://raw.githubusercontent.com/montanamimimi/JS-second/main/JSON/";

const app = new Vue({
    el: '#app',

    data: {
        title: 'E-shop',
        search: '',
    },

    methods: {
        getJson(url) {
            return fetch(url)
                 .then(result => result.json())
                 .catch(error => {
                     alert('Some error main methods');
                 })
        }, 

        zzz() {
            console.log('Go search');
        },
    },

});