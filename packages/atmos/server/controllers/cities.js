'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    City = mongoose.model('City');


/**
 * Find city by id
 */
exports.city = function(req, res, next, id) {
    City.load(id, function(err, city) {
        if (err) return next(err);
        if (!city) return next(new Error('Failed to load city ' + id));
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
    City.find().sort('-created').exec(function(err, cities) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the cities'
            });
        }
        res.jsonp(cities);
    });
};
