<template>
  <div class="header">
    <div class="wrapper">
      <nav>
        <img class="logo" src="img/logo.svg" />
        <ul class="menu hidden-xs hidden-sm visible-md-flex">
          <li>Hero</li>
          <li>List</li>
          <li>CTA block</li>
          <li>Footer</li>
        </ul>
        <ul class="menu-mobile" v-show="mobileMenuOpened">
          <img class="logo-mobile" src="img/logo.svg" />
          <img
            class="cross-icon"
            v-on:click="mobileMenuOpened=!mobileMenuOpened"
            src="img/cross-icon.svg"
          />
          <li>Hero</li>
          <li>List</li>
          <li>CTA block</li>
          <li>Footer</li>
          <li>
            <button class="button sign-up-button hidden-md visible-xs">FAKE SIGN UP</button>
          </li>
        </ul>
        <img
          class="burger-icon hidden-lg hidden-md visible-xs"
          v-on:click="mobileMenuOpened=!mobileMenuOpened"
          src="img/burger-menu.svg"
        />
        <button class="button sign-up-button hidden-xs visible-md">FAKE SIGN UP</button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "headermenu",
  data: function() {
    return {
      mobileMenuOpened: false
    }
  }
};
</script>