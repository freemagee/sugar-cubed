Vue.component("search", {
  data() {
    return {
      timer: 0,
      isChecked: this.searchBranded
    };
  },
  props: ["searchQuery", "searchBranded", "foodList"],
  template: `<div class="form form--horizontal">
      <div class="form__item">
        <label for="foodSearch" class="form__label">Search for food</label>
        <input type="text" class="form__input form__input--text" id="foodSearch" v-bind:value="searchQuery" v-on:input="debouncedSearch($event.target.value)" ref="input" placeholder="e.g. Apples" list="foodOptions" />
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
    debouncedSearch(query) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.updateQuery(query);
      }, 500);
    },
    updateQuery(value) {
      const formattedValue = value.trim();
      // If the value was not already normalized,
      // manually override it to conform
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
      }
      // Emit the number value through the input event
      this.$emit("input", [String(formattedValue), this.isChecked]);
    }
  }
});
