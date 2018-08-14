Vue.component("information", {
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
  template: `
  <section
    v-if="name !== ''"
    class="pa2 pa4-ns pa5-l"
  >
    <div class="segoe-ui f2 lh-title mb3">{{ name }}</div>
    <div class="flex">
      <div
        v-for="(cube, cubeIndex) in nutrition.wholeCubes"
        :key="cubeIndex"
        :style="{ width: nutrition.cubeSize + 'px', height: nutrition.cubeSize + 'px'}"
        :class="{ 'mr2' : cubeIndex !== nutrition.wholeCubes - 1 }"
        class="ba b--black-30 b--dotted bw2"
      ></div>
      <div
        v-if="nutrition.remainderCube !== '0.0'"
        :style="{ width: nutrition.remainderCubeWidth + 'px', height: nutrition.cubeSize + 'px'}"
        :class="{ 'ml2' : nutrition.wholeCubes != 0 }"
        class="ba b--black-30 b--dotted bw2"
      ></div>
    </div>

    <div v-if="nutrition.totalSugars === 0 || nutrition.totalSugars === '0.00'">
      <p class="segoe-ui">Sugar free!</p>
    </div>

    <div v-else>
      <p class="segoe-ui f4"><strong>Sugar cubes:</strong> {{ nutrition.wholeCubes + (nutrition.remainderCube * 1) }}<br />
      <strong>Grams of sugar:</strong> {{ nutrition.totalSugars }}</p>
    </div>
  </section>`
});
