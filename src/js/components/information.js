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
    id="foodInformation"
    class="overflow-auto overflow-hidden-ns flex-ns"
  >
    <div class="mb2 mb0-ns fg0 fs1 fb-50">
      <h3 class="mt0 mb3 segoe-ui normal f3 lh-title light-gray">{{ name }}</h3>
      <p
        v-if="nutrition.totalSugars === 0 || nutrition.totalSugars === '0.00'"
        class="ma0 segoe-ui f4 lh-copy light-gray"
      >
        Sugar free!
      </p>
      <p
        v-else
        class="ma0 segoe-ui f4 lh-copy light-gray"
      >
        <strong>Measure: </strong>per 100 grams<br />
        <strong>Grams of sugar: </strong>{{ nutrition.totalSugars }}<br />
        <strong>Sugar cubes: </strong>{{ nutrition.wholeCubes + (nutrition.remainderCube * 1) }}
      </p>
    </div>
    <div class="flex flex-wrap fg0 fs1 fb-50">
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
