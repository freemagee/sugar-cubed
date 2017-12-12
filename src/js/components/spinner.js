Vue.component("spinner", {
  props: {
    loading: Boolean
  },
  template: `<div v-if="loading" class="spinner spinner--isLoading">Spin spin</div>`
});
