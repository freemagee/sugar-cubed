Vue.component("spinner", {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="spinner" :class="{ 'spinner--isLoading': loading }">Data is loading</div>`
});
