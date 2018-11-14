<template>
  <section v-if="foodList.length > 0" id="searchResults">
    <div class="flex flex-column">
      <button
        v-for="(food, foodIndex) in foodList"
        :value="food.name"
        :key="food.ndbno"
        :class="{
          'dark-gray bg-white hover-bg-light-gray': food.ndbno !== selectedId,
          'white bg-caribbean-green': food.ndbno === selectedId,
          bb: foodIndex === foodList.length - 1,
          'bb-0': foodIndex !== foodList.length - 1
        }"
        class="button-reset flex-auto tl segoe-ui pv2 ph3 bl bt br b--black-10 pointer bg-animate"
        type="button"
        @click="selectFood(food);"
      >
        {{ food.name }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "SearchResults",
  props: {
    foodList: {
      type: Array,
      required: true
    },
    selectedId: {
      type: String,
      required: true
    }
  },
  methods: {
    selectFood(food) {
      this.$emit("retrieve", food);
    }
  }
};
</script>
