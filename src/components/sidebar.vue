<template>
  <div class="sidebar">
    <div class="pilots-header">
      <h2>Pilots</h2>
      <span class="blue-text counter">({{pilotsArr.length}})</span>
    </div>
    <checkboxfilter
      v-for="pilot in pilotsArr.slice(0, shownFilters)"
      v-bind:key="pilot.id"
      v-bind:pilotname="pilot.name"
      v-bind:piloturl="pilot.url"
      v-model="filters.pilots"
    ></checkboxfilter>
    <span
      class="blue-text view-all"
      v-on:click="shownFilters=pilotsArr.length"
      v-show="shownFilters < pilotsArr.length"
    >View All</span>
    <h2>Crew size</h2>
    <range
      v-bind:min="filters.crewRange.min"
      v-bind:max="filters.crewRange.max"
      v-on:state="setCrewRange"
    ></range>
    <h2>Passengers</h2>
    <range
      v-bind:min="filters.psngsRange.min"
      v-bind:max="filters.psngsRange.max"
      v-on:state="setPsngsRange"
    ></range>
  </div>
</template>

<script>
import checkboxfilter from "@/components/checkbox-filter.vue";
import range from "@/components/range.vue";

export default {
  name: "sidebar",
  props: ["pilotsArr", "filters"],
  components: { checkboxfilter, range },
  data: function() {
    return {
      shownFilters: 5,
      value: ""
    };
  },
  methods: {
    setCrewRange: function(values) {
      this.$emit("crew-range", values);
    },
    setPsngsRange: function(values) {
      this.$emit("psngs-range", values);
    }
  }
};
</script>
<style>
.sidebar {
  padding: 20px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
}
.sidebar .pilots-header {
  display: flex;
}
.sidebar .pilots-header h2 {
  flex: 80%;
}
.sidebar .pilots-header .counter {
  flex: 20%;
  padding-top: 20px;
}
.sidebar input,
.sidebar label {
  display: inline;
  margin: 20px 0 0 20px;
}
.sidebar span {
  margin-top: 20px;
}
.sidebar input {
  cursor: pointer;
}
.sidebar .view-all {
  display: block;
  cursor: pointer;
  padding-left: 0;
}
.sidebar .min,
.sidebar .max {
  width: 50px;
  height: 20px;
  text-align: center;
  border: 1px solid #d4d4d4;
  color: #0066ff;
  font-size: 12px;
}
.sidebar .range-values {
  display: flex;
  justify-content: space-between;
}
.sidebar .range-values.min {
  flex: 80%;
}
.sidebar .range-values.max {
  flex: 20%;
}
.filters-counter {
  position: absolute;
  right: 50px;
}
.show-filters-icon {
  margin-left: auto;
  cursor: pointer;
}
.close-filters-icon {
  margin-left: auto;
  cursor: pointer;
}
.sidebar-mobile {
  flex: 100%;
  margin-bottom: 30px;
}
.apply-filters {
  text-align: center;
}
.apply-filters > span {
  font-weight: bold;
}
.noUi-target {
  height: 3px;
  margin-top: 20px;
}
.noUi-connect {
  background-color: #0066ff;
}
.noUi-horizontal {
  height: 3px;
}
.noUi-horizontal .noUi-handle {
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: #0066ff;
  top: -5px;
  border: 0;
  box-shadow: none;
  cursor: pointer;
}
.noUi-horizontal .noUi-handle::before {
  display: none;
}
.noUi-horizontal .noUi-handle::after {
  display: none;
}
</style>