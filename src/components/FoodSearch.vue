<template>
  <section id="search">
    <div class="flex-l flex-wrap-l items-center-l justify-center-l">
      <div class="mb1 mb3-m mb0-l mr5-l flex-l flex-auto-l items-center-l">
        <label
          for="foodSearch"
          class="db segoe-ui light-gray b mb1 mb0-l mr3-l nowrap-l"
        >
          Search for food
        </label>
        <input
          id="foodSearch"
          v-model="query"
          type="text"
          class="dib input-reset input-focus segoe-ui lh-copy pa2 br2 bn w-100 w-75-m"
          placeholder="e.g. Apples"
          @keyup.enter="submit"
        />
      </div>

      <div class="mb2 mt2 mt0-m mb3-m mb0-l mr5-l">
        <label for="brandedFoods" class="segoe-ui b light-gray">
          <input
            id="brandedFoods"
            v-model="isChecked"
            type="checkbox"
            class="mr2"
            @click="setSearchBranded($event.target.checked)"
          />
          Search branded foods?
        </label>
      </div>

      <button
        :class="{ 'is-loading': loading }"
        type="button"
        class="button-reset segoe-ui pv2 ph3 br2 bn bg-caribbean-green white pointer bg-animate hover-bg-near-black"
        @click="submit"
      >
        Get Food List
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "FoodSearch",
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    searchBranded: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      query: this.searchQuery,
      isChecked: this.searchBranded
    };
  },
  methods: {
    setSearchBranded(value) {
      this.isChecked = value;
    },
    submit() {
      this.$emit("set-search-data", [this.query, this.isChecked]);
    }
  }
};
</script>
