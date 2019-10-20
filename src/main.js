import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import GlobalVar from "@/libs/global_var.js";

import "./icons";

// import './styles/my-styles.scss'
import { $firebase, $db } from "./core.js";

Vue.use(GlobalVar, {
  globals: {
    $firebase,
    $db
    // $assetsPath: `${process.env.BASE_URL}assets`
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
