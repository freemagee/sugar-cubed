Vue.component("search-results", {
  props: {
    foodList: {
      type: Array,
      required: true
    },
    selectedId: {
      type: String,
      required: false
    }
  },
  methods: {
    selectFood(food) {
      this.$emit("retrieve", food);
    }
  },
  template: `
  <section v-if="foodList.length > 0">
    <div id="searchResults">
      <nav id="foodList">
        <a
          v-for="food in foodList"
          :value="food.name"
          :key="food.ndbno"
          @click="selectFood(food)"
          :class="{ 'is-active' : food.ndbno === selectedId }"
        >{{ food.name }}</a>
      </nav>
    </div>
  </section>`
});