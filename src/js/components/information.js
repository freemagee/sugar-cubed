Vue.component("information", {
  props: {
    name: String,
    nutrition: Object
  },
  template: `
    <div id="foodInformation" class="foodInformation" v-if="name !== ''">
      <div class="foodInformation__name">{{ name }}</div>
      <div class="foodInformation__nutrition">
        <div class="sugarCube" v-for="cubes in nutrition.wholeCubes" v-bind:style="{ width: nutrition.cubeSize + 'px', height: nutrition.cubeSize + 'px'}"></div>
        <div class="sugarCube sugarCube--remainder" v-if="nutrition.remainderCube" v-bind:style="{ width: nutrition.remainderCubeWidth + 'px', height: nutrition.cubeSize + 'px'}"></div>
        <div class="sugarCube__noSugar" v-if="nutrition.totalSugars === 0">Sugar free!</div>
      </div>
    </div>`
});
