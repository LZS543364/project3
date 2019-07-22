import Vue from "vue";
import Vuex from "vuex";
import http from "../utils/http";

import category from "./category.js";
import product from "./product.js";
import alert from "./alert.js";
import address from "./address.js";
import detail from "./detail.js";
import address2 from "./address2.js";

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
                http
        },
        getters: {},
        mutations: {},
        actions: {},
        modules: { category, product,alert,address,detail,address2 }
});