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