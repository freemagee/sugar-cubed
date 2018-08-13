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
  <section v-if="foodList.length > 0" class="section">
    <div id="searchResults" class="container">
      <nav id="foodList" class="panel">
        <a
          v-for="food in foodList"
          :value="food.name"
          :key="food.ndbno"
          @click="selectFood(food)"
          :class="{ 'is-active' : food.ndbno === selectedId }"
          class="panel-block"
        >{{ food.name }}</a>
      </nav>
    </div>
  </section>`
});