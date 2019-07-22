// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from "./router";
import store from "./store";
import App from "./App.vue";
import http from "./utils/http.js";
import "./assets/css/ypreset.css"
// import VueAreaLinkage from 'vue-area-linkage';


// Vue.use(VueAreaLinkage);

// Vue.config.productionTip = false
Vue.prototype.$http = http;

/* eslint-disable no-new */
let vm = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: "<App></App>"
});
