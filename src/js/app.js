const app = new Vue({
  el: "#app",
  data: {
    searchQuery: "",
    timer: 0
  },
  watch: {
    searchQuery() {
      this.debouncedSearch();
    }
  },
  methods: {
    debouncedSearch() {
      clearTimeout(this.timer);

      this.timer = setTimeout(
        function() {
          this.doSearch();
        }.bind(this),
        300
      );
    },
    doSearch() {
      if (this.searchQuery !== "") {
        // Do search
        console.log(this.searchQuery);
      }
    }
  }
});
