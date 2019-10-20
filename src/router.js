import Vue from "vue";
import Router from "vue-router";
import Macnote from "@/app/MacNote.vue";
import Login from "@/app/Login.vue";
import PageNotFound from "@/app/PageNotFound.vue";
import myCookie from "@/models/CkManager.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter(to, from, next) {
        if (myCookie.getToken()) {
          next({ name: "app" });
        } else {
          next();
        }
      }
    },

    {
      path: "/",
      name: "app",
      component: Macnote,
      beforeEnter(to, from, next) {
        if (myCookie.getToken()) {
          next();
        } else {
          next({ name: "login" });
        }
        console.log("/ to: ", to);
        // console.log("/ from: ", from);
      }
    },

    { path: "/404", component: PageNotFound, name: "404" },
    { path: "*", component: PageNotFound }
  ]
});
