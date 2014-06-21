'use strict';

angular.module('mean.atmos').filter('last', function() {
    return function last(array) {
        if (! array instanceof Array)
            return array;
        return array[array.length-1];
    };
});
