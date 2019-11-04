<template>
  <div class="contact-section">
    <div class="wrapper">
      <div class="contact-section-content">
        <div class="background contact-background blue round-borders"></div>
        <div class="row-4 center-align">
          <div class="col xs-4 sm-4 md-2 lg-2">
            <img v-show="page==='home'" class="starship-image hidden-md visible-xs" src="img/starship.png" />
            <img v-show="page==='starship'" class="starship-image hidden-md visible-xs" src="img/death-star.png" />
            <form>
              <input type="email" placeholder="EMAIL" />
              <input type="tel" placeholder="PHONE" />
              <div class="button contact-button">
                <span>GET YOUR COUPON</span>
                <img src="img/arrow-icon.svg" />
              </div>
            </form>
          </div>
          <div class="col xs-4 sm-4 md-2 lg-2">
            <img v-show="page==='home'" class="starship-image hidden-xs visible-md" src="img/starship.png" />
            <img v-show="page==='starship'" class="starship-image hidden-xs visible-md" src="img/death-star.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contactsection",
  props: ['page']
};
</script>