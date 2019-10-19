import Vue from "vue";
import Vuex from "vuex";
import main from "./modules/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firebase: null
  },

  getters: {
    getFirebase(state) {
      state.firebase;
    }
  },

  mutations: {
    setFirebase(state, data) {
      state.firebase = data;
    }
  },

  actions: {},

  modules: {
    main
  }
});
