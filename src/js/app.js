let appConfig = '';
const initApp = () => {
  const app = new Vue({
    el: "#app",
    data: {
      timer: 0,
      searchQuery: "",
      rawSearchResults: "",
      formattedSearchResults: ""
    },
    watch: {
      searchQuery() {
        this.debouncedSearch();
      }
    },
    methods: {
      formTheQuery(q) {
        const output = q.map(pair => {
          return `${pair[0]}=${pair[1].replace(" ", "+")}`;
        });

        return output.join("&");
      },
      debouncedSearch() {
        clearTimeout(this.timer);

        this.timer = setTimeout(
          function() {
            this.doSearch();
          }.bind(this),
          500
        );
      },
      doSearch() {
        if (this.searchQuery !== "") {
          // Do search
          const query = [
            ["format", "json"],
            ["q", this.searchQuery],
            ["max", "10"],
            ["api_key", appConfig.apiKey]
          ];
          const queryString = this.formTheQuery(query);
          const requestInit = {
            method: 'POST'
          };
          const requestObj = new Request(`${appConfig.endPoints.search}${queryString}`, requestInit);

          fetch(requestObj)
            .then(response => response.json())
            .then(json => {
              this.rawSearchResults = json;
              this.showSearchResults();
            });
        }
      },
      showSearchResults() {
        // Process the json. For now set one against the other
        this.formattedSearchResults = this.rawSearchResults;

        return this.formattedSearchResults;
      }
    }
  });
};

fetch("./js/config.json")
  .then(response => response.json())
  .then(json => {
    appConfig = json;

    initApp();
  });
