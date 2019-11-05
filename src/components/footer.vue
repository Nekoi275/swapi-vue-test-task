<template>
  <div class="footer">
    <div class="wrapper">
      <nav class="footer-menu">
        <img class="logo" src="img/logo.svg" />
        <ul class="menu hidden-xs hidden-sm visible-md-flex">
          <li>Hero</li>
          <li>List</li>
          <li>CTA block</li>
          <li>Footer</li>
        </ul>
        <button class="button up-scroll-button" v-on:click="this.scrollToTop">MNE NAVERH</button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "footermenu",
  methods: {
    scrollToTop: function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>