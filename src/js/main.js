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
        '</div>',
});

var app = new Vue({
    el: "#home",
    data: {
        starshipsArr: [],
        shownStarships: [],
        nextUrl: 'https://swapi.co/api/starships/',
        moreStarships: true,
        sorting: {
            param: '',
            text: 'SORT'
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

        showStarships: function (shipsToShow) {
            this.shownStarships = this.shownStarships.concat(shipsToShow)
                .map(function (ship) {
                    ship.short_name = app.shortNames(ship.name);
                    return ship;
                });
            this.sortShips(this.shownStarships, this.sorting.param, this.sorting.text);
        },

        showMoreStarships: function () {
            var lastShips = this.starshipsArr.slice(this.shownStarships.length, this.starshipsArr.length);
            if (lastShips.length < 6) {
                if (this.nextUrl) {
                    this.getData(this.nextUrl).then(function () {
                        var nextShips = app.starshipsArr.slice(app.shownStarships.length, app.shownStarships.length + 6);
                        app.showStarships(nextShips);
                    });
                } else {
                    this.showStarships(lastShips);
                    this.moreStarships = false;
                }
            } else {
                var nextShips = this.starshipsArr.slice(this.shownStarships.length, this.shownStarships.length + 6);
                this.showStarships(nextShips);
            }
        },

        sortBy: function (param) {
            return function (a, b) {
                if (a[param] === 'unknown' ) {
                    return 1;
                }
                if (b[param] === 'unknown' ) {
                    return -1;
                }
                return a[param] - b[param];
            }
        },

        sortShips: function (shipsArr, param, sortingText) {
            this.sorting.text = sortingText;
            this.sorting.param = param;
            return this.shownStarships = shipsArr.slice().sort(this.sortBy(param));
        },

        getData: function (url) {
            return fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    app.nextUrl = data.next;
                    app.starshipsArr = app.starshipsArr.concat(data.results);
                });
        }
    },

    mounted: function () {
        this.getData(this.nextUrl).then(function () {
            app.showStarships(app.starshipsArr.slice(0, 6));
        });
    }
});

