'use strict';

angular.module('mean.atmos').filter('first', function() {
    return function first(array) {
        if (! array instanceof Array)
            return array;
        return array[0];
    };
});
