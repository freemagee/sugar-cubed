let appConfig = "";
const initApp = () => {
  const app = new Vue({
    el: "#app",
    data: {
      timer: 0,
      searchQuery: "",
      searchBranded: false,
      rawSearchResults: "",
      formattedSearchResults: "",
      selected: ""
    },
    watch: {
      searchQuery() {
        this.debouncedSearch();
      },
      selected() {
        this.getDataForSelected();
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
          const query = [
            ["format", "json"],
            ["q", this.searchQuery],
            ["ds", this.searchBranded === false ? "Standard%20Reference" : ""],
            ["api_key", appConfig.apiKey]
          ];
          const queryString = this.formTheQuery(query);
          const requestInit = {
            method: "POST"
          };
          const requestObj = new Request(
            `${appConfig.endPoints.search}${queryString}`,
            requestInit
          );

          fetch(requestObj)
            .then(response => response.json())
            .then(json => {
              this.rawSearchResults = json;
              this.showSearchResults();
            });
        }
      },
      showSearchResults() {
        if (this.searchQuery !== "") {
          this.formattedSearchResults = this.rawSearchResults.list.item.map(
            result => result
          );
        }
      },
      getDataForSelected() {
        if (this.selected !== "") {
          const query = [
            ["format", "json"],
            ["q", this.searchQuery],
            ["ds", this.searchBranded === false ? "Standard%20Reference" : ""],
            ["api_key", appConfig.apiKey]
          ];
          const queryString = this.formTheQuery(query);
          const requestInit = {
            method: "POST"
          };
          const requestObj = new Request(
            `${appConfig.endPoints.search}${queryString}`,
            requestInit
          );

          fetch(requestObj)
            .then(response => response.json())
            .then(json => {
              this.rawSearchResults = json;
              this.showSearchResults();
            });
        }
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
