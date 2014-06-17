'use strict';


var cities = require('../controllers/cities');

// The Package is past automatically as first parameter
module.exports = function(Atmos, app, auth, database) {

    app.route('/cities')
        .get(cities.all);
    app.route('/cities/:cityId')
        .get(cities.show);

    // Finish with setting up the cityId param
    app.param('cityId', cities.city);
};
