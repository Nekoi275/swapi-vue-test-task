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
        shownStarships: []
    },
    methods: {
        shortNames: function (name) {
            if ( !name.match(/[\s-]/g) ) {
                return name.slice(0, 2).toUpperCase();
            } else {
                return name.match(/\b(\w)/g).join('').toUpperCase();
            }
        },

        showFirstStarships: function () {
            this.shownStarships = this.shownStarships.concat(this.starshipsArr.slice(0, 6)
                .map(function (ship) {
                    ship.short_name = app.shortNames(ship.name);
                    return ship;
                }));
        },

        getData: function (url) {
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    app.starshipsArr = app.starshipsArr.concat(data.results);
                    app.showFirstStarships();
                });
        }
    },

    mounted: function () {
        this.getData('https://swapi.co/api/starships/');
    }
});

