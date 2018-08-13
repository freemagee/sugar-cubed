Vue.component("search-results", {
  props: {
    foodList: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectFood(food) {
      this.$emit("retrieve", food);
    }
  },
  template: `
    <div id="searchResults" class="searchResults">
      <ul v-if="foodList.length > 0" id="foodList" class="foodList">
        <li
          v-for="food in foodList"
          :value="food.name"
          @click="selectFood(food)"
          class="foodList__item"
        >{{ food.name }}</li>
      </ul>
    </div>
  `
});