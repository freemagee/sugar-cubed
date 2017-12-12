Vue.component("spinner", {
  props: {
    loading: Boolean
  },
  template: `<div class="spinner" v-bind:class="{ 'spinner--isLoading': loading }">Data is loading</div>`
});
