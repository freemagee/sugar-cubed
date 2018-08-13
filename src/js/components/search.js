Vue.component("search", {
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    searchBranded: {
      type: Boolean,
      required: true
    },
    loading: {
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
  <section class="section">
    <div id="search" class="container">

        <div class="field">
          <label for="foodSearch" class="label">Search for food</label>
          <div class="control">
            <input
              v-model="query"
              @keyup.enter="submit"
              type="text"
              class="input"
              id="foodSearch"
              placeholder="e.g. Apples"
            />
          </div>
        </div>

        <div class="field">
          <label for="brandedFoods" class="checkbox">
            <input
              v-model="isChecked"
              @click="setSearchBranded($event.target.checked)"
              type="checkbox"
              id="brandedFoods"
            />
            Search branded foods?
          </label>
        </div>

        <div class="field">
          <button type="button" class="button is-primary" :class="{ 'is-loading' : loading }" @click="submit">Get Food List</button>
        </div>

    </div>
  </section>`
});
