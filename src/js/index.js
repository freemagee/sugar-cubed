// Vendor
import Vue from "Vue";
// App
import App from "./App.vue";
// Styles
import "tachyons";
import "./../css/style.css";

const vm = new Vue({
  render: (h) => h(App)
});

vm.$mount('#app');
