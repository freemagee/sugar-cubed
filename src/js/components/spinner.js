Vue.component("spinner", {
  props: ["loading"],
  template: `<div v-if="loading" class="spinner spinner--isLoading">Spin spin</div>`
});
