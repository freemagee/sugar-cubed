<template>
  <section v-if="name !== ''" id="foodInformation" class="overflow-auto overflow-hidden-ns flex-ns">
    <div class="pr2-ns mb2 mb0-ns fg0 fs1 fb-50">
      <h3 class="mt0 mb3 segoe-ui normal f3 lh-title light-gray">{{ name }}</h3>
      <p
        v-if="nutrition.totalSugars === 0 || nutrition.totalSugars === '0.00'"
        class="ma0 segoe-ui f4 lh-copy light-gray"
      >Sugar free!</p>
      <p v-else class="ma0 segoe-ui f4 lh-copy light-gray">
        <strong>Measure:</strong> per 100 grams
        <br />
        <strong>Grams of sugar:</strong>
        {{ nutrition.totalSugars }}
        <br />
        <strong>Sugar cubes:</strong>
        {{ sugarCubesRounded }}
      </p>
    </div>
    <div class="pl2-ns flex flex-wrap content-start fg0 fs1 fb-50">
      <div
        v-for="(cube, cubeIndex) in nutrition.wholeCubes"
        :key="cubeIndex"
        :style="{
          height: nutrition.cubeSize + 'px',
          flex: '0 1 ' + nutrition.cubeSize + 'px'
        }"
        :class="{ mr2: cubeIndex !== nutrition.wholeCubes - 1 }"
        class="mb2 bg-near-white ba b--black-30 b--dotted bw2"
      ></div>
      <div
        v-if="nutrition.remainderCube !== '0.0'"
        :style="{
          height: nutrition.cubeSize + 'px',
          flex: '0 1 ' + nutrition.remainderCubeWidth + 'px'
        }"
        :class="{ ml2: nutrition.wholeCubes != 0 }"
        class="mb2 bg-near-white ba b--black-30 b--dotted bw2"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NutritionInformation",
  props: {
    name: {
      type: String,
      required: true
    },
    nutrition: {
      type: Object,
      required: true
    }
  },
  computed: {
    sugarCubesRounded() {
      const sum = this.nutrition.wholeCubes + this.nutrition.remainderCube * 1;
      return this.roundToTwo(sum);
    }
  },
  methods: {
    roundToTwo(num) {
      // Ref: https://stackoverflow.com/a/18358056
      return +(Math.round(num + "e+2") + "e-2");
    }
  }
};
</script>
