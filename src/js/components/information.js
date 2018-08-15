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
    class="pa3 pa4-ns ph5-l pv3-l"
  >
    <div class="segoe-ui light-gray f3 lh-title mb3">{{ name }}</div>
    <div class="flex">
      <div
        v-for="(cube, cubeIndex) in nutrition.wholeCubes"
        :key="cubeIndex"
        :style="{ width: nutrition.cubeSize + 'px', height: nutrition.cubeSize + 'px'}"
        :class="{ 'mr2' : cubeIndex !== nutrition.wholeCubes - 1 }"
        class="bg-near-white ba b--black-30 b--dotted bw2"
      ></div>
      <div
        v-if="nutrition.remainderCube !== '0.0'"
        :style="{ width: nutrition.remainderCubeWidth + 'px', height: nutrition.cubeSize + 'px'}"
        :class="{ 'ml2' : nutrition.wholeCubes != 0 }"
        class="bg-near-white ba b--black-30 b--dotted bw2"
      ></div>
    </div>

    <div v-if="nutrition.totalSugars === 0 || nutrition.totalSugars === '0.00'">
      <p class="segoe-ui light-gray f4">Sugar free!</p>
    </div>

    <div v-else>
      <p class="segoe-ui light-gray f4"><strong>Sugar cubes:</strong> {{ nutrition.wholeCubes + (nutrition.remainderCube * 1) }}<br />
      <strong>Grams of sugar:</strong> {{ nutrition.totalSugars }}</p>
    </div>
  </section>`
});
