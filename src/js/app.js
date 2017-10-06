const app = new Vue({
  el: "#app",
  data: {
    searchQuery: "",
    timer: 0
  },
  watch: {
    searchQuery() {
      this.triggerSearch();
    }
  },
  methods: {
    triggerSearch() {
      clearTimeout(this.timer);

      this.timer = setTimeout(
        function() {
          this.search();
        }.bind(this),
        300
      );
    },
    search() {
      if (this.searchQuery !== "") {
        // Do search
        console.log(this.searchQuery);
      }
    }
  }
});
