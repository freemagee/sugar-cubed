Vue.component("search", {
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    searchBranded: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      query: this.searchQuery,
      isChecked: this.searchBranded
    };
  },
  methods: {
    setSearchBranded(value) {
      this.isChecked = value;
    },
    submit() {
      if (this.query !== "") {
        this.$emit("get-food-list", [this.query, this.isChecked]);
      } else {
        document.getElementById("foodSearch").focus();
        console.log("No search data");
      }
    }
  },
  template: `
    <div id="search" class="searchContainer">
      <div class="form form--horizontal">
        <div class="form__item">
          <label for="foodSearch" class="form__label">Search for food</label>
          <input
            v-model="query"
            @keyup.enter="submit"
            type="text"
            class="form__input form__input--text"
            id="foodSearch"
            placeholder="e.g. Apples"
          />
        </div>
        <div class="form__item">
          <label for="brandedFoods" class="form__label">Search branded foods?</label>
          <input
            v-model="isChecked"
            @click="setSearchBranded($event.target.checked)"
            type="checkbox"
            class="form__input form__input--checkbox"
            id="brandedFoods"
          />
        </div>
        <div class="form__item">
          <button type="button" @click="submit">Get Food List</button>
        </div>
      </div>
    </div>`
});
