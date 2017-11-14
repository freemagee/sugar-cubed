Vue.component("search", {
  props: ["value"],
  template: `<div class="form form--horizontal">
      <div class="form__item">
        <label for="foodSearch" class="form__label">Search for food</label>
        <input type="text" class="form__input form__input--text" id="foodSearch" v-bind:value="value" v-on:input="updateValue($event.target.value)" ref="input" />
      </div>
      <div class="form__item">
        <label for="brandedFoods" class="form__label">Search branded foods?</label>
        <input type="checkbox" class="form__input form__input--checkbox" id="brandedFoods" />
      </div>
    </div>`,
  methods: {
    updateValue: function(value) {
      let formattedValue = value.trim();
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
