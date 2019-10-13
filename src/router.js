import Vue from "vue";
import Router from "vue-router";
import Macnote from "@/app/MacNote.vue";
import Login from "@/app/Login.vue";
import PageNotFound from "@/app/PageNotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
      // beforeEnter(to, from, next) {
      //   // console.log("/login to: ", to);
      //   // console.log("/login from: ", from);
      //   next();
      // }
    },

    {
      path: "/",
      name: "app",
      component: Macnote
      // beforeEnter(to, from, next) {
      //   console.log("/ to: ", to);
      //   // console.log("/ from: ", from);
      //   next();
      // }
    },

    { path: "/404", component: PageNotFound, name: "404" },
    { path: "*", component: PageNotFound }
  ]
});
