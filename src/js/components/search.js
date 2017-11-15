Vue.component("search", {
  data() {
    return { timer: 0 };
  },
  props: ["value", "foodList"],
  template: `<div class="form form--horizontal">
      <div class="form__item">
        <label for="foodSearch" class="form__label">Search for food</label>
        <input type="text" class="form__input form__input--text" id="foodSearch" v-bind:value="value" v-on:input="debouncedSearch($event.target.value)" ref="input" placeholder="Type your query here" list="foodOptions" />
        <datalist id="foodOptions">
          <option v-for="food in foodList" v-bind:value="food" />
        </datalist>
      </div>
      <div class="form__item">
        <label for="brandedFoods" class="form__label">Search branded foods?</label>
        <input type="checkbox" class="form__input form__input--checkbox" id="brandedFoods" />
      </div>
    </div>`,
  methods: {
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
      this.$emit("input", String(formattedValue));
    }
  }
});
