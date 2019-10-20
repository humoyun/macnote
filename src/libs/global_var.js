import store from "@/store/index";

const GlobalVar = {
  install(Vue, options) {
    this.options = options || {};
    const globals = this.options.globals || {};

    Object.keys(globals).forEach(key => {
      window[`${key}`] = globals[key];
      Vue.set(store.state, key, globals[key]);
    });

    const computed = {};
    Object.keys(globals).forEach(key => {
      computed[`${key}`] = () => globals[key];
    });

    Vue.mixin({
      computed
    });
  }
};

export default GlobalVar;
