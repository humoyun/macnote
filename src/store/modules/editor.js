export default {
  state: {
    count: 0
  },

  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count++;
    }
  },

  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  }
};
