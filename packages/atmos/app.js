'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Atmos = new Module('atmos');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Atmos.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Atmos.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Atmos.menus.add({
        title: 'atmos example page',
        link: 'atmos example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Atmos.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Atmos.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Atmos.settings(function(err, settings) {
        //you now have the settings object
    });
    */
    Atmos.aggregateAsset('css', 'hexagon.css');
    Atmos.aggregateAsset('css', 'header.css');

    return Atmos;
});
