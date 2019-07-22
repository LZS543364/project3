//vue 项目路由配置文件
import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Taste from "../views/Taste.vue";
import List from "../views/List.vue";
import Address from "../views/address.vue";
import Order from "../views/Order.vue";
import Detail from "../views/Details.vue";

Vue.use(Router);

let router = new Router({
        linkActiveClass: "active",
        routes: [
                { path: "/", component: Home },
                {
                        path: "/category",
                        component: Category,
                        meta: {//藏和路由相关的值
                                keepAlive: true
                        }
                },
                { path: "/cart", component: Cart },
                { path: "/login", component: Login},
                { path:"/profile", component: Profile},
                { path: "/taste", component: Taste},
                {
                        path: "/list/:mainId/:subId",
                        component: List,
                        meta: {//藏和路由相关的值
                                keepAlive: true
                        }
                },
                { path: "/address", component: Address },
                { path: "/order", component: Order},
                { path: "/detail/:id", component: Detail }
        ]
});

export default router;