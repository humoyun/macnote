import Vue from "vue";
import App from "./App.vue";

// import './styles/my-styles.scss'
import './icons'; // icons

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
