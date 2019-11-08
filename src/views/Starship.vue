<template>
  <div id="single-ship">
    <headermenu></headermenu>
    <div class="top-section">
      <div class="wrapper">
        <div class="top-section-content single-page">
          <div class="background black round-borders single-page"></div>
          <img class="stormtrooper single-page" src="img/stormtrooper.png" />
          <div class="row-4 center-align">
            <div class="col text-overflow xs-4 sm-4 md-4 lg-4">
              <h6 class="large-text single-page">PROFILE DESCRIPTION</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-section single-page">
      <div class="wrapper">
        <div class="row-5">
          <div class="col xs-4 sm-4 md-2 lg-2 hidden-md visible-xs">
            <div class="card-header single-page">
              <h5>{{starship.short_name}}</h5>
              <h4>MGLT: {{starship.MGLT}}</h4>
            </div>
          </div>
          <div class="col xs-4 sm-4 md-3 lg-3">
            <div class="card-content">
              <h1>{{starship.name}}</h1>
              <ul>
                <li>Model: {{starship.model}}</li>
                <li>Manufacturer: {{starship.manufacturer}}</li>
                <li>Starship-class: {{starship.starship_class}}</li>
              </ul>
            </div>
            <span class="copy-link" v-on:click="copyToClipboard">COPY API URL</span>
          </div>
          <div class="col xs-4 sm-4 md-1 lg-1 hidden-xs visible-md">
            <div class="card-header single-page">
              <h5>{{starship.short_name}}</h5>
              <h4>MGLT: {{starship.MGLT}}</h4>
            </div>
          </div>
        </div>
        <div class="row-4 cards-container single-page">
          <div class="info-card">
            <h1>COST IN CREDITS</h1>
            <h5>{{starship.cost_in_credits}}</h5>
          </div>
          <div class="info-card">
            <h1>CREW</h1>
            <h5>{{starship.crew}}</h5>
          </div>
          <div class="info-card">
            <h1>PASSENGERS</h1>
            <h5>{{starship.passengers}}</h5>
          </div>
          <div class="info-card">
            <h1>CARGO CAPACITY</h1>
            <h5>{{starship.cargo_capacity}}</h5>
          </div>
          <div class="info-card">
            <h1>CONSUMABLES</h1>
            <h5>{{starship.consumables}}</h5>
          </div>
          <div class="info-card">
            <h1>FILMS COUNT</h1>
            <h5>{{starship.films.length}}</h5>
          </div>
        </div>
      </div>
    </div>
    <contactsection v-bind:page="page"></contactsection>
    <footermenu></footermenu>
  </div>
</template>

<script>
import headermenu from "@/components/header.vue";
import footermenu from "@/components/footer.vue";
import contactsection from "@/components/contact-section.vue";

export default {
  name: "starship",
  components: {
    headermenu,
    footermenu,
    contactsection
  },
  data: function() {
    return {page: 'starship'}
  },
  props: ["starship"],
  methods: {
    copyToClipboard: function() {
      let el = document.createElement("textarea");
      el.value = this.starship.url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }
};
</script>
