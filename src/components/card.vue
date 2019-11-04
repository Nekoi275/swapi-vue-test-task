<template>
  <div class="card">
    <router-link :to="{ name: 'starship', params: { id: starship.id, starship: starship}}">
      <div class="card-header">
        <h5>{{starship.short_name}}</h5>
        <h4>MGLT: {{starship.MGLT}}</h4>
        <div class="card-open-icon" style="background-image: url(img/card-open-icon.svg);"></div>
      </div>
    </router-link>
    <div class="card-content">
      <h1>{{starship.name}}</h1>
      <ul>
        <li>CR: {{starship.cost_in_credits}}</li>
        <li>CREW: {{starship.crew}}</li>
        <li>PSNGS: {{starship.passengers}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["starship"]
};
</script>