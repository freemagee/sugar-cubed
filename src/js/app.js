let appConfig = "";
const initApp = () => {
  const app = new Vue({
    el: "#app",
    data: {
      loading: false,
      timer: 0,
      search: {
        searchQuery: "",
        searchBranded: false
      },
      foodList: [],
      errorMsg: "",
      selectedRawData: {
        name: "",
        id: "",
        data: {}
      },
      information: {
        name: "",
        nutrition: {}
      }
    },
    methods: {
      setSearchData(formData) {
        if (formData[0] !== "") {
          this.getFoodList(formData);
        } else {
          document.getElementById("foodSearch").focus();
          this.generateAlert("error", "Please enter a food", true);
        }
      },
      formTheQuery(q) {
        return q
          .map(pair => `${pair[0]}=${pair[1].replace(" ", "+")}`)
          .join("&");
      },
      getFoodList(args) {
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

          this.loading = true;
          fetch(requestObj)
            .then(response => response.json())
            .then(json => {
              if (typeof json.errors !== "object") {
                window.setTimeout(() => {
                  this.loading = false;
                  this.foodList = json.list.item;
                }, 1000);
              } else {
                this.loading = false;
                this.errorMsg = `No results for ${value}`;
              }
            });

          // update data obj
          this.search.searchQuery = value;
          this.search.searchBranded = searchBranded;
        } else {
          // Clear data list
          this.foodList = [];
        }
      },
      getDataForSelected(selected) {
        const id = selected.ndbno;
        const name = selected.name;

        if (id !== "") {
          const query = [
            ["format", "json"],
            ["api_key", appConfig.apiKey],
            ["ndbno", id],
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
              this.selectedRawData.id = id;
              this.selectedRawData.name = name;
              this.selectedRawData.data = json;
              this.showResultForSelected();
            });
        }
      },
      showResultForSelected() {
        this.getTotalSugars().then(value => {
          const cubeSize = 50;
          // One sugar cube, which is equivalent to one teaspoon of sugar, weighs approximately 4 grams.
          const totalCubes = value / 4;
          const remainderStr =
            totalCubes % 1 !== 0 ? `${totalCubes}`.split(".")[1] : 0;
          const remainderDecimal = `0.${remainderStr}`;
          const remainderWidth = cubeSize * remainderDecimal;

          this.information = {
            name: this.selectedRawData.data.report.food.name,
            nutrition: {
              totalSugars: value,
              cubeSize: cubeSize,
              wholeCubes: Math.floor(parseInt(totalCubes, 10)),
              remainderCube: remainderDecimal,
              remainderCubeWidth: remainderWidth
            }
          };
          this.loading = false;
        });
      },
      getTotalSugars() {
        const query = [
          ["format", "json"],
          ["api_key", appConfig.apiKey],
          ["ndbno", this.selectedRawData.id],
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
          .then(json => {
            if (json.report.foods[0] !== undefined) {
              if (json.report.foods[0].nutrients.length > 0) {
                return json.report.foods[0].nutrients[0].gm;
              }

              return 0;
            } else {
              return 0;
            }

            throw new Error("There has been an error retrieving nutrients");
          })
          .catch(err => {
            console.log(err.message);
          });

        return sugarValue;
      }
    },
    template: `
      <div id="app" class="w-100 mw8 center pa3" v-cloak>
        <search
          :search-query="search.searchQuery"
          :search-branded="search.searchBranded"
          :loading="loading"
          @set-search-data="setSearchData"
        />
        <search-results
          :food-list="foodList"
          :selected-id="selectedRawData.id"
          @retrieve="getDataForSelected"
        />
        <information
          :name="information.name"
          :nutrition="information.nutrition"
        />
      </div>`
  });
};

fetch("./src/js/config.json")
  .then(response => response.json())
  .then(json => {
    appConfig = json;

    initApp();
  })
  .catch(err => {
    console.log(err.message);
  });
