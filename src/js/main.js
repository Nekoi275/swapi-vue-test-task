Vue.component('card', {
    props: ['name', 'mglt', 'cr', 'crew', 'psngs', 'shortname'],
    template: '<div class="card">' +
        '<div class="card-header">' +
        '<h5>{{shortname}}</h5>' +
        '<h4>MGLT: {{mglt}}</h4>' +
        '<div class="card-open-icon" style="background-image: url(img/card-open-icon.svg);"></div>' +
        '</div>' +
        '<div class="card-content">' +
        '<h1>{{name}}</h1>' +
        '<ul>' +
        '<li>CR: {{cr}}</li>' +
        '<li>CREW: {{crew}}</li>' +
        '<li>PSNGS: {{psngs}}</li>' +
        '</ul>' +
        '</div>' +
        '</div>'
});

Vue.component('checkbox-filter', {
    model: {
        prop: 'filteredPilots',
        event: 'change'
    },
    props: ['pilotname', 'piloturl', 'filteredPilots'],
    template: '<div class="checkbox-filters">' +
        '<input type="checkbox" v-bind:value="piloturl" v-model="model"></input>' +
        '<label>{{pilotname}}</label>' +
        '</div>',
    computed: {
        model: {
            get() {
                return this.filteredPilots;
            },
            set(value) {
                this.$emit('change', value);
            },
        },
    }
});

var app = new Vue({
    el: "#home",
    data: {
        starshipsArr: [],
        shownStarships: [],
        shownStarshipsCount: 0,
        nextUrl: 'https://swapi.co/api/starships/',
        moreStarships: true,
        sorting: {
            param: '',
            text: 'SORT'
        },
        pilotsArr: [],
        shownFilters: 5,
        filteredPilots: []
    },
    watch: {
        filteredPilots: function() {
            this.showStarShips();
        }
    },
    methods: {
        shortNames: function (name) {
            if (!name.match(/[\s-]/g)) {
                return name.slice(0, 2);
            } else {
                return name.match(/\b(\w)/g).join('');
            }
        },

        showStarShips: function (shipsToShow) {
            this.shownStarships = this.starshipsArr.slice(0, this.shownStarshipsCount);
            if (shipsToShow) {
                this.shownStarships = this.shownStarships.concat(shipsToShow)
                .map(function (ship) {
                    ship.short_name = app.shortNames(ship.name);
                    return ship;
                });
                this.shownStarshipsCount = this.shownStarships.length;
            }
            this.applyFilters();
            this.sortShips(this.sorting.param, this.sorting.text);
        },

        showMoreStarships: function () {
            var lastShips = this.starshipsArr.slice(this.shownStarshipsCount, this.starshipsArr.length);
            if (lastShips.length < 6) {
                if (this.nextUrl) {
                    this.getData(this.nextUrl, this.processStarshipsData).then(function () {
                        var nextShips = app.starshipsArr.slice(app.shownStarshipsCount, this.shownStarshipsCount + 6);
                        app.showStarShips(nextShips);
                    });
                } else {
                    this.showStarShips(lastShips);
                    this.moreStarships = false;
                }
            } else {
                var nextShips = this.starshipsArr.slice(this.shownStarshipsCount, this.shownStarshipsCount + 6);
                this.showStarShips(nextShips);
            }
        },

        sortBy: function (param) {
            return function (a, b) {
                if (a[param] === 'unknown') {
                    return 1;
                }
                if (b[param] === 'unknown') {
                    return -1;
                }
                return a[param] - b[param];
            }
        },

        sortShips: function (param, sortingText) {
            this.sorting.text = sortingText;
            this.sorting.param = param;
            return this.shownStarships = this.shownStarships.slice().sort(this.sortBy(param));
        },

        processStarshipsData: function (data) {
            app.nextUrl = data.next;
            app.starshipsArr = app.starshipsArr.concat(data.results);
        },

        applyFilters: function () {
            var filterByPilots = function (ship) {
                if (!app.filteredPilots.length) {
                    return true;
                } else {
                    var intersection = ship.pilots.filter(function (pilot) {
                        return app.filteredPilots.indexOf(pilot) !== -1;
                    });
                    return intersection.length > 0;
                }
            }

            this.shownStarships = this.shownStarships.filter(filterByPilots);
        },

        getPeople: function (nextUrl) {
            if (nextUrl) {
                this.getData(nextUrl, function (data) {
                    app.pilotsArr = app.pilotsArr.concat(data.results.filter(function (pilot) {
                        return pilot.starships.length > 0;
                    }));
                    app.getPeople(data.next);
                });
            }
        },

        getData: function (url, dataFunc) {
            return fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(dataFunc);
        }
    },

    mounted: function () {
        this.getData(this.nextUrl, this.processStarshipsData).then(function () {
            app.showStarShips(app.starshipsArr.slice(0, 6));
        });

        this.getPeople('https://swapi.co/api/people/');

        var sliders = document.querySelectorAll('.range');
        for (i = 0; i < sliders.length; i++) {
            noUiSlider.create(sliders[i], {
                start: [40, 60],
                behaviour: 'drag',
                connect: true,
                range: {
                    'min': 20,
                    'max': 80
                }
            });
        }
    }
});

