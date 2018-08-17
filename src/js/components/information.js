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
    <div class="flex flex-wrap align-items mb3">
      <span class="pv2 ph3 mr3 segoe-ui f5 b br2 bg-light-gray dark-gray">Food name</span>
      <span class="segoe-ui light-gray f3 lh-title">{{ name }}</span>
    </div>

    <div v-if="nutrition.totalSugars === 0 || nutrition.totalSugars === '0.00'">
      <p class="segoe-ui light-gray f4">Sugar free!</p>
    </div>

    <div v-else>
      <p class="segoe-ui light-gray f4">
        <strong>Measure:</strong> 100 grams<br />
        <strong>Grams of sugar:</strong> {{ nutrition.totalSugars }}<br />
        <strong>Sugar cubes:</strong> {{ nutrition.wholeCubes + (nutrition.remainderCube * 1) }}
      </p>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(cube, cubeIndex) in nutrition.wholeCubes"
        :key="cubeIndex"
        :style="{
          height: nutrition.cubeSize + 'px',
          flex: '0 1 ' + nutrition.cubeSize + 'px'
        }"
        :class="{ 'mr2' : cubeIndex !== nutrition.wholeCubes - 1 }"
        class="mb2 bg-near-white ba b--black-30 b--dotted bw2"
      ></div>
      <div
        v-if="nutrition.remainderCube !== '0.0'"
        :style="{
          height: nutrition.cubeSize + 'px',
          flex: '0 1 ' + nutrition.remainderCubeWidth + 'px'
        }"
        :class="{ 'ml2' : nutrition.wholeCubes != 0 }"
        class="mb2 bg-near-white ba b--black-30 b--dotted bw2"
      ></div>
    </div>

  </section>`
});
