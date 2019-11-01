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
        filteredPilots: [],
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
        mobileMenuOpened: false
    },
    watch: {
        filteredPilots: function () {
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

        scrollToTop: function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        var nextShips = app.starshipsArr.slice(app.shownStarshipsCount, app.shownStarshipsCount + 6);
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

            var filterByCrew = function (ship) {
                if (ship.crew === 'unknown') {
                    return true;
                } else {
                    return (Number(ship.crew) >= app.filters.crewRange.min)
                        && (Number(ship.crew) <= app.filters.crewRange.max);
                }
            }

            var filterByPassengers = function (ship) {
                if (ship.passengers === 'unknown') {
                    return true;
                } else {
                    return (Number(ship.passengers) >= app.filters.psngsRange.min)
                        && (Number(ship.passengers) <= app.filters.psngsRange.max);
                }
            }

            this.shownStarships = this.shownStarships.filter(filterByPilots)
                .filter(filterByCrew).filter(filterByPassengers);
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

        function initRange(selector, min, max, rangeName) {
            noUiSlider.create(selector, {
                start: [min, max],
                connect: true,
                range: {
                    'min': min,
                    '25%': max * 0.001,
                    '50%': max * 0.01,
                    '75%': max * 0.1,
                    'max': max
                },
                format: {
                    to: function (value) {
                        return value.toFixed(0);
                    },
                    from: function (value) {
                        return Number(value);
                    }
                }
            });
            selector.noUiSlider.on('set', function (values) {
                app.filters[rangeName].min = Number(values[0]);
                app.filters[rangeName].max = Number(values[1]);
                app.showStarShips();
            });
        };

        initRange(document.querySelector('.crew-range'), 1, 342953, 'crewRange');
        initRange(document.querySelector('.psngs-range'), 0, 843342, 'psngsRange');
    }
});

