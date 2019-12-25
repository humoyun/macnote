import Vue from "vue";
import Vuex from "vuex";
import editor from "./modules/editor";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firebase: null,
    db: null
  },

  getters: {
    getFirebase(state) {
      state.firebase;
    },
    getDB(state) {
      state.db;
    }
  },

  mutations: {
    setFirebase(state, data) {
      state.firebase = data;
    },
    setDB(state, data) {
      state.db = data;
    }
  },

  actions: {},

  modules: {
    editor
  }
});
