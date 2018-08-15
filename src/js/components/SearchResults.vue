<template>
  <section v-if="foodList.length > 0" class="overflow-auto vh-25 mb4 ml2 ml4-ns ml5-l mr2 mr4-ns mr5-l">
    <div id="searchResults" class="flex flex-column">
      <button
        v-for="(food, foodIndex) in foodList"
        :value="food.name"
        :key="food.ndbno"
        :class="{
          'dark-gray bg-white hover-bg-light-gray' : food.ndbno !== selectedId,
          'white bg-caribbean-green' : food.ndbno === selectedId,
          'bb' : foodIndex === foodList.length - 1,
          'bb-0' : foodIndex !== foodList.length - 1
        }"
        @click="selectFood(food)"
        class="button-reset flex-auto tl segoe-ui pv2 ph3 bl bt br b--black-10 pointer bg-animate"
        type="button"
      >{{ food.name }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "search-results",
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
  }
};
</script>
