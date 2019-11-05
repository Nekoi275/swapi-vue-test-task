<template>
    <label><input type="checkbox" v-bind:value="piloturl" v-model="model" />{{pilotname}}</label>
</template>

<script>
export default {
  name: "checkboxfilter",
  model: {
    prop: "filteredPilots",
    event: "change"
  },
  props: ["pilotname", "piloturl", "filteredPilots"],
  computed: {
    model: {
      get() {
        return this.filteredPilots;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  }
};
</script>