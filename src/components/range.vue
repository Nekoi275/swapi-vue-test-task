<template>
  <div class="range-slider">
    <div class="range-values">
      <div class="min">{{min}}</div>
      <div class="max">{{max}}</div>
    </div>
    <div class="range"></div>
  </div>
</template>

<script>
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

export default {
  name: "range",
  props: ["min", "max"],
  methods: {
    initRange: function(min, max) {
      var self = this;
      var rangeElem = this.$el.querySelector(".range");
      noUiSlider.create(rangeElem, {
        start: [min, max],
        connect: true,
        range: {
          min: min,
          "25%": max * 0.001,
          "50%": max * 0.01,
          "75%": max * 0.1,
          max: max
        },
        format: {
          to: function(value) {
            return value.toFixed(0);
          },
          from: function(value) {
            return Number(value);
          }
        }
      });
      rangeElem.noUiSlider.on("set", function(values) {
        self.$emit("state", { min: Number(values[0]), max: Number(values[1]) });
      });
    }
  },
  mounted: function() {
    this.initRange(this.min, this.max);
  }
};
</script>