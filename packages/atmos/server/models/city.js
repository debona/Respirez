'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * City Schema
 */
var CitySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    records: [{
        atmo: {
            type: Number,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }]
});

/**
 * Validations
 */
CitySchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
CitySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

exports = module.exports = mongoose.model('City', CitySchema);
