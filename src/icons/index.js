import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue"; // svg component

// register globally
Vue.component("svg-icon", SvgIcon);

// require in a base component context
// specific to webpack: when you want to
// require whole group of components programatically
const requiredSvgContext = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(requiredSvgContext);
