import Vue from "vue";
import "./assets/css/adminReset.css";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI);

let vm = new Vue({
        components: { App },
        el:"#app",
        store,
        router,
        template: "<App></App>"
});