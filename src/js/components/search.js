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
  <section>
    <div id="search">

        <div>
          <label for="foodSearch">Search for food</label>
          <div>
            <input
              v-model="query"
              @keyup.enter="submit"
              type="text"
              id="foodSearch"
              placeholder="e.g. Apples"
            />
          </div>
        </div>

        <div>
          <label for="brandedFoods">
            <input
              v-model="isChecked"
              @click="setSearchBranded($event.target.checked)"
              type="checkbox"
              id="brandedFoods"
            />
            Search branded foods?
          </label>
        </div>

        <div>
          <button type="button" :class="{ 'is-loading' : loading }" @click="submit">Get Food List</button>
        </div>

    </div>
  </section>`
});
