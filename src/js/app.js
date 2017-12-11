let appConfig = "";
const initApp = () => {
  const app = new Vue({
    el: "#app",
    data: {
      loading: false,
      timer: 0,
      search: {
        searchQuery: "",
        searchBranded: false,
      },
      foodList: "",
      errorMsg: "",
      // rawSearchResults: "",
      // formattedSearchResults: "",
      // selected: "",
      // rawSelectedResult: "",
      // selectedFoodData: ""
    },
    methods: {
      formTheQuery(q) {
        const output = q.map(pair => {
          return `${pair[0]}=${pair[1].replace(" ", "+")}`;
        });
        this.loading = true;

        return output.join("&");
      },
      updateAutoComplete(args) {
        const value = args[0];
        const searchBranded = args[1];

        if (value !== "") {
          const query = [
            ["format", "json"],
            ["api_key", appConfig.apiKey],
            ["q", value],
            ["ds", searchBranded === false ? "Standard%20Reference" : ""]
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
              if (typeof json.errors !== "object") {
                this.foodList = json.list.item;
              } else {
                this.errorMsg = `No results for ${value}`;
              }
              this.loading = false;
            });

          // update data obj
          this.search.searchQuery = value;
          this.search.searchBranded = searchBranded;
        } else {
          // Clear data list
          this.foodList = "";
        }
      },
      // doSearch() {
      //   if (this.searchQuery !== "") {
      //     const query = [
      //       ["format", "json"],
      //       ["api_key", appConfig.apiKey],
      //       ["q", this.searchQuery],
      //       ["ds", this.searchBranded === false ? "Standard%20Reference" : ""]
      //     ];
      //     const queryString = this.formTheQuery(query);
      //     const requestInit = {
      //       method: "POST"
      //     };
      //     const requestObj = new Request(
      //       `${appConfig.endPoints.search}${queryString}`,
      //       requestInit
      //     );

      //     fetch(requestObj)
      //       .then(response => response.json())
      //       .then(json => {
      //         this.rawSearchResults = json;
      //         this.showSearchResults();
      //       });
      //   }
      // },
      //   showSearchResults() {
      //     if (this.rawSearchResults !== "") {
      //       this.formattedSearchResults = this.rawSearchResults.list.item.map(
      //         result => result
      //       );
      //     }
      //     this.formattedSearchResults.unshift({
      //       name: "Please select a food item",
      //       ndbno: "#####"
      //     });
      //     this.selected = this.formattedSearchResults[0].ndbno;
      //   },
      //   getDataForSelected() {
      //     if (this.selected !== this.formattedSearchResults[0].ndbno) {
      //       const query = [
      //         ["format", "json"],
      //         ["api_key", appConfig.apiKey],
      //         ["ndbno", this.selected],
      //         ["type", "b"]
      //       ];
      //       const queryString = this.formTheQuery(query);
      //       const requestInit = {
      //         method: "POST"
      //       };
      //       const requestObj = new Request(
      //         `${appConfig.endPoints.reports}${queryString}`,
      //         requestInit
      //       );

      //       fetch(requestObj)
      //         .then(response => response.json())
      //         .then(json => {
      //           this.rawSelectedResult = json;
      //           this.showResultForSelected();
      //         });
      //     }
      //   },
      //   showResultForSelected() {
      //     this.getTotalSugars().then(value => {
      //       const cubeSize = 50;
      //       // One sugar cube, which is equivalent to one teaspoon of sugar, weighs approximately 4 grams.
      //       const totalCubes = value / 4;
      //       const remainderStr = totalCubes % 1 !== 0 ? (totalCubes + "").split(".")[1] : 0;
      //       const remainderDecimal = `0.${remainderStr}`;
      //       const remainderWidth = cubeSize * remainderDecimal;

      //       this.selectedFoodData = {
      //         name: this.rawSelectedResult.report.food.name,
      //         ndbno: this.rawSelectedResult.report.food.ndbno,
      //         unit: "g",
      //         totalSugars: value,
      //         totalCubes: totalCubes,
      //         cubeSize: cubeSize,
      //         wholeCubes: Math.floor(parseInt(totalCubes, 10)),
      //         remainderCube: remainderStr,
      //         remainderCubeAsDecimal: remainderDecimal,
      //         remainderCubeWidth: remainderWidth
      //       };
      //     });
      //   },
      //   getTotalSugars() {
      //     const query = [
      //       ["format", "json"],
      //       ["api_key", appConfig.apiKey],
      //       ["ndbno", this.selected],
      //       ["nutrients", appConfig.nutrients.sugar.id]
      //     ];
      //     const queryString = this.formTheQuery(query);
      //     const requestInit = {
      //       method: "POST"
      //     };
      //     const requestObj = new Request(
      //       `${appConfig.endPoints.nutrients}${queryString}`,
      //       requestInit
      //     );
      //     const sugarValue = fetch(requestObj)
      //       .then(response => response.json())
      //       .then(json => {
      //         return json.report.foods[0] !== undefined
      //           ? json.report.foods[0].nutrients[0].value
      //           : 0;
      //       })
      //       .catch(err => {
      //         throw new Error(err);
      //       });

      //     return sugarValue;
      //   }
    }
  });
};

fetch("./js/config.json")
  .then(response => response.json())
  .then(json => {
    appConfig = json;

    initApp();
  });
