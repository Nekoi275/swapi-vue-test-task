<template>
  <div class="home">
    <headermenu></headermenu>
    <div class="top-section">
      <div class="wrapper">
        <div class="top-section-content">
          <div class="background black round-borders"></div>
          <div class="row-5 center-align">
            <div class="col xs-5 sm-5 md-2 lg-2">
              <img class="stormtrooper" src="img/stormtrooper.png" />
            </div>
            <div class="col xs-5 sm-5 md-3 lg-3">
              <h6 class="large-text">MAY THE FORCE BE WITH YOU</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-section">
      <div class="wrapper">
        <div class="row-5">
          <div class="col xs-5 sm-5 vertical-text-col">
            <h3 class="our-starships">OUR STARSHIPS</h3>
          </div>
          <div class="col hidden-xs hidden-sm visible-md sidebar-col">
            <sidebar
              v-bind:pilotsArr="pilotsArr"
              v-bind:filters="filters"
              v-on:crew-range="setCrewFilter"
              v-on:psngs-range="setPsngsFilter"
            ></sidebar>
          </div>
          <div class="col xs-5 sm-5 md-3 lg-3">
            <div class="row-4 reverse-md">
              <div class="dropdown">
                <div class="button drop-button">
                  <span>{{sorting.text}}</span>
                  <img class="open-drop-down" src="img/drop-icon.svg" />
                  <img class="close-drop-down" src="img/up-drop-icon.svg" />
                </div>
                <ul class="dropdown-content">
                  <li v-on:click="sortShips('crew', 'BY CREW SIZE')">BY CREW SIZE</li>
                  <li v-on:click="sortShips('cost_in_credits', 'COST IN CREDITS')">COST IN CREDITS</li>
                  <li v-on:click="sortShips('MGLT', 'MGLT NUMBER')">MGLT NUMBER</li>
                </ul>
              </div>
              <span class="counter blue-text filters-counter">({{filters.pilots.length}})</span>
              <img
                class="hidden-lg hidden-md visible-xs-flex show-filters-icon"
                v-show="!mobilefiltersOpened"
                src="img/filters-icon.svg"
                v-on:click="mobilefiltersOpened=!mobilefiltersOpened"
              />
              <img
                class="hidden-lg hidden-md visible-xs-flex close-filters-icon"
                v-show="mobilefiltersOpened"
                v-on:click="mobilefiltersOpened=!mobilefiltersOpened"
                src="img/cross-icon.svg"
              />
            </div>
            <div class="row-4 cards-container">
              <sidebar
                class="hidden-lg hidden-md visible-xs"
                v-show="mobilefiltersOpened"
                v-bind:pilotsArr="pilotsArr"
                v-bind:filters="filters"
                v-on:crew-range="setCrewFilter"
                v-on:psngs-range="setPsngsFilter"
              ></sidebar>
              <card
                v-for="starship in shownStarships"
                v-bind:key="starship.id"
                v-bind:starship="starship"
              ></card>
            </div>
            <div class="row-4">
              <div
                class="button show-more-button"
                v-on:click="showMoreStarships()"
                v-show="moreStarships"
              >
                <span>VIEW MORE</span>
                <img src="img/show-more.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <contactsection v-bind:page="page"></contactsection>
    <footermenu></footermenu>
  </div>
</template>

<script>
// @ is an alias to /src
import card from "@/components/card.vue";
import headermenu from "@/components/header.vue";
import footermenu from "@/components/footer.vue";
import contactsection from "@/components/contact-section.vue";
import sidebar from "@/components/sidebar.vue";

export default {
  name: "home",
  components: {
    card,
    headermenu,
    footermenu,
    contactsection,
    sidebar
  },
  data: function() {
    return {
      starshipsArr: [],
      shownStarships: [],
      shownStarshipsCount: 0,
      nextUrl: "https://swapi.co/api/starships/",
      filters: {
        pilots: [],
        crewRange: {
          min: 1,
          max: 342953
        },
        psngsRange: {
          min: 0,
          max: 843342
        }
      },
      pilotsArr: [],
      sorting: {
        param: "",
        text: "SORT"
      },
      moreStarships: true,
      mobilefiltersOpened: false,
      page: "home"
    };
  },
  watch: {
    "filters.pilots": function() {
      this.showStarShips();
    }
  },
  methods: {
    getData: function(url, dataFunc) {
      return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(dataFunc);
    },
    setPsngsFilter: function(values) {
      this.filters.psngsRange = values;
      this.showStarShips();
    },
    setCrewFilter: function(values) {
      this.filters.crewRange = values;
      this.showStarShips();
    },
    processStarshipsData: function(data) {
      this.nextUrl = data.next;
      var ships = data.results.map(function(ship) {
        ship.id = ship.url.split("/")[5];
        if (!ship.name.match(/[\s-]/g)) {
          ship.short_name = ship.name.slice(0, 2);
        } else {
          ship.short_name = ship.name.match(/\b(\w)/g).join("");
        }
        return ship;
      });
      this.starshipsArr = this.starshipsArr.concat(ships);
    },
    showStarShips: function(shipsToShow) {
      this.shownStarships = this.starshipsArr.slice(
        0,
        this.shownStarshipsCount
      );
      if (shipsToShow) {
        this.shownStarships = this.shownStarships.concat(shipsToShow);
        this.shownStarshipsCount = this.shownStarships.length;
      }
      this.applyFilters();
      this.sortShips(this.sorting.param, this.sorting.text);
    },
    showMoreStarships: function() {
      var self = this;
      var lastShips = this.starshipsArr.slice(
        this.shownStarshipsCount,
        this.starshipsArr.length
      );
      if (lastShips.length < 6) {
        if (this.nextUrl) {
          this.getData(this.nextUrl, this.processStarshipsData).then(
            function() {
              var nextShips = self.starshipsArr.slice(
                self.shownStarshipsCount,
                self.shownStarshipsCount + 6
              );
              self.showStarShips(nextShips);
            }
          );
        } else {
          this.showStarShips(lastShips);
          this.moreStarships = false;
        }
      } else {
        var nextShips = this.starshipsArr.slice(
          this.shownStarshipsCount,
          this.shownStarshipsCount + 6
        );
        this.showStarShips(nextShips);
      }
    },
    applyFilters: function() {
      var self = this;
      var filterByPilots = function(ship) {
        if (!self.filters.pilots.length) {
          return true;
        } else {
          var intersection = ship.pilots.filter(function(pilot) {
            return self.filters.pilots.indexOf(pilot) !== -1;
          });
          return intersection.length > 0;
        }
      };

      var filterRange = function(paramName, range) {
        return function(ship) {
          if (ship[paramName] === "unknown") {
            return true;
          } else {
            return (
              Number(ship[paramName]) >= range.min &&
              Number(ship[paramName]) <= range.max
            );
          }
        };
      };

      var filterByCrew = filterRange("crew", self.filters.crewRange);
      var filterByPassengers = filterRange("passengers", self.filters.psngsRange);
      
      this.shownStarships = this.shownStarships
        .filter(filterByPilots)
        .filter(filterByCrew)
        .filter(filterByPassengers);
    },
    getPeople: function(nextUrl) {
      var self = this;
      if (nextUrl) {
        this.getData(nextUrl, function(data) {
          self.pilotsArr = self.pilotsArr.concat(
            data.results.filter(function(pilot) {
              return pilot.starships.length > 0;
            })
          );
          self.getPeople(data.next);
        });
      }
    },
    sortShips: function(param, sortingText) {
      this.sorting.text = sortingText;
      this.sorting.param = param;
      var sortBy = function(param) {
        return function(a, b) {
          if (a[param] === "unknown") {
            return 1;
          }
          if (b[param] === "unknown") {
            return -1;
          }
          return a[param] - b[param];
        };
      };
      return (this.shownStarships = this.shownStarships
        .slice()
        .sort(sortBy(param)));
    }
  },
  mounted: function() {
    var self = this;
    this.getData(this.nextUrl, this.processStarshipsData).then(function() {
      self.showStarShips(self.starshipsArr.slice(0, 6));
    });
    this.getPeople("https://swapi.co/api/people/");
  }
};
</script>
