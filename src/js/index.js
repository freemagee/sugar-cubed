// Vendor
import Vue from "vue";
// App
import App from "./App.vue";
// Styles
import "tachyons";
import "../scss/style.scss";

new Vue({
  render: h => h(App)
}).$mount("#app");
