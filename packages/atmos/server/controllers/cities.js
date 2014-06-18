'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    City = mongoose.model('City'),
    _ = require('lodash');


/**
 * Find city by id
 */
exports.city = function(req, res, next, id) {
    City.load(id, function(err, city) {
        if (err) return next(err);
        if (!city) return next(new Error('Failed to load city ' + id));
        city.records = _.sortBy(city.records, 'created');
        req.city = city;
        next();
    });
};

/**
 * Show a city
 */
exports.show = function(req, res) {
    res.jsonp(req.city);
};

/**
 * List of Cities
 */
exports.all = function(req, res) {
    City.find().exec(function(err, cities) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the cities'
            });
        }

        _.each(cities, function(city){
            city.records = _.sortBy(city.records, 'created');
        });

        res.jsonp(cities);
    });
};
