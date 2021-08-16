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
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },


    },
    

});