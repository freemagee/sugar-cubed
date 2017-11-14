Vue.component("search", {
  props: ["value"],
  template: `<div class="form form--horizontal">
      <div class="form__item">
        <label for="foodSearch" class="form__label">Search for food</label>
        <input type="text" class="form__input form__input--text" id="foodSearch" v-bind:value="value" v-on:input="logValue($event.target.value)" />
      </div>
      <div class="form__item">
        <label for="brandedFoods" class="form__label">Search branded foods?</label>
        <input type="checkbox" class="form__input form__input--checkbox" id="brandedFoods" />
      </div>
    </div>`,
  methods: {
    logValue: (value) => {
      console.log(value);
    }
  }
});