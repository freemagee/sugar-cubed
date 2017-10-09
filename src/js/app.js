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
      selected: "Select food item",
      rawSelectedResult: "",
      selectedFoodData: ""
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
            ["api_key", appConfig.apiKey],
            ["q", this.searchQuery],
            ["ds", this.searchBranded === false ? "Standard%20Reference" : ""]
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
        if (this.rawSearchResults !== "") {
          this.formattedSearchResults = this.rawSearchResults.list.item.map(
            result => result
          );
        }
      },
      getDataForSelected() {
        if (this.selected !== "") {
          const query = [
            ["format", "json"],
            ["api_key", appConfig.apiKey],
            ["ndbno", this.selected],
            ["type", "b"]
          ];
          const queryString = this.formTheQuery(query);
          const requestInit = {
            method: "POST"
          };
          const requestObj = new Request(
            `${appConfig.endPoints.reports}${queryString}`,
            requestInit
          );

          fetch(requestObj)
            .then(response => response.json())
            .then(json => {
              this.rawSelectedResult = json;
              this.showResultForSelected();
            });
        }
      },
      showResultForSelected() {
        this.getTotalSugars().then(value => {
          this.selectedFoodData = {
            name: this.rawSelectedResult.report.food.name,
            ndbno: this.rawSelectedResult.report.food.ndbno,
            totalSugars: value
          };
        });
      },
      getTotalSugars() {
        const query = [
          ["format", "json"],
          ["api_key", appConfig.apiKey],
          ["ndbno", this.selected],
          ["nutrients", appConfig.nutrients.sugar.id]
        ];
        const queryString = this.formTheQuery(query);
        const requestInit = {
          method: "POST"
        };
        const requestObj = new Request(
          `${appConfig.endPoints.nutrients}${queryString}`,
          requestInit
        );
        const sugarValue = fetch(requestObj)
          .then(response => response.json())
          .then(json => json.report.foods[0].nutrients[0].value)
          .catch(err => {
            throw new Error(err);
          });

        return sugarValue;
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
