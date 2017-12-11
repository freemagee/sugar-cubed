Vue.component("search", {
  data() {
    return {
      timer: 0,
      query: this.searchQuery,
      deepQuery: "",
      isChecked: this.searchBranded
    };
  },
  props: ["searchQuery", "searchBranded", "foodList"],
  template: `<div class="form form--horizontal">
      <div class="form__item">
        <label for="foodSearch" class="form__label">Search for food</label>
        <input type="text" class="form__input form__input--text" id="foodSearch" v-bind:value="searchQuery" v-on:input="debouncedSearch" ref="input" placeholder="e.g. Apples" list="foodOptions" />
        <datalist id="foodOptions">
          <option v-for="food in foodList" v-bind:value="food.name" />
        </datalist>
      </div>
      <div class="form__item">
        <label for="brandedFoods" class="form__label">Search branded foods?</label>
        <input type="checkbox" class="form__input form__input--checkbox" id="brandedFoods" v-on:click="setSearchBranded($event.target.checked)" ref="checkbox" />
      </div>
    </div>`,
  methods: {
    setSearchBranded(value) {
      this.isChecked = value;
    },
    debouncedSearch(e) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        const formattedValue = e.target.value.trim();

        if (formattedValue !== e.target.value) {
          this.$refs.input.value = formattedValue;
        }

        this.queryChanged(formattedValue);
      }, 500);
    },
    queryChanged(newQuery) {
      let fromFoodList = false;
      // Compare new query against prior
      if (newQuery !== this.query) {
        for (let i = 0; i < this.foodList.length; i++) {
          if (this.foodList[i].name === newQuery) {
            this.deepQuery = this.foodList[i];
            this.query = this.deepQuery.name;
            fromFoodList = true;
          }
        }

        if (fromFoodList) {
          console.log("Food is from food list. Get the deets");
        } else {
          console.log("New query, get a food list");
          this.query = newQuery;
          this.updateAutoCompleteList(newQuery);
        }
      } else {
        console.log("Nothing has changed");
      }
    },
    updateAutoCompleteList(query) {
      this.$emit("input", [query, this.isChecked]);
    }
  }
});
