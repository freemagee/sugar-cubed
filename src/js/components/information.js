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
  <section v-if="name !== ''" class="section">
    <div id="foodInformation" class="container">
      <div class="title">{{ name }}</div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div
              v-for="cubes in nutrition.wholeCubes"
              :style="{ width: nutrition.cubeSize + 'px', height: nutrition.cubeSize + 'px'}"
            ></div>
            <div
              v-if="nutrition.remainderCube !== '0.0'"
              :style="{ width: nutrition.remainderCubeWidth + 'px', height: nutrition.cubeSize + 'px'}"
              class="sugar-cube sugar-cube--remainder"
            ></div>
          </div>
          <div v-if="nutrition.totalSugars === 0 || nutrition.totalSugars === '0.00'" class="level-item">
            <p>Sugar free!</p>
          </div>
          <div v-else class="level-item">
            <p><strong>Sugar cubes:</strong> {{ nutrition.wholeCubes + (nutrition.remainderCube * 1) }}<br />
            <strong>Grams of sugar:</strong> {{ nutrition.totalSugars }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
});
